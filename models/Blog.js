const mongoose = require('mongoose')
const Blog = mongoose.Schema({
    author: String,
    image: String,
    text: String,
    like: String
})
module.exports = mongoose.model('Blog', Blog)