const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
})

const Blogs = mongoose.model('Blogs', schema)
module.exports = Blogs
