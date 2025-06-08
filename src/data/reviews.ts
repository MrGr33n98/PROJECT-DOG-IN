import { Review } from '../types';

export const reviews: Review[] = [
  {
    id: '1',
    authorName: 'Juliana Almeida',
    authorImage: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    comment: 'Marina cuidou do meu Golden Retriever por uma semana e foi perfeito! Recebi fotos todos os dias e o Thor voltou super feliz e relaxado.',
    date: '2024-01-15',
    petName: 'Thor'
  },
  {
    id: '2',
    authorName: 'Marcos Silva',
    authorImage: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 5,
    comment: 'Carlos é incrível! Minha Lola ficou com ele por 3 dias e voltou mais obediente. Recomendo para todos!',
    date: '2024-01-20',
    petName: 'Lola'
  },
  {
    id: '3',
    authorName: 'Carla Rodrigues',
    authorImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    rating: 4,
    comment: 'Ótimo atendimento! Ana Paula é muito carinhosa e cuidadosa. Meu Bingo se sentiu em casa.',
    date: '2024-01-25',
    petName: 'Bingo'
  }
];