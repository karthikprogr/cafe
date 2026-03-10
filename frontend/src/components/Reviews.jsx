import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b5fd0c7d?w=100&q=80',
    rating: 5,
    date: 'Feb 2026',
    text: 'Absolutely love this place! The Cold Brew is out of this world — smooth, bold, and perfectly balanced. The ambiance feels like a premium international cafe right here in Hyderabad.',
    tag: 'Regular Customer',
  },
  {
    id: 2,
    name: 'Arjun Reddy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
    date: 'Jan 2026',
    text: 'Best wood-fired pizza in LB Nagar! The Margherita was crispy, fresh, and had the perfect cheese pull. Paired it with a milkshake — heaven on earth!',
    tag: 'Food Enthusiast',
  },
  {
    id: 3,
    name: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
    date: 'Jan 2026',
    text: 'Came here for a birthday dinner and the experience was incredible. Staff was attentive, food was fresh, and the Tiramisu is the best I\'ve ever had outside Italy!',
    tag: 'Special Occasion',
  },
  {
    id: 4,
    name: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 4,
    date: 'Dec 2025',
    text: 'Great atmosphere for working remotely. Fast WiFi, great coffee, and friendly staff. The Cappuccino was textbook perfect. Will be back every week for sure!',
    tag: 'Work-from-Cafe',
  },
  {
    id: 5,
    name: 'Anitha Kumar',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
    rating: 5,
    date: 'Dec 2025',
    text: 'Ordered the Pasta Carbonara and Oreo Milkshake — both absolutely divine! The portions are generous and the presentation is Instagram-worthy. Highly recommend!',
    tag: 'Food Blogger',
  },
  {
    id: 6,
    name: 'Karthik Nair',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    rating: 5,
    date: 'Nov 2025',
    text: 'Venissa is hands down the best cafe in LB Nagar. The dark ambiance, golden lighting, and premium menu make it feel like you\'re in Banjara Hills. Must visit!',
    tag: 'Hyderabad Foodie',
  },
];

export default function Reviews() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-14 space-y-4"
      >
        <span className="text-[#D4A853] font-mono text-xs tracking-widest uppercase">
          — What Our Guests Say —
        </span>
        <h2 className="section-heading">
          Loved by <span className="gold-text">Thousands</span>
        </h2>
        <p className="section-subheading max-w-xl mx-auto">
          Real experiences from our beloved guests at Venissa Cafe & Kitchen.
        </p>

        {/* Overall rating */}
        <div className="inline-flex items-center gap-4 glass-card px-6 py-3 rounded-2xl border border-white/[0.08] mt-4">
          <div className="text-center">
            <div className="text-4xl font-bold gold-text">4.8</div>
            <div className="flex justify-center gap-0.5 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#D4A853] text-[#D4A853]" />
              ))}
            </div>
          </div>
          <div className="w-px h-10 bg-white/[0.1]" />
          <div className="text-left">
            <div className="text-white font-semibold text-sm">Google Rating</div>
            <div className="text-white/40 text-xs">Based on 2,400+ reviews</div>
          </div>
        </div>
      </motion.div>

      {/* Reviews grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reviews.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.09 }}
            whileHover={{ y: -4 }}
            className="glass-card-hover p-6 rounded-2xl flex flex-col gap-4 relative"
          >
            {/* Quote icon */}
            <Quote className="absolute top-4 right-4 w-8 h-8 text-[#D4A853]/10" />

            {/* Rating */}
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, j) => (
                <Star
                  key={j}
                  className={`w-4 h-4 ${
                    j < review.rating
                      ? 'fill-[#D4A853] text-[#D4A853]'
                      : 'text-white/10 fill-white/10'
                  }`}
                />
              ))}
            </div>

            {/* Review text */}
            <p className="text-white/65 text-sm leading-relaxed flex-1">"{review.text}"</p>

            {/* Reviewer info */}
            <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-xl object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">{review.name}</p>
                <p className="text-[#D4A853]/60 text-[11px] truncate">{review.tag}</p>
              </div>
              <span className="text-white/30 text-[10px] flex-shrink-0">{review.date}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
