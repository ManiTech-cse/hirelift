// Company database with logos and career pages
export interface CompanyInfo {
  name: string;
  logo: string;
  careersUrl: string;
  category: 'enterprise' | 'startup' | 'tech-giant' | 'fintech' | 'ecommerce' | 'healthcare' | 'education';
}

export const COMPANY_DATABASE: Record<string, CompanyInfo> = {
  // Tech Giants
  'Google': {
    name: 'Google',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%234285F4" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="28" font-weight="bold" text-anchor="middle" fill="white"%3EG%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://careers.google.com/',
    category: 'tech-giant'
  },
  'Microsoft': {
    name: 'Microsoft',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23CCCCCC" width="32" height="32" x="0" y="0"/%3E%3Crect fill="%237FBA00" width="32" height="32" x="32" y="0"/%3E%3Crect fill="%230078D4" width="32" height="32" x="0" y="32"/%3E%3Crect fill="%23FFB900" width="32" height="32" x="32" y="32"/%3E%3C/svg%3E',
    careersUrl: 'https://careers.microsoft.com/',
    category: 'tech-giant'
  },
  'Apple': {
    name: 'Apple',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="white" width="64" height="64" rx="8"/%3E%3Cpath d="M32 10c-8 0-12 6-12 12c0 5 3 8 7 11c1 1 2 1.5 2 2.5v0.5c0 1-1 2-2 2h-2c-1 0-2 1-2 2v1h22v-1c0-1-1-2-2-2h-2c-1 0-2-1-2-2v-0.5c0-1 1-1.5 2-2.5c4-3 7-6 7-11c0-6-4-12-12-12z" fill="black"/%3E%3C/svg%3E',
    careersUrl: 'https://www.apple.com/careers/',
    category: 'tech-giant'
  },
  'Amazon': {
    name: 'Amazon',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23FF9900" width="64" height="64" rx="8"/%3E%3Cpath d="M20 40c4-5 8-8 13-8c3 0 6 1 8 3c2-2 4-4 8-4c5 0 8 3 8 8v8h-2v-8c0-4-2-6-6-6c-3 0-6 2-8 5v9h-2v-9c-2-3-5-5-8-5c-4 0-6 2-6 6v8h-2v-8z" fill="white"/%3E%3C/svg%3E',
    careersUrl: 'https://www.amazon.jobs/',
    category: 'tech-giant'
  },
  'Meta': {
    name: 'Meta',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%231877F2" width="64" height="64" rx="8"/%3E%3Cpath d="M28 16c0-2-1-4-4-4c-5 0-8 3-8 10v6h-4v4h4v16h4v-16h6l1-4h-7v-6c0-1 0-2 1-2h5v-4z" fill="white"/%3E%3C/svg%3E',
    careersUrl: 'https://www.metacareers.com/',
    category: 'tech-giant'
  },

  // Indian IT Consulting Giants
  'Wipro': {
    name: 'Wipro',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23003366" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EW%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://careers.wipro.com/',
    category: 'enterprise'
  },
  'TCS': {
    name: 'TCS',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23004B87" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="22" font-weight="bold" text-anchor="middle" fill="white"%3ETCS%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.tcs.com/careers',
    category: 'enterprise'
  },
  'Infosys': {
    name: 'Infosys',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%2300ADA7" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3EIN%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.infosys.com/careers/',
    category: 'enterprise'
  },
  'Cognizant': {
    name: 'Cognizant',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%230066B2" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3ECog%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://careers.cognizant.com/',
    category: 'enterprise'
  },
  'Accenture': {
    name: 'Accenture',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23A100F2" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3EA%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.accenture.com/us-en/careers',
    category: 'enterprise'
  },
  'HCL Technologies': {
    name: 'HCL Technologies',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%234A90E2" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3EHCL%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.hcltech.com/careers',
    category: 'enterprise'
  },

  // Other Major Tech Companies
  'IBM': {
    name: 'IBM',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23054ADA" width="64" height="64" rx="8"/%3E%3Crect fill="%23054ADA" width="8" height="32" x="10" y="16"/%3E%3Crect fill="%23054ADA" width="8" height="32" x="22" y="16"/%3E%3Crect fill="%23054ADA" width="8" height="32" x="34" y="16"/%3E%3Crect fill="%23054ADA" width="8" height="32" x="46" y="16"/%3E%3C/svg%3E',
    careersUrl: 'https://www.ibm.com/careers/',
    category: 'tech-giant'
  },
  'Intel': {
    name: 'Intel',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%230071C5" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3E∫%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.intel.com/content/www/us/en/careers/careers-home.html',
    category: 'tech-giant'
  },
  'Nvidia': {
    name: 'Nvidia',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23000000" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="%2376B900"%3EN%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.nvidia.com/en-us/about-nvidia/careers/',
    category: 'tech-giant'
  },
  'Qualcomm': {
    name: 'Qualcomm',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%233953DC" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="18" font-weight="bold" text-anchor="middle" fill="white"%3EQcom%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.qualcomm.com/company/careers',
    category: 'enterprise'
  },
  'Cisco': {
    name: 'Cisco',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%231BA0D7" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EC%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.cisco.com/c/en/us/about/careers.html',
    category: 'enterprise'
  },

  // E-commerce & Retail
  'Flipkart': {
    name: 'Flipkart',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23FFCC00" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="%23126DFF"%3EF%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.flipkart.com/careers',
    category: 'ecommerce'
  },
  'Myntra': {
    name: 'Myntra',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23EE5A24" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3EM%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.myntra.com/careers',
    category: 'ecommerce'
  },
  'Shopify': {
    name: 'Shopify',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%2396bf48" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3ES%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.shopify.com/careers',
    category: 'ecommerce'
  },

  // FinTech
  'PayPal': {
    name: 'PayPal',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23003087" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="%23FFFFFF"%3EP%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://careers.paypal.com/',
    category: 'fintech'
  },
  'Stripe': {
    name: 'Stripe',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23625AFA" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3E$%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://stripe.com/jobs',
    category: 'fintech'
  },
  'Square': {
    name: 'Square',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23FFFFFF" width="64" height="64" rx="8" stroke="%23000000" stroke-width="2"/%3E%3Crect fill="%23000000" width="30" height="30" x="17" y="17"/%3E%3C/svg%3E',
    careersUrl: 'https://www.square.com/careers',
    category: 'fintech'
  },
  'HDFC Bank': {
    name: 'HDFC Bank',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%230066CC" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3EHDFC%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.hdfcbank.com/htdocs/Careers',
    category: 'fintech'
  },
  'ICICI Bank': {
    name: 'ICICI Bank',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23004B87" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3EICICI%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.icicibank.com/careers',
    category: 'fintech'
  },

  // Healthcare
  'Pharmeasy': {
    name: 'PharmEasy',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%2335C3EB" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3EPE%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.pharmeasy.in/careers',
    category: 'healthcare'
  },
  'Teladoc': {
    name: 'Teladoc Health',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%2300A3E0" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3ETD%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.teladochealth.com/careers/',
    category: 'healthcare'
  },

  // Education & EdTech
  'Byju\'s': {
    name: 'Byju\'s',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%2300C7FD" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3EB%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.byjus.com/careers',
    category: 'education'
  },
  'Unacademy': {
    name: 'Unacademy',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23F67924" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3EU%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.unacademy.com/careers',
    category: 'education'
  },
  'Coursera': {
    name: 'Coursera',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%230056D2" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3ECour%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.coursera.org/careers',
    category: 'education'
  },

  // Startups - India
  'OYO': {
    name: 'OYO',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%232C2830" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EO%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.oyorooms.com/careers',
    category: 'startup'
  },
  'Ola': {
    name: 'Ola',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23FCC200" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="%23222"%3EO%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://careers.olacabs.com/',
    category: 'startup'
  },
  'Zomato': {
    name: 'Zomato',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23EF4F5F" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EZ%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.zomato.com/careers',
    category: 'startup'
  },
  'Swiggy': {
    name: 'Swiggy',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23FC6E1F" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3ES%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.swiggy.com/careers',
    category: 'startup'
  },
  'Paytm': {
    name: 'Paytm',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%230066B2" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3EP%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.paytm.com/careers',
    category: 'startup'
  },
  'Razorpay': {
    name: 'Razorpay',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%232E5090" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3ERazor%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://razorpay.com/careers/',
    category: 'startup'
  },
  'Freshworks': {
    name: 'Freshworks',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%2301B075" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="16" font-weight="bold" text-anchor="middle" fill="white"%3EFW%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.freshworks.com/careers/',
    category: 'startup'
  },

  // Startups - Global
  'Uber': {
    name: 'Uber',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23000000" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EU%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.uber.com/careers',
    category: 'startup'
  },
  'Airbnb': {
    name: 'Airbnb',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23FF5A5F" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EA%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.airbnb.com/careers',
    category: 'startup'
  },
  'Spotify': {
    name: 'Spotify',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%231DB954" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3E♫%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.spotify.com/careers/',
    category: 'startup'
  },
  'Slack': {
    name: 'Slack',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23E01E5A" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3E%23%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://slack.com/careers',
    category: 'startup'
  },
  'Notion': {
    name: 'Notion',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23000000" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EN%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.notion.so/careers',
    category: 'startup'
  },
  'Figma': {
    name: 'Figma',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23F24E1E" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3Ef%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.figma.com/careers/',
    category: 'startup'
  },
  'Linear': {
    name: 'Linear',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23000000" width="64" height="64" rx="8"/%3E%3Cline x1="16" y1="16" x2="48" y2="48" stroke="white" stroke-width="3"/%3E%3C/svg%3E',
    careersUrl: 'https://linear.app/careers',
    category: 'startup'
  },
  'GitLab': {
    name: 'GitLab',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23FC6D26" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EG%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://about.gitlab.com/jobs/',
    category: 'startup'
  },
  'Hashicorp': {
    name: 'HashiCorp',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23000000" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="%2317CCEB"%3EHC%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.hashicorp.com/careers/',
    category: 'startup'
  },
  'Databricks': {
    name: 'Databricks',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23FF3621" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="20" font-weight="bold" text-anchor="middle" fill="white"%3EDB%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.databricks.com/company/careers',
    category: 'startup'
  },
  'Canva': {
    name: 'Canva',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%238B5FBF" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3EC%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.canva.com/careers/',
    category: 'startup'
  },
  'Duolingo': {
    name: 'Duolingo',
    logo: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%231CB0F6" width="64" height="64" rx="8"/%3E%3Ctext x="32" y="40" font-size="24" font-weight="bold" text-anchor="middle" fill="white"%3ED%3C/text%3E%3C/svg%3E',
    careersUrl: 'https://www.duolingo.com/careers',
    category: 'startup'
  },
};
  'Apple': {
    name: 'Apple',
    logo: 'https://www.apple.com/favicon.ico',
    careersUrl: 'https://www.apple.com/careers/',
    category: 'tech-giant'
  },
  'Amazon': {
    name: 'Amazon',
    logo: 'https://www.amazon.com/favicon.ico',
    careersUrl: 'https://www.amazon.jobs/',
    category: 'tech-giant'
  },
  'Meta': {
    name: 'Meta',
    logo: 'https://www.meta.com/favicon.ico',
    careersUrl: 'https://www.metacareers.com/',
    category: 'tech-giant'
  },

  // Indian IT Consulting Giants
  'Wipro': {
    name: 'Wipro',
    logo: 'https://www.wipro.com/favicon.ico',
    careersUrl: 'https://careers.wipro.com/',
    category: 'enterprise'
  },
  'TCS': {
    name: 'TCS',
    logo: 'https://www.tcs.com/favicon.ico',
    careersUrl: 'https://www.tcs.com/careers',
    category: 'enterprise'
  },
  'Infosys': {
    name: 'Infosys',
    logo: 'https://www.infosys.com/favicon.ico',
    careersUrl: 'https://www.infosys.com/careers/',
    category: 'enterprise'
  },
  'Cognizant': {
    name: 'Cognizant',
    logo: 'https://www.cognizant.com/favicon.ico',
    careersUrl: 'https://careers.cognizant.com/',
    category: 'enterprise'
  },
  'Accenture': {
    name: 'Accenture',
    logo: 'https://www.accenture.com/favicon.ico',
    careersUrl: 'https://www.accenture.com/us-en/careers',
    category: 'enterprise'
  },
  'HCL Technologies': {
    name: 'HCL Technologies',
    logo: 'https://www.hcltechnologies.com/favicon.ico',
    careersUrl: 'https://www.hcltech.com/careers',
    category: 'enterprise'
  },

  // Other Major Tech Companies
  'IBM': {
    name: 'IBM',
    logo: 'https://www.ibm.com/favicon.ico',
    careersUrl: 'https://www.ibm.com/careers/',
    category: 'tech-giant'
  },
  'Intel': {
    name: 'Intel',
    logo: 'https://www.intel.com/favicon.ico',
    careersUrl: 'https://www.intel.com/content/www/us/en/careers/careers-home.html',
    category: 'tech-giant'
  },
  'Nvidia': {
    name: 'Nvidia',
    logo: 'https://www.nvidia.com/favicon.ico',
    careersUrl: 'https://www.nvidia.com/en-us/about-nvidia/careers/',
    category: 'tech-giant'
  },
  'Qualcomm': {
    name: 'Qualcomm',
    logo: 'https://www.qualcomm.com/favicon.ico',
    careersUrl: 'https://www.qualcomm.com/company/careers',
    category: 'enterprise'
  },
  'Cisco': {
    name: 'Cisco',
    logo: 'https://www.cisco.com/favicon.ico',
    careersUrl: 'https://www.cisco.com/c/en/us/about/careers.html',
    category: 'enterprise'
  },

  // E-commerce & Retail
  'Flipkart': {
    name: 'Flipkart',
    logo: 'https://www.flipkart.com/favicon.ico',
    careersUrl: 'https://www.flipkart.com/careers',
    category: 'ecommerce'
  },
  'Myntra': {
    name: 'Myntra',
    logo: 'https://www.myntra.com/favicon.ico',
    careersUrl: 'https://www.myntra.com/careers',
    category: 'ecommerce'
  },
  'Shopify': {
    name: 'Shopify',
    logo: 'https://www.shopify.com/favicon.ico',
    careersUrl: 'https://www.shopify.com/careers',
    category: 'ecommerce'
  },

  // FinTech
  'PayPal': {
    name: 'PayPal',
    logo: 'https://www.paypal.com/favicon.ico',
    careersUrl: 'https://careers.paypal.com/',
    category: 'fintech'
  },
  'Stripe': {
    name: 'Stripe',
    logo: 'https://www.stripe.com/favicon.ico',
    careersUrl: 'https://stripe.com/jobs',
    category: 'fintech'
  },
  'Square': {
    name: 'Square',
    logo: 'https://www.square.com/favicon.ico',
    careersUrl: 'https://www.square.com/careers',
    category: 'fintech'
  },
  'HDFC Bank': {
    name: 'HDFC Bank',
    logo: 'https://www.hdfcbank.com/favicon.ico',
    careersUrl: 'https://www.hdfcbank.com/htdocs/Careers',
    category: 'fintech'
  },
  'ICICI Bank': {
    name: 'ICICI Bank',
    logo: 'https://www.icicibank.com/favicon.ico',
    careersUrl: 'https://www.icicibank.com/careers',
    category: 'fintech'
  },

  // Healthcare
  'Pharmeasy': {
    name: 'PharmEasy',
    logo: 'https://www.1mg.com/favicon.ico',
    careersUrl: 'https://www.pharmeasy.in/careers',
    category: 'healthcare'
  },
  'Teladoc': {
    name: 'Teladoc Health',
    logo: 'https://www.teladochealth.com/favicon.ico',
    careersUrl: 'https://www.teladochealth.com/careers/',
    category: 'healthcare'
  },

  // Education & EdTech
  'Byju\'s': {
    name: 'Byju\'s',
    logo: 'https://www.byjus.com/favicon.ico',
    careersUrl: 'https://www.byjus.com/careers',
    category: 'education'
  },
  'Unacademy': {
    name: 'Unacademy',
    logo: 'https://www.unacademy.com/favicon.ico',
    careersUrl: 'https://www.unacademy.com/careers',
    category: 'education'
  },
  'Coursera': {
    name: 'Coursera',
    logo: 'https://www.coursera.com/favicon.ico',
    careersUrl: 'https://www.coursera.org/careers',
    category: 'education'
  },

  // Startups - India
  'OYO': {
    name: 'OYO',
    logo: 'https://www.oyorooms.com/favicon.ico',
    careersUrl: 'https://www.oyorooms.com/careers',
    category: 'startup'
  },
  'Ola': {
    name: 'Ola',
    logo: 'https://www.olacabs.com/favicon.ico',
    careersUrl: 'https://careers.olacabs.com/',
    category: 'startup'
  },
  'Zomato': {
    name: 'Zomato',
    logo: 'https://www.zomato.com/favicon.ico',
    careersUrl: 'https://www.zomato.com/careers',
    category: 'startup'
  },
  'Swiggy': {
    name: 'Swiggy',
    logo: 'https://www.swiggy.com/favicon.ico',
    careersUrl: 'https://www.swiggy.com/careers',
    category: 'startup'
  },
  'Paytm': {
    name: 'Paytm',
    logo: 'https://paytm.com/favicon.ico',
    careersUrl: 'https://www.paytm.com/careers',
    category: 'startup'
  },
  'Razorpay': {
    name: 'Razorpay',
    logo: 'https://razorpay.com/favicon.ico',
    careersUrl: 'https://razorpay.com/careers/',
    category: 'startup'
  },
  'Freshworks': {
    name: 'Freshworks',
    logo: 'https://www.freshworks.com/favicon.ico',
    careersUrl: 'https://www.freshworks.com/careers/',
    category: 'startup'
  },

  // Startups - Global
  'Uber': {
    name: 'Uber',
    logo: 'https://www.uber.com/favicon.ico',
    careersUrl: 'https://www.uber.com/careers',
    category: 'startup'
  },
  'Airbnb': {
    name: 'Airbnb',
    logo: 'https://www.airbnb.com/favicon.ico',
    careersUrl: 'https://www.airbnb.com/careers',
    category: 'startup'
  },
  'Spotify': {
    name: 'Spotify',
    logo: 'https://www.spotify.com/favicon.ico',
    careersUrl: 'https://www.spotify.com/careers/',
    category: 'startup'
  },
  'Slack': {
    name: 'Slack',
    logo: 'https://slack.com/favicon.ico',
    careersUrl: 'https://slack.com/careers',
    category: 'startup'
  },
  'Notion': {
    name: 'Notion',
    logo: 'https://www.notion.so/favicon.ico',
    careersUrl: 'https://www.notion.so/careers',
    category: 'startup'
  },
  'Figma': {
    name: 'Figma',
    logo: 'https://www.figma.com/favicon.ico',
    careersUrl: 'https://www.figma.com/careers/',
    category: 'startup'
  },
  'Linear': {
    name: 'Linear',
    logo: 'https://linear.app/favicon.ico',
    careersUrl: 'https://linear.app/careers',
    category: 'startup'
  },
  'GitLab': {
    name: 'GitLab',
    logo: 'https://www.gitlab.com/favicon.ico',
    careersUrl: 'https://about.gitlab.com/jobs/',
    category: 'startup'
  },
  'Hashicorp': {
    name: 'HashiCorp',
    logo: 'https://www.hashicorp.com/favicon.ico',
    careersUrl: 'https://www.hashicorp.com/careers/',
    category: 'startup'
  },
  'Databricks': {
    name: 'Databricks',
    logo: 'https://www.databricks.com/favicon.ico',
    careersUrl: 'https://www.databricks.com/company/careers',
    category: 'startup'
  },
  'Canva': {
    name: 'Canva',
    logo: 'https://www.canva.com/favicon.ico',
    careersUrl: 'https://www.canva.com/careers/',
    category: 'startup'
  },
  'Duolingo': {
    name: 'Duolingo',
    logo: 'https://www.duolingo.com/favicon.ico',
    careersUrl: 'https://www.duolingo.com/careers',
    category: 'startup'
  },
};

/**
 * Get company info by name (case-insensitive)
 */
export const getCompanyInfo = (companyName: string): CompanyInfo | undefined => {
  // Try exact match first
  if (COMPANY_DATABASE[companyName]) {
    return COMPANY_DATABASE[companyName];
  }
  
  // Try case-insensitive match
  const key = Object.keys(COMPANY_DATABASE).find(
    k => k.toLowerCase() === companyName.toLowerCase()
  );
  
  return key ? COMPANY_DATABASE[key] : undefined;
};

/**
 * Get all companies by category
 */
export const getCompaniesByCategory = (category: CompanyInfo['category']): CompanyInfo[] => {
  return Object.values(COMPANY_DATABASE).filter(c => c.category === category);
};
