
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 4002;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from back');
});

async function startServer() {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error('MONGO_URI est absente du fichier .env');
        }

        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');

        app.listen(port, () => {
            console.log('Le serveur tourne dans le port ' + port);
        });
    } catch (error) {
        console.error('Erreur de connexion :', error.message);
    }
}

startServer();
