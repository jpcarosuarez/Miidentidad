import { useState, useRef } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Download, 
  QrCode,
  Smartphone,
  Globe,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  User,
  Camera,
  Palette,
  Layout,
  Settings,
  Share2,
  Copy,
  ExternalLink,
  Plus,
  Trash2,
  Move,
  Edit3
} from 'lucide-react';

interface CardField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'url' | 'textarea';
  label: string;
  value: string;
  isVisible: boolean;
  isRequired: boolean;
  order: number;
}

interface CardTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
  fields: CardField[];
  style: {
    backgroundColor: string;
    textColor: string;
    accentColor: string;
    layout: 'modern' | 'classic' | 'minimal' | 'creative';
  };
}

const defaultTemplates: CardTemplate[] = [
  {
    id: 'modern-pro',
    name: 'Moderno Profesional',
    description: 'Diseño limpio y moderno para profesionales',
    preview: 'bg-gradient-to-br from-blue-600 to-purple-600',
    fields: [
      { id: '1', type: 'text', label: 'Nombre completo', value: '', isVisible: true, isRequired: true, order: 1 },
      { id: '2', type: 'text', label: 'Cargo', value: '', isVisible: true, isRequired: false, order: 2 },
      { id: '3', type: 'text', label: 'Empresa', value: '', isVisible: true, isRequired: false, order: 3 },
      { id: '4', type: 'email', label: 'Email', value: '', isVisible: true, isRequired: true, order: 4 },
      { id: '5', type: 'phone', label: 'Teléfono', value: '', isVisible: true, isRequired: false, order: 5 },
      { id: '6', type: 'url', label: 'Sitio web', value: '', isVisible: true, isRequired: false, order: 6 }
    ],
    style: {
      backgroundColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      textColor: '#ffffff',
      accentColor: '#ffd700',
      layout: 'modern'
    }
  },
  {
    id: 'classic-elegant',
    name: 'Clásico Elegante',
    description: 'Estilo tradicional y elegante',
    preview: 'bg-gradient-to-br from-gray-800 to-gray-900',
    fields: [
      { id: '1', type: 'text', label: 'Nombre completo', value: '', isVisible: true, isRequired: true, order: 1 },
      { id: '2', type: 'text', label: 'Título profesional', value: '', isVisible: true, isRequired: false, order: 2 },
      { id: '3', type: 'email', label: 'Email corporativo', value: '', isVisible: true, isRequired: true, order: 3 },
      { id: '4', type: 'phone', label: 'Teléfono directo', value: '', isVisible: true, isRequired: false, order: 4 }
    ],
    style: {
      backgroundColor: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
      textColor: '#ecf0f1',
      accentColor: '#e74c3c',
      layout: 'classic'
    }
  },
  {
    id: 'minimal-clean',
    name: 'Minimalista',
    description: 'Diseño limpio y minimalista',
    preview: 'bg-white border-2 border-gray-200',
    fields: [
      { id: '1', type: 'text', label: 'Nombre', value: '', isVisible: true, isRequired: true, order: 1 },
      { id: '2', type: 'email', label: 'Email', value: '', isVisible: true, isRequired: true, order: 2 },
      { id: '3', type: 'url', label: 'Portfolio', value: '', isVisible: true, isRequired: false, order: 3 }
    ],
    style: {
      backgroundColor: '#ffffff',
      textColor: '#2d3748',
      accentColor: '#4299e1',
      layout: 'minimal'
    }
  }
];

