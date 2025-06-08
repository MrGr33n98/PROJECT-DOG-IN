import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const Hero: React.FC = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    service: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Encontre o cuidado perfeito para seu{' '}
                <span className="text-primary-600">melhor amigo</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Conecte-se com cuidadores experientes e confiáveis em Cuiabá. 
                Hospedagem, creche e passeios com a segurança que seu pet merece.
              </p>
            </div>

            {/* Search Form */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    Localização
                  </label>
                  <input
                    type="text"
                    placeholder="Cuiabá, MT"
                    value={searchData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={searchData.checkIn}
                    onChange={(e) => handleInputChange('checkIn', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={searchData.checkOut}
                    onChange={(e) => handleInputChange('checkOut', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Serviço
                  </label>
                  <select
                    value={searchData.service}
                    onChange={(e) => handleInputChange('service', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  >
                    <option value="">Todos os serviços</option>
                    <option value="hospedagem">Hospedagem</option>
                    <option value="creche">Creche</option>
                    <option value="passeios">Passeios</option>
                  </select>
                </div>
              </div>

              <button className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Buscar Cuidadores</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">500+</div>
                <div className="text-sm text-gray-600">Cuidadores</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600">15k+</div>
                <div className="text-sm text-gray-600">Pets Felizes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-600">4.8★</div>
                <div className="text-sm text-gray-600">Avaliação</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/4587955/pexels-photo-4587955.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Pessoa cuidando carinhosamente de um cão"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100 animate-bounce-subtle">
              <div className="flex items-center space-x-3">
                <img
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100"
                  alt="Marina"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">Marina Silva</div>
                  <div className="text-sm text-gray-600">★ 4.9 • 127 avaliações</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;