import { motion } from 'framer-motion';
import Reviews from '../components/Reviews';
import { Star, TrendingUp, Award } from 'lucide-react';

const ratingBreakdown = [
  { stars: 5, pct: 72 },
  { stars: 4, pct: 18 },
  { stars: 3, pct: 6 },
  { stars: 2, pct: 2 },
  { stars: 1, pct: 2 },
];

export default function ReviewsPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* Banner */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=60"
            alt="Reviews banner"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.2)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/60 to-[#0a0a0a]" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <span className="text-[#D4A853] font-mono text-xs tracking-widest uppercase">
            — Guest Experiences —
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-white mt-3">
            Our <span className="gold-text">Reviews</span>
          </h1>
          <p className="text-white/50 text-lg mt-4">
            Over 2,400 happy guests and counting. See what the community says about us.
          </p>
        </motion.div>
      </section>

      {/* Rating stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid md:grid-cols-3 gap-6 mb-4">
          {/* Big score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl flex flex-col items-center justify-center gap-3 text-center"
          >
            <TrendingUp className="w-8 h-8 text-[#D4A853]" />
            <div className="text-7xl font-bold gold-text glow-text-gold font-display">4.8</div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-5 h-5 ${i < 5 ? 'fill-[#D4A853] text-[#D4A853]' : 'text-white/20'}`} />
              ))}
            </div>
            <p className="text-white/40 text-sm">Based on 2,400+ reviews</p>
          </motion.div>

          {/* Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 rounded-2xl col-span-1 flex flex-col justify-center gap-3"
          >
            <h3 className="text-white font-semibold text-sm mb-1">Rating Breakdown</h3>
            {ratingBreakdown.map((r) => (
              <div key={r.stars} className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1 w-12 flex-shrink-0">
                  <span className="text-white/60 text-xs">{r.stars}</span>
                  <Star className="w-3 h-3 fill-[#D4A853] text-[#D4A853]" />
                </div>
                <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${r.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-[#D4A853] to-[#F5C842] rounded-full"
                  />
                </div>
                <span className="text-white/40 text-xs w-8 text-right">{r.pct}%</span>
              </div>
            ))}
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 rounded-2xl space-y-4"
          >
            <h3 className="text-white font-semibold text-sm flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4A853]" />
              What Guests Love
            </h3>
            {[
              { label: 'Food Quality', pct: 95 },
              { label: 'Ambiance', pct: 93 },
              { label: 'Service', pct: 91 },
              { label: 'Value for Money', pct: 88 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs text-white/50 mb-1">
                  <span>{item.label}</span>
                  <span className="text-[#D4A853]">{item.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full bg-gradient-to-r from-[#D4A853] to-[#F5C842] rounded-full"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* All reviews */}
      <Reviews />
    </main>
  );
}
