const express = require('express')
const publicRouter = express.Router()
const publicController = require('../Controllers/publicController')

publicRouter.get('/', publicController.homePage)

module.exports = publicRouter