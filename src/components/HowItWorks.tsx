import React from 'react';
import { Search, Users, Calendar, Heart } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Search,
      title: 'Busque e Filtre',
      description: 'Encontre cuidadores na sua região usando nossos filtros por localização, preço, serviços e avaliações.',
      color: 'bg-primary-100 text-primary-600'
    },
    {
      icon: Users,
      title: 'Conheça o Perfil',
      description: 'Veja fotos, leia avaliações e converse diretamente com o cuidador antes de fazer sua escolha.',
      color: 'bg-secondary-100 text-secondary-600'
    },
    {
      icon: Calendar,
      title: 'Reserve com Segurança',
      description: 'Confirme as datas, serviços desejados e faça o pagamento seguro através da nossa plataforma.',
      color: 'bg-accent-100 text-accent-600'
    },
    {
      icon: Heart,
      title: 'Relaxe e Confie',
      description: 'Seu pet ficará em boas mãos. Receba atualizações e avalie a experiência no final.',
      color: 'bg-red-100 text-red-600'
    }
  ];

  return (
    <section id="como-funciona" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Como Funciona
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Em apenas 4 passos simples, você encontra o cuidado perfeito para seu pet em Cuiabá
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center group">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gray-200 z-0">
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
                </div>
              )}
              
              {/* Step Content */}
              <div className="relative z-10 bg-white">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-8 h-8 bg-primary-600 text-white rounded-full font-bold text-sm mb-4">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 ${step.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="h-8 w-8" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold text-lg">
            Comece Agora
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;