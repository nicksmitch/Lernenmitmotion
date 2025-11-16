import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { X, CheckCircle, Loader2, Users, Volume2, VolumeX } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ExerciseModal = ({ category, userRole, onClose, onComplete }) => {
  const [exercises, setExercises] = useState([]);
  const [currentExercise, setCurrentExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const speechSynthRef = useRef(null);

  useEffect(() => {
    fetchExercises();
  }, [category, userRole]);

  const fetchExercises = async () => {
    try {
      const response = await axios.get(`${API}/exercises/${category}`, {
        withCredentials: true
      });
      
      if (response.data.length === 0) {
        toast.info('Keine Übungen gefunden.');
        setCurrentExercise(getDefaultExercise(category));
      } else {
        const randomExercise = response.data[Math.floor(Math.random() * response.data.length)];
        setCurrentExercise(randomExercise);
      }
    } catch (error) {
      console.error('Error fetching exercises:', error);
      setCurrentExercise(getDefaultExercise(category));
    } finally {
      setLoading(false);
    }
  };

  const getDefaultExercise = (cat) => {
    if (cat === 'active') {
      return {
        title: 'Jumping Jacks',
        description: '1. Stehe aufrecht mit Füßen zusammen und Armen an den Seiten.\n2. Springe und spreize gleichzeitig deine Beine schulterbreit.\n3. Hebe gleichzeitig deine Arme über den Kopf.\n4. Springe zurück in die Ausgangsposition.\n5. Wiederhole für 3 Minuten in einem angenehmen Tempo.',
        duration_minutes: 3,
        is_group_exercise: false
      };
    } else {
      return {
        title: 'Atemübung 4-7-8',
        description: '1. Setze dich bequem hin oder lege dich hin.\n2. Atme vollständig durch den Mund aus.\n3. Schließe den Mund und atme ruhig durch die Nase ein, zähle bis 4.\n4. Halte den Atem an und zähle bis 7.\n5. Atme vollständig durch den Mund aus, zähle bis 8.\n6. Wiederhole diesen Zyklus 4 Mal.',
        duration_minutes: 5,
        is_group_exercise: false
      };
    }
  };

  const handleComplete = () => {
    toast.success('Großartig! Pause abgeschlossen.');
    onComplete();
  };

  const handleNext = () => {
    stopReading();
    fetchExercises();
  };

  const startReading = () => {
    if (!currentExercise) return;
    
    // Check if browser supports speech synthesis
    if (!('speechSynthesis' in window)) {
      toast.error('Dein Browser unterstützt keine Sprachausgabe');
      return;
    }

    // Stop any ongoing speech
    window.speechSynthesis.cancel();

    // Prepare text
    const textToRead = `${currentExercise.title}. 
    Dauer: ${currentExercise.duration_minutes} Minuten. 
    Anleitung: ${currentExercise.description}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'de-DE';
    utterance.rate = 0.9; // Slightly slower for better understanding
    utterance.pitch = 1.0;

    // Try to find a German voice
    const voices = window.speechSynthesis.getVoices();
    const germanVoice = voices.find(voice => voice.lang.startsWith('de'));
    if (germanVoice) {
      utterance.voice = germanVoice;
    }

    utterance.onstart = () => {
      setIsReading(true);
      toast.success('Vorlesen gestartet');
    };

    utterance.onend = () => {
      setIsReading(false);
      toast.info('Vorlesen beendet');
    };

    utterance.onerror = (event) => {
      setIsReading(false);
      console.error('Speech error:', event);
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

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Stop reading when exercise changes
  useEffect(() => {
    stopReading();
    setImageError(false);
  }, [currentExercise]);

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
            {currentExercise?.is_group_exercise ? (
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
          {loading ? (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mx-auto mb-4" />
              <p className="text-emerald-700">Übung wird geladen...</p>
            </div>
          ) : currentExercise ? (
            <>
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

              {currentExercise.image_url && !imageError && (
                <div className="rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center min-h-[12rem] sm:min-h-[16rem]">
                  <img 
                    src={currentExercise.image_url} 
                    alt={currentExercise.title}
                    className="w-full h-auto max-h-48 sm:max-h-64 object-contain p-2"
                    onError={() => setImageError(true)}
                    loading="lazy"
                  />
                </div>
              )}
              
              {imageError && (
                <div className="rounded-xl overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center h-48 sm:h-64">
                  <p className="text-emerald-600 text-center px-4">
                    Bild wird geladen oder ist nicht verfügbar
                  </p>
                </div>
              )}

              <div className="bg-emerald-50 rounded-xl p-4 sm:p-6">
                <h4 className="font-semibold text-emerald-900 mb-3 text-sm sm:text-base">Anleitung:</h4>
                <div className="space-y-2 text-emerald-800 text-sm sm:text-base">
                  {currentExercise.description.split('\n').map((line, index) => (
                    <p key={index} className="leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>

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
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-emerald-700">Keine Übung verfügbar</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExerciseModal;