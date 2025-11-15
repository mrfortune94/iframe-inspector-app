const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.static('public'));

// Proxy endpoint to fetch any URL and return raw HTML content
app.get('/fetch', async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing "url" query parameter');

  try {
    const response = await fetch(url);
    if (!response.ok) return res.status(response.status).send('Error fetching target URL');

    const html = await response.text();
    // Optionally, modify HTML here: rewrite URLs, inject scripts, etc.
    res.set('Content-Type', 'text/html');
    res.send(html);

  } catch (error) {
    res.status(500).send('Server error fetching URL');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy inspector started on port ${PORT}`));
