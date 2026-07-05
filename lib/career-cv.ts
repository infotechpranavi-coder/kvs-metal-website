import type { EnquiryDocument } from '@/models/Enquiry'

export function getCareerCvFilename(enquiry: Pick<EnquiryDocument, 'cvFilename' | 'productSku'>) {
  return enquiry.cvFilename || enquiry.productSku || 'cv.pdf'
}

export function getCareerApplicantMessage(message: string) {
  const marker = '\nMessage:\n'
  const markerIndex = message.indexOf(marker)
  if (markerIndex === -1) {
    return message.replace(/^CV file:.*$/m, '').trim()
  }
  return message.slice(markerIndex + marker.length).trim()
}

export async function fetchCareerCvBuffer(enquiry: Pick<EnquiryDocument, 'cvUrl'>) {
  if (!enquiry.cvUrl) {
    return Buffer.alloc(0)
  }

  const response = await fetch(enquiry.cvUrl)
  if (!response.ok) {
    throw new Error('CV_DOWNLOAD_FAILED')
  }

  return Buffer.from(await response.arrayBuffer())
}
