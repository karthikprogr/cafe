const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const adminAuth = require('../middleware/auth');

// POST create booking (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, date, time, guests } = req.body;

    if (!name || !email || !date || !time || !guests) {
      return res.status(400).json({ message: 'Name, email, date, time, and guests are required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ success: true, booking, message: 'Booking confirmed!' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating booking', error: err.message });
  }
});

// GET all bookings (admin only)
router.get('/', adminAuth, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings', error: err.message });
  }
});

// PUT update booking status (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Error updating booking', error: err.message });
  }
});

// DELETE booking (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting booking', error: err.message });
  }
});

module.exports = router;
