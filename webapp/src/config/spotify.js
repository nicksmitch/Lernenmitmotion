// Spotify Configuration
// ============================================
// 1. Go to https://developer.spotify.com/dashboard
// 2. Create a new app
// 3. Add Redirect URI: http://localhost:5173/ (for development)
//    AND your Vercel URL: https://your-app.vercel.app/
// 4. Copy your Client ID and paste it below

export const SPOTIFY_CONFIG = {
  // 👇 PASTE YOUR SPOTIFY CLIENT ID HERE
  CLIENT_ID: 'YOUR_SPOTIFY_CLIENT_ID_HERE',
  
  // Redirect URI - will auto-detect localhost or production
  REDIRECT_URI: typeof window !== 'undefined' 
    ? window.location.origin + '/'
    : 'http://localhost:5173/',
  
  // Required scopes for playback and playlist access
  SCOPES: [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'playlist-read-private',
    'playlist-read-collaborative'
  ].join(' '),
  
  // Spotify API endpoints
  AUTH_ENDPOINT: 'https://accounts.spotify.com/authorize',
  API_BASE_URL: 'https://api.spotify.com/v1'
};

// Helper to check if Spotify is configured
export const isSpotifyConfigured = () => {
  return SPOTIFY_CONFIG.CLIENT_ID !== 'YOUR_SPOTIFY_CLIENT_ID_HERE' && 
         SPOTIFY_CONFIG.CLIENT_ID.length > 0;
};

// Get auth URL
export const getSpotifyAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: SPOTIFY_CONFIG.CLIENT_ID,
    response_type: 'token',
    redirect_uri: SPOTIFY_CONFIG.REDIRECT_URI,
    scope: SPOTIFY_CONFIG.SCOPES,
    show_dialog: 'true'
  });
  
  return `${SPOTIFY_CONFIG.AUTH_ENDPOINT}?${params.toString()}`;
};
