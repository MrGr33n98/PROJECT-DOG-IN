import React, { useState } from 'react';
import { Plus, Heart, Edit, Trash2, X, Camera, Shield, Stethoscope } from 'lucide-react';
import { Pet } from '../types';
import { mockPets } from '../data/mockData';
import { addPet, updatePet } from '../services/petService';

interface MyPetsProps {
  isOpen: boolean;
  onClose: () => void;
}

const MyPets: React.FC<MyPetsProps> = ({ isOpen, onClose }) => {
  const [pets, setPets] = useState<Pet[]>(mockPets);
  const [isAddingPet, setIsAddingPet] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);
  const [formData, setFormData] = useState<Partial<Pet>>({
    name: '',
    breed: '',
    age: 0,
    weight: 0,
    temperament: [],
    vaccinated: false,
    neutered: false,
    microchipped: false
  });

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTemperamentChange = (temperament: string, checked: boolean) => {
    const current = formData.temperament || [];
    if (checked) {
      setFormData(prev => ({ ...prev, temperament: [...current, temperament] }));
    } else {
      setFormData(prev => ({ ...prev, temperament: current.filter(t => t !== temperament) }));
    }
  };

  const handleSavePet = async () => {
    try {
      if (editingPet) {
        const updated: Pet = { ...editingPet, ...(formData as Pet) };
        await updatePet(updated);
        setPets(prev => prev.map(pet => pet.id === editingPet.id ? updated : pet));
        alert('Pet atualizado com sucesso!');
      } else {
        const newPet: Pet = {
          ...(formData as Pet),
          id: Date.now().toString(),
          ownerId: '1'
        };
        await addPet(newPet);
        setPets(prev => [...prev, newPet]);
        alert('Pet adicionado com sucesso!');
      }
      resetForm();
    } catch (err) {
      alert('Erro ao salvar pet');
    }
  };

  const handleDeletePet = (petId: string) => {
    setPets(prev => prev.filter(pet => pet.id !== petId));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      breed: '',
      age: 0,
      weight: 0,
      temperament: [],
      vaccinated: false,
      neutered: false,
      microchipped: false
    });
    setIsAddingPet(false);
    setEditingPet(null);
  };

  const startEditing = (pet: Pet) => {
    setEditingPet(pet);
    setFormData(pet);
    setIsAddingPet(true);
  };

  const temperamentOptions = ['Amigável', 'Energético', 'Calmo', 'Obediente', 'Brincalhão', 'Protetor', 'Tímido', 'Sociável', 'Independente', 'Carinhoso'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Meus Pets</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {!isAddingPet ? (
            <>
              {/* Add Pet Button */}
              <div className="mb-6">
                <button
                  onClick={() => setIsAddingPet(true)}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Adicionar Pet</span>
                </button>
              </div>

              {/* Pets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pets.map(pet => (
                  <div key={pet.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <img
                        src={pet.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(pet.name)}&background=random`}
                        alt={pet.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEditing(pet)}
                              className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePet(pet.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <p><span className="font-medium">Raça:</span> {pet.breed}</p>
                          <p><span className="font-medium">Idade:</span> {pet.age} anos</p>
                          <p><span className="font-medium">Peso:</span> {pet.weight} kg</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-3">
                          {pet.temperament.slice(0, 3).map(trait => (
                            <span key={trait} className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs">
                              {trait}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center space-x-4 mt-4">
                          {pet.vaccinated && (
                            <div className="flex items-center space-x-1 text-green-600">
                              <Shield className="h-4 w-4" />
                              <span className="text-xs">Vacinado</span>
                            </div>
                          )}
                          {pet.microchipped && (
                            <div className="flex items-center space-x-1 text-blue-600">
                              <Stethoscope className="h-4 w-4" />
                              <span className="text-xs">Microchip</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {pets.length === 0 && (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum pet cadastrado</h3>
                  <p className="text-gray-600 mb-6">Adicione seu primeiro pet para começar a usar a plataforma</p>
                  <button
                    onClick={() => setIsAddingPet(true)}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Adicionar Primeiro Pet
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Add/Edit Pet Form */
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingPet ? 'Editar Pet' : 'Adicionar Novo Pet'}
                </h3>
                <button
                  onClick={resetForm}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
              </div>

              {/* Pet Photo */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={formData.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'Pet')}&background=random`}
                    alt="Pet"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <button className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Foto do Pet</h4>
                  <p className="text-sm text-gray-600">Adicione uma foto do seu pet</p>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Nome do pet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Raça</label>
                  <input
                    type="text"
                    value={formData.breed}
                    onChange={(e) => handleInputChange('breed', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="Raça do pet"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Idade (anos)</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Peso (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    min="0"
                    step="0.1"
                  />
                </div>
              </div>

              {/* Temperament */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Temperamento</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {temperamentOptions.map(trait => (
                    <label key={trait} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.temperament?.includes(trait) || false}
                        onChange={(e) => handleTemperamentChange(trait, e.target.checked)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{trait}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Health Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Informações de Saúde</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.vaccinated || false}
                      onChange={(e) => handleInputChange('vaccinated', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Vacinado em dia</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.neutered || false}
                      onChange={(e) => handleInputChange('neutered', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Castrado</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.microchipped || false}
                      onChange={(e) => handleInputChange('microchipped', e.target.checked)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Possui microchip</span>
                  </label>
                </div>
              </div>

              {/* Special Needs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Necessidades Especiais</label>
                <textarea
                  value={formData.specialNeeds || ''}
                  onChange={(e) => handleInputChange('specialNeeds', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  rows={3}
                  placeholder="Descreva qualquer necessidade especial, medicação ou cuidado específico..."
                />
              </div>

              {/* Save Button */}
              <div className="flex space-x-4">
                <button
                  onClick={handleSavePet}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  {editingPet ? 'Salvar Alterações' : 'Adicionar Pet'}
                </button>
                <button
                  onClick={resetForm}
                  className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPets;