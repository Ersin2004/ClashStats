const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 5000;

// Cors middleware
app.use(cors());

// Mock players
const mockPlayers = [
  { tag: '#LVRQCP9G0', name: 'Lucky' },
  { tag: '#20GPPGUL8', name: 'Player 2' },
  { tag: '#LVRQCP9G0', name: 'Player 3' },
  { tag: '#LVRQCP9G0', name: 'Player 4' },
  { tag: '#LVRQCP9G0', name: 'Player 5' },
];

// Endpoint to search players
app.get('/search', (req, res) => {
  const query = req.query.q.toLowerCase();
  const results = mockPlayers.filter(player =>
    player.name.toLowerCase().includes(query)
  );
  res.json(results);
});

// Endpoint to get player details
app.get('/player/:tag', async (req, res) => {
  try {
    const playerTag = encodeURIComponent(req.params.tag);
    const response = await fetch(`https://api.clashofclans.com/v1/players/${playerTag}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_API_TOKEN}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch player data');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
