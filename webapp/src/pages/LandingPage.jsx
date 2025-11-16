import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { BookOpen, Brain, Coffee, Timer, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-emerald-900">FocusFlow</span>
          </div>
          <Button 
            data-testid="header-login-btn"
            onClick={() => navigate('/auth')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full"
          >
            Anmelden
          </Button>
        </div>
      </header>

      {/* Login Modal */}
      {showNameInput && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass rounded-2xl p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold text-emerald-900 mb-4">Willkommen bei FocusFlow</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-2">
                  Wie heißt du?
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Dein Name"
                  autoFocus
                />
              </div>
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNameInput(false)}
                  className="flex-1"
                >
                  Abbrechen
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Los geht's!
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20 text-center">
        <div className="max-w-4xl mx-auto fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-emerald-900 mb-6 leading-tight">
            Lernen mit Fokus und
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
              gesunden Pausen
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-emerald-700 mb-8 sm:mb-12 max-w-2xl mx-auto">
            FocusFlow hilft Studierenden und Schülern, produktiver zu lernen mit individuellen Lernphasen und wissenschaftlich fundierten Bewegungs- und Entspannungspausen.
          </p>
          <Button 
            data-testid="hero-get-started-btn"
            onClick={handleLogin}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white px-8 sm:px-10 py-5 sm:py-6 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl touch-manipulation"
          >
            Jetzt starten
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <FeatureCard 
            icon={<Timer className="w-8 h-8" />}
            title="Individueller Timer"
            description="Stelle deine gewünschte Lerndauer selbst ein und arbeite in deinem eigenen Rhythmus."
          />
          <FeatureCard 
            icon={<Coffee className="w-8 h-8" />}
            title="Aktive Pausen"
            description="Bewegungsübungen von 3-7 Minuten, um deinen Körper zu aktivieren und Verspannungen zu lösen."
          />
          <FeatureCard 
            icon={<Brain className="w-8 h-8" />}
            title="Entspannungspausen"
            description="Meditations- und Atemübungen für mentale Erholung und bessere Konzentration."
          />
          <FeatureCard 
            icon={<TrendingUp className="w-8 h-8" />}
            title="Statistiken"
            description="Verfolge deine Lernzeit und Pausen, um deine Produktivität zu optimieren."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="glass rounded-3xl p-12 text-center max-w-3xl mx-auto">
          <BookOpen className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-emerald-900 mb-4">
            Bereit für produktiveres Lernen?
          </h2>
          <p className="text-lg text-emerald-700 mb-8">
            Melde dich jetzt kostenlos an und starte deine erste Lernphase.
          </p>
          <Button 
            data-testid="cta-start-btn"
            onClick={handleLogin}
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-6 text-lg rounded-full shadow-lg"
          >
            Kostenlos anmelden
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-emerald-600">
        <p>© 2025 FocusFlow - Lernen mit Fokus und Balance</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="glass rounded-2xl p-5 sm:p-6 hover:shadow-xl transition-shadow">
    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-semibold text-emerald-900 mb-2">{title}</h3>
    <p className="text-sm sm:text-base text-emerald-700">{description}</p>
  </div>
);

export default LandingPage;