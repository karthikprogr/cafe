import { motion } from 'framer-motion';
import { useContext } from 'react';
import { ShoppingCart, Star, Plus } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';

export default function MenuCard({ item, index }) {
  const { addToCart } = useContext(CartContext);

  const handleAdd = () => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`, {
      style: {
        background: '#1a1a1a',
        color: '#fff',
        border: '1px solid rgba(212,168,83,0.3)',
      },
      iconTheme: { primary: '#D4A853', secondary: '#0a0a0a' },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className="glass-card-hover group rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.5 }}
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge */}
        {item.badge && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-[#D4A853] to-[#F5C842] text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {item.badge}
          </span>
        )}

        {/* Quick Add on hover */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ scale: 1.05 }}
          onClick={handleAdd}
          className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#D4A853] text-black p-2 rounded-xl shadow-lg"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Category tag */}
        <span className="text-[#D4A853]/70 text-[10px] font-mono tracking-widest uppercase">
          {item.category}
        </span>

        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-white font-semibold text-base leading-tight group-hover:text-[#D4A853] transition-colors duration-200">
              {item.name}
            </h3>
            {item.description && (
              <p className="text-white/40 text-xs mt-1 leading-relaxed line-clamp-2">
                {item.description}
              </p>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < Math.floor(item.rating || 4)
                  ? 'fill-[#D4A853] text-[#D4A853]'
                  : 'text-white/20'
              }`}
            />
          ))}
          <span className="text-white/30 text-[10px] ml-1">({item.reviews || 0})</span>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-[#D4A853] font-bold text-xl">₹{item.price}</span>
            {item.originalPrice && (
              <span className="text-white/30 text-sm line-through">₹{item.originalPrice}</span>
            )}
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#D4A853] to-[#F5C842] text-black 
                       text-xs font-semibold px-3.5 py-2 rounded-xl hover:shadow-[0_0_20px_rgba(212,168,83,0.4)]
                       transition-all duration-300"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
