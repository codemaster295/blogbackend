const express = require("express");
const app = express();
const router = express.Router();
module.exports = router;
const Product = require('../models/Product')

router.get("/all", async (req, res) => {
  Product.find().then((data) => {
    res.status(200).send(data)
  })
})