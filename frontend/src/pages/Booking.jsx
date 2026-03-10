import { motion } from 'framer-motion';
import BookingForm from '../components/BookingForm';
import { Calendar, Clock, MapPin, Phone, Star, Users } from 'lucide-react';

const perks = [
  { icon: Star, title: 'Premium Experience', desc: 'Table-side service with personalized attention' },
  { icon: Clock, title: 'Flexible Timings', desc: 'Book for any time between 8 AM – 10 PM' },
  { icon: Users, title: 'Groups Welcome', desc: 'Perfect for parties up to 20 guests' },
  { icon: Calendar, title: 'Easy Modifications', desc: 'Change or cancel up to 2 hours before' },
];

export default function Booking() {
  return (
    <main className="min-h-screen pt-20">
      {/* Hero Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=60"
            alt="Cafe interior"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.2)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/50 to-[#0a0a0a]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <span className="text-[#D4A853] font-mono text-xs tracking-widest uppercase">
              — Reservations —
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-white">
              Book Your <span className="gold-text">Table</span>
            </h1>
            <p className="text-white/50 text-lg max-w-md mx-auto">
              Reserve your spot at Venissa Cafe & Kitchen for an unforgettable dining experience.
            </p>

            {/* Quick info pills */}
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              {[
                { icon: MapPin, text: 'LB Nagar, Hyderabad' },
                { icon: Phone, text: '+91 98765 43210' },
                { icon: Clock, text: '8 AM – 11 PM Daily' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="glass-card flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] text-white/60 text-sm">
                  <Icon className="w-3.5 h-3.5 text-[#D4A853]" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Perks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {perks.map((perk, i) => (
            <motion.div
              key={perk.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card-hover p-4 rounded-xl text-center space-y-2"
            >
              <div className="w-10 h-10 bg-[#D4A853]/10 rounded-xl flex items-center justify-center mx-auto">
                <perk.icon className="w-5 h-5 text-[#D4A853]" />
              </div>
              <h4 className="text-white text-sm font-semibold">{perk.title}</h4>
              <p className="text-white/40 text-xs leading-relaxed">{perk.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Form section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <div>
            <div className="mb-6 space-y-2">
              <h2 className="font-display text-3xl font-bold text-white">
                Make a <span className="gold-text">Reservation</span>
              </h2>
              <p className="text-white/50 text-sm">
                Fill in your details and we'll confirm your booking instantly.
              </p>
            </div>
            <BookingForm />
          </div>

          {/* Info panel */}
          <div className="space-y-5">
            {/* Cafe image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
                alt="Venissa interior"
                className="w-full h-64 object-cover"
              />
            </motion.div>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Seating Capacity', value: '80 Guests' },
                { label: 'Private Dining', value: 'Available' },
                { label: 'Parking', value: 'Free Parking' },
                { label: 'WiFi', value: 'High-Speed' },
              ].map((item) => (
                <div key={item.label} className="glass-card p-4 rounded-xl">
                  <div className="text-white font-semibold text-sm">{item.value}</div>
                  <div className="text-white/40 text-xs mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Policy */}
            <div className="glass-card p-5 rounded-xl border border-white/[0.06] space-y-3">
              <h4 className="text-white font-semibold text-sm">Booking Policy</h4>
              <ul className="space-y-2 text-white/50 text-xs">
                {[
                  'Reservations held for 15 minutes past booking time',
                  'Cancellation allowed up to 2 hours before',
                  'For groups of 10+, please call us directly',
                  'Special arrangement fee may apply for events',
                ].map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="text-[#D4A853] mt-0.5">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
