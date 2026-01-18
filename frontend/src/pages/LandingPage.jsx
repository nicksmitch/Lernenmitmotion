import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { BookOpen, Brain, Coffee, Timer, TrendingUp } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-emerald-900">Move2Focus</span>
          </div>
          <Button 
            data-testid="header-start-btn"
            onClick={handleStart}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full"
          >
            Jetzt starten
          </Button>
        </div>
      </header>

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
            Move2Focus hilft Studierenden und Schülern, produktiver zu lernen – mit individuellen Lernphasen und wissenschaftlich fundierten Bewegungs- und Entspannungspausen.
          </p>
          <Button 
            data-testid="hero-get-started-btn"
            onClick={handleStart}
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
            description="Bewegungsübungen von 3–7 Minuten, um deinen Körper zu aktivieren und Verspannungen zu lösen."
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

      {/* How It Works */}
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-emerald-900 mb-12 sm:mb-16">
            So funktioniert's
          </h2>
          <div className="space-y-12">
            <StepCard 
              number="1"
              title="Timer einstellen"
              description="Wähle deine gewünschte Lerndauer – ob 25 Minuten Pomodoro oder 2 Stunden Deep Work."
            />
            <StepCard 
              number="2"
              title="Fokussiert lernen"
              description="Konzentriere dich auf dein Studium. Der Timer läuft im Hintergrund."
            />
            <StepCard 
              number="3"
              title="Pause wählen"
              description="Wenn du eine Pause brauchst, wähle zwischen aktiven Bewegungsübungen oder entspannenden Atemübungen."
            />
            <StepCard 
              number="4"
              title="Statistiken ansehen"
              description="Verfolge deinen Fortschritt und optimiere deine Lerngewohnheiten."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Bereit, produktiver zu lernen?
          </h2>
          <p className="text-emerald-100 mb-8">
            Starte jetzt kostenlos und ohne Anmeldung – deine Daten werden lokal gespeichert.
          </p>
          <Button 
            onClick={handleStart}
            size="lg"
            variant="secondary"
            className="bg-white text-emerald-700 hover:bg-emerald-50 px-8 py-6 text-lg rounded-full shadow-lg"
          >
            Kostenlos starten
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-emerald-600">
        <p>&copy; {new Date().getFullYear()} Move2Focus. Alle Rechte vorbehalten.</p>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow">
    <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-emerald-900 mb-2">{title}</h3>
    <p className="text-emerald-700">{description}</p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div className="flex items-start space-x-6">
    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
      {number}
    </div>
    <div>
      <h3 className="text-xl font-semibold text-emerald-900 mb-2">{title}</h3>
      <p className="text-emerald-700">{description}</p>
    </div>
  </div>
);

export default LandingPage;
