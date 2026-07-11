export const COMPANY_NAME = 'KVS Metals'

export const PHONE_E164 = '+971503646193'
export const PHONE_DISPLAY = '+971 503646193'
export const PHONE_TEL_HREF = `tel:${PHONE_E164}`
const WHATSAPP_PREFILL =
  'Hello, I would like to inquire about your steel products and services. Please share more details.'
export const WHATSAPP_URL = `https://wa.me/971503646193?text=${encodeURIComponent(WHATSAPP_PREFILL)}`
export const EMAIL = 'gsamyani@kvsmetals.com'

export const heroContent = {
  eyebrow: '25+ Years of Excellence in Steel Trading',
  ghostTitle: 'STEEL',
  title: 'Build Smart. Build Strong. Build with KVS.',
  description:
    'From commercial developments to industrial expansion, KVS Metals simplifies steel sourcing through speed, availability, precision, and seamless execution.',
  ctaLabel: 'Get a Quote',
  ctaHref: '/contact',
  stats: [
    { value: '25+', label: 'Years' },
    { value: '98%', label: 'On-time' },
    { value: '1K+', label: 'Clients' },
  ],
  highlights: [
    'Structural & industrial steel supply',
    'ASTM · EN · JIS · BS standards',
    'Dubai, UAE — fast coordination',
  ],
  secondaryCtaLabel: 'View Products',
  secondaryCtaHref: '/products',
}

export const aboutUsHome = {
  eyebrow: 'About Us',
  tagline: 'Trusted',
  title: 'Steel Supplier in Dubai, UAE',
  paragraphs: [
    'KVS Metals is a trusted steel supplier and steel trading company in Dubai, UAE. We are committed to delivering steel solutions backed by quality, consistency, industry expertise and professionalism.',
    'Our structural and industrial steel products support applications requiring performance, durability, and precision.',
    'From construction and infrastructure to fabrication, marine, and industrial sectors, we supply an extensive range of steel materials in different grades meeting international standards.',
    'We understand that every project depends on materials arriving on time. That is why contractors, fabricators, EPC companies, stockists, and industrial buyers trust KVS Metals for consistent quality, fast product availability, and prompt coordination.',
  ],
  features: [
    {
      title: 'Competitive Pricing',
      desc: 'We deliver the right balance of quality and value through competitive pricing, helping businesses procure steel products without compromise.',
    },
    {
      title: 'Timely Deliveries',
      desc: 'Efficient and streamlined coordination helps ensure materials arrive on time, keeping projects moving smoothly and avoiding unnecessary delays.',
    },
    {
      title: 'Reliable Global Sourcing',
      desc: 'Strong supplier partnerships ensure consistent access to premium steel products across multiple grades, standards, and specifications for projects of every scale.',
    },
    {
      title: 'Customer-Focused Service',
      desc: 'We understand every project is unique, offering responsive support, tailored solutions, and professional guidance based on your exact requirements.',
    },
  ],
}

import {
  kvsAboutCtaImage,
  kvsProcurementCtaImage,
  kvsProductsCtaImage,
} from './product-images'

export const procurementCta = {
  title: 'Looking for smoother steel procurement? Contact KVS Metals to simplify your sourcing.',
  phoneLabel: 'Call Us',
  ctaLabel: 'Request A Call',
  ctaHref: PHONE_TEL_HREF,
  image: kvsProcurementCtaImage,
  imageAlt: 'KVS Metals steel products',
}

export const productsCta = {
  title: 'Need premium steel products delivered with speed and reliable service?',
  titleEmphasis: 'Count on KVS Metals.',
  phoneLabel: 'Call Us',
  ctaLabel: 'Request A Call',
  ctaHref: PHONE_TEL_HREF,
  image: kvsProductsCtaImage,
  imageAlt: 'KVS Metals structural steel supply',
}

export const productsHome = {
  eyebrow: 'Our Products',
  title: 'Our Products',
  paragraphs: [
    'KVS Metals supplies a comprehensive range of structural and industrial steel materials designed to meet the demands of modern construction, fabrication, engineering, and industrial projects.',
    'Available in multiple grades, sizes, and specifications, our products include coils, sheets, pipes, structural sections, bars, channels, and foundation materials procured as per international standards.',
    'We combine quality products, dependable sourcing, and 25+ years industry expertise to deliver steel solutions businesses can rely on with confidence.',
    'From enquiry to delivery, we ensure a seamless procurement experience backed by responsive service and reliable supply with our comprehensive product range.',
  ],
}

