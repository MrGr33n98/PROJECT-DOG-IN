import React from 'react';
import { DollarSign, Clock, Users, Shield } from 'lucide-react';

const BecomeCaregiverSection: React.FC = () => {
  const benefits = [
    {
      icon: DollarSign,
      title: 'Renda Extra',
      description: 'Ganhe entre R$ 800 a R$ 3.000 por mês cuidando de pets em seu tempo livre.',
      color: 'text-secondary-600'
    },
    {
      icon: Clock,
      title: 'Flexibilidade Total',
      description: 'Você define seus horários, preços e quais serviços deseja oferecer.',
      color: 'text-primary-600'
    },
    {
      icon: Users,
      title: 'Comunidade Ativa',
      description: 'Faça parte de uma rede de cuidadores apaixonados por animais.',
      color: 'text-accent-600'
    },
    {
      icon: Shield,
      title: 'Proteção e Suporte',
      description: 'Seguro de responsabilidade civil e suporte 24/7 para emergências.',
      color: 'text-red-600'
    }
  ];

  return (
    <section id="seja-cuidador" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Transforme seu amor por pets em 
                <span className="text-primary-600"> renda extra</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Junte-se à nossa comunidade de cuidadores e comece a ganhar dinheiro fazendo o que ama. 
                É simples, seguro e flexível.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg bg-gray-50 ${benefit.color}`}>
                    <benefit.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary-600 text-white px-8 py-4 rounded-lg hover:bg-primary-700 transition-colors font-semibold">
                Comece Hoje Mesmo
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                Saiba Mais
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/4587998/pexels-photo-4587998.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Pessoa feliz cuidando de múltiplos cães"
                className="w-full h-96 lg:h-[500px] object-cover"
              />
            </div>
            
            {/* Floating Earnings Card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary-600 mb-1">R$ 2.340</div>
                <div className="text-sm text-gray-600">Ganhos este mês</div>
                <div className="text-xs text-secondary-600 mt-1">+23% vs mês anterior</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeCaregiverSection;