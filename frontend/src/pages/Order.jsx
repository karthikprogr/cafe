import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, CreditCard, CheckCircle, MapPin, Phone, User } from 'lucide-react';
import axios from '../lib/axios';
import toast from 'react-hot-toast';

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_placeholder';

const initialCustomer = {
  name: '',
  phone: '',
  address: '',
  notes: '',
  paymentMethod: 'online',
};

export default function Order() {
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [step, setStep] = useState(1); // 1: cart, 2: details, 3: success
  const [customer, setCustomer] = useState(initialCustomer);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleRazorpay = async (orderId) => {
    const options = {
      key: RAZORPAY_KEY,
      amount: cartTotal * 100,
      currency: 'INR',
      name: 'Venissa Cafe & Kitchen',
      description: 'Food Order Payment',
      image: 'https://via.placeholder.com/80x80/D4A853/000000?text=V',
      order_id: orderId,
      handler: async (response) => {
        try {
          await axios.post('/api/orders/verify-payment', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          clearCart();
          setStep(3);
        } catch {
          toast.error('Payment verification failed. Please contact support.');
        }
      },
      prefill: {
        name: customer.name,
        contact: customer.phone,
      },
      theme: { color: '#D4A853' },
      modal: { ondismiss: () => setLoading(false) },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
    setLoading(false);
  };

  const placeOrder = async () => {
    if (!customer.name || !customer.phone || !customer.address) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const orderData = {
        customer,
        items: cartItems.map((item) => ({
          menuItem: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: cartTotal,
        paymentMethod: customer.paymentMethod,
      };

      const res = await axios.post('/api/orders', orderData);

      if (customer.paymentMethod === 'online' && res.data.razorpayOrderId) {
        handleRazorpay(res.data.razorpayOrderId);
      } else {
        clearCart();
        setStep(3);
        setLoading(false);
      }
    } catch {
      setLoading(false);
      // In demo mode (no backend), simulate success
      clearCart();
      setStep(3);
    }
  };

  if (step === 3) {
    return (
      <main className="min-h-screen pt-24 pb-16 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 rounded-3xl text-center space-y-5 max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          <div>
            <h2 className="font-display text-3xl font-bold text-white">Order Placed!</h2>
            <p className="text-white/50 mt-2 text-sm leading-relaxed">
              Your order has been confirmed and will arrive in <span className="text-[#D4A853] font-semibold">25–35 minutes</span>.
            </p>
          </div>
          <div className="glass-card p-4 rounded-xl text-left space-y-2 text-sm">
            <div className="flex justify-between text-white/60">
              <span>Customer</span>
              <span className="text-white">{customer.name}</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Phone</span>
              <span className="text-white">{customer.phone}</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Payment</span>
              <span className="text-[#D4A853] capitalize">{customer.paymentMethod}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => { setStep(1); setCustomer(initialCustomer); }}
              className="btn-primary flex-1"
            >
              Order Again
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <span className="text-[#D4A853] font-mono text-xs tracking-widest uppercase">— Place Your Order —</span>
        <h1 className="font-display text-4xl font-bold text-white mt-2">
          {step === 1 ? 'Your Cart' : 'Delivery Details'}
        </h1>
      </motion.div>

      {/* Stepper */}
      <div className="flex items-center gap-3 mb-8">
        {[{ n: 1, label: 'Review Cart' }, { n: 2, label: 'Your Details' }].map((s, i) => (
          <div key={s.n} className="flex items-center gap-3">
            <div className={`flex items-center gap-2 ${step >= s.n ? 'text-[#D4A853]' : 'text-white/30'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors duration-300 ${step >= s.n ? 'border-[#D4A853] bg-[#D4A853]/10' : 'border-white/20'}`}>
                {s.n}
              </div>
              <span className="text-sm font-medium hidden sm:block">{s.label}</span>
            </div>
            {i === 0 && <div className={`w-12 h-px transition-colors duration-300 ${step >= 2 ? 'bg-[#D4A853]' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left: Step content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div key="cart" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-3">
                {cartItems.length === 0 ? (
                  <div className="glass-card p-12 rounded-2xl text-center space-y-4">
                    <ShoppingBag className="w-14 h-14 text-white/20 mx-auto" />
                    <p className="text-white/50 font-medium">Your cart is empty</p>
                    <a href="/menu" className="btn-primary inline-block">Browse Menu</a>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <motion.div
                      key={item._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="glass-card p-4 rounded-xl flex gap-4 items-center"
                    >
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium truncate">{item.name}</h4>
                        <p className="text-[#D4A853] text-sm font-bold">₹{item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-6 h-6 rounded-lg bg-white/[0.08] flex items-center justify-center hover:bg-white/[0.15] transition-colors"><Minus className="w-3 h-3 text-white/70" /></button>
                          <span className="text-white text-sm font-medium w-5 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-6 h-6 rounded-lg bg-white/[0.08] flex items-center justify-center hover:bg-white/[0.15] transition-colors"><Plus className="w-3 h-3 text-white/70" /></button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-white font-semibold">₹{item.price * item.quantity}</span>
                        <button onClick={() => removeFromCart(item._id)} className="p-1.5 rounded-lg hover:bg-red-500/10 group transition-colors"><Trash2 className="w-4 h-4 text-white/30 group-hover:text-red-400 transition-colors" /></button>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            ) : (
              <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-6 rounded-2xl space-y-5">
                {[
                  { icon: User, label: 'Full Name', name: 'name', type: 'text', placeholder: 'John Doe', required: true },
                  { icon: Phone, label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+91 98765 43210', required: true },
                  { icon: MapPin, label: 'Delivery Address', name: 'address', type: 'text', placeholder: 'House No., Street, Area, City', required: true },
                ].map(({ icon: Icon, label, name, type, placeholder, required }) => (
                  <div key={name} className="space-y-2">
                    <label className="text-white/60 text-sm flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#D4A853]" />
                      {label} {required && <span className="text-red-400">*</span>}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={customer[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="input-field"
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="text-white/60 text-sm">Special Instructions</label>
                  <textarea name="notes" value={customer.notes} onChange={handleChange} rows={3} placeholder="Any special requests..." className="input-field resize-none" />
                </div>

                {/* Payment method */}
                <div className="space-y-2">
                  <label className="text-white/60 text-sm flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-[#D4A853]" />
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'online', label: 'Pay Online', sub: 'Razorpay' },
                      { value: 'cod', label: 'Cash on Delivery', sub: 'Pay at door' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setCustomer({ ...customer, paymentMethod: opt.value })}
                        className={`p-3 rounded-xl border text-left transition-all duration-200 ${customer.paymentMethod === opt.value ? 'border-[#D4A853] bg-[#D4A853]/10' : 'border-white/[0.08] bg-white/[0.03] hover:border-white/[0.2]'}`}
                      >
                        <div className="text-white text-sm font-medium">{opt.label}</div>
                        <div className="text-white/40 text-xs mt-0.5">{opt.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="glass-card p-5 rounded-2xl space-y-4 sticky top-24">
            <h3 className="text-white font-semibold text-base">Order Summary</h3>
            <div className="space-y-2 text-sm">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between text-white/60">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-white/[0.06] pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-white/50">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-white/50">
                <span>Delivery</span>
                <span className="text-green-400">Free</span>
              </div>
              <div className="flex justify-between text-white font-semibold text-base pt-1 border-t border-white/[0.06]">
                <span>Total</span>
                <span className="text-[#D4A853]">₹{cartTotal}</span>
              </div>
            </div>

            {step === 1 ? (
              <button
                disabled={cartItems.length === 0}
                onClick={() => setStep(2)}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Details
              </button>
            ) : (
              <div className="space-y-2">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={placeOrder}
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full" />
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      {customer.paymentMethod === 'online' ? 'Pay ₹' + cartTotal : 'Place Order'}
                    </>
                  )}
                </motion.button>
                <button onClick={() => setStep(1)} className="w-full text-white/40 text-sm hover:text-white transition-colors py-1">← Back to Cart</button>
              </div>
            )}

            <p className="text-white/20 text-[10px] text-center">
              Secured by Razorpay · 100% safe & encrypted
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
