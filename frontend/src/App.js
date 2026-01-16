import React, { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "./components/ui/sonner";

// Auth Context - kept for future use
export const AuthContext = React.createContext(null);

// Local Storage Keys
const STORAGE_KEYS = {
  GUEST_USER: 'focusflow_guest_user',
  STATS: 'focusflow_stats',
  TIMER_DURATION: 'focusflow_timer_duration'
};

// Create or get guest user
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

// Get or create stats
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
    // Initialize guest user
    const guestUser = getOrCreateGuestUser();
    setUser(guestUser);
    setLoading(false);
  }, []);

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEYS.GUEST_USER, JSON.stringify(updatedUser));
  };

  const logout = () => {
    // Clear local storage and reset to new guest
    localStorage.removeItem(STORAGE_KEYS.GUEST_USER);
    localStorage.removeItem(STORAGE_KEYS.STATS);
    localStorage.removeItem(STORAGE_KEYS.TIMER_DURATION);
    
    const newGuestUser = getOrCreateGuestUser();
    setUser(newGuestUser);
    window.location.href = '/';
  };

  // Helper functions for stats (accessible via context)
  const getStats = () => getOrCreateStats();
  
  const updateStats = (updates) => {
    const currentStats = getOrCreateStats();
    const updatedStats = { ...currentStats, ...updates };
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(updatedStats));
    return updatedStats;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-emerald-700 font-medium">Lädt...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser: updateUser, logout, getStats, updateStats }}>
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
