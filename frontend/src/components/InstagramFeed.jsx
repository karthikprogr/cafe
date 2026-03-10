import { motion } from 'framer-motion';
import { Instagram, Heart, MessageCircle } from 'lucide-react';

const photos = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80',
    alt: 'Coffee Art',
    likes: 412,
    comments: 47,
    span: 'col-span-1 row-span-2',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&q=80',
    alt: 'Pizza',
    likes: 338,
    comments: 29,
    span: 'col-span-1 row-span-1',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80',
    alt: 'Pasta',
    likes: 291,
    comments: 33,
    span: 'col-span-1 row-span-1',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=500&q=80',
    alt: 'Cafe Interior',
    likes: 567,
    comments: 72,
    span: 'col-span-1 row-span-2',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500&q=80',
    alt: 'Milkshake',
    likes: 489,
    comments: 55,
    span: 'col-span-1 row-span-1',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&q=80',
    alt: 'Dessert',
    likes: 377,
    comments: 43,
    span: 'col-span-1 row-span-1',
  },
];

export default function InstagramFeed() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 space-y-4"
      >
        <span className="text-[#D4A853] font-mono text-xs tracking-widest uppercase">
          — Our Instagram —
        </span>
        <h2 className="section-heading">
          Life at <span className="gold-text">Venissa</span>
        </h2>
        <p className="section-subheading max-w-md mx-auto">
          Follow us{' '}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4A853] hover:underline"
          >
            @venissacafe
          </a>{' '}
          for daily food stories
        </p>
      </motion.div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer ${photo.span} ${
              photo.id === 1 || photo.id === 4 ? 'aspect-[4/5]' : 'aspect-square'
            }`}
            style={{
              gridRow: photo.id === 1 || photo.id === 4 ? 'span 2' : 'span 1',
            }}
          >
            <motion.img
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.5 }}
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover"
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <div className="flex items-center gap-4 text-white text-sm font-medium">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 fill-white text-white" />
                  <span>{photo.likes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 fill-white text-white" />
                  <span>{photo.comments}</span>
                </div>
              </div>
            </div>

            {/* Instagram icon */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Instagram className="w-4 h-4 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Follow CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-10 text-center"
      >
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex items-center gap-2"
        >
          <Instagram className="w-4 h-4" />
          Follow @venissacafe
        </a>
      </motion.div>
    </section>
  );
}
