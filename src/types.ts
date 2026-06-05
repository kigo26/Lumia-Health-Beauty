export type UserRole = 'client' | 'provider' | 'owner' | 'inspector' | 'admin' | 'super_admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: UserRole;
  phoneNumber?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  location?: { lat: number; lng: number };
  subscriptionTier: 'free' | 'plus' | 'elite';
}

export interface ProviderProfile {
  uid: string;
  bio: string;
  specialties: string[];
  certifications: string[];
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  approvalStatus: 'pending' | 'approved' | 'rejected' | 'suspended';
  centerId?: string;
}

export interface WellnessCenter {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  location: { lat: number; lng: number };
  images: string[];
  certificationLevel: 'none' | 'standard' | 'silver' | 'gold';
  hygieneScore: number;
  amenities: string[];
  rating: number;
}

export interface Booking {
  id: string;
  clientId: string;
  providerId: string;
  centerId?: string;
  serviceType: string;
  serviceName: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'disputed';
  deliveryType: 'home' | 'center';
  scheduledAt: string;
  completedAt?: string;
  amount: number;
  currency: string;
  paymentStatus: 'unpaid' | 'escrow' | 'released' | 'refunded';
  location?: { lat: number; lng: number; address: string };
  reviewId?: string;
}

export interface Wallet {
  uid: string;
  balance: number;
  escrowBalance: number;
  currency: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  walletId: string;
  bookingId?: string;
  type: 'credit' | 'debit' | 'escrow_lock' | 'escrow_release' | 'payout';
  amount: number;
  description: string;
  createdAt: string;
}

export interface Inspection {
  id: string;
  targetId: string;
  targetType: 'center' | 'provider';
  inspectorId: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  report: string;
  score: number;
  certificationGranted?: string;
  createdAt: string;
}

export interface ChatRoom {
  id: string;
  participants: string[];
  bookingId?: string;
  lastMessage?: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  text: string;
  createdAt: string;
}

export interface Review {
  id: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  targetId: string;
  targetType: 'provider' | 'center';
  bookingId?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Ritual {
  id: string;
  name: string;
  duration: string;
  price: number;
  benefits: string[];
}
