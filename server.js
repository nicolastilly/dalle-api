const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Servir le fichier HTML statique
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/generate-image', async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await openai.images.generate({
            prompt: prompt,
            n: 1,
            size: "512x512",
        });

        res.json({ imageUrl: response.data[0].url });
    } catch (error) {
        console.error('Error generating image:', error);
        res.status(500).json({ error: 'Error generating image' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});