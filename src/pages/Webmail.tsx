import { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { mockEmails, mockContacts, mockCalendarEvents } from '@/lib/demoAccounts';
import { 
  ArrowLeft, 
  Search, 
  Mail, 
  Star, 
  Archive, 
  Trash2, 
  Send,
  Paperclip,
  Calendar,
  Users,
  Settings,
  Filter,
  RefreshCw,
  Plus,
  Phone,
  MapPin,
  Clock
} from 'lucide-react';

export default function Webmail() {
  const { user, isAuthenticated } = useAuth();
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [emails] = useState(mockEmails);
  const [contacts] = useState(mockContacts);
  const [events] = useState(mockCalendarEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('inbox');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const folders = [
    { id: 'inbox', name: 'Bandeja de entrada', count: 3, icon: Mail },
    { id: 'starred', name: 'Destacados', count: 1, icon: Star },
    { id: 'sent', name: 'Enviados', count: 8, icon: Send },
    { id: 'drafts', name: 'Borradores', count: 2, icon: Archive },
    { id: 'trash', name: 'Papelera', count: 0, icon: Trash2 }
  ];

  const filteredEmails = emails.filter(email => 
    email.folder === selectedFolder &&
    (email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
     email.from.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedEmailData = emails.find(email => email.id === selectedEmail);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver al Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Webmail</h1>
                <p className="text-gray-600">Sistema de correo profesional</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Actualizar
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Redactar
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="mail" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mail">Correo</TabsTrigger>
            <TabsTrigger value="contacts">Contactos</TabsTrigger>
            <TabsTrigger value="calendar">Calendario</TabsTrigger>
            <TabsTrigger value="settings">Configuración</TabsTrigger>
          </TabsList>

          {/* Mail Tab */}
          <TabsContent value="mail" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Carpetas</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {folders.map((folder) => (
                      <Button
                        key={folder.id}
                        variant={selectedFolder === folder.id ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setSelectedFolder(folder.id)}
                      >
                        <folder.icon className="mr-2 h-4 w-4" />
                        <span className="flex-1 text-left">{folder.name}</span>
                        {folder.count > 0 && (
                          <Badge variant="secondary" className="ml-2">
                            {folder.count}
                          </Badge>
                        )}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-lg">Acciones</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtros
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Reglas
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Email List */}
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar correos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border-0 focus-visible:ring-0"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="space-y-1">
                      {filteredEmails.map((email) => (
                        <div
                          key={email.id}
                          className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                            selectedEmail === email.id ? 'bg-blue-50 border-blue-200' : ''
                          }`}
                          onClick={() => setSelectedEmail(email.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <p className={`text-sm font-medium truncate ${
                                  !email.read ? 'font-bold' : ''
                                }`}>
                                  {email.from}
                                </p>
                                {email.starred && (
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                )}
                              </div>
                              <p className={`text-sm truncate ${
                                !email.read ? 'font-semibold' : 'text-gray-600'
                              }`}>
                                {email.subject}
                              </p>
                              <p className="text-xs text-gray-500 truncate mt-1">
                                {email.body.substring(0, 50)}...
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {email.date.toLocaleDateString()}
                              </p>
                            </div>
                            {!email.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Email Content */}
              <div className="lg:col-span-2">
                {selectedEmailData ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{selectedEmailData.subject}</CardTitle>
                          <CardDescription className="mt-2">
                            De: {selectedEmailData.from} • Para: {selectedEmailData.to}
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Archive className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Separator />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="text-sm text-gray-500">
                          {selectedEmailData.date.toLocaleString()}
                        </div>
                        <div className="prose max-w-none">
                          <p>{selectedEmailData.body}</p>
                        </div>
                        
                        {/* Reply Section */}
                        <Separator />
                        <div className="space-y-4">
                          <h4 className="font-medium">Responder</h4>
                          <Textarea 
                            placeholder="Escribe tu respuesta..." 
                            rows={4}
                          />
                          <div className="flex items-center justify-between">
                            <Button variant="outline" size="sm">
                              <Paperclip className="mr-2 h-4 w-4" />
                              Adjuntar
                            </Button>
                            <div className="space-x-2">
                              <Button variant="outline">Guardar borrador</Button>
                              <Button>
                                <Send className="mr-2 h-4 w-4" />
                                Enviar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="flex items-center justify-center h-96">
                      <div className="text-center">
                        <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Selecciona un correo para leerlo</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <Card key={contact.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={contact.avatar} alt={contact.name} />
                        <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-sm text-gray-600">{contact.title}</p>
                        <p className="text-sm text-gray-500">{contact.company}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{contact.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{contact.phone}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button size="sm" className="flex-1">
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="mr-2 h-4 w-4" />
                        Llamar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Calendario - Noviembre 2024</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-7 gap-2 mb-4">
                      {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
                        <div key={day} className="p-2 text-center font-medium text-gray-600">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                        <div
                          key={day}
                          className={`p-2 text-center cursor-pointer rounded hover:bg-gray-100 ${
                            day === 5 ? 'bg-blue-100 text-blue-700' : ''
                          }`}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Próximos eventos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="p-3 border rounded-lg">
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                          <Clock className="h-4 w-4" />
                          <span>{event.date.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de cuenta</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nombre de la cuenta</label>
                    <Input value={user?.name || ''} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Dirección de correo</label>
                    <Input value={user?.email || ''} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Firma</label>
                    <Textarea placeholder="Tu firma personalizada..." />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Filtros y reglas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Filtro anti-spam</h4>
                      <p className="text-sm text-gray-600">Activado - Nivel alto</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium">Reenvío automático</h4>
                      <p className="text-sm text-gray-600">Desactivado</p>
                    </div>
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Agregar nueva regla
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}