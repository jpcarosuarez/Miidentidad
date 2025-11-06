import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/hooks/useAuth';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CardEditor from './pages/CardEditor';
import Profile from './pages/Profile';
import Domains from './pages/Domains';
import Pricing from './pages/Pricing';
import Webmail from './pages/Webmail';
import NFCManager from './pages/NFCManager';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/editor" element={<CardEditor />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/webmail" element={<Webmail />} />
            <Route path="/nfc" element={<NFCManager />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;