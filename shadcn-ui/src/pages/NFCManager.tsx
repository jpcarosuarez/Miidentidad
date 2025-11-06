import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Smartphone, 
  Wifi, 
  WifiOff,
  QrCode,
  Globe,
  Settings,
  Plus,
  Edit,
  Trash2,
  Activity,
  MapPin,
  Clock,
  Users,
  TrendingUp,
  Zap,
  Shield,
  Link as LinkIcon
} from 'lucide-react';

interface NFCCard {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'suspended';
  chipId: string;
  landingPageUrl: string;
  activatedAt: Date;
  lastTap: Date | null;
  totalTaps: number;
  location?: string;
}

interface TapAnalytics {
  date: Date;
  taps: number;
  location?: string;
  device?: string;
}

const mockNFCCards: NFCCard[] = [
  {
    id: '1',
    name: 'Tarjeta Principal',
    status: 'active',
    chipId: 'NFC001234567',
    landingPageUrl: 'https://miidentidad.com/profile/juanperez',
    activatedAt: new Date('2024-10-15'),
    lastTap: new Date('2024-11-05T14:30:00'),
    totalTaps: 127,
    location: 'Madrid, España'
  },
  {
    id: '2',
    name: 'Tarjeta Eventos',
    status: 'active',
    chipId: 'NFC007654321',
    landingPageUrl: 'https://miidentidad.com/profile/juanperez/events',
    activatedAt: new Date('2024-11-01'),
    lastTap: new Date('2024-11-04T16:45:00'),
    totalTaps: 23,
    location: 'Barcelona, España'
  },
  {
    id: '3',
    name: 'Tarjeta Backup',
    status: 'inactive',
    chipId: 'NFC009876543',
    landingPageUrl: 'https://miidentidad.com/profile/juanperez/backup',
    activatedAt: new Date('2024-09-20'),
    lastTap: null,
    totalTaps: 0
  }
];

const mockAnalytics: TapAnalytics[] = [
  { date: new Date('2024-11-01'), taps: 8, location: 'Madrid', device: 'iPhone' },
  { date: new Date('2024-11-02'), taps: 12, location: 'Madrid', device: 'Samsung' },
  { date: new Date('2024-11-03'), taps: 15, location: 'Barcelona', device: 'iPhone' },
  { date: new Date('2024-11-04'), taps: 9, location: 'Barcelona', device: 'Huawei' },
  { date: new Date('2024-11-05'), taps: 18, location: 'Madrid', device: 'iPhone' }
];

