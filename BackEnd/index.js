const express = require('express')
const mongoose = require('./Config/db')
const publicRoute = require('./Routes/publicRoutes')
const adminRoute = require('./Routes/adminRoutes')
const cors = require('cors')

const app = express()
const port = 1024

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174'] }))
app.use(express.json())

app.use('/', publicRoute)
app.use('/admin', adminRoute)

app.listen(port, (err) => {
    err ? console.error(err) : console.log(`Server is running on port ${port}`)
})
