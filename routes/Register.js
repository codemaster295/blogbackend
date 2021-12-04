const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Signupdetails = require("../models/Signupdetails");
module.exports = router;
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const jwt = require("jsonwebtoken");


//......SignUP.......//

router.post("/", async (req, res) => {
  const isUserRegisters = await Signupdetails.findOne({ email: req.body.email })
  if (isUserRegisters) {
    res.status(400).send("Email is already registerd")
  }
  else if (!req.body.email) {
    res.status(400).send("please provide email")
  }
  else if (!isUserRegisters) {

    const signup = new Signupdetails({
      username:req.body.username,
      email: req.body.email,
      posts: req.body.posts,
      password: bcrypt.hashSync(req.body.password, 10),
      gender: req.body.gender,
    });
    const token = jwt.sign({ email: signup.email, password: signup.password }, process.env.JWT_KEY)
    signup.save().then((result) => {
      console.log(result);
      res.status(200).send("true")
      // res.json({ result, token });
    });

  }
});