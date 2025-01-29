const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Welcome to the API!');
  });
  

// MongoDB Connection (Explicitly connecting to 'test' database)
mongoose.connect(process.env.MONGO_URI + "/test")

    .then(() => console.log("Connected to MongoDB 'test' Database"))
    .catch(err => console.error(err));

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "blog_posts",
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});
const upload = multer({ storage });

// Blog Post Schema (Collection name explicitly set)
const postSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String
}, { collection: 'postSchema' });

const Post = mongoose.model('Post', postSchema);

// Create a Blog Post
app.post('/api/posts', upload.single('image'), async (req, res) => {
    try {
        const { title, description } = req.body;
        const image = req.file.path; // Cloudinary URL

        const newPost = new Post({ title, image, description });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: "Failed to create post" });
    }
});

// Fetch All Blog Posts
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
});



// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
