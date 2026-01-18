import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Slider } from '../components/ui/slider';
import { Brain, LogOut, Play, Pause, Coffee, Heart, TrendingUp, Clock, Settings } from 'lucide-react';
import { toast } from 'sonner';
import ExerciseModal from '../components/ExerciseModal';
import RoleSelector from '../components/RoleSelector';
import SpotifyPlayer from '../components/SpotifyPlayerCompact';
import TimerCompleteModal from '../components/TimerCompleteModal';
import { Link } from "react-router-dom";

const STORAGE_KEYS = {
  STATS: 'focusflow_stats',
  SESSIONS: 'focusflow_sessions'
};

const Dashboard = () => {
  const { user, logout, updateUserRole } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [timerDuration, setTimerDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [breaksThisSession, setBreaksThisSession] = useState(0);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [exerciseCategory, setExerciseCategory] = useState(null);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [showTimerComplete, setShowTimerComplete] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setShowTimerComplete(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeLeft]);

  const loadStats = () => {
    const savedStats = localStorage.getItem(STORAGE_KEYS.STATS);
    if (savedStats) {
      setStats(JSON.parse(savedStats));
      setTimerDuration(JSON.parse(savedStats).lastTimerDuration || 25);
    } else {
      const newStats = {
        userId: user?.id,
        totalStudyMinutes: 0,
        totalBreaks: 0,
        lastTimerDuration: 25
      };
      setStats(newStats);
      localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(newStats));
    }
  };

  const saveStats = (updatedStats) => {
    setStats(updatedStats);
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updatedStats));
  };

  const startTimer = () => {
    setTimeLeft(timerDuration * 60);
    setIsRunning(true);
    setIsPaused(false);
    setBreaksThisSession(0);
    const updatedStats = { ...stats, lastTimerDuration: timerDuration };
    saveStats(updatedStats);
    toast.success('Timer gestartet!');
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
    toast.info(isPaused ? 'Timer fortgesetzt' : 'Timer pausiert');
  };

  const stopTimer = () => {
    if (isRunning || timeLeft === 0) {
      const actualStudiedTime = timeLeft === 0 
        ? timerDuration 
        : Math.floor((timerDuration * 60 - timeLeft) / 60); 
      const updatedStats = {
        ...stats,
        totalStudyMinutes: stats.totalStudyMinutes + actualStudiedTime,
        totalBreaks: stats.totalBreaks + breaksThisSession
      };
      saveStats(updatedStats);
      setIsRunning(false);
      setIsPaused(false);
      setTimeLeft(0);
      setBreaksThisSession(0);
      setShowTimerComplete(false);
      toast.success(`Session beendet! +${actualStudiedTime} Minuten`);
    }
  };

  const takeBreak = (category) => {
    setExerciseCategory(category);
    setShowExerciseModal(true);
    if (isRunning) {
      setIsPaused(true);
    }
  };

  const onBreakComplete = () => {
    const newBreaksCount = breaksThisSession + 1;
    setBreaksThisSession(newBreaksCount);
    setShowExerciseModal(false);
    if (stats) {
      const updatedStats = {
        ...stats,
        totalBreaks: (stats.totalBreaks || 0) + 1
      };
      saveStats(updatedStats);
      setStats(updatedStats);
    }
    if (isRunning && timeLeft > 0) {
      setIsPaused(false);
      toast.success('Pause beendet! Weiter geht\'s!');
    } else {
      toast.success('Pause abgeschlossen!');
    }
  };

  const handleTimerCompleteAction = (action) => {
    const updatedStats = {
      ...stats,
      totalStudyMinutes: stats.totalStudyMinutes + timerDuration,
      totalBreaks: stats.totalBreaks + breaksThisSession
    };
    saveStats(updatedStats);
    setShowTimerComplete(false);
    if (action === 'continue') {
      toast.info('Session beendet! Starte einen neuen Timer wenn du weitermachen möchtest.');
      setTimeLeft(0);
      setIsRunning(false);
      setBreaksThisSession(0);
    } else {
      takeBreak(action);
    }
  };

  const handleRoleChange = (newRole) => {
    updateUserRole(newRole);
    setShowRoleSelector(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = timeLeft > 0 ? ((timerDuration * 60 - timeLeft) / (timerDuration * 60)) * 100 : 0;
  const roleDisplay = user?.role === 'teacher' ? 'Lehrkraft' : 'Einzelnutzer';

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pb-20">
      {/* Header */}
      <header className="glass border-b border-emerald-100">
        {/* ... dein Header bleibt unverändert ... */}
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* ... dein kompletter Dashboard-Inhalt ... */}
      </div>

      {/* Timer Complete Modal */}
      {showTimerComplete && (
        <TimerCompleteModal
          onTakeBreak={(category) => handleTimerCompleteAction(category)}
          onContinue={() => handleTimerCompleteAction('continue')}
        />
      )}

      {/* Exercise Modal */}
      {showExerciseModal && (
        <ExerciseModal 
          category={exerciseCategory}
          userRole={user?.role || 'individual'}
          onClose={() => setShowExerciseModal(false)}
          onComplete={onBreakComplete}
        />
      )}

      {/* 🧩 Globaler Footer */}
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
  );
};

export default Dashboard;
