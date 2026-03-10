import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Coffee, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, Youtube,
  ArrowRight
} from 'lucide-react';

const footerLinks = [
  {
    title: 'Quick Links',
    links: [
      { name: 'Home', path: '/' },
      { name: 'Our Menu', path: '/menu' },
      { name: 'Order Online', path: '/order' },
      { name: 'Book a Table', path: '/booking' },
      { name: 'Reviews', path: '/reviews' },
    ],
  },
  {
    title: 'Menu Highlights',
    links: [
      { name: 'Cold Coffee', path: '/menu' },
      { name: 'Wood-Fired Pizza', path: '/menu' },
      { name: 'Artisan Pasta', path: '/menu' },
      { name: 'Signature Milkshakes', path: '/menu' },
      { name: 'Desserts', path: '/menu' },
    ],
  },
  {
    title: 'Company',
    links: [
      { name: 'About Us', path: '/' },
      { name: 'Careers', path: '/' },
      { name: 'Privacy Policy', path: '/' },
      { name: 'Terms of Service', path: '/' },
      { name: 'Admin Panel', path: '/admin' },
    ],
  },
];

const socials = [
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.06] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-[#D4A853]/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-32 bg-[#D4A853]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Banner */}
        <div className="py-12 border-b border-white/[0.05]">
          <div className="glass-card rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-display text-2xl font-bold text-white">
                Stay in the <span className="gold-text">Loop</span>
              </h3>
              <p className="text-white/50 text-sm">
                Get notified about new dishes, offers &amp; events
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field flex-1 md:w-64 py-2.5"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center gap-1.5 py-2.5"
              >
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand col */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4A853] to-[#F5C842] flex items-center justify-center">
                <Coffee className="w-5 h-5 text-black" />
              </div>
              <div>
                <span className="block text-white font-display font-bold text-xl tracking-tight">
                  Venissa
                </span>
                <span className="block text-[#D4A853] text-[10px] font-mono tracking-widest uppercase">
                  Cafe & Kitchen
                </span>
              </div>
            </Link>

            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Premium cafe experience in the heart of LB Nagar, Hyderabad. Where every
              sip and bite is crafted with passion and precision.
            </p>

            {/* Contact info */}
            <div className="space-y-2.5 text-sm">
              {[
                { icon: MapPin, text: 'H.No 8-5-30, Saradhi Nagar, LB Nagar, Hyderabad - 500074' },
                { icon: Phone, text: '+91 98765 43210' },
                { icon: Mail, text: 'hello@venissacafe.com' },
                { icon: Clock, text: 'Sun–Sat: 8:00 AM – 11:00 PM' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-2.5 text-white/50">
                  <Icon className="w-4 h-4 text-[#D4A853] flex-shrink-0 mt-0.5" />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                  className="w-9 h-9 glass-card rounded-xl flex items-center justify-center border border-white/[0.08] hover:border-[#D4A853]/40 hover:text-[#D4A853] text-white/50 transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerLinks.map((col) => (
            <div key={col.title} className="space-y-4">
              <h4 className="text-white font-semibold text-sm tracking-wide">{col.title}</h4>
              <div className="gold-divider" />
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/45 text-sm hover:text-[#D4A853] transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 bg-white/20 rounded-full group-hover:bg-[#D4A853] transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/25">
          <p>© 2026 Venissa Cafe & Kitchen. All rights reserved.</p>
          <p>
            Made with{' '}
            <span className="text-[#D4A853]">♥</span>{' '}
            in Hyderabad, India
          </p>
        </div>
      </div>
    </footer>
  );
}
