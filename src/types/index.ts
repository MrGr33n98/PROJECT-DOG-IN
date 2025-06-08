export interface Caregiver {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
  pricePerNight: number;
  services: string[];
  description: string;
  specialties: string[];
  availability: string;
  verified: boolean;
  distance?: number;
  responseTime?: string;
  acceptsEmergency?: boolean;
  hasCamera?: boolean;
  hasYard?: boolean;
  maxPets?: number;
}

export interface Review {
  id: string;
  authorName: string;
  authorImage: string;
  rating: number;
  comment: string;
  date: string;
  petName: string;
}

export interface SearchFilters {
  location: string;
  dates: {
    checkIn: string;
    checkOut: string;
  };
  services: string[];
  priceRange: {
    min: number;
    max: number;
  };
  rating: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  image?: string;
  type: 'owner' | 'caregiver';
  verified: boolean;
  createdAt: string;
  address?: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  preferences?: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    privacy: {
      showPhone: boolean;
      showEmail: boolean;
    };
  };
}

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  temperament: string[];
  specialNeeds?: string;
  image?: string;
  ownerId: string;
  vaccinated: boolean;
  neutered: boolean;
  microchipped: boolean;
  medications?: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  veterinarian?: {
    name: string;
    phone: string;
    address: string;
  };
}

export interface Booking {
  id: string;
  petId: string;
  caregiverId: string;
  ownerId: string;
  service: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  specialInstructions?: string;
  createdAt: string;
  updatedAt: string;
  pet: Pet;
  caregiver: Caregiver;
}

export interface FilterOptions {
  services: string[];
  priceRange: { min: number; max: number };
  rating: number;
  distance: number;
  availability: string;
  specialties: string[];
  amenities: string[];
  sortBy: 'rating' | 'price-low' | 'price-high' | 'distance' | 'reviews';
}