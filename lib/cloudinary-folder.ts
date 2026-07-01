/** All Cloudinary uploads stay under CLOUDINARY_FOLDER (e.g. kvs-website). */
export function getCloudinaryFolder(subfolder?: string) {
  const base = process.env.CLOUDINARY_FOLDER?.trim() || 'kvs-website'
  const segment = subfolder?.replace(/^\/+|\/+$/g, '')
  return segment ? `${base}/${segment}` : base
}
