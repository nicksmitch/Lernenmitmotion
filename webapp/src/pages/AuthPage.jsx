import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { toast } from 'sonner';
import { Timer, Mail, Lock, User, ArrowLeft } from 'lucide-react';

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Erfolgreich eingeloggt!');
        navigate('/dashboard');
      } else {
        if (!name.trim()) {
          toast.error('Bitte gib deinen Namen ein');
          setLoading(false);
          return;
        }
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        });
        if (error) throw error;
        if (data?.user?.identities?.length === 0) {
          toast.error('Diese E-Mail ist bereits registriert');
        } else {
          toast.success('Registrierung erfolgreich! Bitte bestätige deine E-Mail.');
          setIsLogin(true);
        }
      }
    } catch (error) {
      let errorMessage = error.message;
      if (error.message.includes('Invalid login credentials')) errorMessage = 'Ungültige E-Mail oder Passwort';
      else if (error.message.includes('Email not confirmed')) errorMessage = 'Bitte bestätige zuerst deine E-Mail';
      else if (error.message.includes('Password should be at least 6 characters')) errorMessage = 'Passwort muss mindestens 6 Zeichen lang sein';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4 py-8 pb-20">
      <div className="max-w-md w-full">
        {/* Header */}
        {/* ... dein gesamter bestehender Login-/Registrierungs-Content bleibt unverändert ... */}

        {/* 🧩 Fixer globaler Footer */}
        <footer className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-sm border-t border-emerald-100 py-3 z-50">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 px-4 text-sm text-emerald-700">
            <div className="flex gap-4">
              <Link to="/impressum" className="hover:text-emerald-900 underline transition">Impressum</Link>
              <span>•</span>
              <Link to="/datenschutz" className="hover:text-emerald-900 underline transition">Datenschutz</Link>
            </div>
            <p className="text-xs sm:text-sm text-emerald-600">
              © {new Date().getFullYear()} Move2Focus – Lernen mit Bewegung & Balance
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default AuthPage;
