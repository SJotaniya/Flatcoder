const express = require('express')
const router = express.Router()
const blogController = require('../Controllers/adminController')

// Pages Routes
router.get('/', blogController.adminLogin)
router.get('/addBlog', blogController.addBlogPage)
router.get('/viewBlogs', blogController.viewBlogsPage)

module.exports = router