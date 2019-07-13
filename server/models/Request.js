const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  to: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  from: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  clothing: {
    type: Schema.ObjectId,
    ref: 'Clothing'
  },
  status: {
    type: String,
    enum: ['accepted', 'rejected', 'pending'],
    default: 'pending'
  },
});

module.exports = mongoose.model('Request', RequestSchema);
