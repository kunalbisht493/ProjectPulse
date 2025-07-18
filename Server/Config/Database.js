const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    await mongoose.connect(process.env.DATABASE_URL)
    .then(console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
}
module.exports = connectDB;