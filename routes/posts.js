const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  imageText: {
    type: String,
    required: true,
    trim: true
  },
  
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

  likes: {
    type: [mongoose.Schema.Types.ObjectId],  // Array of User IDs who liked the post
    ref: 'User',
    default: []
  },
  
  

  image: {
    type: String,  // Image URL (optional)
    default: ''
  }

}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
