// Load required packages
var mongoose = require('mongoose');

// Define our event schema
var Event = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    points: {
        type: Number,
        default: 1
    },
    attendees: {
        type: [String],
        default: []
    },
    eventDate: {
      type: Date,
      required: true
    }
});

// Export the Mongoose model
module.exports = mongoose.model('Event', Event);
