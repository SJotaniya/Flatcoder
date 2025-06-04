const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Blogs')
const DB = mongoose.connection

DB.once('open', (err) => {
    err ? console.log(err) : console.log('Database connected successfully.')
})

module.exports = DB
