import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, MessageCircle, X, Filter } from 'lucide-react';
import { Booking } from '../types';
import { mockBookings } from '../data/mockData';

interface MyBookingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const MyBookings: React.FC<MyBookingsProps> = ({ isOpen, onClose }) => {
  const [bookings] = useState<Booking[]>(mockBookings);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled'>('all');

  if (!isOpen) return null;

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'confirmed': return 'Confirmada';
      case 'in-progress': return 'Em andamento';
      case 'completed': return 'Concluída';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-2xl">
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">Minhas Reservas</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Filters */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">Filtrar por status:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'Todas' },
                { key: 'pending', label: 'Pendentes' },
                { key: 'confirmed', label: 'Confirmadas' },
                { key: 'in-progress', label: 'Em andamento' },
                { key: 'completed', label: 'Concluídas' },
                { key: 'cancelled', label: 'Canceladas' }
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as any)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    filter === key
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.map(booking => (
              <div key={booking.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={booking.pet.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(booking.pet.name)}&background=random`}
                      alt={booking.pet.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{booking.pet.name}</h3>
                      <p className="text-gray-600">{booking.service}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-gray-900">R$ {booking.totalPrice}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Caregiver Info */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={booking.caregiver.image}
                      alt={booking.caregiver.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{booking.caregiver.name}</div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {booking.caregiver.location}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-400" />
                        {booking.caregiver.rating} ({booking.caregiver.reviewCount} avaliações)
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">
                        Criada em {formatDate(booking.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Special Instructions */}
                {booking.specialInstructions && (
                  <div className="bg-gray-50 p-3 rounded-lg mb-4">
                    <h4 className="font-medium text-gray-900 mb-1">Instruções Especiais:</h4>
                    <p className="text-sm text-gray-700">{booking.specialInstructions}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Mensagem</span>
                    </button>
                    {booking.status === 'completed' && (
                      <button className="flex items-center space-x-2 text-secondary-600 hover:text-secondary-700 transition-colors">
                        <Star className="h-4 w-4" />
                        <span className="text-sm font-medium">Avaliar</span>
                      </button>
                    )}
                  </div>
                  
                  {booking.status === 'pending' && (
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Cancelar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {filter === 'all' ? 'Nenhuma reserva encontrada' : `Nenhuma reserva ${getStatusText(filter).toLowerCase()}`}
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all' 
                  ? 'Você ainda não fez nenhuma reserva. Que tal encontrar um cuidador para seu pet?'
                  : 'Não há reservas com este status no momento.'
                }
              </p>
              {filter === 'all' && (
                <button
                  onClick={onClose}
                  className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  Buscar Cuidadores
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;