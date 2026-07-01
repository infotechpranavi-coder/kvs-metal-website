import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import mongoose from 'mongoose'
import { connectDB, getMongoDatabaseName, resolveMongoUri } from '../lib/mongodb'

function loadEnvFile() {
  const content = readFileSync(resolve(process.cwd(), '.env'), 'utf8')
  for (const line of content.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const separator = trimmed.indexOf('=')
    if (separator === -1) continue
    const key = trimmed.slice(0, separator).trim()
    let value = trimmed.slice(separator + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    process.env[key] = value
  }
}

async function main() {
  loadEnvFile()
  const uri = resolveMongoUri()
  const dbName = getMongoDatabaseName()
  const safeUri = uri.replace(/:([^:@/]+)@/, ':***@')
  console.log('Resolved URI:', safeUri)
  console.log('Database:', dbName)

  await connectDB()

  const database = mongoose.connection.db?.databaseName
  const collections = await mongoose.connection.db?.listCollections().toArray()

  console.log('CONNECTED: yes')
  console.log('Database:', database)
  console.log(
    'Collections:',
    collections?.length ? collections.map((item) => item.name).join(', ') : '(none yet)',
  )

  await mongoose.disconnect()
}

main().catch((error: Error) => {
  console.log('CONNECTED: no')
  console.log('Error:', error.message)
  process.exit(1)
})
