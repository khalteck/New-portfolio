# Spotify listening integration

The listening panel calls `/api/listening`. On Netlify, that route securely exchanges a Spotify
refresh token server-side and returns the currently playing track. The browser never receives
Spotify credentials.

## Configure Netlify

Set these Netlify environment variables for the deployed site:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `SPOTIFY_REFRESH_TOKEN`

Create the refresh token with Spotify's Authorization Code flow and request the
`user-read-currently-playing` scope. When Spotify reports no active track, the portfolio presents
the neutral “No track playing” state and does not show outbound music-service links.
