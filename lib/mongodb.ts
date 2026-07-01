import mongoose from 'mongoose'

type MongooseCache = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined
}

const cached: MongooseCache = global.mongooseCache ?? { conn: null, promise: null }

if (!global.mongooseCache) {
  global.mongooseCache = cached
}

export function resolveMongoUri() {
  const uri = process.env.MONGODB_URI?.trim()
  if (!uri) {
    throw new Error('Please define MONGODB_URI in your .env file')
  }

  const password = process.env.MONGODB_PASSWORD?.trim()
  let resolved = uri

  if (password) {
    resolved = resolved
      .replace('<db_password>', encodeURIComponent(password))
      .replace('YOUR_DB_PASSWORD', encodeURIComponent(password))
  }

  if (resolved.includes('<db_password>') || resolved.includes('YOUR_DB_PASSWORD')) {
    throw new Error(
      'Set MONGODB_PASSWORD in .env with your Atlas database user password',
    )
  }

  // Normalize Atlas URLs that end with /.mongodb.net/ or /.mongodb.net/?...
  resolved = resolved.replace(/(\.mongodb\.net)\/\?/, '$1/?')
  resolved = resolved.replace(/(\.mongodb\.net)\/$/, '$1')

  return resolved
}

export function getMongoDatabaseName() {
  const fromEnv = process.env.MONGODB_DATABASE?.trim()
  if (fromEnv) return fromEnv

  const uri = resolveMongoUri()
  const match = uri.match(/\.mongodb\.net\/([^/?]+)/)
  if (match?.[1]) return match[1]

  return 'kvs_metals'
}

export async function connectDB() {
  const uri = resolveMongoUri()
  const dbName = getMongoDatabaseName()

  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
      dbName,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export function isMongoConfigured() {
  const uri = process.env.MONGODB_URI?.trim()
  if (!uri) return false
  if (uri.includes('<db_password>') || uri.includes('YOUR_DB_PASSWORD')) {
    return Boolean(process.env.MONGODB_PASSWORD?.trim())
  }
  return true
}
