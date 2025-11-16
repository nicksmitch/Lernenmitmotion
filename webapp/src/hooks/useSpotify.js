import { useState, useEffect, useCallback } from 'react';
import { SPOTIFY_CONFIG, isSpotifyConfigured } from '../config/spotify';

export const useSpotify = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [player, setPlayer] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);

  // Check for token in URL or localStorage
  useEffect(() => {
    const hash = window.location.hash;
    let token = localStorage.getItem('spotify_access_token');

    if (!token && hash) {
      const params = new URLSearchParams(hash.substring(1));
      token = params.get('access_token');
      
      if (token) {
        localStorage.setItem('spotify_access_token', token);
        window.location.hash = '';
      }
    }

    if (token) {
      setAccessToken(token);
    }
  }, []);

  // Initialize Spotify Player
  useEffect(() => {
    if (!accessToken || !isSpotifyConfigured()) return;

    // Check if user has premium
    fetch(`${SPOTIFY_CONFIG.API_BASE_URL}/me`, {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    })
      .then(res => res.json())
      .then(data => {
        setIsPremium(data.product === 'premium');
        if (data.product !== 'premium') {
          console.warn('Spotify Premium required for playback');
        }
      })
      .catch(err => console.error('Error checking premium:', err));

    // Load Spotify SDK
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const spotifyPlayer = new window.Spotify.Player({
        name: 'FocusFlow Player',
        getOAuthToken: cb => { cb(accessToken); },
        volume: 0.5
      });

      spotifyPlayer.addListener('ready', ({ device_id }) => {
        console.log('Spotify Player Ready:', device_id);
        setDeviceId(device_id);
        setIsReady(true);
      });

      spotifyPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Device offline:', device_id);
        setIsReady(false);
      });

      spotifyPlayer.addListener('player_state_changed', state => {
        if (!state) return;
        
        setIsPlaying(!state.paused);
        setCurrentTrack({
          name: state.track_window.current_track.name,
          artists: state.track_window.current_track.artists.map(a => a.name).join(', '),
          album: state.track_window.current_track.album.name,
          image: state.track_window.current_track.album.images[0]?.url
        });
      });

      spotifyPlayer.connect();
      setPlayer(spotifyPlayer);
    };

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [accessToken]);

  // Play playlist
  const playPlaylist = useCallback(async (playlistUri) => {
    if (!accessToken || !deviceId) return;

    try {
      await fetch(`${SPOTIFY_CONFIG.API_BASE_URL}/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          context_uri: playlistUri
        })
      });
    } catch (error) {
      console.error('Error playing playlist:', error);
    }
  }, [accessToken, deviceId]);

  // Search for playlists
  const searchPlaylists = useCallback(async (query) => {
    if (!accessToken) return [];

    try {
      const response = await fetch(
        `${SPOTIFY_CONFIG.API_BASE_URL}/search?q=${encodeURIComponent(query)}&type=playlist&limit=10`,
        {
          headers: { 'Authorization': `Bearer ${accessToken}` }
        }
      );
      const data = await response.json();
      return data.playlists.items;
    } catch (error) {
      console.error('Error searching playlists:', error);
      return [];
    }
  }, [accessToken]);

  // Play/Pause toggle
  const togglePlay = useCallback(() => {
    if (player) {
      player.togglePlay();
    }
  }, [player]);

  // Set volume
  const setVolume = useCallback((volume) => {
    if (player) {
      player.setVolume(volume);
    }
  }, [player]);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem('spotify_access_token');
    setAccessToken(null);
    if (player) {
      player.disconnect();
    }
  }, [player]);

  return {
    accessToken,
    isReady,
    isPremium,
    isPlaying,
    currentTrack,
    deviceId,
    playPlaylist,
    searchPlaylists,
    togglePlay,
    setVolume,
    logout,
    isConfigured: isSpotifyConfigured()
  };
};
