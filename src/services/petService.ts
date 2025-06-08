import { Pet } from '../types';

const API_BASE = '/api';

export async function addPet(pet: Pet) {
  const response = await fetch(`${API_BASE}/pets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pet)
  });

  if (!response.ok) {
    throw new Error('Falha ao adicionar pet');
  }

  return response.json();
}

export async function updatePet(pet: Pet) {
  const response = await fetch(`${API_BASE}/pets/${pet.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(pet)
  });

  if (!response.ok) {
    throw new Error('Falha ao editar pet');
  }

  return response.json();
}
