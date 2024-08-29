const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 5000;

// Cors middleware
app.use(cors());

app.get('/player', async (req, res) => {
  try {
    const response = await fetch('https://api.clashofclans.com/v1/players/%23LVRQCP9G0', {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_API_TOKEN}`,
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to the Clash Stats API!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
