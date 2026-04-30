// Website ka dynamic content store karne ke liye
// Admin panel se jo bhi update hoga wo yahan save hoga
const mongoose = require('mongoose');

const siteContentSchema = new mongoose.Schema({
  // Unique key to identify the content block
  key: {
    type: String,
    required: true,
    unique: true,
  },
  // Value - string ya JSON string ho sakta hai
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  // Human readable label for admin panel
  label: {
    type: String,
    default: '',
  },
  // Content type for admin panel rendering
  type: {
    type: String,
    enum: ['text', 'textarea', 'url', 'json'],
    default: 'text',
  },
}, { timestamps: true });

module.exports = mongoose.model('SiteContent', siteContentSchema);
