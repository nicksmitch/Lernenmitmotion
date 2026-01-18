import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast.success('Erfolgreich eingeloggt!');
        navigate('/dashboard');
      } else {
        // Registrierung
        if (!name.trim()) {
          toast.error('Bitte gib deinen Namen ein');
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name,
            }
          }
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
      console.error('Auth error:', error);
      
      // Deutsche Fehlermeldungen
      let errorMessage = error.message;
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Ungültige E-Mail oder Passwort';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Bitte bestätige zuerst deine E-Mail';
      } else if (error.message.includes('Password should be at least 6 characters')) {
        errorMessage = 'Passwort muss mindestens 6 Zeichen lang sein';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Zurück zur Startseite
          </button>
          
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="bg-emerald-500 p-2 rounded-lg">
              <Timer className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-emerald-900">Move2Focus</h1>
          </div>
          <p className="text-emerald-600">
            {isLogin ? 'Willkommen zurück!' : 'Erstelle deinen Account'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Toggle Tabs */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                isLogin
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Anmelden
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors ${
                !isLogin
                  ? 'bg-white text-emerald-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Registrieren
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (nur bei Registrierung) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="Dein Name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-Mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  placeholder="deine@email.de"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passwort
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              {!isLogin && (
                <p className="mt-1 text-xs text-gray-500">
                  Mindestens 6 Zeichen
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Wird verarbeitet...
                </span>
              ) : isLogin ? (
                'Anmelden'
              ) : (
                'Registrieren'
              )}
            </button>
          </form>

          {/* Info Text */}
          <div className="mt-6 text-center text-sm text-gray-600">
            {isLogin ? (
              <p>
                Noch kein Account?{' '}
                <button
                  onClick={() => setIsLogin(false)}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Jetzt registrieren
                </button>
              </p>
            ) : (
              <p>
                Bereits registriert?{' '}
                <button
                  onClick={() => setIsLogin(true)}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Zum Login
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Mit der Registrierung stimmst du unseren{' '}
          <button
            onClick={() => navigate('/datenschutz')}
            className="text-emerald-600 hover:text-emerald-700 underline"
          >
            Datenschutzbestimmungen
          </button>
          {' '}zu.
        </p>
        
        {/* Legal Links */}
        <div className="flex justify-center gap-4 text-sm text-gray-500 mt-4">
          <button
            onClick={() => navigate('/impressum')}
            className="hover:text-emerald-600 underline transition-colors"
          >
            Impressum
          </button>
          <span>•</span>
          <button
            onClick={() => navigate('/datenschutz')}
            className="hover:text-emerald-600 underline transition-colors"
          >
            Datenschutz
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
