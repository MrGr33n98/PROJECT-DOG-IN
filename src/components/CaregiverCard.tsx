import React from 'react';
import { Star, MapPin, Shield, Clock } from 'lucide-react';
import { Caregiver } from '../types';

interface CaregiverCardProps {
  caregiver: Caregiver;
  onClick: (caregiver: Caregiver) => void;
}

const CaregiverCard: React.FC<CaregiverCardProps> = ({ caregiver, onClick }) => {
  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary-200 transition-all duration-300 cursor-pointer group"
      onClick={() => onClick(caregiver)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={caregiver.image}
          alt={caregiver.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {caregiver.verified && (
          <div className="absolute top-3 right-3 bg-secondary-500 text-white p-1 rounded-full">
            <Shield className="h-4 w-4" />
          </div>
        )}
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${
          caregiver.availability === 'Disponível' 
            ? 'bg-secondary-100 text-secondary-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          <Clock className="h-3 w-3 inline mr-1" />
          {caregiver.availability}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{caregiver.name}</h3>
            <p className="text-gray-600 text-sm flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {caregiver.location}
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium text-gray-900">{caregiver.rating}</span>
            </div>
            <p className="text-xs text-gray-500">({caregiver.reviewCount} avaliações)</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {caregiver.description}
        </p>

        {/* Services */}
        <div className="flex flex-wrap gap-2 mb-4">
          {caregiver.services.slice(0, 3).map((service, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded-full font-medium"
            >
              {service}
            </span>
          ))}
          {caregiver.services.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              +{caregiver.services.length - 3}
            </span>
          )}
        </div>

        {/* Price */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-gray-900">R$ {caregiver.pricePerNight}</span>
            <span className="text-gray-600 text-sm">/noite</span>
          </div>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium">
            Ver Perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaregiverCard;