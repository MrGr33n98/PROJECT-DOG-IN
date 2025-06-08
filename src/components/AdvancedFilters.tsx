import React, { useState } from 'react';
import { SlidersHorizontal, MapPin, Star, Clock, Shield, Camera, TreePine, Users, X } from 'lucide-react';
import { FilterOptions } from '../types';

interface AdvancedFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClose: () => void;
  isOpen: boolean;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ filters, onFiltersChange, onClose, isOpen }) => {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  if (!isOpen) return null;

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleArrayFilterChange = (key: keyof FilterOptions, value: string, checked: boolean) => {
    const currentArray = localFilters[key] as string[];
    if (checked) {
      setLocalFilters(prev => ({ 
        ...prev, 
        [key]: [...currentArray, value] 
      }));
    } else {
      setLocalFilters(prev => ({ 
        ...prev, 
        [key]: currentArray.filter(item => item !== value) 
      }));
    }
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const clearFilters = () => {
    const clearedFilters: FilterOptions = {
      services: [],
      priceRange: { min: 0, max: 200 },
      rating: 0,
      distance: 50,
      availability: '',
      specialties: [],
      amenities: [],
      sortBy: 'rating'
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const serviceOptions = ['Hospedagem', 'Creche', 'Passeios', 'Banho e Tosa', 'Pet Taxi', 'Adestramento'];
  const specialtyOptions = ['Cães idosos', 'Filhotes', 'Cães grandes', 'Cães pequenos', 'Medicação', 'Primeiros socorros', 'Adestramento', 'Cuidados especiais'];
  const amenityOptions = ['Quintal', 'Piscina', 'Câmeras', 'Ar condicionado', 'Transporte', 'Veterinário 24h'];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center space-x-2">
            <SlidersHorizontal className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Filtros Avançados</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary-600" />
              Serviços
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {serviceOptions.map(service => (
                <label key={service} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.services.includes(service)}
                    onChange={(e) => handleArrayFilterChange('services', service, e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{service}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Faixa de Preço (por noite)</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Mínimo</label>
                  <input
                    type="number"
                    value={localFilters.priceRange.min}
                    onChange={(e) => handleFilterChange('priceRange', { ...localFilters.priceRange, min: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="R$ 0"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Máximo</label>
                  <input
                    type="number"
                    value={localFilters.priceRange.max}
                    onChange={(e) => handleFilterChange('priceRange', { ...localFilters.priceRange, max: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="R$ 200"
                  />
                </div>
              </div>
              <div className="text-center text-sm text-gray-600">
                R$ {localFilters.priceRange.min} - R$ {localFilters.priceRange.max}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Star className="h-5 w-5 mr-2 text-yellow-500" />
              Avaliação Mínima
            </h3>
            <div className="flex space-x-2">
              {[0, 3, 3.5, 4, 4.5, 5].map(rating => (
                <button
                  key={rating}
                  onClick={() => handleFilterChange('rating', rating)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    localFilters.rating === rating
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {rating === 0 ? 'Todas' : `${rating}+★`}
                </button>
              ))}
            </div>
          </div>

          {/* Distance */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary-600" />
              Distância Máxima
            </h3>
            <div className="space-y-2">
              <input
                type="range"
                min="1"
                max="50"
                value={localFilters.distance}
                onChange={(e) => handleFilterChange('distance', Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="text-center text-sm text-gray-600">
                Até {localFilters.distance} km de distância
              </div>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-secondary-600" />
              Disponibilidade
            </h3>
            <div className="flex space-x-2">
              {['', 'Disponível', 'Limitado'].map(availability => (
                <button
                  key={availability}
                  onClick={() => handleFilterChange('availability', availability)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    localFilters.availability === availability
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {availability || 'Todas'}
                </button>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Especialidades</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {specialtyOptions.map(specialty => (
                <label key={specialty} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.specialties.includes(specialty)}
                    onChange={(e) => handleArrayFilterChange('specialties', specialty, e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{specialty}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TreePine className="h-5 w-5 mr-2 text-secondary-600" />
              Comodidades
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenityOptions.map(amenity => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={localFilters.amenities.includes(amenity)}
                    onChange={(e) => handleArrayFilterChange('amenities', amenity, e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort By */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ordenar por</h3>
            <select
              value={localFilters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            >
              <option value="rating">Melhor avaliação</option>
              <option value="price-low">Menor preço</option>
              <option value="price-high">Maior preço</option>
              <option value="distance">Mais próximo</option>
              <option value="reviews">Mais avaliações</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 flex space-x-4">
          <button
            onClick={clearFilters}
            className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Limpar Filtros
          </button>
          <button
            onClick={applyFilters}
            className="flex-1 bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;