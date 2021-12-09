const express = require('express')
const app = express()
const router = express.Router();
module.exports = router;
const loginData = require('../models/Signupdetails')
const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv/config')


//........Login ........//
router.post("/", async (req, res) => {
    try {
      const { email, password } = req.body;
      const UserData = await loginData.findOne({ email:email },{ _id: 0 },{password:0});
      if (UserData && (await bcrypt.compare(password, UserData.password))) {
        // Create token
        const token = jwt.sign({ user_id: UserData._id, email }, process.env.JWT_KEY);  
        UserData.token = token;
        res.status(201).send({
          success:true,
          message:"Logged in successfully",
          token:token,
          UserData:UserData
        })
      }
      res.status(200).send({
        success:false,
        message:"Email or password is invalid"
      });
    } catch (err) {
      console.log(err);
    }
  });