export default function NFCManager() {
  const { user, isAuthenticated } = useAuth();
  const [nfcCards, setNfcCards] = useState<NFCCard[]>(mockNFCCards);
  const [analytics] = useState<TapAnalytics[]>(mockAnalytics);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleToggleStatus = (cardId: string) => {
    setNfcCards(prev => 
      prev.map(card => 
        card.id === cardId 
          ? { ...card, status: card.status === 'active' ? 'inactive' : 'active' }
          : card
      )
    );
    toast.success('Estado de tarjeta NFC actualizado');
  };

  const handleDeleteCard = (cardId: string) => {
    setNfcCards(prev => prev.filter(card => card.id !== cardId));
    toast.success('Tarjeta NFC eliminada');
  };

  const handleAddCard = () => {
    const newCard: NFCCard = {
      id: Date.now().toString(),
      name: 'Nueva Tarjeta NFC',
      status: 'inactive',
      chipId: `NFC${Math.random().toString().substr(2, 9)}`,
      landingPageUrl: `https://miidentidad.com/profile/${user?.username}`,
      activatedAt: new Date(),
      lastTap: null,
      totalTaps: 0
    };
    setNfcCards(prev => [...prev, newCard]);
    toast.success('Nueva tarjeta NFC agregada');
  };

  const totalTaps = nfcCards.reduce((sum, card) => sum + card.totalTaps, 0);
  const activeTaps = nfcCards.filter(card => card.status === 'active').length;

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
                <h1 className="text-3xl font-bold">Gestión de Tarjetas NFC</h1>
                <p className="text-gray-600">Administra tus tarjetas NFC y analiza su rendimiento</p>
              </div>
            </div>
            
            <Button onClick={handleAddCard}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Tarjeta NFC
            </Button>
          </div>
        </div>

        <Tabs defaultValue="cards" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cards">Mis Tarjetas</TabsTrigger>
            <TabsTrigger value="analytics">Analíticas</TabsTrigger>
            <TabsTrigger value="landing">Landing Pages</TabsTrigger>
            <TabsTrigger value="api">API</TabsTrigger>
          </TabsList>

          {/* Cards Tab */}
          <TabsContent value="cards" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-8 w-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold">{nfcCards.length}</p>
                      <p className="text-sm text-gray-600">Tarjetas totales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Wifi className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold">{activeTaps}</p>
                      <p className="text-sm text-gray-600">Tarjetas activas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-8 w-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold">{totalTaps}</p>
                      <p className="text-sm text-gray-600">Taps totales</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="h-8 w-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold">+23%</p>
                      <p className="text-sm text-gray-600">Crecimiento mensual</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* NFC Cards List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {nfcCards.map((card) => (
                <Card key={card.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Smartphone className="h-5 w-5" />
                          <span>{card.name}</span>
                        </CardTitle>
                        <CardDescription>ID: {card.chipId}</CardDescription>
                      </div>
                      <Badge variant={card.status === 'active' ? 'default' : 'secondary'}>
                        {card.status === 'active' ? (
                          <>
                            <Wifi className="mr-1 h-3 w-3" />
                            Activa
                          </>
                        ) : (
                          <>
                            <WifiOff className="mr-1 h-3 w-3" />
                            Inactiva
                          </>
                        )}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Landing Page:</span>
                        <span className="font-medium truncate max-w-48">{card.landingPageUrl}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Total de taps:</span>
                        <span className="font-bold text-blue-600">{card.totalTaps}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Último tap:</span>
                        <span>{card.lastTap ? card.lastTap.toLocaleDateString() : 'Nunca'}</span>
                      </div>
                      
                      {card.location && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Ubicación:</span>
                          <span className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {card.location}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={card.status === 'active'}
                          onCheckedChange={() => handleToggleStatus(card.id)}
                        />
                        <span className="text-sm">
                          {card.status === 'active' ? 'Activada' : 'Desactivada'}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteCard(card.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Taps por día</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analytics.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-4 w-4 text-gray-400" />
                          <div>
                            <p className="font-medium">{item.date.toLocaleDateString()}</p>
                            <p className="text-sm text-gray-600">{item.location}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-blue-600">{item.taps} taps</p>
                          <p className="text-sm text-gray-500">{item.device}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Ubicaciones más frecuentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-red-500" />
                        <span>Madrid, España</span>
                      </div>
                      <Badge>41 taps</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span>Barcelona, España</span>
                      </div>
                      <Badge variant="secondary">24 taps</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-green-500" />
                        <span>Valencia, España</span>
                      </div>
                      <Badge variant="secondary">8 taps</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Landing Pages Tab */}
          <TabsContent value="landing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Landing Pages Personalizadas</CardTitle>
                <CardDescription>Configura páginas de destino específicas para cada tarjeta NFC</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {nfcCards.map((card) => (
                  <div key={card.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{card.name}</h4>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">URL de destino</label>
                        <Input value={card.landingPageUrl} readOnly />
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Globe className="mr-1 h-3 w-3" />
                          Público
                        </span>
                        <span className="flex items-center">
                          <Users className="mr-1 h-3 w-3" />
                          {card.totalTaps} visitas
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Tab */}
          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API de Gestión NFC</CardTitle>
                <CardDescription>Integra la gestión de tarjetas NFC en tus aplicaciones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Tu clave API está protegida y solo es visible para ti. No la compartas públicamente.
                  </AlertDescription>
                </Alert>

                <div>
                  <label className="block text-sm font-medium mb-2">Clave API</label>
                  <div className="flex space-x-2">
                    <Input value="mi_api_key_secret_123456789" type="password" readOnly />
                    <Button variant="outline">Copiar</Button>
                    <Button variant="outline">Regenerar</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Endpoints disponibles:</h4>
                  
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">GET</Badge>
                        <code className="text-sm">/api/nfc/cards</code>
                      </div>
                      <p className="text-sm text-gray-600">Obtener lista de tarjetas NFC</p>
                    </div>

                    <div className="p-3 border rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">POST</Badge>
                        <code className="text-sm">/api/nfc/cards/{'{id}'}/toggle</code>
                      </div>
                      <p className="text-sm text-gray-600">Activar/desactivar tarjeta NFC</p>
                    </div>

                    <div className="p-3 border rounded-lg bg-gray-50">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline">GET</Badge>
                        <code className="text-sm">/api/nfc/analytics</code>
                      </div>
                      <p className="text-sm text-gray-600">Obtener estadísticas de uso</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Ejemplo de uso:</h4>
                  <div className="p-4 bg-gray-900 text-green-400 rounded-lg text-sm font-mono">
                    <div>curl -H "Authorization: Bearer YOUR_API_KEY" \</div>
                    <div className="ml-4">https://api.miidentidad.com/nfc/cards</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}