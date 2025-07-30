const express = require('express');
const cors = require('cors');
const app = express();

// DOTENV configuration
require('dotenv').config();
const PORT = process.env.PORT || 4001;

// Database connection
const connectDB = require('./Config/Database');
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"]
}))

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