const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');

// Load environment variables
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// File Upload (using Multer)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});


// API Routes
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);


// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
});