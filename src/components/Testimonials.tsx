import React from 'react';
import { Star, Quote } from 'lucide-react';
import { reviews } from '../data/reviews';

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais de 15.000 pets já foram cuidados com amor através da nossa plataforma
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="bg-primary-600 p-2 rounded-full">
                  <Quote className="h-5 w-5 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1 mb-4 pt-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{review.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center space-x-4">
                <img
                  src={review.authorImage}
                  alt={review.authorName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{review.authorName}</div>
                  <div className="text-sm text-gray-600">Dona do {review.petName}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/50">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-gray-600">Cuidadores Verificados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-secondary-600 mb-2">15k+</div>
            <div className="text-gray-600">Pets Cuidados</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-600 mb-2">98%</div>
            <div className="text-gray-600">Satisfação</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">4.8★</div>
            <div className="text-gray-600">Avaliação Média</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;