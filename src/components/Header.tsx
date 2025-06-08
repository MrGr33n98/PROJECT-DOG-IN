import React, { useState } from 'react';
import { Heart, Menu, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';
import UserMenu from './UserMenu';

const Header: React.FC = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const { user } = useAuth();

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dog's Inn</h1>
                <p className="text-xs text-gray-500">Cuiabá</p>
              </div>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex space-x-8">
              <a href="#buscar" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Buscar
              </a>
              <a href="#como-funciona" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Como Funciona
              </a>
              <a href="#seja-cuidador" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Seja um Cuidador
              </a>
              <a href="#ajuda" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Ajuda
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <UserMenu />
              ) : (
                <>
                  <button 
                    onClick={() => handleAuthClick('login')}
                    className="hidden sm:flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="font-medium">Entrar</span>
                  </button>
                  <button 
                    onClick={() => handleAuthClick('register')}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                  >
                    Cadastre-se
                  </button>
                </>
              )}
              <button className="md:hidden">
                <Menu className="h-6 w-6 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default Header;