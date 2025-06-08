import { addPet } from '../petService';
import type { Pet } from '../../types';

const mockFetch = jest.fn();

(global as any).fetch = mockFetch;

describe('addPet', () => {
  it('posts pet data and returns response json', async () => {
    const pet: Pet = {
      id: '1',
      name: 'Fido',
      breed: 'Labrador',
      age: 3,
      weight: 20,
      temperament: ['friendly'],
      ownerId: 'owner1',
      vaccinated: true,
      neutered: true,
      microchipped: false
    };

    const responseData = { success: true };

    mockFetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(responseData)
    });

    const result = await addPet(pet);

    expect(mockFetch).toHaveBeenCalledWith('/api/pets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pet)
    });
    expect(result).toEqual(responseData);
  });
});
