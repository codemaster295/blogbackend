const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')

const signUpSchema = mongoose.Schema({
  username:String,
   email: {
      type: String,
   },
   password: String,
   posts: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Post' }
   ],

})
// signUpSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Signupdetails', signUpSchema)