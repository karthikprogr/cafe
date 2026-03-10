const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const adminAuth = require('../middleware/auth');

// Razorpay is initialized only when keys are configured
const razorpay = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  ? new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
  : null;

// POST place order
router.post('/', async (req, res) => {
  try {
    const { customer, items, total, paymentMethod } = req.body;

    if (!customer?.name || !customer?.phone || !customer?.address) {
      return res.status(400).json({ message: 'Customer details are required' });
    }
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order must have at least one item' });
    }

    const order = new Order({ customer, items, total, paymentMethod });

    // For online payment, create Razorpay order
    if (paymentMethod === 'online' && razorpay) {
      const rzpOrder = await razorpay.orders.create({
        amount: total * 100, // paise
        currency: 'INR',
        receipt: `venissa_${Date.now()}`,
      });
      order.razorpayOrderId = rzpOrder.id;
      await order.save();
      return res.status(201).json({ ...order.toObject(), razorpayOrderId: rzpOrder.id });
    }

    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error placing order', error: err.message });
  }
});

// POST verify Razorpay payment
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const expectedSig = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSig !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed' });
    }

    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { paymentStatus: 'paid', status: 'confirmed', razorpayPaymentId: razorpay_payment_id },
      { new: true }
    );

    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ message: 'Payment verification error', error: err.message });
  }
});

// GET all orders (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
});

// PUT update order status (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Error updating order', error: err.message });
  }
});

module.exports = router;
