import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { seedCatalogIfEmpty } from '../lib/db/seed'

function loadEnvFile() {
  try {
    const envPath = resolve(process.cwd(), '.env')
    const content = readFileSync(envPath, 'utf8')

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

      if (!process.env[key]) {
        process.env[key] = value
      }
    }
  } catch {
    // .env is optional when variables are already exported
  }
}

async function seed() {
  loadEnvFile()
  const result = await seedCatalogIfEmpty()
  if (result.seeded) {
    console.log(`Seeded ${result.categories} categories and ${result.materials} materials.`)
  } else {
    console.log(`Catalog already present (${result.categories} categories). Seed skipped.`)
  }
}

seed()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
