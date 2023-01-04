const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const SPOTIFY_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REFRESH = process.env.SPOTIFY_REFRESH_TOKEN;

export { TOKEN_ENDPOINT, NOW_PLAYING_ENDPOINT, SPOTIFY_ID, SPOTIFY_SECRET, SPOTIFY_REFRESH}