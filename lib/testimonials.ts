import { testimonialsSection } from './content'

export type Testimonial = {
  id: string
  quote: string
  name: string
  role: string
}

export { testimonialsSection }

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'We appreciate the professional approach at KVS Metals. Mr. Girish understands project requirements well and always tries to arrange materials on time without unnecessary complications.',
    name: 'Construction Client',
    role: 'UAE',
  },
  {
    id: 't2',
    quote:
      'We have had an extremely good experience working with KVS Metals. Material quality, responsiveness, and transparent dealing make them a steel supplier we feel confident working with repeatedly.',
    name: 'Procurement Partner',
    role: 'Industrial Buyer',
  },
  {
    id: 't3',
    quote:
      'One thing we value about KVS Metals is reliability. Commitments are handled professionally, communication remains clear, and Mr. Girish is always approachable whenever support is needed.',
    name: 'Project Coordinator',
    role: 'UAE',
  },
  {
    id: 't4',
    quote:
      'Mr. Girish and the KVS team have been supportive throughout our procurement requirements. Their practical understanding, easy coordination, and honest communication make day-to-day sourcing easier.',
    name: 'Fabrication Client',
    role: 'UAE',
  },
  {
    id: 't5',
    quote:
      'KVS Metals is a company we rely on whenever we urgent material requirement arises. Pricing remains competitive, communication is clear, and working with Mr. Girish has always been smooth and straightforward.',
    name: 'Steel Buyer',
    role: 'UAE',
  },
]
