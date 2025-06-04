const express = require('express')
const DB = require('./Configs/DB')

const app = express()
const port = 1024

app.set('view engine', 'ejs')
app.use(express.urlencoded())

app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(port, () => {
    console.log('Server started on port : ', port)
})
