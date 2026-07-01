const express = require('express');
const router = express.Router();
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const Package = require('../models/Package');

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true }).sort({ priority: 1 });
    res.json({
      success: true,
      packages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get package by ID
router.get('/:id', async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    if (!pkg) {
      return res.status(404).json({
        success: false,
        message: 'Package not found',
      });
    }
    res.json({
      success: true,
      package: pkg,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Create package (admin)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, description, price, dataLimit, duration, durationUnit, speed, features } = req.body;

    const pkg = new Package({
      name,
      description,
      price,
      dataLimit,
      duration,
      durationUnit,
      speed,
      features: features || [],
    });

    await pkg.save();

    res.status(201).json({
      success: true,
      message: 'Package created successfully',
      package: pkg,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Update package (admin)
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const pkg = await Package.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedAt: new Date(),
      },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Package updated successfully',
      package: pkg,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Delete package (admin)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Package deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
