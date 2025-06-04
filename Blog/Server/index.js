const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

mongoose.connect('mongodb://localhost:27017/blogdb');

const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
});

const Blog = mongoose.model('Blog', BlogSchema);

// Multer setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'server/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Create blog with image upload
app.post('/api/blogs', upload.single('image'), async (req, res) => {
    const { title, description } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";
    const blog = new Blog({ title, description, image });
    await blog.save();
    res.json(blog);
});

// Get all blogs
app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.find();
    res.json(blogs);
});

app.listen(5000, () => console.log('Server running on port 5000'));