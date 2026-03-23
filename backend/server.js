const session = require('express-session');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const { startWidgetService } = require('./utils/widgetService');
require('dotenv').config();

const app = express();

// Connect Database
connectDB();
startWidgetService();

// Init Middleware
app.use(cors({
    origin: true, // Allow any origin to match the requester
    credentials: true
}));
app.use(express.json());

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'yoursecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // Set to true if using HTTPS
        httpOnly: true, // Prevents client-side JS from reading the cookie
        maxAge: 24 * 60 * 60 * 1000 // Session expires after 24 hours
    }
}));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Define Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/news', require('./routes/news'));
app.use('/api/celebrities', require('./routes/celebrities'));
app.use('/api/videos', require('./routes/videos'));
app.use('/api/users', require('./routes/users'));
app.use('/api/widgets', require('./routes/widgets'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
