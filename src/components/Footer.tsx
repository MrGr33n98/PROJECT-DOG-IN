import React from 'react';
import { Heart, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Dog's Inn</h3>
                <p className="text-sm text-gray-400">Cuiabá</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Conectando pets e cuidadores com amor e segurança em Cuiabá. 
              Cuidado de qualidade para seu melhor amigo.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Para Donos */}
          <div>
            <h4 className="font-semibold mb-4">Para Donos de Pets</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Buscar Cuidadores</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Como Funciona</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Preços</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Avaliações</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Segurança</a></li>
            </ul>
          </div>

          {/* Para Cuidadores */}
          <div>
            <h4 className="font-semibold mb-4">Para Cuidadores</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Seja um Cuidador</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Centro de Recursos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Comunidade</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Calculadora de Ganhos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Suporte</a></li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>contato@dogsinn.com.br</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>(65) 3333-3333</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>Cuiabá, Mato Grosso</span>
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-medium mb-2">Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <button className="bg-primary-600 px-4 py-2 rounded-r-lg hover:bg-primary-700 transition-colors text-sm font-medium">
                  Inscrever
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Dog's Inn Cuiabá. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;