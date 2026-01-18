import React, { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "./components/ui/sonner";

// 🔹 Move2Focus Auth Context (beibehalten für spätere Erweiterungen)
export const AuthContext = React.createContext(null);

// 🔹 Local Storage Keys (umbenannt von focusflow_* → move2focus_*)
const STORAGE_KEYS = {
  GUEST_USER: 'move2focus_guest_user',
  STATS: 'move2focus_stats',
  TIMER_DURATION: 'move2focus_timer_duration'
};

// 🔹 Erstellt oder lädt den Gastnutzer aus dem LocalStorage
const getOrCreateGuestUser = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.GUEST_USER);
  if (stored) {
    return JSON.parse(stored);
  }

  const guestUser = {
    id: `guest_${Date.now()}`,
    name: 'Gast',
    email: null,
    picture: null,
    role: 'individual',
    isGuest: true,
    created_at: new Date().toISOString()
  };

  localStorage.setItem(STORAGE_KEYS.GUEST_USER, JSON.stringify(guestUser));
  return guestUser;
};

// 🔹 Erstellt oder lädt Statistikdaten
const getOrCreateStats = () => {
  const stored = localStorage.getItem(STORAGE_KEYS.STATS);
  if (stored) {
    return JSON.parse(stored);
  }

  const initialStats = {
    total_study_minutes: 0,
    total_breaks: 0,
    last_timer_duration: 25
  };

  localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(initialStats));
  return initialStats;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialisiere Gastnutzer
    const guestUser = getOrCreateGuestUser();
    setUser(guestUser);
    setLoading(false);
  }, []);

  // 🔹 Nutzer aktualisieren
  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.GUEST_USER, JSON.stringify(updatedUser));
  };

  // 🔹 Logout & Daten löschen
  const logout = () => {
    localStorage.removeItem(STORAGE_KEYS.GUEST_USER);
    localStorage.removeItem(STORAGE_KEYS.STATS);
    localStorage.removeItem(STORAGE_KEYS.TIMER_DURATION);

    const newGuestUser = getOrCreateGuestUser();
    setUser(newGuestUser);
    window.location.href = '/';
  };

  // 🔹 Statistik-Helferfunktionen
  const getStats = () => getOrCreateStats();

  const updateStats = (updates) => {
    const currentStats = getOrCreateStats();
    const updatedStats = { ...currentStats, ...updates };
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updatedStats));
    return updatedStats;
  };

  // 🔹 Ladezustand
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-emerald-700 font-medium">Move2Focus lädt...</p>
        </div>
      </div>
    );
  }

  // 🔹 Hauptstruktur
  return (
    <AuthContext.Provider
      value={{ user, setUser: updateUser, logout, getStats, updateStats }}
    >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
