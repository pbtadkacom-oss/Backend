const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        console.error('Stack trace:', err.stack);
        process.exit(1);
    }
};

module.exports = connectDB;
