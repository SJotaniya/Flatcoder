const Blog = require('../Models/Schema');

exports.adminLogin = async (req, res) => {
   res.send('Welcome to the Admin Login Page');
}

exports.addBlogPage = async (req, res) => {
   res.send('Create a new blog post here');
}

exports.viewBlogsPage = async (req, res) => {
   res.send('View all blog posts here');
}
