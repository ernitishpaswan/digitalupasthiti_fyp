// DigitalUpasthiti ka main server
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');
const SiteContent = require('./models/SiteContent');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Database connect karo ───
connectDB();

// ─── Middleware ───

// ✅ FIXED CORS (no more header error)
app.use(cors({
  origin: true, // sab origin allow karega safely
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Routes ───
app.use('/api/auth', require('./routes/auth'));
app.use('/api/releases', require('./routes/releases'));
app.use('/api/content', require('./routes/content'));

// ─── Root Route (optional but useful) ───
app.get('/', (req, res) => {
  res.send('🚀 DigitalUpasthiti Backend Running Successfully');
});

// ─── Health check ───
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'DigitalUpasthiti server chal raha hai! 🚀' });
});

// ─── Default admin aur seed data setup ───
const seedData = async () => {
  try {
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (!adminExists && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
      await Admin.create({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
      });
      console.log('✅ Default admin create ho gaya');
    } else {
      console.log('ℹ️ Admin already exists ya credentials missing');
    }

    const contentExists = await SiteContent.findOne({ key: 'hero_announcement' });

    if (!contentExists) {
      const defaultContent = [
        { key: 'hero_announcement', value: '', label: 'Hero Announcement Text', type: 'textarea' },
        { key: 'hero_badge_text', value: 'Official Platform', label: 'Hero Badge Text', type: 'text' },
        { key: 'social_twitter', value: '#', label: 'Twitter URL', type: 'url' },
        { key: 'social_linkedin', value: '#', label: 'LinkedIn URL', type: 'url' },
        { key: 'social_github', value: '#', label: 'GitHub URL', type: 'url' },
        { key: 'contact_email', value: 'support@digitalupasthiti.app', label: 'Support Email', type: 'text' },
        { key: 'footer_tagline', value: '© 2026 DigitalUpasthiti. All rights reserved.', label: 'Footer Text', type: 'text' },
        { key: 'stat_accuracy', value: '99.9%', label: 'Accuracy', type: 'text' },
        { key: 'stat_speed', value: '< 2s', label: 'Speed', type: 'text' },
        { key: 'stat_proxy', value: '100%', label: 'Proxy Free', type: 'text' },
      ];

      await SiteContent.insertMany(defaultContent);
      console.log('✅ Default site content seed ho gaya');
    }

  } catch (error) {
    console.error('❌ Seed error:', error.message);
  }
};

// ─── Error handler ───
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(500).json({ message: err.message || 'Server error' });
});

// ─── Server start ───
app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API: /api/health`);

  await seedData();
});