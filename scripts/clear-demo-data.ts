import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { connectDB } from '../lib/mongodb'
import { CategoryModel } from '../models/Category'
import { EnquiryModel } from '../models/Enquiry'
import { MaterialModel } from '../models/Material'

function loadEnvFile() {
  try {
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
  } catch {
    // ignore
  }
}

async function clearDatabase() {
  loadEnvFile()
  await connectDB()

  const [categories, materials, enquiries] = await Promise.all([
    CategoryModel.deleteMany({}),
    MaterialModel.deleteMany({}),
    EnquiryModel.deleteMany({}),
  ])

  console.log('MongoDB cleared:')
  console.log(`  categories: ${categories.deletedCount}`)
  console.log(`  materials: ${materials.deletedCount}`)
  console.log(`  enquiries: ${enquiries.deletedCount}`)
}

clearDatabase()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
