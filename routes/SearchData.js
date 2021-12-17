const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Signupdetails = require("../models/Signupdetails");
module.exports = router;
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const jwt = require("jsonwebtoken");


const blogData = require('../models/Blog')




router.post('/', async (req, res) => {
  var wordSplited = req.body.search.split(/\s+/);
  var regToMatch = new RegExp(wordSplited.join("|"));
  const BlogData = await blogData.find({ title: { $regex: regToMatch, $options: 'i' } }, { _id: 0 })
  res.status(200).send({
    success: true,
    message: BlogData.length,
    data: BlogData
  })
})
