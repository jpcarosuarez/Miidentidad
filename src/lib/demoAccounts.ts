export const demoAccounts = [
  {
    id: 'admin-001',
    email: 'admin@miidentidad.com',
    password: 'admin123',
    role: 'admin',
    name: 'Administrador Sistema',
    username: 'admin',
    plan: 'enterprise',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    permissions: ['manage_users', 'view_analytics', 'system_settings', 'billing_management']
  },
  {
    id: 'user-001',
    email: 'juan.perez@juan.pro',
    password: 'demo123',
    role: 'user',
    name: 'Juan Pérez',
    username: 'juanperez',
    plan: 'professional',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    company: 'Tech Solutions',
    title: 'Desarrollador Full Stack',
    domains: ['juan.pro', 'juanperez.me'],
    emailAccounts: ['juan@juan.pro', 'contact@juan.pro', 'dev@juanperez.me']
  },
  {
    id: 'user-002',
    email: 'maria.garcia@maria.dev',
    password: 'demo123',
    role: 'user',
    name: 'María García',
    username: 'mariagarcia',
    plan: 'basic',
    avatar: '/images/UXUIDesigner.jpg',
    company: 'Design Studio',
    title: 'UX/UI Designer',
    domains: ['maria.dev'],
    emailAccounts: ['maria@maria.dev']
  }
];

export const mockEmails = [
  {
    id: '1',
    from: 'cliente@empresa.com',
    to: 'juan@juan.pro',
    subject: 'Propuesta de proyecto web',
    body: 'Hola Juan, me gustaría discutir un proyecto de desarrollo web para nuestra empresa...',
    date: new Date('2024-11-05T10:30:00'),
    read: false,
    starred: false,
    folder: 'inbox',
    attachments: []
  },
  {
    id: '2',
    from: 'noreply@github.com',
    to: 'juan@juan.pro',
    subject: 'Pull request merged',
    body: 'Tu pull request #123 ha sido fusionado exitosamente en el repositorio principal.',
    date: new Date('2024-11-05T09:15:00'),
    read: true,
    starred: true,
    folder: 'inbox',
    attachments: []
  },
  {
    id: '3',
    from: 'team@miidentidad.com',
    to: 'juan@juan.pro',
    subject: 'Bienvenido a MiIdentidad Digital',
    body: 'Gracias por registrarte en nuestra plataforma. Aquí tienes algunos consejos para comenzar...',
    date: new Date('2024-11-04T16:45:00'),
    read: true,
    starred: false,
    folder: 'inbox',
    attachments: []
  }
];

export const mockContacts = [
  {
    id: '1',
    name: 'Ana López',
    email: 'ana.lopez@empresa.com',
    phone: '+34 600 111 222',
    company: 'Empresa ABC',
    title: 'Project Manager',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Carlos Ruiz',
    email: 'carlos@startup.io',
    phone: '+34 600 333 444',
    company: 'Startup Innovation',
    title: 'CEO',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
  }
];

export const mockCalendarEvents = [
  {
    id: '1',
    title: 'Reunión con cliente',
    date: new Date('2024-11-06T14:00:00'),
    duration: 60,
    attendees: ['cliente@empresa.com'],
    location: 'Oficina Madrid'
  },
  {
    id: '2',
    title: 'Presentación de proyecto',
    date: new Date('2024-11-07T10:00:00'),
    duration: 90,
    attendees: ['team@miidentidad.com'],
    location: 'Sala de conferencias'
  }
];