import React, { useState, useEffect } from 'react';
import { X, Star, MapPin, Shield, Clock, Phone, MessageCircle, Calendar } from 'lucide-react';
import { Caregiver } from '../types';
import { reviews } from '../data/reviews';

interface CaregiverModalProps {
  caregiver: Caregiver | null;
  isOpen: boolean;
  onClose: () => void;
}

const CaregiverModal: React.FC<CaregiverModalProps> = ({ caregiver, isOpen, onClose }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [service, setService] = useState('');

  useEffect(() => {
    if (caregiver) {
      setService(caregiver.services[0]);
    }
  }, [caregiver]);

  if (!isOpen || !caregiver) return null;

  const handleCheckout = async () => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        caregiverId: caregiver.id,
        startDate: checkIn,
        endDate: checkOut,
        service,
        totalPrice: caregiver.pricePerNight,
      }),
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Perfil do Cuidador</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Header */}
              <div className="flex items-start space-x-4">
                <img
                  src={caregiver.image}
                  alt={caregiver.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{caregiver.name}</h3>
                    {caregiver.verified && (
                      <Shield className="h-6 w-6 text-secondary-500" />
                    )}
                  </div>
                  <p className="text-gray-600 flex items-center mb-2">
                    <MapPin className="h-5 w-5 mr-2" />
                    {caregiver.location}
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{caregiver.rating}</span>
                      <span className="text-gray-600">({caregiver.reviewCount} avaliações)</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      caregiver.availability === 'Disponível' 
                        ? 'bg-secondary-100 text-secondary-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      <Clock className="h-4 w-4 inline mr-1" />
                      {caregiver.availability}
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Sobre mim</h4>
                <p className="text-gray-700 leading-relaxed">{caregiver.description}</p>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Serviços oferecidos</h4>
                <div className="flex flex-wrap gap-3">
                  {caregiver.services.map((service, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Especialidades</h4>
                <div className="flex flex-wrap gap-3">
                  {caregiver.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-secondary-50 text-secondary-700 rounded-lg font-medium"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Reviews */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Avaliações recentes</h4>
                <div className="space-y-4">
                  {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <img
                          src={review.authorImage}
                          alt={review.authorName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-900">{review.authorName}</span>
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm mb-1">{review.comment}</p>
                          <p className="text-gray-500 text-xs">Pet: {review.petName} • {review.date}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-xl sticky top-0">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    R$ {caregiver.pricePerNight}
                  </div>
                  <div className="text-gray-600">por noite</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Serviço
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      {caregiver.services.map((s, index) => (
                        <option key={index} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center space-x-2"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Reservar Agora</span>
                  </button>
                  
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2">
                    <MessageCircle className="h-5 w-5" />
                    <span>Enviar Mensagem</span>
                  </button>
                  
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center space-x-2">
                    <Phone className="h-5 w-5" />
                    <span>Ligar</span>
                  </button>
                </div>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    Você só será cobrado se a reserva for confirmada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverModal;
