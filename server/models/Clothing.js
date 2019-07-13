const mongoose = require('mongoose');

const ClothingSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['SARI', 'KURTA'],
    default: 'SARI'
  },
  price: {
    type: Number,
    default: 0.0
  },
  active: {
    type: Boolean,
    default: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  inUse: {
    type: Boolean,
    default: false
  },
  requests: {
    type: [Schema.ObjectId],
    ref: 'Request',
  }
});

module.exports = mongoose.model('Clothing', ClothingSchema);
