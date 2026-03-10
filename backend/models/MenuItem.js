const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Coffee', 'Milkshake', 'Pizza', 'Pasta', 'Dessert', 'Snacks'],
    },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number },
    description: { type: String, trim: true },
    image: { type: String, default: '' },
    badge: { type: String, trim: true },
    rating: { type: Number, default: 4, min: 1, max: 5 },
    reviews: { type: Number, default: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MenuItem', menuItemSchema);
