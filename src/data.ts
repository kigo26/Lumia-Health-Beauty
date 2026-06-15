import { Review, Ritual } from './types';

export const LUMIA_RITUALS: Ritual[] = [
  { id: 'r1', name: 'Lumia Serenity Ritual™', duration: '60 min', price: 150, benefits: ['Stress reduction', 'Deep relaxation', 'Improved sleep'] },
  { id: 'r2', name: 'Lumia Emerald Escape™', duration: '90 min', price: 200, benefits: ['Skin rejuvenation', 'Detoxification', 'Mood enhancement'] },
  { id: 'r3', name: 'Lumia Deep Renewal™', duration: '75 min', price: 180, benefits: ['Muscle recovery', 'Tension release', 'Increased circulation'] },
  { id: 'r4', name: 'Lumia Golden Harmony™', duration: '120 min', price: 300, benefits: ['Full body balance', 'Energetic realignment', 'Holistic wellness'] },
  { id: 'r5', name: 'Lumia Signature Wellness Journey™', duration: '180 min', price: 450, benefits: ['Complete rejuvenation', 'Mind-body connection', 'Total restoration'] },
  { id: 'r6', name: 'Lumia Stress Reset Experience™', duration: '45 min', price: 100, benefits: ['Quick tension relief', 'Mental clarity', 'Calm mood'] },
  { id: 'r7', name: 'Lumia Ultimate Recovery Ritual™', duration: '90 min', price: 250, benefits: ['Athletic recovery', 'Injury prevention', 'Performance optimization'] },
  { id: 'r8', name: 'Lumia Couples Sanctuary Experience™', duration: '120 min', price: 400, benefits: ['Shared relaxation', 'Connection', 'Intimacy enhancement'] },
];

export const SERVICES = [
  {
    id: 'signature',
    name: 'Lumia Signature',
    subtypes: ['Lumia Serenity Ritual™', 'Lumia Emerald Escape™', 'Lumia Deep Renewal™', 'Lumia Golden Harmony™', 'Lumia Signature Wellness Journey™', 'Lumia Stress Reset Experience™', 'Lumia Ultimate Recovery Ritual™', 'Lumia Couples Sanctuary Experience™'],
    icon: 'Award'
  },
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
    specialties: ['Lumia Serenity Ritual™', 'Swedish Massage', 'Deep Tissue'],
    rating: 4.9,
    reviewCount: 124,
    role: 'provider',
    isVerified: true,
    certificationLevel: 'Lumia Signature Master',
    location: { lat: -1.2921, lng: 36.8219 }, // Nairobi Central
    status: 'available'
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
    certificationLevel: 'Licensed Specialist',
    location: { lat: -1.3031, lng: 36.7850 }, // Kilimani area
    status: 'busy'
  },
  {
    uid: 'p3',
    displayName: 'Elena Rodriguez',
    photoURL: 'https://images.unsplash.com/photo-1594744803329-a584af1eb518?auto=format&fit=crop&q=80&w=200&h=200',
    specialties: ['Lumia Emerald Escape™', 'Facial Restoration', 'Aromatherapy'],
    rating: 5.0,
    reviewCount: 56,
    role: 'provider',
    isVerified: true,
    certificationLevel: 'Lumia Elite Artisan',
    location: { lat: -1.2580, lng: 36.8170 }, // Westlands
    status: 'available'
  },
  {
    uid: 'p4',
    displayName: 'David Kojo',
    photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    specialties: ['Lumia Deep Renewal™', 'Thai Massage', 'Reflexology'],
    rating: 4.7,
    reviewCount: 112,
    role: 'provider',
    isVerified: true,
    certificationLevel: 'Senior Practitioner',
    location: { lat: -1.3150, lng: 36.8370 }, // Upper Hill
    status: 'on_leave'
  }
];

export const MOCK_CENTERS = [
  {
    id: 'c1',
    name: 'Emerald Zen Spa',
    address: '123 Riverside Dr, Nairobi',
    rating: 4.9,
    reviewCount: 243,
    images: ['https://images.unsplash.com/photo-1544161515-4ae6ce6db87e?auto=format&fit=crop&q=80&w=800'],
    certificationLevel: 'gold',
    hygieneScore: 98,
    location: { lat: -1.2675, lng: 36.8120 } // Riverside
  },
  {
    id: 'c2',
    name: 'Pearl Wellness Center',
    address: '45 Kilimani St, Nairobi',
    rating: 4.7,
    reviewCount: 156,
    images: ['https://images.unsplash.com/photo-1519415510236-85591199a0ed?auto=format&fit=crop&q=80&w=800'],
    certificationLevel: 'silver',
    hygieneScore: 94,
    location: { lat: -1.3000, lng: 36.7800 } // Kilimani
  },
  {
    id: 'c3',
    name: 'Sapphire Sanctuary',
    address: '88 Karen Rd, Nairobi',
    rating: 5.0,
    reviewCount: 312,
    images: ['https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=800'],
    certificationLevel: 'gold',
    hygieneScore: 100,
    location: { lat: -1.3333, lng: 36.7125 } // Karen
  },
  {
    id: 'c4',
    name: 'Obsidian Recovery Lounge',
    address: '12 Lavington Mall, Nairobi',
    rating: 4.8,
    reviewCount: 89,
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800'],
    certificationLevel: 'standard',
    hygieneScore: 96,
    location: { lat: -1.2850, lng: 36.7725 } // Lavington
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    authorId: 'u1',
    authorName: 'Elara Vance',
    targetId: 'p1',
    targetType: 'provider',
    rating: 5,
    comment: 'Sarah is absolutely incredible. Her technique for deep tissue massage is the best I have ever experienced. Very professional and creates a serene environment.',
    createdAt: '2024-05-15T10:00:00Z'
  },
  {
    id: 'r2',
    authorId: 'u2',
    authorName: 'Alex Rivera',
    targetId: 'p1',
    targetType: 'provider',
    rating: 4,
    comment: 'Great experience, very relaxing. Sarah really knows what she is doing. Minimal wait time.',
    createdAt: '2024-05-20T14:30:00Z'
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Maya J.',
    role: 'Wellness Enthusiast',
    quote: 'The Lumia experience has completely transformed my weekly recovery routine. Absolute serenity.',
  },
  {
    id: 't2',
    name: 'Samuel K.',
    role: 'Marathon Runner',
    quote: 'As an athlete, the deep renewal rituals here are unmatched. My recovery time has halved.',
  },
  {
    id: 't3',
    name: 'Dr. Linda M.',
    role: 'Physician',
    quote: 'I recommend Lumia to all my patients. It is a true benchmark for holistic care in Nairobi.',
  }
];
