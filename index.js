// const express = require('express');
// const cors = require('cors');
// const getNowPlaying = require('./api');

import express from 'express';
import cors from 'cors';
import { getNowPlaying, getToken } from './api.js';

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  const token = await getToken();
  const track = await getNowPlaying();  
  res.json(track)
})

const port = 5050;

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})