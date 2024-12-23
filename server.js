const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const videoRoutes = require('./routes/videos');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);

// Connect DB and Start Server
connectDB();
const PORT = 5000;
app.get("/", (req,res) => {
    res.send("hello i am shivasai")
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
