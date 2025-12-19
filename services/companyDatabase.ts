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
    logo: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
    careersUrl: 'https://careers.google.com/',
    category: 'tech-giant'
  },
  'Microsoft': {
    name: 'Microsoft',
    logo: 'https://www.microsoft.com/favicon.ico',
    careersUrl: 'https://careers.microsoft.com/',
    category: 'tech-giant'
  },
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
