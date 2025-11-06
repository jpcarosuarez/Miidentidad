import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { mockDomains } from '@/lib/mockData';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Search, 
  Globe, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  ExternalLink,
  Settings,
  CreditCard,
  Shield
} from 'lucide-react';

interface DomainResult {
  domain: string;
  available: boolean;
  price: number;
  description: string;
}

const domainExtensions = [
  { ext: '.pro', price: 15, description: 'Perfecto para profesionales' },
  { ext: '.me', price: 12, description: 'Ideal para marca personal' },
  { ext: '.dev', price: 18, description: 'Para desarrolladores' },
  { ext: '.com', price: 10, description: 'El más popular' },
  { ext: '.io', price: 25, description: 'Tech y startups' },
  { ext: '.tech', price: 20, description: 'Tecnología' }
];

export default function Domains() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<DomainResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [domains] = useState(mockDomains);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setIsSearching(true);
    
    // Simular búsqueda de dominios
    setTimeout(() => {
      const results = domainExtensions.map(ext => ({
        domain: searchTerm.toLowerCase() + ext.ext,
        available: Math.random() > 0.3, // 70% disponibles
        price: ext.price,
        description: ext.description
      }));
      
      setSearchResults(results);
      setIsSearching(false);
    }, 1500);
  };

  const handleRegisterDomain = (domain: string, price: number) => {
    toast.success(`Dominio ${domain} agregado al carrito - $${price}/año`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Gestión de Dominios</h1>
                <p className="text-gray-600">Busca y registra tu dominio perfecto</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Búsqueda de dominios */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Buscar Dominio</span>
                </CardTitle>
                <CardDescription>
                  Encuentra el dominio perfecto para tu identidad digital
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Escribe tu nombre o marca (ej: juanperez)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="text-lg"
                    />
                  </div>
                  <Button onClick={handleSearch} disabled={isSearching} size="lg">
                    {isSearching ? 'Buscando...' : 'Buscar'}
                  </Button>
                </div>

                {/* Sugerencias */}
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Sugerencias populares:</p>
                  <div className="flex flex-wrap gap-2">
                    {['juan.pro', 'maria.me', 'carlos.dev', 'ana.tech'].map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => setSearchTerm(suggestion.split('.')[0])}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resultados de búsqueda */}
            {searchResults.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Resultados para "{searchTerm}"</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {searchResults.map((result, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${
                            result.available ? 'bg-green-500' : 'bg-red-500'
                          }`}></div>
                          <div>
                            <p className="font-medium">{result.domain}</p>
                            <p className="text-sm text-gray-500">{result.description}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-bold">${result.price}/año</p>
                            <p className="text-sm text-gray-500">
                              {result.available ? 'Disponible' : 'No disponible'}
                            </p>
                          </div>
                          
                          {result.available ? (
                            <Button onClick={() => handleRegisterDomain(result.domain, result.price)}>
                              Registrar
                            </Button>
                          ) : (
                            <Button variant="outline" disabled>
                              No disponible
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Mis dominios */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Mis Dominios</span>
                </CardTitle>
                <CardDescription>
                  Dominios registrados en tu cuenta
                </CardDescription>
              </CardHeader>
              <CardContent>
                {domains.length > 0 ? (
                  <div className="space-y-4">
                    {domains.map((domain, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Globe className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{domain.name}</p>
                            <p className="text-sm text-gray-500">Expira: {domain.expires}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Badge variant={domain.status === 'active' ? 'default' : 'secondary'}>
                            {domain.status === 'active' ? (
                              <>
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Activo
                              </>
                            ) : (
                              <>
                                <Clock className="mr-1 h-3 w-3" />
                                Pendiente
                              </>
                            )}
                          </Badge>
                          
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                          
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">No tienes dominios registrados</p>
                    <p className="text-sm text-gray-500">Busca y registra tu primer dominio arriba</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Información de precios */}
            <Card>
              <CardHeader>
                <CardTitle>Extensiones Populares</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {domainExtensions.slice(0, 4).map((ext, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{ext.ext}</p>
                        <p className="text-sm text-gray-500">{ext.description}</p>
                      </div>
                      <p className="font-bold">${ext.price}/año</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Beneficios */}
            <Card>
              <CardHeader>
                <CardTitle>¿Por qué un dominio personalizado?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Credibilidad profesional</p>
                      <p className="text-sm text-gray-600">Transmite confianza y profesionalismo</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CreditCard className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Marca personal</p>
                      <p className="text-sm text-gray-600">Construye tu identidad digital única</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Globe className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <p className="font-medium">Fácil de recordar</p>
                      <p className="text-sm text-gray-600">URL simple y memorable</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Soporte */}
            <Card>
              <CardHeader>
                <CardTitle>¿Necesitas ayuda?</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Nuestro equipo de soporte está disponible 24/7 para ayudarte con la configuración de tu dominio.
                  </AlertDescription>
                </Alert>
                
                <Button variant="outline" className="w-full mt-4">
                  Contactar Soporte
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}