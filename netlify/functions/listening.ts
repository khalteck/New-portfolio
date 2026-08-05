interface SpotifyImage {
  url: string;
}

interface SpotifyTrack {
  name: string;
  artists: Array<{ name: string }>;
  album: { images: SpotifyImage[] };
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Cache-Control": "public, max-age=30, s-maxage=30, stale-while-revalidate=60",
      "Content-Type": "application/json"
    }
  });

export default async () => {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!refreshToken || !clientId || !clientSecret) return json(null);

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: refreshToken })
  });
  if (!tokenResponse.ok) return json(null);

  const { access_token: accessToken } = (await tokenResponse.json()) as { access_token?: string };
  if (!accessToken) return json(null);

  const playbackResponse = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (playbackResponse.status === 204 || !playbackResponse.ok) return json(null);

  const playback = (await playbackResponse.json()) as {
    is_playing?: boolean;
    item?: SpotifyTrack | null;
  };
  if (!playback.is_playing || !playback.item) return json(null);

  return json({
    title: playback.item.name,
    artist: playback.item.artists.map((artist) => artist.name).join(", "),
    albumArtUrl: playback.item.album.images[0]?.url
  });
};
