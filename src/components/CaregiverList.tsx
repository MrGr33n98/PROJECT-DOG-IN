import React, { useState } from 'react';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';
import CaregiverCard from './CaregiverCard';
import CaregiverModal from './CaregiverModal';
import AdvancedFilters from './AdvancedFilters';
import { caregivers } from '../data/caregivers';
import { Caregiver, FilterOptions } from '../types';

const CaregiverList: React.FC = () => {
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    services: [],
    priceRange: { min: 0, max: 200 },
    rating: 0,
    distance: 50,
    availability: '',
    specialties: [],
    amenities: [],
    sortBy: 'rating'
  });

  const handleCaregiverClick = (caregiver: Caregiver) => {
    setSelectedCaregiver(caregiver);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCaregiver(null);
  };

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // Filter and sort caregivers
  const filteredCaregivers = caregivers
    .filter(caregiver => {
      // Search term filter
      if (searchTerm && !caregiver.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !caregiver.location.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Services filter
      if (filters.services.length > 0 && 
          !filters.services.some(service => caregiver.services.includes(service))) {
        return false;
      }

      // Price range filter
      if (caregiver.pricePerNight < filters.priceRange.min || 
          caregiver.pricePerNight > filters.priceRange.max) {
        return false;
      }

      // Rating filter
      if (filters.rating > 0 && caregiver.rating < filters.rating) {
        return false;
      }

      // Availability filter
      if (filters.availability && caregiver.availability !== filters.availability) {
        return false;
      }

      // Specialties filter
      if (filters.specialties.length > 0 && 
          !filters.specialties.some(specialty => caregiver.specialties.includes(specialty))) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return a.pricePerNight - b.pricePerNight;
        case 'price-high':
          return b.pricePerNight - a.pricePerNight;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'distance':
          return (a.distance || 0) - (b.distance || 0);
        case 'rating':
        default:
          return b.rating - a.rating;
      }
    });

  const activeFiltersCount = [
    ...filters.services,
    ...filters.specialties,
    ...filters.amenities,
    filters.availability,
    filters.rating > 0 ? 'rating' : '',
    filters.priceRange.min > 0 || filters.priceRange.max < 200 ? 'price' : ''
  ].filter(Boolean).length;

  return (
    <>
      <section id="buscar" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Cuidadores Disponíveis em Cuiabá
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encontre o cuidador perfeito para seu pet. Todos os nossos cuidadores são verificados e avaliados pela comunidade.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome ou localização..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Quick Filters */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-900">Filtros</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsFiltersOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Filter className="h-4 w-4" />
                  <span>Filtros Avançados</span>
                </button>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={() => setFilters({
                      services: [],
                      priceRange: { min: 0, max: 200 },
                      rating: 0,
                      distance: 50,
                      availability: '',
                      specialties: [],
                      amenities: [],
                      sortBy: 'rating'
                    })}
                    className="text-primary-600 text-sm font-medium hover:text-primary-700"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            </div>

            {/* Quick Filter Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Serviço</label>
                <select 
                  value={filters.services[0] || ''}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    services: e.target.value ? [e.target.value] : [] 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Todos os serviços</option>
                  <option value="Hospedagem">Hospedagem</option>
                  <option value="Creche">Creche</option>
                  <option value="Passeios">Passeios</option>
                  <option value="Banho e Tosa">Banho e Tosa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preço máximo</label>
                <select 
                  value={filters.priceRange.max === 200 ? '' : filters.priceRange.max}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    priceRange: { ...prev.priceRange, max: e.target.value ? Number(e.target.value) : 200 }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Qualquer preço</option>
                  <option value="50">Até R$ 50</option>
                  <option value="75">Até R$ 75</option>
                  <option value="100">Até R$ 100</option>
                  <option value="150">Até R$ 150</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Avaliação mínima</label>
                <select 
                  value={filters.rating}
                  onChange={(e) => setFilters(prev => ({ ...prev, rating: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="0">Qualquer avaliação</option>
                  <option value="4.5">4.5+ estrelas</option>
                  <option value="4.0">4.0+ estrelas</option>
                  <option value="3.5">3.5+ estrelas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilidade</label>
                <select 
                  value={filters.availability}
                  onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Qualquer disponibilidade</option>
                  <option value="Disponível">Disponível</option>
                  <option value="Limitado">Limitado</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count and Sort */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              <span className="font-medium text-gray-900">{filteredCaregivers.length}</span> cuidadores encontrados
              {searchTerm && (
                <span> para "{searchTerm}"</span>
              )}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Ordenar por:</span>
              <select 
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="rating">Melhor avaliação</option>
                <option value="price-low">Menor preço</option>
                <option value="price-high">Maior preço</option>
                <option value="distance">Mais próximo</option>
                <option value="reviews">Mais avaliações</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {activeFiltersCount > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {filters.services.map(service => (
                  <span key={service} className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm">
                    {service}
                    <button
                      onClick={() => setFilters(prev => ({ 
                        ...prev, 
                        services: prev.services.filter(s => s !== service) 
                      }))}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.specialties.map(specialty => (
                  <span key={specialty} className="inline-flex items-center px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm">
                    {specialty}
                    <button
                      onClick={() => setFilters(prev => ({ 
                        ...prev, 
                        specialties: prev.specialties.filter(s => s !== specialty) 
                      }))}
                      className="ml-2 text-secondary-600 hover:text-secondary-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {filters.rating > 0 && (
                  <span className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                    {filters.rating}+ estrelas
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, rating: 0 }))}
                      className="ml-2 text-yellow-600 hover:text-yellow-800"
                    >
                      ×
                    </button>
                  </span>
                )}
                {filters.availability && (
                  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {filters.availability}
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, availability: '' }))}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Caregiver Grid */}
          {filteredCaregivers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCaregivers.map((caregiver) => (
                <CaregiverCard
                  key={caregiver.id}
                  caregiver={caregiver}
                  onClick={handleCaregiverClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🐕</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Nenhum cuidador encontrado
              </h3>
              <p className="text-gray-600 mb-6">
                Tente ajustar seus filtros ou buscar por uma localização diferente.
              </p>
              <button
                onClick={() => {
                  setFilters({
                    services: [],
                    priceRange: { min: 0, max: 200 },
                    rating: 0,
                    distance: 50,
                    availability: '',
                    specialties: [],
                    amenities: [],
                    sortBy: 'rating'
                  });
                  setSearchTerm('');
                }}
                className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                Limpar Filtros
              </button>
            </div>
          )}

          {/* Load More */}
          {filteredCaregivers.length > 0 && filteredCaregivers.length >= 9 && (
            <div className="text-center mt-12">
              <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Carregar mais cuidadores
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      <CaregiverModal
        caregiver={selectedCaregiver}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <AdvancedFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClose={() => setIsFiltersOpen(false)}
        isOpen={isFiltersOpen}
      />
    </>
  );
};

export default CaregiverList;