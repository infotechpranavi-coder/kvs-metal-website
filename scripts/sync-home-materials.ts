import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { homeMaterialCards } from '../lib/content'
import { connectDB } from '../lib/mongodb'
import { MaterialModel } from '../models/Material'

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

const REMOVED_SLUGS = ['stainless-steel', 'galvanized-iron']

async function syncHomeMaterials() {
  loadEnvFile()
  await connectDB()

  for (const slug of REMOVED_SLUGS) {
    const removed = await MaterialModel.deleteOne({ slug })
    if (removed.deletedCount > 0) {
      console.log(`Removed material: ${slug}`)
    }
  }

  for (let index = 0; index < homeMaterialCards.length; index += 1) {
    const material = homeMaterialCards[index]
    const existing = await MaterialModel.findOne({
      $or: [{ slug: material.slug }, { title: material.title }],
    })

    if (existing) {
      existing.slug = material.slug
      existing.title = material.title
      existing.img = material.img
      existing.sortOrder = index
      await existing.save()
      console.log(`Updated material: ${material.title}`)
      continue
    }

    await MaterialModel.create({
      slug: material.slug,
      title: material.title,
      description: '',
      img: material.img,
      sortOrder: index,
      categoryIds: [],
    })
    console.log(`Created material: ${material.title}`)
  }
}

syncHomeMaterials()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(() => process.exit(0))
