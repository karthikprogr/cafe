import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MenuCard from '../components/MenuCard';
import { Search, SlidersHorizontal } from 'lucide-react';
import axios from '../lib/axios';

const categories = ['All', 'Coffee', 'Milkshake', 'Pizza', 'Pasta', 'Dessert', 'Snacks'];

const defaultMenuItems = [
  // Coffee
  { _id: 'm1', name: 'Signature Cold Brew', category: 'Coffee', price: 299, image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80', description: 'Slow-steeped 24 hours for max smoothness', rating: 5, reviews: 243, badge: 'Best Seller' },
  { _id: 'm2', name: 'Caramel Cappuccino', category: 'Coffee', price: 199, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=400&q=80', description: 'Rich espresso with velvety caramel foam', rating: 4, reviews: 187 },
  { _id: 'm3', name: 'Iced Vanilla Latte', category: 'Coffee', price: 229, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80', description: 'Double shot espresso over ice with vanilla', rating: 5, reviews: 221, badge: 'New' },
  { _id: 'm4', name: 'Dark Americano', category: 'Coffee', price: 149, image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=400&q=80', description: 'Bold double-shot espresso with hot water', rating: 4, reviews: 98 },
  // Milkshakes
  { _id: 'm5', name: 'Oreo Overload', category: 'Milkshake', price: 249, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80', description: 'Thick loaded with Oreo and whipped cream', rating: 5, reviews: 312, badge: 'Fan Fav' },
  { _id: 'm6', name: 'Strawberry Dream', category: 'Milkshake', price: 229, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', description: 'Fresh strawberries blended with ice cream', rating: 4, reviews: 201 },
  { _id: 'm7', name: 'Chocolate Thunder', category: 'Milkshake', price: 259, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&q=80', description: 'Belgian dark chocolate shake with brownie chunks', rating: 5, reviews: 278 },
  { _id: 'm8', name: 'Vanilla Bean', category: 'Milkshake', price: 219, image: 'https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?w=400&q=80', description: 'Madagascar vanilla with premium ice cream', rating: 4, reviews: 145 },
  // Pizzas
  { _id: 'm9', name: 'Margherita Classica', category: 'Pizza', price: 349, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', description: 'San Marzano tomatoes, buffalo mozzarella, basil', rating: 5, reviews: 189, badge: "Chef's Pick" },
  { _id: 'm10', name: 'Spicy Pepperoni', category: 'Pizza', price: 399, image: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=400&q=80', description: 'Double pepperoni with jalapeños and smoked gouda', rating: 5, reviews: 231 },
  { _id: 'm11', name: 'Quattro Formaggi', category: 'Pizza', price: 429, image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400&q=80', description: 'Four cheese masterpiece: mozzarella, parm, gorgonzola, ricotta', rating: 4, reviews: 162 },
  { _id: 'm12', name: 'Truffle Mushroom', category: 'Pizza', price: 449, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', description: 'White base, wild mushrooms, black truffle oil', rating: 5, reviews: 143, badge: 'Premium' },
  // Pasta
  { _id: 'm13', name: 'Spaghetti Carbonara', category: 'Pasta', price: 329, image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&q=80', description: 'Classic Roman with guanciale, egg yolk, pecorino', rating: 5, reviews: 178 },
  { _id: 'm14', name: 'Penne Arrabbiata', category: 'Pasta', price: 279, image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80', description: 'Spicy tomato sauce, garlic, red chilies', rating: 4, reviews: 134 },
  { _id: 'm15', name: 'Fettuccine Alfredo', category: 'Pasta', price: 299, image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400&q=80', description: 'Creamy parmesan sauce with fettuccine', rating: 5, reviews: 156 },
  // Desserts
  { _id: 'm16', name: 'Tiramisu', category: 'Dessert', price: 199, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80', description: 'Classic Italian, made daily with mascarpone', rating: 5, reviews: 267 },
  { _id: 'm17', name: 'Molten Lava Cake', category: 'Dessert', price: 229, image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80', description: 'Warm dark chocolate cake with liquid center', rating: 5, reviews: 198, badge: 'Must Try' },
  { _id: 'm18', name: 'New York Cheesecake', category: 'Dessert', price: 219, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80', description: 'Creamy NY-style with berry compote', rating: 4, reviews: 143 },
  // Snacks
  { _id: 'm19', name: 'Crispy Fries', category: 'Snacks', price: 149, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80', description: 'Golden crispy with seasoned salt and dips', rating: 4, reviews: 189 },
  { _id: 'm20', name: 'Loaded Nachos', category: 'Snacks', price: 199, image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&q=80', description: 'Cheese, jalapeños, sour cream, guacamole', rating: 5, reviews: 167 },
];

export default function Menu() {
  const [items, setItems] = useState(defaultMenuItems);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    axios.get('/api/menu').then((res) => {
      if (res.data?.length > 0) setItems(res.data);
    }).catch(() => {});
  }, []);

  const filtered = items
    .filter((item) => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  return (
    <main className="min-h-screen pt-20">
      {/* Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&q=60"
            alt="Banner"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.2)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 to-[#0a0a0a]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-[#D4A853] font-mono text-xs tracking-widest uppercase">
              — Our Offerings —
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
              The <span className="gold-text">Menu</span>
            </h1>
            <p className="text-white/50 text-lg max-w-md mx-auto">
              From morning brew to midnight dessert — something for every craving.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Filters */}
        <div className="sticky top-20 z-30 bg-[#0a0a0a]/90 backdrop-blur-xl py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b border-white/[0.05] mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search menu..."
                className="input-field pl-9 py-2.5 text-sm"
              />
            </div>

            {/* Sort */}
            <div className="relative">
              <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field pl-9 pr-4 py-2.5 text-sm w-full sm:w-44 cursor-pointer"
              >
                <option value="default" className="bg-[#1a1a1a]">Sort: Default</option>
                <option value="price-asc" className="bg-[#1a1a1a]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#1a1a1a]">Price: High to Low</option>
                <option value="rating" className="bg-[#1a1a1a]">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Category tabs */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-[#D4A853] to-[#F5C842] text-black shadow-[0_0_20px_rgba(212,168,83,0.3)]'
                    : 'glass-card text-white/60 hover:text-white border border-white/[0.08] hover:border-white/[0.2]'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Items count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-white/40 text-sm">
            Showing <span className="text-white font-medium">{filtered.length}</span> items
          </p>
        </div>

        {/* Menu Grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {filtered.map((item, i) => (
                <MenuCard key={item._id} item={item} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 space-y-3"
            >
              <div className="text-5xl">☕</div>
              <p className="text-white/50 font-medium">No items found</p>
              <p className="text-white/25 text-sm">Try a different search or category</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="btn-outline text-sm mt-2"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
