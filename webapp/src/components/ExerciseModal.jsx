import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { X, CheckCircle, Users, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';
import { getRandomExercise } from '../data/exercises';

const ExerciseModal = ({ category, userRole, onClose, onComplete }) => {
  const [currentExercise, setCurrentExercise] = useState(null);
  const [isReading, setIsReading] = useState(false);
  const [voiceSpeed, setVoiceSpeed] = useState(0.85);
  const speechSynthRef = useRef(null);

  useEffect(() => {
    fetchExercise();
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  useEffect(() => {
    stopReading();
  }, [currentExercise]);

  const fetchExercise = () => {
    const exercise = getRandomExercise(category, userRole);
    setCurrentExercise(exercise);
  };

  const handleComplete = () => {
    stopReading();
    toast.success('Großartig! Pause abgeschlossen.');
    onComplete();
  };

  const handleNext = () => {
    stopReading();
    fetchExercise();
  };

  const startReading = () => {
    if (!currentExercise) return;
    
    if (!('speechSynthesis' in window)) {
      toast.error('Dein Browser unterstützt keine Sprachausgabe');
      return;
    }

    window.speechSynthesis.cancel();

    const cleanDescription = currentExercise.description
      .split('\n')
      .filter(line => line.trim())
      .map((line, index) => {
        let processedLine = line.trim();
        processedLine = processedLine.replace(/^(\d+)\.\s*/, 'Schritt $1: ');
        if (!processedLine.endsWith('.') && !processedLine.endsWith('!') && !processedLine.endsWith('?')) {
          processedLine += '.';
        }
        return processedLine;
      })
      .join(' ');
    
    const textToRead = `${currentExercise.title}. Dauer dieser Übung: ${currentExercise.duration_minutes} Minuten. So führst du die Übung durch. ${cleanDescription}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'de-DE';
    utterance.rate = voiceSpeed;
    utterance.pitch = 1.05;
    utterance.volume = 1.0;

    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      let germanVoice = voices.find(voice => 
        (voice.lang.includes('de-DE') || voice.lang.includes('de')) &&
        (voice.name.includes('Premium') || voice.name.includes('Enhanced') || 
         voice.name.includes('Natural') || voice.name.includes('Neural'))
      );
      
      if (!germanVoice) {
        germanVoice = voices.find(voice => 
          (voice.lang.includes('de-DE') || voice.lang.includes('de')) &&
          (voice.name.includes('Female') || voice.name.includes('Anna') ||
           voice.name.includes('Petra'))
        );
      }
      
      if (!germanVoice) {
        germanVoice = voices.find(voice => 
          voice.lang.includes('de-DE') || voice.lang.includes('de')
        );
      }
      
      if (germanVoice) {
        utterance.voice = germanVoice;
      }
    };

    setVoice();
    
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = setVoice;
    }

    utterance.onstart = () => {
      setIsReading(true);
      toast.success('Vorlesen gestartet');
    };

    utterance.onend = () => {
      setIsReading(false);
      toast.info('Vorlesen beendet');
    };

    utterance.onerror = () => {
      setIsReading(false);
      toast.error('Fehler beim Vorlesen');
    };

    speechSynthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopReading = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      toast.info('Vorlesen gestoppt');
    }
  };

  if (!currentExercise) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
        <Card className="w-full max-w-2xl glass">
          <CardContent className="p-12 text-center">
            <p className="text-emerald-700">Keine Übung verfügbar</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4">
      <Card data-testid="exercise-modal" className="w-full max-w-2xl max-h-[90vh] overflow-y-auto glass">
        <CardHeader className="relative">
          <Button 
            data-testid="close-exercise-modal-btn"
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute right-2 sm:right-4 top-2 sm:top-4 touch-manipulation"
          >
            <X className="w-5 h-5" />
          </Button>
          <CardTitle className="text-xl sm:text-2xl text-emerald-900 pr-10 sm:pr-12">
            {category === 'active' ? 'Aktive Pause' : 'Entspannende Pause'}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {currentExercise.is_group_exercise ? (
              <span className="flex items-center text-purple-600 font-medium">
                <Users className="w-4 h-4 mr-1" />
                Gruppen-/Partnerübung
              </span>
            ) : (
              'Folge der Anleitung für eine erholsame Pause'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-emerald-900 mb-2">{currentExercise.title}</h3>
              <p className="text-sm sm:text-base text-emerald-600">
                Dauer: {currentExercise.duration_minutes} Minuten
              </p>
            </div>
            <Button
              data-testid="read-aloud-btn"
              onClick={isReading ? stopReading : startReading}
              variant={isReading ? "destructive" : "outline"}
              size="icon"
              className="flex-shrink-0 h-12 w-12 sm:h-14 sm:w-14 rounded-full touch-manipulation"
              title={isReading ? "Vorlesen stoppen" : "Übung vorlesen lassen"}
            >
              {isReading ? (
                <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
              ) : (
                <Volume2 className="w-5 h-5 sm:w-6 sm:h-6" />
              )}
            </Button>
          </div>

          <div className={`rounded-xl p-4 sm:p-6 transition-all ${
            isReading 
              ? 'bg-gradient-to-br from-emerald-100 to-teal-100 ring-2 ring-emerald-400' 
              : 'bg-emerald-50'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-emerald-900 text-sm sm:text-base">
                Anleitung:
              </h4>
              {isReading && (
                <span className="flex items-center text-xs sm:text-sm text-emerald-700 animate-pulse">
                  <Volume2 className="w-4 h-4 mr-1" />
                  Wird vorgelesen...
                </span>
              )}
            </div>
            <div className="space-y-2 text-emerald-800 text-sm sm:text-base">
              {currentExercise.description.split('\n').map((line, index) => (
                <p key={index} className="leading-relaxed">{line}</p>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                data-testid="complete-exercise-btn"
                onClick={handleComplete}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white py-5 sm:py-6 text-base sm:text-lg rounded-xl touch-manipulation"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Übung abgeschlossen
              </Button>
              <Button 
                data-testid="next-exercise-btn"
                onClick={handleNext}
                variant="outline"
                className="flex-1 py-5 sm:py-6 text-base sm:text-lg border-emerald-300 rounded-xl touch-manipulation"
              >
                Andere Übung
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-emerald-700">
              <span>Vorlesegeschwindigkeit:</span>
              <select 
                value={voiceSpeed}
                onChange={(e) => setVoiceSpeed(parseFloat(e.target.value))}
                className="px-2 py-1 rounded border border-emerald-300 bg-white text-emerald-800 cursor-pointer"
                disabled={isReading}
              >
                <option value="0.75">Sehr langsam</option>
                <option value="0.85">Langsam (empfohlen)</option>
                <option value="1.0">Normal</option>
                <option value="1.1">Schnell</option>
              </select>
            </div>
            
            <p className="text-xs sm:text-sm text-emerald-600 text-center">
              💡 Tipp: Nutze den Lautsprecher-Button oben, um dir die Übung vorlesen zu lassen
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseModal;