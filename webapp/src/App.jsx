import { useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import './App.css';

// Auth Context (bleibt, damit andere Komponenten nicht kaputt gehen)
export const AuthContext = createContext(null);

function App() {
  // Öffentlich: kein Login, kein User
  const [user] = useState(null);

  // Dummy-Funktionen, damit Komponenten die Props/Context erwarten, nicht crashen
  const logout = async () => {};
  const updateUserRole = () => {};

  return (
    <AuthContext.Provider value={{ user, setUser: () => {}, logout, updateUserRole }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Öffentlich */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Auth-Seite deaktiviert */}
            <Route path="/auth" element={<Navigate to="/" />} />

            {/* Rechtliches */}
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="top-right" />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
