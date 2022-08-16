const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://resan:resan@boz@cluster0.b0agh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology: true},
);

const paymentSchema = new mongoose.Schema({
  id: { // waybillID
    type: String,
    unique: true,
    required: true,
    index: true
  },
  payer: {
    type: String,
    required: true,
    index: true
  },
  receiver: {
    type: String,
    required: true
  },
  amount: {
    type: String,  // better make it BigNumber BN
    required: true
  },
  frozen: {
    type: Boolean,
    default: false
  },
  paid: {
    type: Boolean,
    default: false
  },
  status: {
    type: Number,
    default: 1,
    index: true
  },
  whenPay: { // on which Status number have to automatically pay receiver
    type: Number,
    default: 1000,
  },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = {
  Payment
};
