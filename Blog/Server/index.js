const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/blogdb')

const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
})

const Blog = mongoose.model('Blog', BlogSchema)

app.post('/api/blogs', async (req, res) => {
    const { title, description } = req.body
    const blog = new Blog({ title, description })
    await blog.save()
    res.json(blog)
})

app.get('/api/blogs', async (req, res) => {
    const blogs = await Blog.find()
    res.json(blogs)
})

app.listen(5000, () => console.log('Server running on port 5000'))
