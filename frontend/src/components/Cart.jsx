import { motion, AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cartItems, cartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal } =
    useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setCartOpen(false);
    navigate('/order');
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
          />

          {/* Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-50 bg-[#0f0f0f] border-l border-white/[0.08] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#D4A853] to-[#F5C842] flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-white font-semibold">Your Cart</h2>
                  <p className="text-white/40 text-xs">
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-xl hover:bg-white/[0.07] transition-colors duration-200"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white/[0.04] flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-white/20" />
                  </div>
                  <div>
                    <p className="text-white/60 font-medium">Your cart is empty</p>
                    <p className="text-white/30 text-sm mt-1">Add some delicious items!</p>
                  </div>
                  <button
                    onClick={() => { setCartOpen(false); navigate('/menu'); }}
                    className="btn-primary text-sm"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      className="glass-card p-3 rounded-xl flex gap-3 items-center"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white text-sm font-medium truncate">{item.name}</h4>
                        <p className="text-[#D4A853] text-sm font-bold">₹{item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="w-6 h-6 rounded-lg bg-white/[0.07] flex items-center justify-center hover:bg-white/[0.12] transition-colors"
                          >
                            <Minus className="w-3 h-3 text-white/70" />
                          </button>
                          <span className="text-white text-sm w-4 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="w-6 h-6 rounded-lg bg-white/[0.07] flex items-center justify-center hover:bg-white/[0.12] transition-colors"
                          >
                            <Plus className="w-3 h-3 text-white/70" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <p className="text-white/70 text-sm font-medium">
                          ₹{item.price * item.quantity}
                        </p>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors group"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-white/30 group-hover:text-red-400 transition-colors" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-white/[0.06] space-y-4">
                {/* Delivery fee */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-white/50">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-white/50">
                    <span>Delivery</span>
                    <span className="text-green-400">Free</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold text-base border-t border-white/[0.06] pt-2">
                    <span>Total</span>
                    <span className="text-[#D4A853]">₹{cartTotal}</span>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCheckout}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
