import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, Mail, CreditCard, BarChart3, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Dominio Personalizado',
    description: 'Obtén tu propio dominio profesional como juan.pro o maria.dev para destacar en línea.',
    image: '/assets/custom-domain-feature.png'
  },
  {
    icon: Mail,
    title: 'Correo Profesional',
    description: 'Sistema de correo completo con tu dominio. Webmail moderno y gestión avanzada.',
    image: '/assets/custom-domain-feature_variant_1.png'
  },
  {
    icon: CreditCard,
    title: 'Tarjetas Digitales NFC',
    description: 'Crea tarjetas digitales interactivas con tecnología NFC para networking moderno.',
    image: '/assets/nfc-technology.png'
  },
  {
    icon: BarChart3,
    title: 'Analytics Avanzados',
    description: 'Conoce quién ve tu perfil, escanea tu QR y guarda tu información de contacto.',
    image: '/assets/analytics-dashboard.png'
  },
  {
    icon: Shield,
    title: 'Seguridad Total',
    description: 'Protección completa de datos con encriptación y cumplimiento GDPR.',
    image: '/assets/digital-card-mockup_variant_1.png'
  },
  {
    icon: Zap,
    title: 'Setup Instantáneo',
    description: 'Configura tu identidad digital completa en menos de 5 minutos.',
    image: '/assets/hero-banner-digital-identity_variant_1.jpg'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Todo lo que necesitas para tu{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              identidad digital
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Una plataforma completa que combina dominio personalizado, correo profesional 
            y tarjetas digitales en una solución integrada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md hover:-translate-y-1">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Showcase */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">
              Tecnología NFC de Última Generación
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nuestras tarjetas NFC utilizan la última tecnología para compartir 
              tu información de contacto instantáneamente. Solo acerca tu tarjeta 
              a cualquier smartphone y tu perfil se abrirá automáticamente.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Compatible con todos los smartphones</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No requiere apps adicionales</span>
              </li>
              <li className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Actualización en tiempo real</span>
              </li>
            </ul>
          </div>
          <div className="relative">
            <img
              src="/assets/nfc-technology_variant_1.png"
              alt="Tecnología NFC"
              className="w-full max-w-md mx-auto drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}