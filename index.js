// const express = require('express');
// const cors = require('cors');
// const getNowPlaying = require('./api');

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { getNowPlaying, getToken } from './api.js';

const app = express();
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:8080', 'https://heymynameisrob.com', 'https://www.heymynameisrob.com','https://heymynameisrob.netlify.app']
}));

app.get('/', async (req, res) => {
  const token = await getToken();
  const track = await getNowPlaying();  
  res.json(track)
})

const port = 5050;

app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`)
})
