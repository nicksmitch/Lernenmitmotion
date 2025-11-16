import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Music, Play, Pause, Volume2, Search, Check } from 'lucide-react';
import { useSpotify } from '../hooks/useSpotify';
import { getSpotifyAuthUrl } from '../config/spotify';
import { toast } from 'sonner';

const SpotifyPlayer = () => {
  const {
    accessToken,
    isReady,
    isPremium,
    isPlaying,
    currentTrack,
    playPlaylist,
    searchPlaylists,
    togglePlay,
    setVolume,
    logout,
    isConfigured
  } = useSpotify();

  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('Binaural Beats Focus');
  const [searching, setSearching] = useState(false);

  // Auto-search for Binaural Beats Focus on mount
  useEffect(() => {
    if (accessToken && !playlists.length) {
      handleSearch();
    }
  }, [accessToken]);

  const handleLogin = () => {
    if (!isConfigured) {
      toast.error('Spotify Client ID nicht konfiguriert. Bitte in src/config/spotify.js eintragen.');
      return;
    }
    window.location.href = getSpotifyAuthUrl();
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setSearching(true);
    try {
      const results = await searchPlaylists(searchQuery);
      setPlaylists(results);
      if (results.length === 0) {
        toast.info('Keine Playlists gefunden');
      }
    } catch (error) {
      toast.error('Fehler bei der Suche');
    } finally {
      setSearching(false);
    }
  };

  const handlePlayPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
    playPlaylist(playlist.uri);
    toast.success(`Spiele: ${playlist.name}`);
  };

  // Not configured
  if (!isConfigured) {
    return (
      <Card className="glass border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-emerald-900">
            <Music className="w-5 h-5" />
            <span>Fokus-Musik</span>
          </CardTitle>
          <CardDescription>Spotify Integration</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800 mb-2">
              ⚠️ <strong>Spotify nicht konfiguriert</strong>
            </p>
            <p className="text-xs text-yellow-700">
              Füge deine Spotify Client ID in <code className="bg-yellow-100 px-1 rounded">src/config/spotify.js</code> ein.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Not logged in
  if (!accessToken) {
    return (
      <Card className="glass border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-emerald-900">
            <Music className="w-5 h-5" />
            <span>Fokus-Musik</span>
          </CardTitle>
          <CardDescription>Verbinde Spotify für Hintergrundmusik während dem Lernen</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleLogin}
            className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-white py-6 rounded-xl"
          >
            <Music className="w-5 h-5 mr-2" />
            Mit Spotify verbinden
          </Button>
          <p className="text-xs text-emerald-600 mt-2 text-center">
            Spotify Premium erforderlich für Wiedergabe
          </p>
        </CardContent>
      </Card>
    );
  }

  // Not premium
  if (accessToken && !isPremium) {
    return (
      <Card className="glass border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-emerald-900">
            <Music className="w-5 h-5" />
            <span>Fokus-Musik</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800 mb-2">
              🎵 <strong>Spotify Premium benötigt</strong>
            </p>
            <p className="text-xs text-blue-700 mb-3">
              Web-Wiedergabe erfordert ein Premium-Abo.
            </p>
            <a
              href="https://www.spotify.com/premium/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline"
            >
              Jetzt upgraden →
            </a>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className="w-full mt-3"
          >
            Abmelden
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Player ready
  return (
    <Card data-testid="spotify-player" className="glass border-emerald-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2 text-emerald-900">
              <Music className="w-5 h-5" />
              <span>Fokus-Musik</span>
            </CardTitle>
            <CardDescription>
              {isReady ? '✓ Verbunden' : 'Verbinde...'}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-xs"
          >
            Abmelden
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Track */}
        {currentTrack && (
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              {currentTrack.image && (
                <img 
                  src={currentTrack.image} 
                  alt={currentTrack.name}
                  className="w-12 h-12 rounded"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-emerald-900 truncate">
                  {currentTrack.name}
                </p>
                <p className="text-xs text-emerald-600 truncate">
                  {currentTrack.artists}
                </p>
              </div>
              <Button
                onClick={togglePlay}
                size="icon"
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <Volume2 className="w-4 h-4 text-emerald-600" />
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            onChange={(e) => setVolume(parseInt(e.target.value) / 100)}
            className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        {/* Search Toggle */}
        <Button
          onClick={() => setShowSearch(!showSearch)}
          variant="outline"
          className="w-full"
        >
          <Search className="w-4 h-4 mr-2" />
          {showSearch ? 'Suche ausblenden' : 'Playlist suchen'}
        </Button>

        {/* Search Section */}
        {showSearch && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="z.B. Binaural Beats Focus"
                className="flex-1 px-3 py-2 rounded-lg border border-emerald-300 text-sm"
              />
              <Button
                onClick={handleSearch}
                disabled={searching}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {searching ? '...' : 'Suchen'}
              </Button>
            </div>

            {/* Playlist Results */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {playlists.map((playlist) => (
                <button
                  key={playlist.id}
                  onClick={() => handlePlayPlaylist(playlist)}
                  className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-emerald-50 transition-colors text-left ${
                    selectedPlaylist?.id === playlist.id ? 'bg-emerald-100 ring-2 ring-emerald-400' : ''
                  }`}
                >
                  {playlist.images[0] && (
                    <img 
                      src={playlist.images[0].url} 
                      alt={playlist.name}
                      className="w-10 h-10 rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-emerald-900 truncate">
                      {playlist.name}
                    </p>
                    <p className="text-xs text-emerald-600">
                      {playlist.tracks.total} Tracks
                    </p>
                  </div>
                  {selectedPlaylist?.id === playlist.id && (
                    <Check className="w-4 h-4 text-emerald-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Helpful tip */}
        {!currentTrack && (
          <p className="text-xs text-emerald-600 text-center">
            💡 Tipp: Suche nach "Binaural Beats", "Study Music" oder "Focus Playlist"
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SpotifyPlayer;
