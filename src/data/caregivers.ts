import { Caregiver } from '../types';

export const caregivers: Caregiver[] = [
  {
    id: '1',
    name: 'Marina Silva',
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Centro, Cuiabá',
    rating: 4.9,
    reviewCount: 127,
    pricePerNight: 85,
    services: ['Hospedagem', 'Creche', 'Passeios'],
    description: 'Veterinária com 8 anos de experiência, especializada no cuidado de cães de grande porte. Minha casa tem um quintal amplo e seguro.',
    specialties: ['Cães idosos', 'Medicação', 'Primeiros socorros'],
    availability: 'Disponível',
    verified: true
  },
  {
    id: '2',
    name: 'Carlos Mendonça',
    image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Jardim Aclimação, Cuiabá',
    rating: 4.8,
    reviewCount: 89,
    pricePerNight: 75,
    services: ['Hospedagem', 'Passeios'],
    description: 'Adestrador profissional e apaixonado por cães. Ofereço cuidados personalizados e muito carinho para seu pet.',
    specialties: ['Adestramento', 'Exercícios', 'Socialização'],
    availability: 'Disponível',
    verified: true
  },
  {
    id: '3',
    name: 'Ana Paula Rodrigues',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Bosque da Saúde, Cuiabá',
    rating: 4.7,
    reviewCount: 156,
    pricePerNight: 65,
    services: ['Creche', 'Passeios', 'Banho e Tosa'],
    description: 'Pet sitter com dedicação integral. Trabalho apenas com poucos pets por vez para garantir atenção especial a cada um.',
    specialties: ['Filhotes', 'Cães pequenos', 'Cuidados especiais'],
    availability: 'Limitado',
    verified: true
  },
  {
    id: '4',
    name: 'Roberto Santos',
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Várzea Grande',
    rating: 4.6,
    reviewCount: 203,
    pricePerNight: 90,
    services: ['Hospedagem', 'Creche', 'Transporte'],
    description: 'Hotel canino familiar com estrutura completa. Área de 500m² com playground para cães e piscina.',
    specialties: ['Grupos grandes', 'Atividades recreativas', 'Cuidados veterinários'],
    availability: 'Disponível',
    verified: true
  },
  {
    id: '5',
    name: 'Fernanda Costa',
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Ribeirão do Lipa, Cuiabá',
    rating: 4.9,
    reviewCount: 94,
    pricePerNight: 70,
    services: ['Hospedagem', 'Passeios', 'Pet Taxi'],
    description: 'Cuidadora dedicada que trata cada pet como família. Casa com jardim amplo e muita segurança.',
    specialties: ['Pets ansiosos', 'Terapia canina', 'Acompanhamento 24h'],
    availability: 'Disponível',
    verified: true
  },
  {
    id: '6',
    name: 'Diego Oliveira',
    image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Centro Norte, Cuiabá',
    rating: 4.5,
    reviewCount: 78,
    pricePerNight: 60,
    services: ['Passeios', 'Creche'],
    description: 'Personal trainer para cães! Especializado em exercícios e atividades físicas para manter seu pet saudável.',
    specialties: ['Condicionamento físico', 'Cães ativos', 'Corrida'],
    availability: 'Disponível',
    verified: false
  }
];