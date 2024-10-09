const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/search', async (req, res) => {
  const query = req.query.q.trim();

  if (!query.startsWith('#') || query.length < 2) {
    return res.status(400).json({ error: 'Invalid tag format. Tags should start with "#" and be URL-encoded.' });
  }

  try {
    const playerTag = encodeURIComponent(query);
    const response = await fetch(`https://api.clashofclans.com/v1/players/${playerTag}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'Player not found.' });
      }
      if (response.status === 403) {
        return res.status(403).json({ error: 'Access denied. Invalid credentials or token.' });
      }
      throw new Error('Failed to fetch player data');
    }

    const data = await response.json();
    const playerDetails = {
      tag: data.tag,
      name: data.name,
      clan: data.clan ? data.clan.name : null,
      trophies: data.trophies,
      townHallLevel: data.townHallLevel,
    };
    res.json(playerDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/player/:tag', async (req, res) => {
  try {
    const playerTag = encodeURIComponent(req.params.tag);
    const response = await fetch(`https://api.clashofclans.com/v1/players/${playerTag}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_API_TOKEN}`,
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return res.status(404).json({ error: 'Player not found.' });
      }
      if (response.status === 403) {
        return res.status(403).json({ error: 'Access denied. Invalid credentials or token.' });
      }
      throw new Error('Failed to fetch player data');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