export default function CardEditor() {
  const { user, isAuthenticated } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate>(defaultTemplates[0]);
  const [cardData, setCardData] = useState<CardTemplate>(defaultTemplates[0]);
  const [activeTab, setActiveTab] = useState('design');
  const [draggedField, setDraggedField] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleTemplateSelect = (template: CardTemplate) => {
    setSelectedTemplate(template);
    setCardData({ ...template });
  };

  const handleFieldChange = (fieldId: string, key: keyof CardField, value: string | boolean | number) => {
    setCardData(prev => ({
      ...prev,
      fields: prev.fields.map(field =>
        field.id === fieldId ? { ...field, [key]: value } : field
      )
    }));
  };

  const handleAddField = () => {
    const newField: CardField = {
      id: Date.now().toString(),
      type: 'text',
      label: 'Nuevo campo',
      value: '',
      isVisible: true,
      isRequired: false,
      order: cardData.fields.length + 1
    };
    setCardData(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
  };

  const handleDeleteField = (fieldId: string) => {
    setCardData(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId)
    }));
  };

  const handleDragStart = (fieldId: string) => {
    setDraggedField(fieldId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetFieldId: string) => {
    e.preventDefault();
    if (!draggedField) return;

    const draggedIndex = cardData.fields.findIndex(f => f.id === draggedField);
    const targetIndex = cardData.fields.findIndex(f => f.id === targetFieldId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newFields = [...cardData.fields];
    const [draggedItem] = newFields.splice(draggedIndex, 1);
    newFields.splice(targetIndex, 0, draggedItem);

    // Actualizar orden
    newFields.forEach((field, index) => {
      field.order = index + 1;
    });

    setCardData(prev => ({
      ...prev,
      fields: newFields
    }));
    setDraggedField(null);
  };

  const handleSave = () => {
    toast.success('Tarjeta guardada exitosamente');
  };

  const handleExportPDF = () => {
    toast.success('Exportando a PDF...');
  };

  const handleExportPNG = () => {
    toast.success('Exportando a PNG...');
  };

  const handleGenerateQR = () => {
    toast.success('Código QR generado');
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
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
                <h1 className="text-3xl font-bold">Editor de Tarjetas Digitales</h1>
                <p className="text-gray-600">Crea y personaliza tu tarjeta de presentación digital</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Guardar
              </Button>
              <Button>
                <Eye className="mr-2 h-4 w-4" />
                Vista previa
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="design">Diseño</TabsTrigger>
                <TabsTrigger value="fields">Campos</TabsTrigger>
                <TabsTrigger value="privacy">Privacidad</TabsTrigger>
                <TabsTrigger value="export">Exportar</TabsTrigger>
              </TabsList>

              {/* Design Tab */}
              <TabsContent value="design" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Plantillas</CardTitle>
                    <CardDescription>Selecciona una plantilla base para tu tarjeta</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {defaultTemplates.map((template) => (
                        <div
                          key={template.id}
                          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedTemplate.id === template.id 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleTemplateSelect(template)}
                        >
                          <div className={`w-full h-24 rounded-lg mb-3 ${template.preview}`}></div>
                          <h4 className="font-medium">{template.name}</h4>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Personalización</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Foto de perfil</Label>
                      <div className="flex items-center space-x-4 mt-2">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" onClick={handleImageUpload}>
                          <Camera className="mr-2 h-4 w-4" />
                          Cambiar foto
                        </Button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Color de fondo</Label>
                        <div className="flex space-x-2 mt-2">
                          {['#667eea', '#764ba2', '#2c3e50', '#e74c3c', '#27ae60', '#f39c12'].map((color) => (
                            <div
                              key={color}
                              className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label>Color de acento</Label>
                        <div className="flex space-x-2 mt-2">
                          {['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'].map((color) => (
                            <div
                              key={color}
                              className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Fields Tab */}
              <TabsContent value="fields" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Campos de información</CardTitle>
                        <CardDescription>Arrastra para reordenar, edita o elimina campos</CardDescription>
                      </div>
                      <Button onClick={handleAddField}>
                        <Plus className="mr-2 h-4 w-4" />
                        Agregar campo
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {cardData.fields
                        .sort((a, b) => a.order - b.order)
                        .map((field) => (
                        <div
                          key={field.id}
                          className="p-4 border rounded-lg bg-white"
                          draggable
                          onDragStart={() => handleDragStart(field.id)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, field.id)}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <Move className="h-4 w-4 text-gray-400 cursor-move" />
                              <Input
                                value={field.label}
                                onChange={(e) => handleFieldChange(field.id, 'label', e.target.value)}
                                className="font-medium"
                              />
                            </div>
                            <div className="flex items-center space-x-2">
                              <Switch
                                checked={field.isVisible}
                                onCheckedChange={(checked) => handleFieldChange(field.id, 'isVisible', checked)}
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteField(field.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm">Tipo de campo</Label>
                              <select
                                value={field.type}
                                onChange={(e) => handleFieldChange(field.id, 'type', e.target.value as CardField['type'])}
                                className="w-full mt-1 p-2 border rounded"
                              >
                                <option value="text">Texto</option>
                                <option value="email">Email</option>
                                <option value="phone">Teléfono</option>
                                <option value="url">URL</option>
                                <option value="textarea">Texto largo</option>
                              </select>
                            </div>
                            
                            <div>
                              <Label className="text-sm">Valor</Label>
                              <Input
                                value={field.value}
                                onChange={(e) => handleFieldChange(field.id, 'value', e.target.value)}
                                placeholder={`Ingresa ${field.label.toLowerCase()}`}
                                className="mt-1"
                              />
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 mt-3">
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={field.isRequired}
                                onChange={(e) => handleFieldChange(field.id, 'isRequired', e.target.checked)}
                              />
                              <span className="text-sm">Campo obligatorio</span>
                            </label>
                            <Badge variant={field.isVisible ? 'default' : 'secondary'}>
                              {field.isVisible ? 'Visible' : 'Oculto'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Privacy Tab */}
              <TabsContent value="privacy" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Control de privacidad</CardTitle>
                    <CardDescription>Configura qué información es visible para diferentes audiencias</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Información pública</h4>
                          <p className="text-sm text-gray-600">Visible para todos los visitantes</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Información de contacto</h4>
                          <p className="text-sm text-gray-600">Solo visible tras solicitud de contacto</p>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Redes sociales</h4>
                          <p className="text-sm text-gray-600">Enlaces a perfiles sociales</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Ubicación</h4>
                          <p className="text-sm text-gray-600">Mostrar ciudad o región</p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-3">Configuración avanzada</h4>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Permitir descarga de contacto (vCard)</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" />
                          <span className="text-sm">Requerir aprobación para contactos</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked />
                          <span className="text-sm">Mostrar estadísticas de visitas</span>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Export Tab */}
              <TabsContent value="export" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Exportar y compartir</CardTitle>
                    <CardDescription>Descarga tu tarjeta o genera códigos QR</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Button onClick={handleExportPDF} className="h-20 flex-col">
                        <Download className="h-6 w-6 mb-2" />
                        Exportar PDF
                      </Button>
                      <Button onClick={handleExportPNG} variant="outline" className="h-20 flex-col">
                        <Download className="h-6 w-6 mb-2" />
                        Exportar PNG
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-3">Código QR dinámico</h4>
                      <div className="flex items-center space-x-4">
                        <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                          <QrCode className="h-16 w-16 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 mb-3">
                            Genera un código QR que siempre apunte a la versión más actualizada de tu tarjeta
                          </p>
                          <Button onClick={handleGenerateQR}>
                            <QrCode className="mr-2 h-4 w-4" />
                            Generar QR
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-medium mb-3">Enlaces de compartir</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Input value={`https://miidentidad.com/profile/${user?.username}`} readOnly />
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Share2 className="mr-2 h-4 w-4" />
                            WhatsApp
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="mr-2 h-4 w-4" />
                            LinkedIn
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="mr-2 h-4 w-4" />
                            Email
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="h-5 w-5" />
                    <span>Vista previa</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Mobile Preview */}
                  <div className="bg-gray-900 rounded-3xl p-4 mx-auto" style={{ width: '280px', height: '500px' }}>
                    <div className="bg-white rounded-2xl h-full p-6 overflow-y-auto">
                      <div 
                        className="w-full h-48 rounded-xl mb-4 flex items-center justify-center text-white"
                        style={{ background: cardData.style.backgroundColor }}
                      >
                        <div className="text-center">
                          <Avatar className="h-16 w-16 mx-auto mb-3 border-2 border-white">
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h3 className="font-bold text-lg">
                            {cardData.fields.find(f => f.label === 'Nombre completo')?.value || user?.name || 'Tu nombre'}
                          </h3>
                          <p className="text-sm opacity-90">
                            {cardData.fields.find(f => f.label === 'Cargo')?.value || 'Tu cargo'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {cardData.fields
                          .filter(field => field.isVisible && field.value)
                          .sort((a, b) => a.order - b.order)
                          .map((field) => (
                          <div key={field.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                              {field.type === 'email' && <Mail className="h-4 w-4 text-blue-600" />}
                              {field.type === 'phone' && <Phone className="h-4 w-4 text-blue-600" />}
                              {field.type === 'url' && <Globe className="h-4 w-4 text-blue-600" />}
                              {field.type === 'text' && <User className="h-4 w-4 text-blue-600" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-500">{field.label}</p>
                              <p className="text-sm font-medium truncate">{field.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-6 space-y-2">
                        <Button className="w-full" size="sm">
                          <Phone className="mr-2 h-4 w-4" />
                          Llamar
                        </Button>
                        <Button variant="outline" className="w-full" size="sm">
                          <Mail className="mr-2 h-4 w-4" />
                          Email
                        </Button>
                        <Button variant="outline" className="w-full" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Guardar contacto
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}