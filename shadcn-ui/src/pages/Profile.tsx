import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  Globe, 
  MapPin,
  Download,
  Share2,
  Linkedin,
  Twitter,
  Instagram,
  QrCode
} from 'lucide-react';

const mockProfile = {
  name: 'Juan Pérez',
  title: 'Desarrollador Full Stack',
  company: 'Tech Solutions',
  bio: 'Desarrollador apasionado por crear soluciones innovadoras que impacten positivamente en la vida de las personas. Especializado en React, Node.js y tecnologías cloud.',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
  email: 'juan@juan.pro',
  phone: '+34 600 123 456',
  website: 'https://juan.pro',
  location: 'Madrid, España',
  linkedin: 'https://linkedin.com/in/juanperez',
  twitter: '@juanperez',
  instagram: '@juan_dev',
  skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
  stats: {
    views: 1247,
    connections: 89
  }
};

export default function Profile() {
  const { username } = useParams();
  const [profile] = useState(mockProfile);

  const handleDownloadContact = () => {
    // Simular descarga de contacto VCF
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
ORG:${profile.company}
TITLE:${profile.title}
EMAIL:${profile.email}
TEL:${profile.phone}
URL:${profile.website}
NOTE:${profile.bio}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(' ', '_')}.vcf`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name} - ${profile.title}`,
          text: profile.bio,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copiar URL al portapapeles
      navigator.clipboard.writeText(window.location.href);
      alert('URL copiada al portapapeles');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header con navegación */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">MI</span>
              </div>
              <span className="font-bold text-xl">MiIdentidad</span>
            </Link>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Compartir
              </Button>
              <Button onClick={handleDownloadContact}>
                <Download className="mr-2 h-4 w-4" />
                Guardar Contacto
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Perfil principal */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-2xl border-0">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32 relative">
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
            
            <CardContent className="relative px-8 pb-8">
              {/* Avatar y información principal */}
              <div className="flex flex-col md:flex-row items-center md:items-end space-y-4 md:space-y-0 md:space-x-6 -mt-16 relative z-10">
                <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-2xl">{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="text-center md:text-left flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                  <p className="text-xl text-gray-600 mb-1">{profile.title}</p>
                  <p className="text-lg text-gray-500 mb-3">{profile.company}</p>
                  
                  {profile.location && (
                    <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-500 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="flex space-x-8 text-center">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{profile.stats.views}</p>
                    <p className="text-sm text-gray-500">Vistas</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{profile.stats.connections}</p>
                    <p className="text-sm text-gray-500">Conexiones</p>
                  </div>
                </div>
              </div>

              {/* Biografía */}
              {profile.bio && (
                <div className="mt-8 mb-8">
                  <h2 className="text-lg font-semibold mb-3">Acerca de</h2>
                  <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
                </div>
              )}

              {/* Información de contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-semibold mb-4">Información de Contacto</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Mail className="h-5 w-5 text-blue-600" />
                      <a href={`mailto:${profile.email}`} className="text-gray-700 hover:text-blue-600">
                        {profile.email}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Phone className="h-5 w-5 text-green-600" />
                      <a href={`tel:${profile.phone}`} className="text-gray-700 hover:text-green-600">
                        {profile.phone}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Globe className="h-5 w-5 text-purple-600" />
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-purple-600">
                        {profile.website}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Redes Sociales</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Linkedin className="h-5 w-5 text-blue-700" />
                      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-700">
                        LinkedIn
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Twitter className="h-5 w-5 text-blue-400" />
                      <a href={`https://twitter.com/${profile.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-blue-400">
                        {profile.twitter}
                      </a>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <Instagram className="h-5 w-5 text-pink-600" />
                      <a href={`https://instagram.com/${profile.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-pink-600">
                        {profile.instagram}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Habilidades */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Código QR */}
              <div className="text-center pt-6 border-t">
                <div className="inline-flex items-center space-x-2 text-gray-500 mb-4">
                  <QrCode className="h-5 w-5" />
                  <span className="text-sm">Escanea para guardar este contacto</span>
                </div>
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Powered by */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              Creado con{' '}
              <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
                MiIdentidad Digital
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}