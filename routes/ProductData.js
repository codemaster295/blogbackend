const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Signupdetails = require("../models/Signupdetails");
module.exports = router;
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const jwt = require("jsonwebtoken");
const Product = require('../models/Product')


router.post("/add", async (req, res) => {
  const { Name, Category, Description, Price, Discount, Images, General, Dial, Case, Band, AdditionInformation } = req.body
  let product = new Product({
    Name, Category, Description, Price, Discount, Images, General, Dial, Case, Band, AdditionInformation
  })
  console.log(Images)
  let Response = await product.save()
  res.status(200).send(Response)
});
router.get("/getproduct/:id", async (req, res) => {
  Product.findById(req.params.id).then((data) => {
    res.json(data)
  })
})
router.get("/getproducts/all", async (req, res) => {
  Product.find().then((data) => {
    res.status(200).send(data)
  })
})
