// APK release ka schema — Supabase Storage use hoga
const mongoose = require('mongoose');

const releaseSchema = new mongoose.Schema({
  version:    { type: String, required: true, trim: true },
  fileSize:   { type: String, required: true, trim: true },
  minAndroid: { type: String, default: 'Android 7.0+' },

  // Supabase public URL — direct download link
  downloadUrl: { type: String, required: true },

  // Original filename (extension ke saath) — e.g. "digitalupasthiti.apk"
  originalFilename: { type: String, default: '' },

  // Supabase bucket ke andar ka path — delete ke liye chahiye
  // e.g. "apk/digitalupasthiti_1714000000000.apk"
  supabaseStoragePath: { type: String, default: '' },

  releaseNotes: { type: String, default: '' },
  isActive:     { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Release', releaseSchema);
