import path from 'path'

export const BROCHURE_URL = '/brochure/KVS%20Metals%20Brochure%20.pdf'
export const BROCHURE_FILENAME = 'KVS Metals Brochure.pdf'
export const BROCHURE_PAGE_PATH = '/brochure'
export const BROCHURE_DOWNLOAD_HREF = `${BROCHURE_PAGE_PATH}#download`

export function getBrochureFilePath() {
  return path.join(process.cwd(), 'public', 'brochure', BROCHURE_FILENAME)
}

export {
  COMPANY_NAME,
  EMAIL,
  PHONE_DISPLAY,
  PHONE_E164,
  WHATSAPP_URL,
} from './content'
