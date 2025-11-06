import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { mockDomains, mockCards } from '@/lib/mockData';
import { 
  User, 
  CreditCard, 
  Globe, 
  BarChart3, 
  QrCode, 
  Smartphone,
  Mail,
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  Eye,
  Download,
  Share2,
  Settings,
  Plus,
  Zap,
  Wifi,
  Activity,
  Clock
} from 'lucide-react';

interface DashboardStats {
  profileViews: number;
  qrScans: number;
  nfcTaps: number;
  contactsSaved: number;
  monthlyGrowth: number;
}

interface RecentActivity {
  id: string;
  type: 'view' | 'scan' | 'tap' | 'contact';
  description: string;
  timestamp: Date;
  location?: string;
  device?: string;
}

const mockStats: DashboardStats = {
  profileViews: 1247,
  qrScans: 89,
  nfcTaps: 156,
  contactsSaved: 67,
  monthlyGrowth: 23.5
};

const mockActivities: RecentActivity[] = [
  {
    id: '1',
    type: 'tap',
    description: 'Tap NFC desde iPhone',
    timestamp: new Date('2024-11-05T14:30:00'),
    location: 'Madrid, España',
    device: 'iPhone 15 Pro'
  },
  {
    id: '2',
    type: 'scan',
    description: 'Código QR escaneado',
    timestamp: new Date('2024-11-05T12:15:00'),
    location: 'Barcelona, España',
    device: 'Samsung Galaxy S24'
  },
  {
    id: '3',
    type: 'view',
    description: 'Perfil visualizado',
    timestamp: new Date('2024-11-05T10:45:00'),
    location: 'Valencia, España'
  },
  {
    id: '4',
    type: 'contact',
    description: 'Contacto guardado',
    timestamp: new Date('2024-11-04T16:20:00'),
    location: 'Sevilla, España'
  },
  {
    id: '5',
    type: 'tap',
    description: 'Tap NFC desde Android',
    timestamp: new Date('2024-11-04T14:10:00'),
    location: 'Bilbao, España',
    device: 'Huawei P50'
  }
];

export default function Dashboard() {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const [stats] = useState<DashboardStats>(mockStats);
  const [activities] = useState<RecentActivity[]>(mockActivities);
  const [domains] = useState(mockDomains);
  const [cards] = useState(mockCards);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'tap': return <Smartphone className="h-4 w-4 text-blue-600" />;
      case 'scan': return <QrCode className="h-4 w-4 text-green-600" />;
      case 'view': return <Eye className="h-4 w-4 text-purple-600" />;
      case 'contact': return <Users className="h-4 w-4 text-orange-600" />;
      default: return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'tap': return 'bg-blue-100 border-blue-200';
      case 'scan': return 'bg-green-100 border-green-200';
      case 'view': return 'bg-purple-100 border-purple-200';
      case 'contact': return 'bg-orange-100 border-orange-200';
      default: return 'bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                ¡Hola, {user?.name}! 👋
              </h1>
              <p className="text-gray-600">
                Aquí tienes un resumen de tu identidad digital
              </p>
            </div>
            
            {isAdmin && (
              <Badge variant="default" className="bg-red-600">
                <Settings className="mr-1 h-3 w-3" />
                Administrador
              </Badge>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.profileViews.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Vistas de perfil</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <QrCode className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.qrScans}</p>
                  <p className="text-sm text-gray-600">Escaneos QR</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Smartphone className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.nfcTaps}</p>
                  <p className="text-sm text-gray-600">Taps NFC</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.contactsSaved}</p>
                  <p className="text-sm text-gray-600">Contactos guardados</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones rápidas</CardTitle>
                <CardDescription>Gestiona tu identidad digital</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button asChild className="h-20 flex-col">
                    <Link to="/editor">
                      <CreditCard className="h-6 w-6 mb-2" />
                      Editor de Tarjetas
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link to="/webmail">
                      <Mail className="h-6 w-6 mb-2" />
                      Webmail
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link to="/domains">
                      <Globe className="h-6 w-6 mb-2" />
                      Dominios
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" className="h-20 flex-col">
                    <Link to="/nfc">
                      <Smartphone className="h-6 w-6 mb-2" />
                      Gestión NFC
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Rendimiento mensual</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Crecimiento este mes</p>
                    <p className="text-2xl font-bold text-green-600">+{stats.monthlyGrowth}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Vistas de perfil</span>
                      <span>{stats.profileViews}</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Interacciones NFC</span>
                      <span>{stats.nfcTaps}</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Contactos guardados</span>
                      <span>{stats.contactsSaved}</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Actividad reciente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className={`p-4 rounded-lg border ${getActivityColor(activity.type)}`}>
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{activity.description}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-600">
                            <span className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {activity.timestamp.toLocaleString()}
                            </span>
                            {activity.location && (
                              <span className="flex items-center">
                                <MapPin className="mr-1 h-3 w-3" />
                                {activity.location}
                              </span>
                            )}
                            {activity.device && (
                              <span className="flex items-center">
                                <Smartphone className="mr-1 h-3 w-3" />
                                {activity.device}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Mi perfil</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{user?.name}</h3>
                    <p className="text-sm text-gray-600">{user?.title || 'Profesional'}</p>
                    <Badge variant="outline">{user?.plan}</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button asChild className="w-full" size="sm">
                    <Link to={`/profile/${user?.username}`}>
                      <User className="mr-2 h-4 w-4" />
                      Ver perfil público
                    </Link>
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Compartir
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen rápido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Dominios activos</span>
                  <Badge>{domains.length}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tarjetas creadas</span>
                  <Badge>{cards.length}</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Plan actual</span>
                  <Badge variant="outline">{user?.plan}</Badge>
                </div>
                
                {user?.emailAccounts && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cuentas de email</span>
                    <Badge>{user.emailAccounts.length}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upgrade Prompt */}
            {user?.plan === 'basic' && (
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">¡Mejora tu plan!</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Desbloquea funciones avanzadas y obtén más dominios
                  </p>
                  <Button asChild size="sm" className="w-full">
                    <Link to="/pricing">
                      Ver planes
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}