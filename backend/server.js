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
// BUG FIX: CORS origin default was 5000, fix karke 3000 kiya
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ─── Routes ───
app.use('/api/auth', require('./routes/auth'));
app.use('/api/releases', require('./routes/releases'));
app.use('/api/content', require('./routes/content'));

// ─── Health check ───
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'DigitalUpasthiti server chal raha hai! 🚀' });
});

// ─── Default admin aur seed data setup ───
const seedData = async () => {
  try {
    const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
        console.error('❌ ADMIN_EMAIL aur ADMIN_PASSWORD environment variables set nahi hain! Admin create nahi hoga.');
      } else {
        await Admin.create({
          email: process.env.ADMIN_EMAIL,
          password: process.env.ADMIN_PASSWORD,
        });
        console.log('✅ Default admin create ho gaya');
      }
    } else {
      console.log('ℹ️  Admin already exists:', process.env.ADMIN_EMAIL);
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
        { key: 'footer_tagline', value: '© 2026 DigitalUpasthiti. All rights reserved. Made with ❤️ in India.', label: 'Footer Copyright Text', type: 'text' },
        { key: 'stat_accuracy', value: '99.9%', label: 'Hero Stat: Accuracy Rate', type: 'text' },
        { key: 'stat_speed', value: '< 2s', label: 'Hero Stat: Scan Speed', type: 'text' },
        { key: 'stat_proxy', value: '100%', label: 'Hero Stat: Proxy-Free', type: 'text' },
      ];
      await SiteContent.insertMany(defaultContent);
      console.log('✅ Default site content seed ho gaya');
    }
  } catch (error) {
    console.error('Seed error:', error.message);
  }
};

// ─── Error handler ───
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Kuch toh gadbad hai server pe!' });
});

// ─── Server start ───
app.listen(PORT, async () => {
  console.log(`\n🚀 DigitalUpasthiti server port ${PORT} pe chal raha hai`);
  console.log(`📡 API: http://localhost:${PORT}/api/health\n`);
  await seedData();
});
