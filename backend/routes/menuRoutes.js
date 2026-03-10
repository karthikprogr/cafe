const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');
const adminAuth = require('../middleware/auth');

// GET all menu items (public)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { available: true };
    if (category && category !== 'All') filter.category = category;
    const items = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching menu', error: err.message });
  }
});

// GET single item
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching item', error: err.message });
  }
});

// POST add new item (admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const { name, category, price, description, image, badge } = req.body;
    if (!name || !category || !price) {
      return res.status(400).json({ message: 'Name, category, and price are required' });
    }
    const item = new MenuItem({ name, category, price, description, image, badge });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error creating item', error: err.message });
  }
});

// PUT update item (admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error updating item', error: err.message });
  }
});

// DELETE item (admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item', error: err.message });
  }
});

module.exports = router;
