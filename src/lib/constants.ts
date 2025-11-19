export const APP_NAME = 'EduBridge';
export const APP_DESCRIPTION = 'AI-powered education consulting platform helping students apply to schools abroad';

export const PRICING_TIERS = [
  {
    name: 'Starter',
    price: 199,
    priceId: 'price_starter',
    description: 'Perfect for self-driven students',
    features: [
      'AI Essay Assistant',
      'School matching (20 schools)',
      'Scholarship finder',
      'Visa document checklist',
      'Community access',
      'Email support'
    ],
    popular: false
  },
  {
    name: 'Premium',
    price: 599,
    priceId: 'price_premium',
    description: 'Best for selective schools',
    features: [
      'Everything in Starter',
      '2x 60-min counselor calls',
      'Professor research insights',
      'AI essay review & feedback',
      'Priority support (24h)',
      'Application timeline',
      'Document verification'
    ],
    popular: true
  },
  {
    name: 'Concierge',
    price: 1199,
    priceId: 'price_concierge',
    description: 'Full white-glove service',
    features: [
      'Everything in Premium',
      'Unlimited counselor access',
      'Housing coordination',
      'Flight booking assistance',
      'Visa interview prep',
      'Dedicated success manager',
      'Post-arrival support'
    ],
    popular: false
  }
] as const;

export const NAVIGATION_ITEMS = [
  { name: 'Features', href: '/#features' },
  { name: 'How It Works', href: '/how-it-works' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Success Stories', href: '/success-stories' }
] as const;

export const STATS = [
  { value: '2,500+', label: 'Students Helped' },
  { value: '85%', label: 'Acceptance Rate' },
  { value: '150+', label: 'Partner Schools' },
  { value: '50+', label: 'Countries' }
] as const;
