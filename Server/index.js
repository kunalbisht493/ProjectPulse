const express = require('express');
const app = express();

// DOTENV configuration
require('dotenv').config();
const PORT = process.env.PORT || 4001;

// Database connection
const connectDB = require('./Config/Database');
connectDB();

// Middleware
app.use(express.json());

// Importing routes
const routes = require('./Routes/routes');
app.use('/api/v1',routes);

// SERVER LISTENING
app.listen(PORT, (err) => {
    if(err){
        console.error('Error starting server:', err);
    }
    else{
        console.log(`Server is running on port ${PORT}`);
    }
})