const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: Array,
      default: [],
    },
    workDetail: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment };
