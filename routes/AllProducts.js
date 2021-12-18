
const Product = require('../models/Product')

router.get("/all", async (req, res) => {
  Product.find().then((data) => {
    res.status(200).send(data)
  })
})