import * as XLSX from 'xlsx'
import type { BulkImportType } from './types'

const INSTRUCTIONS = [
  ['KVS Metals — bulk import instructions'],
  [''],
  ['1. Use the Data sheet only when importing (Instructions sheet is ignored).'],
  ['2. Import order: Categories → Materials → Products.'],
  ['3. Lists: separate values with | (e.g. Feature one | Feature two).'],
  ['4. Booleans: yes / no / true / false / 1 / 0.'],
  ['5. Images: full URL or site path (e.g. /products/IMG-20260610-WA0020.jpg). Leave blank to add later in the editor.'],
  ['6. slug: optional — auto-generated from title if empty.'],
  ['7. Upsert: existing rows match by slug and are updated; new slugs are added.'],
  [''],
  ['Categories columns: slug, title, img, hero_img, description, headline, paragraphs, product_slugs, sort_order, show_on_homepage, material_slug'],
  ['Materials columns: slug, title, description, img, category_slugs, sort_order'],
  ['Products columns: slug, title, sku, category_slug, category, img, images, short_description, description, features, material, dimensions, standard, schedule, thickness, colors, warranty, badge, in_stock, show_in_footer, sort_order'],
]

const SAMPLE_ROWS: Record<BulkImportType, Record<string, string>[]> = {
  categories: [
    {
      slug: 'structural-sections-beams',
      title: 'Structural Sections & Beams',
      img: '/products/IMG-20260610-WA0016.jpg',
      hero_img: '/products/IMG-20260610-WA0016.jpg',
      description: 'H-beams, universal beams, and structural sections.',
      headline: 'Structural steel for construction',
      paragraphs: 'Supplied across grades and specifications. | Ready for project delivery.',
      product_slugs: 'ms-h-beams | universal-beams',
      sort_order: '0',
      show_on_homepage: 'yes',
      material_slug: 'mild-steel',
    },
  ],
  materials: [
    {
      slug: 'mild-steel',
      title: 'Mild Steel',
      description: 'Structural and industrial mild steel supply.',
      img: '/products/IMG-20260505-WA0044.jpg',
      category_slugs: 'structural-sections-beams | angles',
      sort_order: '0',
    },
  ],
  products: [
    {
      slug: 'ms-h-beams',
      title: 'MS H Beams',
      sku: '1',
      category_slug: 'structural-sections-beams',
      category: 'Structural Sections & Beams',
      img: '/products/IMG-20260610-WA0016.jpg',
      images: '/products/IMG-20260610-WA0016.jpg',
      short_description: 'Structural H-beams for construction and fabrication.',
      description: 'Supplied in multiple sizes and grades per project requirements.',
      features: 'ASTM / EN grades | Project-based sizing',
      material: 'Mild Steel',
      dimensions: 'Per specification',
      standard: 'ASTM / EN',
      schedule: 'SCH 40 / SCH 80',
      thickness: '',
      colors: '',
      warranty: '',
      badge: '',
      in_stock: 'yes',
      show_in_footer: 'no',
      sort_order: '0',
    },
  ],
}

function sheetFromRows(rows: Record<string, string>[]) {
  return XLSX.utils.json_to_sheet(rows)
}

function instructionsSheet() {
  return XLSX.utils.aoa_to_sheet(INSTRUCTIONS)
}

export function generateSampleWorkbook(type: BulkImportType): Buffer {
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, sheetFromRows(SAMPLE_ROWS[type]), 'Data')
  XLSX.utils.book_append_sheet(workbook, instructionsSheet(), 'Instructions')
  return Buffer.from(XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }))
}

export function sampleFilename(type: BulkImportType): string {
  return `kvs-${type}-sample.xlsx`
}

export function readDataSheetRows(buffer: Buffer): Record<string, unknown>[] {
  const workbook = XLSX.read(buffer, { type: 'buffer' })
  const dataSheetName =
    workbook.SheetNames.find((name) => name.trim().toLowerCase() === 'data') ??
    workbook.SheetNames[0]

  if (!dataSheetName) return []

  const sheet = workbook.Sheets[dataSheetName]
  return XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, { defval: '' })
}
