const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files (index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Define the proxy route
app.get('/proxy', async (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).send('Item query is required');
    }

    const url = `https://terraria.wiki.gg/api.php?action=query&format=json&titles=${encodeURIComponent(query)}&prop=info`;

    try {
        const response = await axios.get(url);
        console.log('API Response:', response.data);  // Log the entire response for debugging

        const pages = response.data.query.pages;
        const pageId = Object.keys(pages)[0];

        if (pageId === "-1") {
            return res.status(404).send('Item not found');
        }

        const itemData = {
            title: pages[pageId].title,
            pageUrl: `https://terraria.wiki.gg/wiki/${encodeURIComponent(pages[pageId].title)}`
        };

        res.json(itemData);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Failed to fetch data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
