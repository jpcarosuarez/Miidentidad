import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Star, Zap, Shield, Users } from 'lucide-react';
import { pricingPlans } from '@/lib/mockData';

const features = [
  {
    category: 'Dominio y Email',
    items: [
      { name: 'Dominio personalizado', basic: '1', pro: '3', enterprise: 'Ilimitados' },
      { name: 'Cuentas de correo', basic: '1', pro: '5', enterprise: '20+' },
      { name: 'Almacenamiento email', basic: '5GB', pro: '25GB', enterprise: '100GB' },
      { name: 'Webmail avanzado', basic: true, pro: true, enterprise: true },
    ]
  },
  {
    category: 'Tarjetas Digitales',
    items: [
      { name: 'Tarjetas digitales', basic: '1', pro: '5', enterprise: 'Ilimitadas' },
      { name: 'Plantillas premium', basic: false, pro: true, enterprise: true },
      { name: 'Tarjetas NFC físicas', basic: false, pro: '2 incluidas', enterprise: '10 incluidas' },
      { name: 'Códigos QR dinámicos', basic: true, pro: true, enterprise: true },
    ]
  },
  {
    category: 'Analytics y Reportes',
    items: [
      { name: 'Analytics básicos', basic: true, pro: true, enterprise: true },
      { name: 'Reportes avanzados', basic: false, pro: true, enterprise: true },
      { name: 'Exportación de datos', basic: false, pro: true, enterprise: true },
      { name: 'API de analytics', basic: false, pro: false, enterprise: true },
    ]
  },
  {
    category: 'Soporte y Extras',
    items: [
      { name: 'Soporte por email', basic: true, pro: true, enterprise: true },
      { name: 'Soporte prioritario', basic: false, pro: true, enterprise: true },
      { name: 'Soporte 24/7', basic: false, pro: false, enterprise: true },
      { name: 'Gestor de cuenta dedicado', basic: false, pro: false, enterprise: true },
    ]
  }
];

const faqs = [
  {
    question: '¿Puedo cambiar de plan en cualquier momento?',
    answer: 'Sí, puedes actualizar o degradar tu plan en cualquier momento. Los cambios se reflejarán en tu próxima facturación.'
  },
  {
    question: '¿Qué incluye el dominio personalizado?',
    answer: 'Incluye el registro del dominio, configuración DNS automática, certificado SSL gratuito y renovación automática.'
  },
  {
    question: '¿Las tarjetas NFC funcionan con todos los teléfonos?',
    answer: 'Sí, nuestras tarjetas NFC son compatibles con todos los smartphones modernos que tengan NFC habilitado.'
  },
  {
    question: '¿Hay descuentos por pago anual?',
    answer: 'Sí, ofrecemos 2 meses gratis al pagar anualmente. Esto representa un 16% de descuento.'
  }
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Planes que crecen{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              contigo
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Desde profesionales independientes hasta grandes empresas. 
            Encuentra el plan perfecto para tu identidad digital.
          </p>
          
          <Tabs defaultValue="monthly" className="max-w-xs mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Mensual</TabsTrigger>
              <TabsTrigger value="yearly">
                Anual
                <Badge variant="secondary" className="ml-2">-16%</Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : 'border-gray-200'} hover:shadow-lg transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1">
                      <Star className="mr-1 h-3 w-3" />
                      Más Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-8">
                  <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl w-fit">
                    {index === 0 && <Zap className="h-8 w-8 text-blue-600" />}
                    {index === 1 && <Star className="h-8 w-8 text-purple-600" />}
                    {index === 2 && <Users className="h-8 w-8 text-indigo-600" />}
                  </div>
                  
                  <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <CardDescription className="text-base mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </CardContent>

                <CardFooter>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                    asChild
                  >
                    <Link to="/register">
                      Comenzar con {plan.name}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comparación Detallada</h2>
            <p className="text-xl text-gray-600">
              Todas las características de cada plan en detalle
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-6 font-semibold">Características</th>
                    <th className="text-center p-6 font-semibold">Básico</th>
                    <th className="text-center p-6 font-semibold bg-blue-50">
                      Profesional
                      <Badge className="ml-2 bg-blue-600">Popular</Badge>
                    </th>
                    <th className="text-center p-6 font-semibold">Empresa</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((category, categoryIndex) => (
                    <React.Fragment key={categoryIndex}>
                      <tr className="bg-gray-50">
                        <td colSpan={4} className="p-4 font-semibold text-gray-700">
                          {category.category}
                        </td>
                      </tr>
                      {category.items.map((item, itemIndex) => (
                        <tr key={itemIndex} className="border-b hover:bg-gray-50">
                          <td className="p-4">{item.name}</td>
                          <td className="p-4 text-center">
                            {typeof item.basic === 'boolean' ? (
                              item.basic ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : '—'
                            ) : (
                              item.basic
                            )}
                          </td>
                          <td className="p-4 text-center bg-blue-50">
                            {typeof item.pro === 'boolean' ? (
                              item.pro ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : '—'
                            ) : (
                              item.pro
                            )}
                          </td>
                          <td className="p-4 text-center">
                            {typeof item.enterprise === 'boolean' ? (
                              item.enterprise ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : '—'
                            ) : (
                              item.enterprise
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
            <p className="text-xl text-gray-600">
              Resolvemos las dudas más comunes sobre nuestros planes
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿Listo para crear tu identidad digital?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de profesionales que ya han transformado su presencia digital
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/register">
                Comenzar Gratis
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
              Hablar con Ventas
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}