export { productHighlights, productMarqueeTerms } from './kvs-catalog'

export const sectorsSection = {
  title: 'Industries We Serve',
  tagline:
    'Establish a robust steel foundation for construction, engineering and industrial projects.',
}

export const materialsSection = {
  title: 'Materials Supplied',
  tagline:
    'Procure, stock, and supply structural and industrial metals across grades, sizes, and specifications for projects across the UAE.',
}

export const testimonialsSection = {
  eyebrow: 'Client feedback',
  title: 'What Customers Say About KVS',
}

export const footerContent = {
  topbarMessage: 'Any kind of steel requirement? We are just a call away!',
  tagline:
    'KVS Metals — Your trusted steel supplier in Dubai, powering project developments through reliable supply, seamless coordination, and long-term partnerships.',
  standardsTitle: 'International Standards We Support',
  standards: [
    'ASTM International Standards',
    'EN European Standards',
    'JIS Japanese Standards',
    'BS British Standards',
    'API Specifications',
    'IS Standards',
    'Custom Requirements on Request',
  ],
  address: 'Dubai, United Arab Emirates',
  materials: [
    { label: 'Mild Steel', href: '/products?material=mild-steel' },
    { label: 'Stainless Steel', href: '/products?material=stainless-steel' },
    { label: 'Aluminum', href: '/products?material=aluminum' },
    { label: 'Galvanized Iron', href: '/products?material=galvanized-iron' },
  ],
}

export const aboutPage = {
  eyebrow: 'About Us',
  title: 'Building Strength. Delivering Trust.',
  lead:
    'KVS Metals is recognised among leading steel suppliers and steel traders in Dubai, UAE, serving businesses with a comprehensive range of steel materials across multiple grades, specifications, and international standards.',
  storyTitle: 'Right Grade. On-Time Delivery.',
  paragraphs: [
    'Contractors, fabricators, EPC teams, and industrial buyers across the UAE come to us when schedules are tight and specifications are non-negotiable. We act as a single point of coordination — clarifying grades, checking availability, and aligning dispatch with the way your project actually runs.',
    'Each requirement is reviewed against the right standard — ASTM, EN, JIS, BS, or a project-specific brief — before material is released. That means fewer surprises at site: correct sizes, documented grades, and stock matched to the application, not just the purchase order.',
    'Whether the job calls for long products, tubulars, flats, or structural sections, we consolidate sourcing so your team spends less time chasing vendors and more time executing. Our Dubai base keeps communication direct and turnaround practical for UAE deliveries.',
    'As project scopes evolve, we adjust supply plans with you — phased deliveries, alternate sizes where suitable, and responsive updates when site needs shift. The goal is steady material flow that supports the build, not paperwork that slows it down.',
  ],
  stats: [
    { value: '6+', label: 'International standards' },
    { value: '98%', label: 'On-time' },
    { value: '1K+', label: 'Clients' },
  ],
  whyChooseTitle: 'Why Choose KVS Metals',
  whyChoose: [
    {
      title: 'Reliable Supply Approach',
      desc: 'A wide range of steel materials available across multiple grades, sizes, and specifications to support urgent and ongoing project requirements.',
    },
    {
      title: 'Competitive Pricing',
      desc: 'Practical pricing solutions designed to balance quality and cost-effectiveness, helping businesses optimise procurement without unnecessary compromise.',
    },
    {
      title: 'Timely Coordination',
      desc: 'Efficient delivery planning to help materials reach your site or facility without disrupting project timelines.',
    },
    {
      title: 'Extensive Supply Chain Network',
      desc: 'Well-established procurement partnerships ensure access to globally sourced materials across multiple specifications.',
    },
    {
      title: 'Customer-First Approach',
      desc: 'Every requirement is handled with attention, responsiveness, and practical solutions tailored to specific project needs.',
    },
    {
      title: 'Industry Understanding',
      desc: 'Serving construction, fabrication, infrastructure, engineering, marine, and industrial sectors with materials suited to evolving project demands.',
    },
  ],
  valuesTitle: 'Our Core Values',
  valuesTagline:
    'Driven by integrity, powered by expertise, and committed to long-term value.',
  valuesOverviewEyebrow: 'Values',
  valuesOverviewTitle: 'Our approach',
  valuesIntro: [
    'At KVS Metals, our approach goes beyond supplying materials. We believe in building long-standing relationships through transparent communication, responsive service, practical support, and a commitment to delivering value in every interaction.',
    'The way we work is shaped by values that guide every decision, commitment, and customer interaction. These principles help us build lasting relationships and earn trust through consistent actions.',
  ],
  valuesLead: 'Our brand stands for values we are driven by:',
  values: [
    'Integrity & Trust',
    'Commitment',
    'Customer-First Approach',
    'Mutual Respect',
    'Transparent Dealings',
  ],
  ctaTitle: 'Ready to discuss your steel requirements?',
  ctaText: 'Share requirements — we will respond with a tailored quote.',
  ctaLabel: 'Request A Call',
  ctaHref: PHONE_TEL_HREF,
  ctaPhoneLabel: 'Call Us',
  heroImage: '/about%20us/about%20us%203.webp',
  heroImageAlt: 'Steel products and materials supplied by KVS Metals',
  heroImageCaption: 'Steel coils & sheet stock — the materials we supply across grades and specifications',
  storyImage: '/about%20us/about%20us%204.webp',
  storyImageAlt: 'Structural steel products for construction and industrial projects',
  storyImageCaption: 'Structural beams & long products — supplied across grades and project specifications',
  ctaImage: kvsAboutCtaImage,
  ctaImageAlt: 'Structural steel beams and long products supplied by KVS Metals',
}

