// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var User = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    login: {
      type: String,
      required: true,
      unique: true
    },
    pointsEarned: {
        type: Number,
        default: 0
    },
    eventsAttended: {
        type: [String],
        default: []
    }
});

// Export the Mongoose model
module.exports = mongoose.model('User', User);
