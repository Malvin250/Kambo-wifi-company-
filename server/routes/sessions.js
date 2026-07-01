const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const Session = require('../models/Session');
const Voucher = require('../models/Voucher');

// Get user sessions
router.get('/', verifyToken, async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id })
      .populate('voucher')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get session by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate('voucher');

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found',
      });
    }

    // Check if user owns this session
    if (session.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    res.json({
      success: true,
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Start WiFi session
router.post('/start', verifyToken, async (req, res) => {
  try {
    const { voucherId, deviceType, ipAddress, macAddress, location } = req.body;

    if (!voucherId) {
      return res.status(400).json({
        success: false,
        message: 'Voucher ID required',
      });
    }

    const voucher = await Voucher.findById(voucherId);
    if (!voucher) {
      return res.status(404).json({
        success: false,
        message: 'Voucher not found',
      });
    }

    if (voucher.status !== 'used') {
      return res.status(400).json({
        success: false,
        message: 'Voucher is not active',
      });
    }

    const session = new Session({
      user: req.user.id,
      voucher: voucherId,
      status: 'active',
      deviceType,
      ipAddress,
      macAddress,
      location,
    });

    await session.save();

    res.status(201).json({
      success: true,
      message: 'WiFi session started',
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// End WiFi session
router.post('/:id/end', verifyToken, async (req, res) => {
  try {
    const { dataUsed } = req.body;

    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found',
      });
    }

    if (session.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    session.endTime = new Date();
    session.duration = Math.floor((session.endTime - session.startTime) / 1000 / 60); // minutes
    session.dataUsed = dataUsed || 0;
    session.status = 'ended';

    await session.save();

    res.json({
      success: true,
      message: 'WiFi session ended',
      session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
