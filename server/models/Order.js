const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderCode: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    default: null
  },
  userEmail: {
    type: String,
    default: 'guest@gmail.com'
  },
  recipientName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String,
      category: String
    }
  ],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingFee: {
    type: Number,
    default: 0
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'VNPAY'],
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  orderStatus: {
    type: String,
    enum: ['Processing', 'Shipping', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
