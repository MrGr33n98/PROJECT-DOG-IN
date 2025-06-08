import { Pet, Booking } from '../types';

export const mockPets: Pet[] = [
  {
    id: '1',
    name: 'Thor',
    breed: 'Golden Retriever',
    age: 3,
    weight: 32,
    temperament: ['Amigável', 'Energético', 'Obediente'],
    image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400',
    ownerId: '1',
    vaccinated: true,
    neutered: true,
    microchipped: true,
    medications: ['Antipulgas mensal'],
    emergencyContact: {
      name: 'Maria Silva',
      phone: '(65) 98888-8888',
      relationship: 'Esposa'
    },
    veterinarian: {
      name: 'Dr. Carlos Veterinário',
      phone: '(65) 3333-4444',
      address: 'Rua das Flores, 123 - Centro'
    }
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'Border Collie',
    age: 2,
    weight: 18,
    temperament: ['Inteligente', 'Ativa', 'Carinhosa'],
    image: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?auto=compress&cs=tinysrgb&w=400',
    ownerId: '1',
    vaccinated: true,
    neutered: false,
    microchipped: true,
    specialNeeds: 'Precisa de muito exercício diário'
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    petId: '1',
    caregiverId: '1',
    ownerId: '1',
    service: 'Hospedagem',
    startDate: '2024-02-15',
    endDate: '2024-02-18',
    totalPrice: 255,
    status: 'confirmed',
    specialInstructions: 'Thor gosta de brincar com bola e precisa de caminhada pela manhã',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z',
    pet: mockPets[0],
    caregiver: {
      id: '1',
      name: 'Marina Silva',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Centro, Cuiabá',
      rating: 4.9,
      reviewCount: 127,
      pricePerNight: 85,
      services: ['Hospedagem', 'Creche', 'Passeios'],
      description: 'Veterinária com 8 anos de experiência',
      specialties: ['Cães idosos', 'Medicação', 'Primeiros socorros'],
      availability: 'Disponível',
      verified: true
    }
  },
  {
    id: '2',
    petId: '2',
    caregiverId: '2',
    ownerId: '1',
    service: 'Creche',
    startDate: '2024-01-25',
    endDate: '2024-01-25',
    totalPrice: 75,
    status: 'completed',
    createdAt: '2024-01-20T14:00:00Z',
    updatedAt: '2024-01-25T18:00:00Z',
    pet: mockPets[1],
    caregiver: {
      id: '2',
      name: 'Carlos Mendonça',
      image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
      location: 'Jardim Aclimação, Cuiabá',
      rating: 4.8,
      reviewCount: 89,
      pricePerNight: 75,
      services: ['Hospedagem', 'Passeios'],
      description: 'Adestrador profissional',
      specialties: ['Adestramento', 'Exercícios', 'Socialização'],
      availability: 'Disponível',
      verified: true
    }
  }
];