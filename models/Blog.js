const mongoose = require('mongoose')
const Blog = mongoose.Schema({
    author: String,
    title:String,
    image: String,
    text: String,
    like: String
})
module.exports = mongoose.model('Blog', Blog)