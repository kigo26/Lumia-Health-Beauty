export const SERVICES = [
  {
    id: 'massage',
    name: 'Massage',
    subtypes: ['Swedish', 'Deep Tissue', 'Sports', 'Aromatherapy', 'Hot Stone', 'Prenatal', 'Reflexology'],
    icon: 'Thermometer'
  },
  {
    id: 'beauty',
    name: 'Beauty',
    subtypes: ['Facials', 'Haircare', 'Makeup', 'Manicure', 'Pedicure'],
    icon: 'Sparkles'
  },
  {
    id: 'wellness',
    name: 'Wellness',
    subtypes: ['Physiotherapy', 'Yoga', 'Meditation', 'Nutrition'],
    icon: 'Activity'
  }
];

export const MOCK_PROVIDERS = [
  {
    uid: 'p1',
    displayName: 'Sarah Johnson',
    photoURL: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200',
    specialties: ['Swedish Massage', 'Deep Tissue'],
    rating: 4.9,
    reviewCount: 124,
    role: 'provider',
    isVerified: true,
    certificationLevel: 'Lumia Approved'
  },
  {
    uid: 'p2',
    displayName: 'Michael Chen',
    photoURL: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200',
    specialties: ['Physiotherapy', 'Sports Recovery'],
    rating: 4.8,
    reviewCount: 89,
    role: 'provider',
    isVerified: true,
    certificationLevel: 'Licensed Specialist'
  }
];

export const MOCK_CENTERS = [
  {
    id: 'c1',
    name: 'Emerald Zen Spa',
    address: '123 Riverside Dr, Nairobi',
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?auto=format&fit=crop&q=80&w=800'],
    certificationLevel: 'gold',
    hygieneScore: 98
  },
  {
    id: 'c2',
    name: 'Pearl Wellness Center',
    address: '45 Kilimani St, Nairobi',
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1531233076846-42e1f823b2ee?auto=format&fit=crop&q=80&w=800'],
    certificationLevel: 'silver',
    hygieneScore: 94
  }
];
