const cron = require('node-cron');
const Order = require('../models/Order');
const Booking = require('../models/Booking');

// Runs every day at 2:00 AM
cron.schedule('0 2 * * *', async () => {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  try {
    // Delete orders older than 7 days that are fully done or cancelled
    const deletedOrders = await Order.deleteMany({
      createdAt: { $lt: oneWeekAgo },
      status: { $in: ['delivered', 'cancelled'] },
    });

    // Delete bookings older than 7 days that are completed or cancelled
    const deletedBookings = await Booking.deleteMany({
      createdAt: { $lt: oneWeekAgo },
      status: { $in: ['completed', 'cancelled'] },
    });

    console.log(
      `[Cleanup] Deleted ${deletedOrders.deletedCount} old orders, ${deletedBookings.deletedCount} old bookings`
    );
  } catch (err) {
    console.error('[Cleanup] Error during cleanup:', err.message);
  }
});

console.log('[Cleanup] Auto-cleanup job scheduled — runs daily at 2:00 AM');
