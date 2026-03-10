import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import Reviews from '../components/Reviews';
import InstagramFeed from '../components/InstagramFeed';
import MenuCard from '../components/MenuCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Clock, Leaf, MapPin, TrendingUp } from 'lucide-react';

const featuredItems = [
  {
    _id: '1',
    name: 'Signature Cold Brew',
    category: 'Coffee',
    price: 299,
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80',
    description: 'Slow-steeped for 24 hours for maximum depth and smoothness.',
    rating: 5,
    reviews: 243,
    badge: 'Best Seller',
  },
  {
    _id: '2',
    name: 'Margherita Classica',
    category: 'Pizza',
    price: 349,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80',
    description: 'San Marzano tomatoes, buffalo mozzarella, fresh basil.',
    rating: 5,
    reviews: 189,
    badge: 'Chef\'s Pick',
  },
  {
    _id: '3',
    name: 'Oreo Overload Shake',
    category: 'Milkshake',
    price: 249,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80',
    description: 'Thick shake loaded with Oreo cookies and whipped cream.',
    rating: 5,
    reviews: 312,
    badge: 'Fan Favorite',
  },
  {
    _id: '4',
    name: 'Tiramisu',
    category: 'Dessert',
    price: 199,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80',
    description: 'Classic Italian dessert, made fresh daily with mascarpone.',
    rating: 5,
    reviews: 176,
  },
];

const features = [
  { icon: Award, title: 'Premium Quality', desc: 'Only the finest ingredients sourced locally' },
  { icon: Leaf, title: '100% Fresh', desc: 'Prepared fresh daily with zero preservatives' },
  { icon: Clock, title: 'Fast Service', desc: 'Online orders delivered in under 30 mins' },
  { icon: TrendingUp, title: 'Trending Daily', desc: 'New dishes crafted by our expert chefs' },
];

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <Hero />

      {/* Features strip */}
      <section className="border-y border-white/[0.05] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-3 text-center sm:text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4A853]/10 border border-[#D4A853]/20 flex items-center justify-center flex-shrink-0">
                  <f.icon className="w-5 h-5 text-[#D4A853]" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold">{f.title}</h4>
                  <p className="text-white/40 text-xs mt-0.5">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12"
        >
          <div className="space-y-3">
            <span className="text-[#D4A853] font-mono text-xs tracking-widest uppercase">
              — Our Menu —
            </span>
            <h2 className="section-heading">
              Customer <span className="gold-text">Favorites</span>
            </h2>
            <p className="section-subheading max-w-md">
              Our most-loved dishes and drinks, crafted with love and precision.
            </p>
          </div>
          <Link to="/menu" className="btn-outline flex items-center gap-2 flex-shrink-0">
            View Full Menu
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredItems.map((item, i) => (
            <MenuCard key={item._id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* About / Story Section */}
      <section className="py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Images grid */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="space-y-3">
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&q=80"
                  alt="Cafe interior"
                  className="w-full h-52 object-cover rounded-2xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80"
                  alt="Coffee preparation"
                  className="w-full h-32 object-cover rounded-2xl"
                />
              </div>
              <div className="space-y-3 pt-6">
                <img
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&q=80"
                  alt="Coffee"
                  className="w-full h-32 object-cover rounded-2xl"
                />
                <img
                  src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=400&q=80"
                  alt="Barista"
                  className="w-full h-52 object-cover rounded-2xl"
                />
              </div>
            </motion.div>

            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <div>
                <span className="text-[#D4A853] font-mono text-xs tracking-widest uppercase">
                  — Our Story —
                </span>
                <h2 className="font-display text-4xl font-bold text-white mt-2 leading-tight">
                  More Than Just a
                  <br />
                  <span className="gold-text">Coffee Shop</span>
                </h2>
              </div>
              <p className="text-white/55 leading-relaxed">
                Founded in 2021 in the vibrant neighborhood of LB Nagar, Venissa Cafe &amp; Kitchen
                was born from a passion for world-class coffee and artisanal food. We believe every
                meal should be an experience.
              </p>
              <p className="text-white/55 leading-relaxed">
                Our chefs blend Italian culinary traditions with local Hyderabadi flavors,
                creating dishes that surprise and delight. Every cup of coffee is sourced from
                single-origin farms and roasted to perfection.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-2">
                {[
                  { value: '5+', label: 'Years of Excellence' },
                  { value: '50+', label: 'Menu Items' },
                  { value: '10K+', label: 'Happy Guests' },
                ].map((s) => (
                  <div key={s.label} className="glass-card p-4 rounded-xl text-center">
                    <div className="text-2xl font-bold gold-text">{s.value}</div>
                    <div className="text-white/40 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <Link to="/menu" className="btn-primary flex items-center gap-2">
                  Explore Menu
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/booking" className="btn-outline">
                  Book a Table
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <Reviews />

      {/* Instagram Feed */}
      <section className="bg-[#050505]">
        <InstagramFeed />
      </section>

      {/* Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 space-y-4"
        >
          <span className="text-[#D4A853] font-mono text-xs tracking-widest uppercase">
            — Find Us —
          </span>
          <h2 className="section-heading">
            Visit <span className="gold-text">Venissa</span>
          </h2>
          <p className="section-subheading max-w-md mx-auto flex items-center justify-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4A853]" />
            Saradhi Nagar, LB Nagar, Hyderabad — 500074
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl h-[400px]"
        >
          <iframe
            title="Venissa Cafe Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.9019882963743!2d78.5478082!3d17.3445268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba35fa63614cb%3A0x6d77ebb9b88d3c8!2sL.B.Nagar%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.7)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </section>
    </main>
  );
}
