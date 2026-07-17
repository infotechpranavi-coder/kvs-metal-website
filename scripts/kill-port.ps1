param(
  [int]$Port = 3000
)

$resultPath = Join-Path $PSScriptRoot '..' 'kill-port-result.txt'
$lines = @()

$connections = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue |
  Where-Object { $_.State -eq 'Listen' }

if (-not $connections) {
  $lines += "Port $Port is already free."
} else {
  $pids = $connections | Select-Object -ExpandProperty OwningProcess -Unique
  foreach ($pid in $pids) {
    $proc = Get-Process -Id $pid -ErrorAction SilentlyContinue
    $name = if ($proc) { $proc.ProcessName } else { 'unknown' }
    Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
    $lines += "Killed $name (PID $pid) on port $Port."
  }
}

$stillUsed = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
if ($stillUsed) {
  $lines += "WARNING: Port $Port is still in use."
} else {
  $lines += "VERIFY: Port $Port is free."
}

$lines | Set-Content -Path $resultPath -Encoding UTF8
$lines | ForEach-Object { Write-Output $_ }
