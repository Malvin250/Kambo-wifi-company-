const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const User = require('../models/User');
const Package = require('../models/Package');
const Voucher = require('../models/Voucher');
const Payment = require('../models/Payment');
const Session = require('../models/Session');

// Dashboard statistics
router.get('/dashboard', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const activeUsers = await User.countDocuments({ role: 'user', isActive: true });
    const totalPackages = await Package.countDocuments();
    const totalVouchers = await Voucher.countDocuments();
    const activeVouchers = await Voucher.countDocuments({ status: 'active' });
    const usedVouchers = await Voucher.countDocuments({ status: 'used' });
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);
    const completedPayments = await Payment.countDocuments({ status: 'completed' });
    const pendingPayments = await Payment.countDocuments({ status: 'pending' });
    const activeSessions = await Session.countDocuments({ status: 'active' });
    const totalSessions = await Session.countDocuments();

    res.json({
      success: true,
      dashboard: {
        users: {
          total: totalUsers,
          active: activeUsers,
        },
        packages: totalPackages,
        vouchers: {
          total: totalVouchers,
          active: activeVouchers,
          used: usedVouchers,
        },
        revenue: totalRevenue[0]?.total || 0,
        payments: {
          completed: completedPayments,
          pending: pendingPayments,
        },
        sessions: {
          active: activeSessions,
          total: totalSessions,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all users (admin)
router.get('/users', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all vouchers (admin)
router.get('/vouchers', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const vouchers = await Voucher.find()
      .populate('package')
      .populate('user', 'firstName lastName email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      vouchers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Generate reports
router.get('/reports', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {};

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const paymentStats = await Payment.aggregate([
      { $match: { ...query, status: 'completed' } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$amount' },
          totalTransactions: { $sum: 1 },
          avgAmount: { $avg: '$amount' },
        },
      },
    ]);

    const voucherStats = await Voucher.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const sessionStats = await Session.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          avgDuration: { $avg: '$duration' },
          totalDataUsed: { $sum: '$dataUsed' },
        },
      },
    ]);

    res.json({
      success: true,
      reports: {
        payments: paymentStats[0] || {},
        vouchers: voucherStats,
        sessions: sessionStats[0] || {},
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
