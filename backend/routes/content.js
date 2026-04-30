// Website ka dynamic content manage karne ke routes
// Hero announcement, social links, contact info etc.
const express = require('express');
const SiteContent = require('../models/SiteContent');
const { protect } = require('../middleware/auth');

const router = express.Router();

// GET /api/content - Public route - saara content ek saath do
router.get('/', async (req, res) => {
  try {
    const contents = await SiteContent.find();
    // Array ko object mein convert karo: { key: value }
    const contentMap = {};
    contents.forEach(item => {
      contentMap[item.key] = item.value;
    });
    res.json(contentMap);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/content/:key - Single content item lo
router.get('/:key', async (req, res) => {
  try {
    const content = await SiteContent.findOne({ key: req.params.key });
    if (!content) return res.status(404).json({ message: 'Content nahi mila' });
    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/content/:key - Admin route - content update karo
router.put('/:key', protect, async (req, res) => {
  try {
    const { value, label, type } = req.body;

    // Agar exist karta hai update karo, nahi toh create karo (upsert)
    const content = await SiteContent.findOneAndUpdate(
      { key: req.params.key },
      { value, label, type },
      { new: true, upsert: true }
    );

    res.json(content);
  } catch (error) {
    res.status(500).json({ message: 'Content update failed' });
  }
});

// POST /api/content/bulk - Admin route - ek saath sab update karo
router.post('/bulk', protect, async (req, res) => {
  try {
    const { items } = req.body; // Array of { key, value, label, type }

    const results = await Promise.all(
      items.map(item =>
        SiteContent.findOneAndUpdate(
          { key: item.key },
          { value: item.value, label: item.label, type: item.type },
          { new: true, upsert: true }
        )
      )
    );

    res.json({ message: 'Sab content update ho gaya!', count: results.length });
  } catch (error) {
    res.status(500).json({ message: 'Bulk update failed' });
  }
});

module.exports = router;
