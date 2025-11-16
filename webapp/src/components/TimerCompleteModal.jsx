import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { CheckCircle, Coffee, Heart } from 'lucide-react';

const TimerCompleteModal = ({ onTakeBreak, onContinue }) => {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Play notification sound
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE');
    audio.play().catch(() => console.log('Audio autoplay blocked'));

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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in">
      <Card className="w-full max-w-md glass border-emerald-300 shadow-2xl animate-in zoom-in">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <CardTitle className="text-3xl text-emerald-900">
            🎉 Lernphase abgeschlossen!
          </CardTitle>
          <p className="text-emerald-700 mt-2">
            Zeit für eine wohlverdiente Pause
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress indicator */}
          <div className="bg-emerald-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-emerald-600 h-full transition-all duration-1000 ease-linear"
              style={{ width: `${(10 - countdown) * 10}%` }}
            />
          </div>

          {/* Pause options */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              data-testid="timer-complete-active-btn"
              onClick={() => onTakeBreak('active')}
              className="h-32 bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white flex-col space-y-2 rounded-xl"
            >
              <Coffee className="w-10 h-10" />
              <span className="text-base font-semibold">Aktive Pause</span>
              <span className="text-xs opacity-90">Bewegung</span>
            </Button>
            <Button
              data-testid="timer-complete-relaxed-btn"
              onClick={() => onTakeBreak('relaxed')}
              className="h-32 bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white flex-col space-y-2 rounded-xl"
            >
              <Heart className="w-10 h-10" />
              <span className="text-base font-semibold">Entspannende Pause</span>
              <span className="text-xs opacity-90">Meditation</span>
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
