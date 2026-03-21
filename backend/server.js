const session = require('express-session');
const MongoStore = require('connect-mongo');
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
app.set('trust proxy', 1); // Trust first proxy (Render)
app.use(cors({
    origin: true, // In production, replace with your frontend URL
    credentials: true
}));
app.use(express.json());

// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'yoursecretkey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions'
    }),
    cookie: { 
        secure: true, // Required for HTTPS
        httpOnly: true,
        sameSite: 'none', // Required for cross-site cookies (frontend on different domain)
        maxAge: 24 * 60 * 60 * 1000 
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
