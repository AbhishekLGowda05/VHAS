const express = require('express');
const path = require('path');
const routes = require('./routes/mainRoutes.js');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB=require('./config/db.js');
//const initializeLidarSubscriber = require('./utils/rosSubscriber.js');

dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static())
app.use('/api',routes)





app.listen(PORT, () => {
    connectDB();
   // initializeLidarSubscriber();
    console.log(`Server running on http://localhost:${PORT}`);
});