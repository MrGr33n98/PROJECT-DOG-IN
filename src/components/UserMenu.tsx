import React, { useState } from 'react';
import { User, Settings, Heart, Calendar, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import UserProfile from './UserProfile';
import MyPets from './MyPets';
import MyBookings from './MyBookings';
import SettingsModal from './Settings';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<'profile' | 'pets' | 'bookings' | 'settings' | null>(null);
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const openModal = (modal: 'profile' | 'pets' | 'bookings' | 'settings') => {
    setActiveModal(modal);
    setIsOpen(false);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <img
            src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=2563eb&color=fff`}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="hidden sm:block font-medium text-gray-900">{user.name.split(' ')[0]}</span>
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 z-20">
              {/* User Info */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  <img
                    src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=2563eb&color=fff`}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.type === 'owner' 
                          ? 'bg-primary-100 text-primary-700' 
                          : 'bg-secondary-100 text-secondary-700'
                      }`}>
                        {user.type === 'owner' ? 'Dono de Pet' : 'Cuidador'}
                      </span>
                      {user.verified && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Verificado
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button 
                  onClick={() => openModal('profile')}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Meu Perfil</span>
                </button>
                
                {user.type === 'owner' && (
                  <button 
                    onClick={() => openModal('pets')}
                    className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    <span>Meus Pets</span>
                  </button>
                )}
                
                <button 
                  onClick={() => openModal('bookings')}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Calendar className="h-5 w-5" />
                  <span>Minhas Reservas</span>
                </button>
                
                <button 
                  onClick={() => openModal('settings')}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  <span>Configurações</span>
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 py-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      <UserProfile isOpen={activeModal === 'profile'} onClose={closeModal} />
      <MyPets isOpen={activeModal === 'pets'} onClose={closeModal} />
      <MyBookings isOpen={activeModal === 'bookings'} onClose={closeModal} />
      <SettingsModal isOpen={activeModal === 'settings'} onClose={closeModal} />
    </>
  );
};

export default UserMenu;