export const brochurePage = {
  eyebrow: 'Product Brochure',
  title: 'KVS Metals Product Brochure',
  lead:
    'Access product specifications, grades, dimensions, and material standards across KVS Metals’ steel range for construction, fabrication, marine, foundation, and industrial requirements.',
  downloadLabel: 'Download Product Brochure (PDF)',
  formTitle: 'Get the KVS Metals Product Brochure',
  formDescription:
    'Fill in your details to access the brochure and receive a copy in your email.',
  nameLabel: 'Name',
  companyLabel: 'Company name (optional)',
  emailLabel: 'Email (optional)',
  emailHint: 'If provided, we will email a copy of the brochure to this address.',
  phoneLabel: 'Phone number',
  submitLabel: 'Download Product Brochure',
  successTitle: 'Thank you. Your brochure is now downloading.',
  successDownloadHint: 'If the download did not start, use the button below.',
  successEmailNote: 'A copy has also been sent to your email.',
  successWhatsappPrefix: 'Need further assistance? Our team is available on WhatsApp at',
  successAgainLabel: 'Submit another request',
}

export const careersPage = {
  eyebrow: 'Careers',
  title: 'Build Your Career with KVS Metals',
  subheading: 'Be part of a workplace that values professionalism, commitment, and integrity.',
  heroImage: '/images/career.avif',
  heroImageAlt: 'Professional team at KVS Metals workplace',
  intro: [
    'At KVS Metals, we value practical industry knowledge, dedication, and a professional approach to work. We welcome motivated individuals looking to grow in the steel trading and industrial sector.',
    'If you wish to explore career opportunities with KVS Metals, please submit your details and upload your CV below.',
  ],
  formTitle: 'Share your profile',
  formDescription: 'Submit your details and CV. Our team will review your application and get in touch if there is a suitable opportunity.',
  firstNameLabel: 'First name',
  lastNameLabel: 'Last name',
  emailLabel: 'Email address',
  cvLabel: 'Upload CV',
  cvHint: 'PDF, DOC, or DOCX — max 5 MB',
  messageLabel: 'Message',
  messageLimit: 500,
  submitLabel: 'Share your CV',
  successTitle: 'Thank you — your profile has been submitted.',
  successMessage: 'Our team will review your application and contact you if there is a suitable opportunity.',
}

export const aboutHomeBlocks = [
  {
    id: 'supply',
    label: 'Steel supply',
    text: 'KVS Metals is a trusted steel supplier and steel trading company in Dubai, UAE, delivering structural and industrial steel products backed by quality, consistency, and industry expertise.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=85&auto=format&fit=crop',
    alt: 'Steel warehouse and metal stock in Dubai',
  },
  {
    id: 'coordination',
    label: 'Project coordination',
    text: 'Contractors, fabricators, EPC companies, stockists, and industrial buyers trust KVS Metals for consistent quality, fast product availability, and prompt coordination across every project stage.',
    image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=900&q=85&auto=format&fit=crop',
    alt: 'Industrial steel coordination and logistics',
  },
]
