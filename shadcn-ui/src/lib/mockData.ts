export const mockDomains = [
  { name: 'juan.pro', status: 'active', expires: '2025-11-05' },
  { name: 'juanperez.me', status: 'pending', expires: '2025-12-15' },
];

export const mockCards = [
  {
    id: '1',
    name: 'Tarjeta Profesional',
    template: 'modern',
    fields: {
      name: 'Juan Pérez',
      title: 'Desarrollador Full Stack',
      company: 'Tech Solutions',
      email: 'juan@juan.pro',
      phone: '+34 600 123 456',
      website: 'https://juan.pro',
      linkedin: 'https://linkedin.com/in/juanperez',
      twitter: '@juanperez'
    },
    qrCode: 'https://juan.pro/card/1',
    isActive: true
  }
];

export const mockAnalytics = {
  totalViews: 1247,
  weeklyViews: 89,
  qrScans: 156,
  nfcTaps: 67,
  contactsSaved: 34,
  topLocations: ['Madrid', 'Barcelona', 'Valencia']
};

export const pricingPlans = [
  {
    name: 'Básico',
    price: 9,
    period: 'mes',
    description: 'Perfecto para empezar tu identidad digital',
    features: [
      '1 dominio personalizado',
      '1 cuenta de correo',
      'Tarjeta digital básica',
      'Perfil público',
      'Soporte por email'
    ],
    popular: false
  },
  {
    name: 'Profesional',
    price: 19,
    period: 'mes',
    description: 'Para profesionales que quieren destacar',
    features: [
      '3 dominios personalizados',
      '5 cuentas de correo',
      'Tarjetas NFC incluidas',
      'Analytics avanzados',
      'Editor avanzado',
      'Soporte prioritario'
    ],
    popular: true
  },
  {
    name: 'Empresa',
    price: 49,
    period: 'mes',
    description: 'Solución completa para equipos',
    features: [
      'Dominios ilimitados',
      '20+ cuentas de correo',
      'Gestión de equipo',
      'White-label disponible',
      'API de integración',
      'Soporte 24/7'
    ],
    popular: false
  }
];