import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=80"
          alt="Venissa Cafe Interior"
          className="w-full h-full object-cover scale-105"
          style={{ filter: 'brightness(0.35) saturate(0.8)' }}
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 via-transparent to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 via-transparent to-[#0a0a0a]/40" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#D4A853]/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-[#5C3D2E]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="inline-flex items-center gap-2 glass-card px-4 py-2 rounded-full border border-[#D4A853]/30"
          >
            <div className="w-2 h-2 bg-[#D4A853] rounded-full animate-pulse" />
            <span className="text-[#D4A853] text-xs font-mono tracking-widest uppercase">
              LB Nagar, Hyderabad
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1} className="space-y-3">
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              Where Every
              <br />
              <span className="gold-text glow-text-gold">Sip Tells a</span>
              <br />
              Story
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-white/60 text-lg leading-relaxed max-w-md"
          >
            Experience the art of premium coffee and artisanal cuisine at Venissa Cafe &amp; Kitchen —
            where passion meets the perfect brew.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="flex items-center gap-6"
          >
            {[
              { label: 'Menu Items', value: '50+' },
              { label: 'Happy Guests', value: '10K+' },
              { label: 'Rating', value: '4.8★' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold gold-text">{stat.value}</div>
                <div className="text-white/40 text-xs tracking-wider uppercase">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="flex flex-wrap gap-4"
          >
            <Link to="/order" className="btn-primary flex items-center gap-2 text-base">
              Order Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/booking" className="btn-outline flex items-center gap-2 text-base">
              Book a Table
            </Link>
          </motion.div>

          {/* Info Pills */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={5}
            className="flex flex-wrap gap-3"
          >
            {[
              { icon: Clock, text: 'Open: 8 AM – 11 PM' },
              { icon: MapPin, text: 'LB Nagar, Hyderabad' },
              { icon: Star, text: '4.8 on Google' },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-1.5 text-white/50 text-xs glass-card px-3 py-1.5 rounded-full border border-white/[0.08]"
              >
                <Icon className="w-3.5 h-3.5 text-[#D4A853]" />
                {text}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right side hero card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Main featured card */}
            <div className="glass-card p-6 rounded-3xl border border-white/[0.1] glow-gold">
              <img
                src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80"
                alt="Premium Coffee"
                className="w-full h-64 object-cover rounded-2xl mb-5"
              />
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-white">
                      Signature Cold Brew
                    </h3>
                    <p className="text-white/50 text-sm">Slow-steeped 24 hours</p>
                  </div>
                  <span className="text-[#D4A853] font-bold text-lg">₹299</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D4A853] text-[#D4A853]" />
                  ))}
                  <span className="text-white/40 text-xs ml-1">(243)</span>
                </div>
              </div>
            </div>

            {/* Floating mini cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 glass-card p-3 rounded-2xl border border-[#D4A853]/20"
            >
              <img
                src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=150&q=80"
                alt="Pizza"
                className="w-20 h-20 rounded-xl object-cover"
              />
              <p className="text-white text-xs font-medium mt-2 text-center">Wood-Fired Pizza</p>
              <p className="text-[#D4A853] text-xs text-center">₹349</p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-6 -left-6 glass-card p-3 rounded-2xl border border-white/[0.1]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A853] to-[#F5C842] flex items-center justify-center">
                  <span className="text-black font-bold text-sm">✓</span>
                </div>
                <div>
                  <p className="text-white text-xs font-medium">Order Placed!</p>
                  <p className="text-white/40 text-[10px]">Est. 25 mins</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-12 bg-gradient-to-b from-[#D4A853]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
