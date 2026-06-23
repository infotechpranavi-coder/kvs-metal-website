export type Testimonial = {
  id: string
  quote: string
  name: string
  role: string
  image: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'KVS Metal delivered our GI roofing sheets on schedule with consistent quality. A reliable partner for our warehouse project.',
    name: 'Rajesh Kumar',
    role: 'Construction Project Manager',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
  },
  {
    id: 't2',
    quote:
      'We source MS angles and channels from KVS for fabrication jobs. Competitive pricing, certified material, and honest service.',
    name: 'Priya Sharma',
    role: 'Fabrication Lead',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
  },
  {
    id: 't3',
    quote:
      'Their stainless steel pipes met our specification requirements. Responsive from quote to delivery — highly recommend.',
    name: 'Amit Patel',
    role: 'Industrial Procurement Head',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  },
]
