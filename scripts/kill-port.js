const { execSync } = require('node:child_process')
const { writeFileSync } = require('node:fs')
const { resolve } = require('node:path')

const port = Number(process.argv[2] || 3000)
const resultPath = resolve(__dirname, '..', 'kill-port-result.txt')
const lines = []

function run(command) {
  return execSync(command, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
}

try {
  const output = run(`netstat -ano | findstr :${port}`)
  const pids = new Set()

  for (const line of output.split(/\r?\n/)) {
    if (!/LISTENING/i.test(line)) continue
    const parts = line.trim().split(/\s+/)
    const pid = parts[parts.length - 1]
    if (pid && /^\d+$/.test(pid) && pid !== '0') {
      pids.add(pid)
    }
  }

  if (pids.size === 0) {
    lines.push(`Port ${port} is already free.`)
  } else {
    for (const pid of pids) {
      try {
        run(`taskkill /PID ${pid} /F`)
        lines.push(`Killed PID ${pid} on port ${port}.`)
      } catch (error) {
        lines.push(`Failed to kill PID ${pid}: ${error.message}`)
      }
    }
  }

  const verify = run(`netstat -ano | findstr :${port}`)
  const stillListening = verify.split(/\r?\n/).some((line) => /LISTENING/i.test(line))
  lines.push(stillListening ? `WARNING: Port ${port} is still in use.` : `VERIFY: Port ${port} is free.`)
} catch (error) {
  if (String(error.message).includes('findstr')) {
    lines.push(`Port ${port} is already free.`)
    lines.push(`VERIFY: Port ${port} is free.`)
  } else {
    lines.push(`ERROR: ${error.message}`)
  }
}

const text = lines.join('\n')
writeFileSync(resultPath, `${text}\n`, 'utf8')
console.log(text)
