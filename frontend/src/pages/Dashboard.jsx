import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../App';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Slider } from '../components/ui/slider';
import { Brain, LogOut, Play, Pause, Coffee, Heart, TrendingUp, Clock, Settings } from 'lucide-react';
import { toast } from 'sonner';
import ExerciseModal from '../components/ExerciseModal';
import RoleSelector from '../components/RoleSelector';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Dashboard = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [timerDuration, setTimerDuration] = useState(25);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [breaksThisSession, setBreaksThisSession] = useState(0);
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [exerciseCategory, setExerciseCategory] = useState(null);
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            toast.success('Lernphase abgeschlossen! Zeit für eine Pause.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeLeft]);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API}/stats`, {
        withCredentials: true
      });
      setStats(response.data);
      setTimerDuration(response.data.last_timer_duration);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const startTimer = async () => {
    try {
      const response = await axios.post(`${API}/sessions`, {
        duration_minutes: timerDuration
      }, {
        withCredentials: true
      });
      
      setCurrentSessionId(response.data.id);
      setTimeLeft(timerDuration * 60);
      setIsRunning(true);
      setIsPaused(false);
      setBreaksThisSession(0);
      
      await axios.put(`${API}/stats/timer`, {
        duration_minutes: timerDuration
      }, {
        withCredentials: true
      });
      
      toast.success('Timer gestartet!');
    } catch (error) {
      console.error('Error starting timer:', error);
      toast.error('Fehler beim Starten des Timers');
    }
  };

  const pauseTimer = () => {
    setIsPaused(!isPaused);
    toast.info(isPaused ? 'Timer fortgesetzt' : 'Timer pausiert');
  };

  const stopTimer = async () => {
    if (currentSessionId) {
      try {
        await axios.put(`${API}/sessions/${currentSessionId}`, {
          status: 'completed',
          breaks_taken: breaksThisSession
        }, {
          withCredentials: true
        });
        
        setIsRunning(false);
        setIsPaused(false);
        setTimeLeft(0);
        setCurrentSessionId(null);
        setBreaksThisSession(0);
        fetchStats();
        
        toast.success('Lernphase beendet!');
      } catch (error) {
        console.error('Error stopping timer:', error);
        toast.error('Fehler beim Beenden des Timers');
      }
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
    setBreaksThisSession(prev => prev + 1);
    setShowExerciseModal(false);
    if (isRunning && timeLeft > 0) {
      setIsPaused(false);
      toast.success('Pause beendet! Weiter geht\'s!');
    }
  };

  const handleRoleChange = (newRole) => {
    setUser({ ...user, role: newRole });
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <header className="glass border-b border-emerald-100">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-emerald-900">FocusFlow</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-emerald-900 font-medium">{user?.name}</span>
                <span className="text-xs text-emerald-600">{roleDisplay}</span>
              </div>
              <Avatar>
                <AvatarImage src={user?.picture} />
                <AvatarFallback className="bg-emerald-600 text-white">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <Button 
                data-testid="settings-btn"
                onClick={() => setShowRoleSelector(!showRoleSelector)}
                variant="ghost"
                size="icon"
                className="text-emerald-700 hover:text-emerald-900"
              >
                <Settings className="w-5 h-5" />
              </Button>
              <Button 
                data-testid="logout-btn"
                onClick={logout}
                variant="ghost"
                size="icon"
                className="text-emerald-700 hover:text-emerald-900"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {showRoleSelector && (
          <div className="mb-6 sm:mb-8">
            <RoleSelector 
              currentRole={user?.role || 'individual'}
              onRoleChange={handleRoleChange}
            />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Timer Section */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <Card data-testid="timer-card" className="glass border-emerald-200">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-emerald-900">Lern-Timer</CardTitle>
                <CardDescription className="text-sm sm:text-base">Stelle deine gewünschte Lerndauer ein</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {!isRunning ? (
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <label className="text-lg font-medium text-emerald-900">Dauer: {timerDuration} Minuten</label>
                      </div>
                      <Slider 
                        data-testid="timer-duration-slider"
                        value={[timerDuration]}
                        onValueChange={(value) => setTimerDuration(value[0])}
                        min={5}
                        max={120}
                        step={5}
                        className="w-full"
                      />
                    </div>
                    <Button 
                      data-testid="start-timer-btn"
                      onClick={startTimer}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-lg rounded-xl"
                    >
                      <Play className="w-6 h-6 mr-2" />
                      Timer starten
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="text-center">
                      <div className="text-5xl sm:text-6xl font-bold text-emerald-900 mb-4">
                        {formatTime(timeLeft)}
                      </div>
                      <Progress value={progress} className="h-2 sm:h-3 mb-4" />
                      <p className="text-sm sm:text-base text-emerald-700">
                        {Math.floor(timeLeft / 60)} Minuten verbleibend
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <Button 
                        data-testid="pause-resume-btn"
                        onClick={pauseTimer}
                        variant="outline"
                        className="py-4 sm:py-6 text-base sm:text-lg border-emerald-300 touch-manipulation"
                      >
                        <Pause className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
                        {isPaused ? 'Fortsetzen' : 'Pausieren'}
                      </Button>
                      <Button 
                        data-testid="stop-timer-btn"
                        onClick={stopTimer}
                        variant="destructive"
                        className="py-4 sm:py-6 text-base sm:text-lg touch-manipulation"
                      >
                        Beenden
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Break Options */}
            <Card className="glass border-emerald-200">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl text-emerald-900">Pause benötigt?</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {user?.role === 'teacher' 
                    ? 'Wähle zwischen individuellen oder Gruppen-Übungen' 
                    : 'Wähle zwischen aktiven oder entspannenden Übungen'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <Button 
                  data-testid="active-break-btn"
                  onClick={() => takeBreak('active')}
                  className="h-28 sm:h-32 bg-gradient-to-br from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 active:from-orange-700 active:to-red-700 text-white flex-col space-y-2 rounded-xl touch-manipulation"
                >
                  <Coffee className="w-8 h-8 sm:w-10 sm:h-10" />
                  <span className="text-base sm:text-lg font-semibold">Aktive Pause</span>
                  <span className="text-xs sm:text-sm opacity-90">
                    {user?.role === 'teacher' ? 'Bewegung & Gruppenspiele' : 'Bewegung & Energie'}
                  </span>
                </Button>
                <Button 
                  data-testid="relaxed-break-btn"
                  onClick={() => takeBreak('relaxed')}
                  className="h-28 sm:h-32 bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 active:from-blue-700 active:to-purple-700 text-white flex-col space-y-2 rounded-xl touch-manipulation"
                >
                  <Heart className="w-8 h-8 sm:w-10 sm:h-10" />
                  <span className="text-base sm:text-lg font-semibold">Entspannende Pause</span>
                  <span className="text-xs sm:text-sm opacity-90">
                    {user?.role === 'teacher' ? 'Gruppen-Entspannung' : 'Meditation & Ruhe'}
                  </span>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Stats Section */}
          <div className="space-y-6">
            <Card data-testid="stats-card" className="glass border-emerald-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-emerald-900">
                  <TrendingUp className="w-5 h-5" />
                  <span>Deine Statistiken</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {stats ? (
                  <>
                    <StatItem 
                      icon={<Clock className="w-6 h-6 text-emerald-600" />}
                      label="Gesamt Lernzeit"
                      value={`${Math.floor(stats.total_study_minutes / 60)}h ${stats.total_study_minutes % 60}m`}
                    />
                    <StatItem 
                      icon={<Coffee className="w-6 h-6 text-orange-600" />}
                      label="Pausen genommen"
                      value={stats.total_breaks}
                    />
                    <div className="pt-4 border-t border-emerald-200">
                      <p className="text-sm text-emerald-700">
                        Aktuelle Session: {breaksThisSession} Pausen
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-emerald-600">Lädt...</div>
                )}
              </CardContent>
            </Card>

            <Card className="glass border-emerald-200 bg-gradient-to-br from-emerald-100 to-teal-100">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-emerald-900 mb-2">
                  {user?.role === 'teacher' ? 'Tipp für Lehrkräfte' : 'Tipp des Tages'}
                </h3>
                <p className="text-sm text-emerald-700">
                  {user?.role === 'teacher' 
                    ? 'Gruppenübungen am Smartboard fördern Gemeinschaftsgefühl und machen mehr Spaß! Probiere die Partner-Koordinationsspiele aus.' 
                    : 'Regelmäßige Pausen verbessern deine Konzentration und Produktivität. Versuche alle 25-50 Minuten eine kurze Pause einzulegen!'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Exercise Modal */}
      {showExerciseModal && (
        <ExerciseModal 
          category={exerciseCategory}
          userRole={user?.role || 'individual'}
          onClose={() => setShowExerciseModal(false)}
          onComplete={onBreakComplete}
        />
      )}
    </div>
  );
};

const StatItem = ({ icon, label, value }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <div className="p-2 bg-emerald-100 rounded-lg">
        {icon}
      </div>
      <span className="text-emerald-700">{label}</span>
    </div>
    <span className="text-2xl font-bold text-emerald-900">{value}</span>
  </div>
);

export default Dashboard;