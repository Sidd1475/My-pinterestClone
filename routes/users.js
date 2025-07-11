const mongoose = require('mongoose');
const plm = require("passport-local-mongoose")


mongoose.connect("mongodb://127.0.0.1:27017/mypinterest");
const userSchema = new mongoose.Schema({
  username: {
    type: String,

    
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  password: {
    type: String,
   
  },

  fullName: {
    type: String,
    required: true,
    trim: true
  },

  dp: {
    type: String,  // URL of the image
    default: ''    // You can set a default profile pic URL
  },

  posts: [{
    type : mongoose.Schema.Types.ObjectId,
    ref:'Post'
  }]
}, { timestamps: true });

userSchema.plugin(plm);

module.exports = mongoose.model('User', userSchema);


