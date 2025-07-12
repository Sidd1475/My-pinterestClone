
require('dotenv').config();

const mongoose = require('mongoose');
const plm = require("passport-local-mongoose")


console.log('DEBUG URI =', process.env.MONGO_URI);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Atlas Connected"))
.catch((err) => console.error("MongoDB connection error:", err));

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


