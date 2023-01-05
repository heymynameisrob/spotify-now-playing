import fetch from 'node-fetch';
import querystring from 'querystring';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
const token_endpoint = `https://accounts.spotify.com/api/token`;
const now_playing_endpoint = `https://api.spotify.com/v1/me/player/currently-playing`;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

const getToken = async () => {
  const response = await fetch(token_endpoint, {
    method: 'POST',
    headers: {       
      Authorization: `Basic ${basic}`,     
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,  
      client_id,
      client_secret            
    })
  });

return response.json();
};

const fetchNowPlaying = async () => {
  const { access_token } = await getToken();
  return fetch(now_playing_endpoint, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

const getNowPlaying = async () => {
  const response = await fetchNowPlaying();
  if (response.status === 204 || response.status > 400) {
    return false;
  }
  const song = await response.json();
  const albumImage = song.item.album.images[0].url;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const isPlaying = song.is_playing;
  const songUrl = song.item.external_urls.spotify;
  const title = song.item.name;
  
  return {
    albumImage,
    artist,
    isPlaying,
    songUrl,
    title,
  };
}

export { getToken, getNowPlaying };
