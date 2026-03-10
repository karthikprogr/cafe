import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import axios from '../lib/axios';
import toast from 'react-hot-toast';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM', '10:00 PM',
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: '2',
  occasion: '',
  notes: '',
};

export default function BookingForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date || !form.time || !form.guests) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/bookings', form);
      setSubmitted(true);
      toast.success('Table booked successfully! Confirmation sent to your email.');
    } catch {
      toast.error('Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-10 rounded-2xl text-center space-y-4 max-w-md mx-auto"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-display text-2xl font-bold text-white">Booking Confirmed!</h3>
        <p className="text-white/50 text-sm leading-relaxed">
          Thank you, <span className="text-[#D4A853] font-semibold">{form.name}</span>! Your table for{' '}
          <span className="text-white font-medium">{form.guests} guests</span> on{' '}
          <span className="text-white font-medium">{form.date}</span> at{' '}
          <span className="text-white font-medium">{form.time}</span> has been reserved.
        </p>
        <p className="text-white/30 text-xs">A confirmation has been sent to {form.email}</p>
        <button
          onClick={() => { setSubmitted(false); setForm(initialForm); }}
          className="btn-primary mt-2"
        >
          Book Another Table
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="glass-card p-6 md:p-8 rounded-2xl border border-white/[0.08] space-y-6 max-w-2xl mx-auto"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-2">
          <label className="text-white/60 text-sm flex items-center gap-2">
            <User className="w-4 h-4 text-[#D4A853]" />
            Full Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="input-field"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-white/60 text-sm flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#D4A853]" />
            Email Address <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="input-field"
            required
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-white/60 text-sm flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#D4A853]" />
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+91 98765 43210"
            className="input-field"
          />
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-white/60 text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-[#D4A853]" />
            Number of Guests <span className="text-red-400">*</span>
          </label>
          <select
            name="guests"
            value={form.guests}
            onChange={handleChange}
            className="input-field cursor-pointer"
            required
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n} className="bg-[#1a1a1a]">
                {n} {n === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
            <option value="10+" className="bg-[#1a1a1a]">10+ Guests (Group)</option>
          </select>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-white/60 text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#D4A853]" />
            Date <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            className="input-field"
            required
          />
        </div>

        {/* Time */}
        <div className="space-y-2">
          <label className="text-white/60 text-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#D4A853]" />
            Preferred Time <span className="text-red-400">*</span>
          </label>
          <select
            name="time"
            value={form.time}
            onChange={handleChange}
            className="input-field cursor-pointer"
            required
          >
            <option value="" className="bg-[#1a1a1a]">Select time slot</option>
            {timeSlots.map((t) => (
              <option key={t} value={t} className="bg-[#1a1a1a]">{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Occasion */}
      <div className="space-y-2">
        <label className="text-white/60 text-sm">Special Occasion (optional)</label>
        <select
          name="occasion"
          value={form.occasion}
          onChange={handleChange}
          className="input-field cursor-pointer"
        >
          <option value="" className="bg-[#1a1a1a]">None</option>
          {['Birthday', 'Anniversary', 'Date Night', 'Business Meeting', 'Family Gathering', 'Other'].map((o) => (
            <option key={o} value={o} className="bg-[#1a1a1a]">{o}</option>
          ))}
        </select>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label className="text-white/60 text-sm flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#D4A853]" />
          Special Requests (optional)
        </label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Any dietary requirements, seating preferences..."
          className="input-field resize-none"
        />
      </div>

      {/* Submit */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        type="submit"
        disabled={loading}
        className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base disabled:opacity-70"
      >
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
            />
            Processing...
          </>
        ) : (
          <>
            <Calendar className="w-5 h-5" />
            Confirm Reservation
          </>
        )}
      </motion.button>

      <p className="text-white/25 text-xs text-center">
        By booking, you agree to our cancellation policy. Please arrive 5 mins early.
      </p>
    </motion.form>
  );
}
