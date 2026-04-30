// APK release routes — Supabase Storage 
const express = require('express');
const Release = require('../models/Release');
const { protect } = require('../middleware/auth');
const { upload, uploadToSupabase, deleteFromSupabase } = require('../middleware/upload');

const router = express.Router();

// ── GET /api/releases/latest  (public) ──────────────────────────────────────
// Website pe latest active APK info do
router.get('/latest', async (req, res) => {
  try {
    const release = await Release.findOne({ isActive: true }).sort({ createdAt: -1 });
    if (!release) return res.status(404).json({ message: 'Koi active release nahi mila' });
    res.json(release);
  } catch (err) {
    console.error('Latest release error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ── GET /api/releases  (admin) ───────────────────────────────────────────────
// Saari releases list karo
router.get('/', protect, async (req, res) => {
  try {
    const releases = await Release.find().sort({ createdAt: -1 });
    res.json(releases);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// ── POST /api/releases  (admin) ──────────────────────────────────────────────
// Nayi release banao — file ya manual URL
router.post('/', protect, upload.single('apkFile'), async (req, res) => {
  try {
    const { version, fileSize, minAndroid, releaseNotes, downloadUrl } = req.body;

    if (!version) return res.status(400).json({ message: 'Version number chahiye' });

    let finalDownloadUrl     = downloadUrl || '';
    let supabaseStoragePath  = '';
    let originalFilename     = '';

    // File upload ki hai → Supabase pe daal do
    if (req.file) {
      originalFilename = req.file.originalname;
      const result = await uploadToSupabase(req.file.buffer, 'apk', originalFilename);
      supabaseStoragePath = result.storagePath;
      finalDownloadUrl    = result.publicUrl;   // Supabase direct public URL
    }

    if (!finalDownloadUrl) {
      return res.status(400).json({ message: 'APK file ya download URL chahiye' });
    }

    // Purani active release band karo
    await Release.updateMany({ isActive: true }, { isActive: false });

    const release = await Release.create({
      version,
      fileSize:           fileSize   || 'N/A',
      minAndroid:         minAndroid || 'Android 7.0+',
      downloadUrl:        finalDownloadUrl,
      supabaseStoragePath,
      originalFilename,
      releaseNotes:       releaseNotes || '',
      isActive:           true,
    });

    res.status(201).json(release);
  } catch (err) {
    console.error('Release upload error:', err);
    res.status(500).json({ message: 'Upload failed: ' + err.message });
  }
});

// ── PUT /api/releases/:id  (admin) ──────────────────────────────────────────
// Metadata update karo (file dobara upload nahi hoti yahan)
router.put('/:id', protect, async (req, res) => {
  try {
    const { version, fileSize, minAndroid, releaseNotes, isActive } = req.body;
    const release = await Release.findById(req.params.id);
    if (!release) return res.status(404).json({ message: 'Release nahi mili' });

    if (isActive === true) {
      await Release.updateMany({ _id: { $ne: req.params.id } }, { isActive: false });
    }

    if (version      !== undefined) release.version      = version;
    if (fileSize     !== undefined) release.fileSize      = fileSize;
    if (minAndroid   !== undefined) release.minAndroid    = minAndroid;
    if (releaseNotes !== undefined) release.releaseNotes  = releaseNotes;
    if (isActive     !== undefined) release.isActive      = isActive;

    res.json(await release.save());
  } catch (err) {
    res.status(500).json({ message: 'Update failed' });
  }
});

// ── DELETE /api/releases/:id  (admin) ────────────────────────────────────────
// DB record + Supabase Storage se file dono delete karo
router.delete('/:id', protect, async (req, res) => {
  try {
    const release = await Release.findById(req.params.id);
    if (!release) return res.status(404).json({ message: 'Release nahi mili' });

    // Supabase se file delete karo
    if (release.supabaseStoragePath) {
      try {
        await deleteFromSupabase(release.supabaseStoragePath);
      } catch (err) {
        // File delete fail hone pe bhi DB record hataenge
        console.error('Supabase file delete warning:', err.message);
      }
    }

    await release.deleteOne();
    res.json({ message: 'Release delete ho gayi' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed' });
  }
});

module.exports = router;
