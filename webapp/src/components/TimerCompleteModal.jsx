import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle, Coffee, Heart } from 'lucide-react';

const TimerCompleteModal = ({ onTakeBreak, onContinue }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Play notification sound - longer and louder alert
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const playAlert = () => {
      // Create oscillator for beep sound (3 beeps)
      for (let i = 0; i < 3; i++) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 880; // A5 note - attention grabbing
        oscillator.type = 'sine';
        
        const startTime = audioContext.currentTime + (i * 0.3);
        gainNode.gain.setValueAtTime(0.3, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.2);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.2);
      }
    };
    
    playAlert();
    
    // Vibration if supported
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }

    // Countdown
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-in fade-in">
      <Card className="w-full max-w-2xl glass border-emerald-300 shadow-2xl animate-in zoom-in">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-lg">
            <CheckCircle className="w-20 h-20 text-white" />
          </div>
          <CardTitle className="text-4xl sm:text-5xl text-emerald-900 mb-3">
            🎉 Lernphase abgeschlossen!
          </CardTitle>
          <p className="text-lg sm:text-xl text-emerald-700">
            Zeit für eine wohlverdiente Pause
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress indicator */}
          <div className="bg-emerald-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-emerald-600 h-full transition-all duration-1000 ease-linear"
              style={{ width: `${(10 - countdown) * 10}%` }}
            />
          </div>

          {/* Pause options - Bigger buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              data-testid="timer-complete-active-btn"
              onClick={() => onTakeBreak('active')}
              className="h-40 sm:h-48 bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 active:from-orange-700 active:to-red-700 text-white flex-col space-y-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all touch-manipulation"
            >
              <Coffee className="w-14 h-14 sm:w-16 sm:h-16" />
              <span className="text-xl sm:text-2xl font-bold">Aktive Pause</span>
              <span className="text-sm sm:text-base opacity-90">Bewegungs- & Koordinationsübungen</span>
            </Button>
            <Button
              data-testid="timer-complete-relaxed-btn"
              onClick={() => onTakeBreak('relaxed')}
              className="h-40 sm:h-48 bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 active:from-blue-700 active:to-purple-700 text-white flex-col space-y-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all touch-manipulation"
            >
              <Heart className="w-14 h-14 sm:w-16 sm:h-16" />
              <span className="text-xl sm:text-2xl font-bold">Entspannende Pause</span>
              <span className="text-sm sm:text-base opacity-90">Meditations- & Atemübungen</span>
            </Button>
          </div>

          {/* Continue without break */}
          <Button
            data-testid="timer-complete-continue-btn"
            onClick={onContinue}
            variant="outline"
            className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          >
            Keine Pause - Weiter lernen
          </Button>

          {/* Auto-continue countdown */}
          {countdown > 0 && (
            <p className="text-center text-sm text-emerald-600">
              Automatisch weiter in {countdown} Sekunden
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TimerCompleteModal;
