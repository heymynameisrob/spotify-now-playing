// const fetch = require("node-fetch");
// const querystring = require("querystring");
// const { NOW_PLAYING_ENDPOINT, SPOTIFY_ID, SPOTIFY_SECRET, SPOTIFY_REFRESH } = require("./constants");

import fetch from 'node-fetch';
import querystring from 'querystring';
import { NOW_PLAYING_ENDPOINT } from "./constants.js";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
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
  return fetch(NOW_PLAYING_ENDPOINT, {
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
  const albumImageUrl = song.item.album.images[0].url;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const isPlaying = song.is_playing;
  const songUrl = song.item.external_urls.spotify;
  const title = song.item.name;
  
  return {
    albumImageUrl,
    artist,
    isPlaying,
    songUrl,
    title,
  };
}

// module.exports = {getToken, getNowPlaying};
export { getToken, getNowPlaying };
