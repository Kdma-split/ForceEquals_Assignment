const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    trim: true
  },
  industry: {
    type: String,
    trim: true
  },
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large', 'Enterprise']
  },
  matchScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['Prospect', 'Target', 'Active', 'Closed'],
    default: 'Prospect'
  }
}, {
  timestamps: true
});

const Account = mongoose.model('Account', accountSchema);
module.exports = Account;