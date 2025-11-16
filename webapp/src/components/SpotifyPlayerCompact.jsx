import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Music, Play, Pause, ChevronDown, ChevronUp, LogOut } from 'lucide-react';
import { useSpotify } from '../hooks/useSpotify';
import { getSpotifyAuthUrl } from '../config/spotify';
import { toast } from 'sonner';

const SpotifyPlayerCompact = () => {
  const {
    accessToken,
    isReady,
    isPremium,
    isPlaying,
    currentTrack,
    playPlaylist,
    searchPlaylists,
    togglePlay,
    logout,
    isConfigured
  } = useSpotify();

  const [expanded, setExpanded] = useState(false);
  const [playlists, setPlaylists] = useState([]);

  // Auto-load Binaural Beats on mount
  useEffect(() => {
    if (accessToken && !playlists.length && expanded) {
      searchPlaylists('Binaural Beats Focus').then(setPlaylists);
    }
  }, [accessToken, expanded]);

  const handleLogin = () => {
    if (!isConfigured) {
      toast.error('Spotify Client ID nicht konfiguriert');
      return;
    }
    window.location.href = getSpotifyAuthUrl();
  };

  const handlePlayPlaylist = (playlist) => {
    playPlaylist(playlist.uri);
    toast.success(`Spiele: ${playlist.name}`);
    setExpanded(false);
  };

  // Not configured - minimal warning
  if (!isConfigured) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
        ⚙️ Spotify: Client ID nicht konfiguriert
      </div>
    );
  }

  // Not logged in - compact login button
  if (!accessToken) {
    return (
      <Card className="glass border-emerald-200">
        <CardContent className="p-4">
          <Button
            onClick={handleLogin}
            className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white"
            size="sm"
          >
            <Music className="w-4 h-4 mr-2" />
            Spotify verbinden
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Not premium
  if (accessToken && !isPremium) {
    return (
      <Card className="glass border-emerald-200">
        <CardContent className="p-4 space-y-2">
          <p className="text-xs text-blue-700">🎵 Spotify Premium benötigt</p>
          <Button onClick={logout} variant="outline" size="sm" className="w-full">
            Abmelden
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Compact player
  return (
    <Card className="glass border-emerald-200">
      <CardContent className="p-4">
        {/* Compact View */}
        <div className="space-y-3">
          {/* Current Track or Connect Status */}
          {currentTrack ? (
            <div className="flex items-center space-x-3">
              {currentTrack.image && (
                <img 
                  src={currentTrack.image} 
                  alt={currentTrack.name}
                  className="w-10 h-10 rounded"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-emerald-900 truncate">
                  {currentTrack.name}
                </p>
                <p className="text-xs text-emerald-600 truncate">
                  🎵 {currentTrack.artists}
                </p>
              </div>
              <Button
                onClick={togglePlay}
                size="icon"
                variant="ghost"
                className="flex-shrink-0"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Music className="w-4 h-4 text-emerald-600" />
                <span className="text-sm text-emerald-700">
                  {isReady ? 'Bereit' : 'Verbinde...'}
                </span>
              </div>
              <Button
                onClick={() => setExpanded(!expanded)}
                variant="ghost"
                size="sm"
              >
                {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </Button>
            </div>
          )}

          {/* Expand/Collapse Button */}
          {!expanded && currentTrack && (
            <Button
              onClick={() => setExpanded(true)}
              variant="outline"
              size="sm"
              className="w-full text-xs"
            >
              Playlist wechseln
            </Button>
          )}

          {/* Expanded Playlist Selection */}
          {expanded && (
            <div className="space-y-2 pt-2 border-t border-emerald-200">
              <p className="text-xs font-semibold text-emerald-900">Fokus-Playlists:</p>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {playlists.length === 0 ? (
                  <p className="text-xs text-emerald-600">Lade...</p>
                ) : (
                  playlists.slice(0, 5).map((playlist) => (
                    <button
                      key={playlist.id}
                      onClick={() => handlePlayPlaylist(playlist)}
                      className="w-full flex items-center space-x-2 p-2 rounded hover:bg-emerald-50 transition-colors text-left"
                    >
                      {playlist.images[0] && (
                        <img 
                          src={playlist.images[0].url} 
                          alt={playlist.name}
                          className="w-8 h-8 rounded"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-emerald-900 truncate">
                          {playlist.name}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setExpanded(false)}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                >
                  Schließen
                </Button>
                <Button
                  onClick={logout}
                  variant="ghost"
                  size="sm"
                  className="text-xs"
                >
                  <LogOut className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SpotifyPlayerCompact;
