const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/Encircle')
const db = mongoose.connection

db.on('error', (err) => {
    err ? console.error(err) : console.log('No Connection Error');
})
    
db.once('open', (err) => {
    err ? console.error(err) : console.log('Connected to MongoDB')
})

module.exports = db