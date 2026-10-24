const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 4002;

app.use(express.json());

// Connexion à MongoDB (réutilisée entre les appels sur Vercel)
let connexion = null;
async function connecterDB() {
    if (mongoose.connection.readyState === 1) return;
    const uri = process.env.MONGO_URI;
    if (!uri) {
        throw new Error('MONGO_URI est absente');
    }
    if (!connexion) {
        connexion = mongoose.connect(uri);
    }
    await connexion;
    console.log('MongoDB connected successfully');
}

// Connecte la base avant chaque requête, sans bloquer la route "/"
app.use(async (req, res, next) => {
    try {
        await connecterDB();
    } catch (error) {
        console.error('Erreur de connexion :', error.message);
    }
    next();
});

app.get('/', (req, res) => {
    res.send("Hello from back");
});

// Lancer le serveur seulement en local (node server.js)
if (require.main === module) {
    app.listen(port, () => {
        console.log('Le serveur tourne dans le port ' + port);
    });
}

// Indispensable pour Vercel
module.exports = app;