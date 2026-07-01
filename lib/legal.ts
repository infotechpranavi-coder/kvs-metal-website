export type LegalSection = {
  heading: string
  paragraphs: string[]
}

export type LegalPageContent = {
  title: string
  eyebrow: string
  lead: string
  updated: string
  sections: LegalSection[]
}

export const privacyPolicy: LegalPageContent = {
  title: 'Privacy Policy',
  eyebrow: 'Legal',
  lead: 'How KVS Metals collects, uses, and protects your information when you use our website and services.',
  updated: 'June 2026',
  sections: [
    {
      heading: 'Information we collect',
      paragraphs: [
        'We may collect information you provide directly, such as your name, company name, email address, phone number, and enquiry details when you contact us or request a quote.',
        'We may also collect technical information such as browser type, device information, and pages visited to help improve website performance and user experience.',
      ],
    },
    {
      heading: 'How we use your information',
      paragraphs: [
        'We use your information to respond to enquiries, provide quotations, coordinate product supply, and communicate about orders or services you request.',
        'We may use aggregated or anonymised data to analyse website usage and improve our digital services.',
      ],
    },
    {
      heading: 'Sharing of information',
      paragraphs: [
        'KVS Metals does not sell your personal information. We may share information with trusted service providers who assist with operations such as hosting, communication, or logistics, only where necessary to fulfil your request.',
        'We may disclose information if required by law, regulation, or valid legal process.',
      ],
    },
    {
      heading: 'Data retention',
      paragraphs: [
        'We retain personal information only for as long as needed to fulfil the purposes described in this policy, unless a longer retention period is required by law or legitimate business needs.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'Depending on applicable law, you may request access to, correction of, or deletion of your personal information. To make a request, contact us using the details below.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [
        'For privacy-related questions, contact KVS Metals at gsamyani@kvsmetals.com or +971 503646193.',
      ],
    },
  ],
}

export const termsAndConditions: LegalPageContent = {
  title: 'Terms & Conditions',
  eyebrow: 'Legal',
  lead: 'Terms governing use of the KVS Metals website and engagement with our steel supply services.',
  updated: 'June 2026',
  sections: [
    {
      heading: 'Acceptance of terms',
      paragraphs: [
        'By accessing this website or engaging with KVS Metals for products or services, you agree to these Terms & Conditions. If you do not agree, please do not use the website.',
      ],
    },
    {
      heading: 'Services and quotations',
      paragraphs: [
        'Product descriptions, specifications, images, and availability on this website are provided for general information. Final pricing, grades, dimensions, and delivery terms are confirmed only through official quotation or written agreement.',
        'Quotations may be subject to change based on market conditions, availability, and confirmed project requirements.',
      ],
    },
    {
      heading: 'Orders and delivery',
      paragraphs: [
        'Orders are subject to acceptance by KVS Metals. Delivery timelines communicated are estimates and may vary due to logistics, customs, supplier availability, or force majeure events.',
        'Risk and responsibility for goods transfer in accordance with agreed commercial terms will be defined in the relevant sales documentation.',
      ],
    },
    {
      heading: 'Website use',
      paragraphs: [
        'You agree not to misuse the website, attempt unauthorised access, or use content in a way that infringes intellectual property or applicable law.',
        'We may update, suspend, or modify website content at any time without prior notice.',
      ],
    },
    {
      heading: 'Limitation of liability',
      paragraphs: [
        'To the fullest extent permitted by law, KVS Metals is not liable for indirect, incidental, or consequential losses arising from use of the website or reliance on general information published online.',
        'Nothing in these terms limits liability that cannot be excluded under applicable law.',
      ],
    },
    {
      heading: 'Governing law',
      paragraphs: [
        'These terms are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the jurisdiction of the competent courts in Dubai, UAE, unless otherwise agreed in writing.',
      ],
    },
    {
      heading: 'Contact',
      paragraphs: [
        'For questions about these terms, contact KVS Metals at gsamyani@kvsmetals.com or +971 503646193.',
      ],
    },
  ],
}
