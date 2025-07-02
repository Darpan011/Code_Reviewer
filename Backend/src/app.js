const express = require('express');
const aiRoutes = require('./routes/ai.routes');
const cors = require('cors');

const app = express()

app.use(cors()) // Enable CORS for all routes

app.use(express.json());
// Middleware to handle CORS(req.body in controller)

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api/ai',aiRoutes);

module.exports = app;