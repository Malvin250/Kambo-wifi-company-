const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const Voucher = require('../models/Voucher');
const Package = require('../models/Package');

// Generate voucher code
const generateVoucherCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 12; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

// Get user vouchers
router.get('/', verifyToken, async (req, res) => {
  try {
    const vouchers = await Voucher.find({ user: req.user.id })
      .populate('package')
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

// Get voucher by code
router.get('/code/:code', async (req, res) => {
  try {
    const voucher = await Voucher.findOne({ code: req.params.code.toUpperCase() })
      .populate('package')
      .populate('user', 'firstName lastName email');

    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: 'Voucher not found',
      });
    }

    res.json({
      success: true,
      voucher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Generate vouchers (admin)
router.post('/generate', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { packageId, quantity, expiryDate } = req.body;

    const pkg = await Package.findById(packageId);
    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: 'Package not found',
      });
    }

    const vouchers = [];
    for (let i = 0; i < quantity; i++) {
      const code = generateVoucherCode();
      const voucher = new Voucher({
        code,
        package: packageId,
        price: pkg.price,
        expiryDate: expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
      await voucher.save();
      vouchers.push(voucher);
    }

    res.status(201).json({
      success: true,
      message: `${quantity} vouchers generated successfully`,
      vouchers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Activate voucher
router.post('/activate', verifyToken, async (req, res) => {
  try {
    const { code } = req.body;

    const voucher = await Voucher.findOne({ code: code.toUpperCase() });
    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: 'Voucher not found',
      });
    }

    if (voucher.status !== 'active') {
      return res.status(400).json({
        success: false,
        message: `Voucher is ${voucher.status}`,
      });
    }

    if (voucher.expiryDate && new Date() > voucher.expiryDate) {
      voucher.status = 'expired';
      await voucher.save();
      return res.status(400).json({
        success: false,
        message: 'Voucher has expired',
      });
    }

    voucher.user = req.user.id;
    voucher.status = 'used';
    voucher.activatedDate = new Date();
    voucher.usedDate = new Date();
    await voucher.save();

    const populatedVoucher = await voucher.populate('package');

    res.json({
      success: true,
      message: 'Voucher activated successfully',
      voucher: populatedVoucher,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
