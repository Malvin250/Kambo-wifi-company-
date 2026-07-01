const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const Payment = require('../models/Payment');
const Voucher = require('../models/Voucher');

// Get payment history
router.get('/', verifyToken, async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user.id })
      .populate('package')
      .populate('voucher')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get payment by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('package')
      .populate('voucher');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    // Check if user owns this payment
    if (payment.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    res.json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Initiate M-Pesa payment (placeholder)
router.post('/mpesa', verifyToken, async (req, res) => {
  try {
    const { amount, phoneNumber, packageId, voucherId } = req.body;

    if (!amount || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Amount and phone number required',
      });
    }

    // Placeholder M-Pesa implementation
    const payment = new Payment({
      user: req.user.id,
      amount,
      package: packageId,
      voucher: voucherId,
      phoneNumber,
      paymentMethod: 'mpesa',
      status: 'pending',
      transactionId: `MPESA-${Date.now()}`,
    });

    await payment.save();

    // In production, integrate with actual M-Pesa API
    // This is a placeholder response
    res.status(201).json({
      success: true,
      message: 'Payment initiated',
      payment,
      mpesaPrompt: `Enter M-Pesa PIN to send ${amount} to Kambo WiFi`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// M-Pesa payment callback (placeholder)
router.post('/callback', async (req, res) => {
  try {
    const { transactionId, status, amount } = req.body;

    // Find payment by transaction ID
    const payment = await Payment.findOne({ transactionId });
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found',
      });
    }

    // Update payment status
    payment.status = status === 'success' ? 'completed' : 'failed';
    await payment.save();

    res.json({
      success: true,
      message: 'Callback processed',
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get all payments (admin)
router.get('/admin/all', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('user', 'firstName lastName email phone')
      .populate('package')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
