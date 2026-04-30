// File upload ka setup — multer + Supabase Storage
const multer = require('multer');
const path   = require('path');
const { supabase, BUCKET } = require('../config/supabase');

/* ── Multer: memory storage (disk pe nahi) ── */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB max (APK ke liye)
  fileFilter: (_req, file, cb) => {
    const allowed = [
      'application/vnd.android.package-archive',
      'application/octet-stream',
      'application/zip',
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/pdf',
    ];
    if (allowed.includes(file.mimetype) || file.originalname.endsWith('.apk')) {
      cb(null, true);
    } else {
      cb(new Error('File type allowed nahi hai'), false);
    }
  },
});

/* ── MIME map ── */
const MIME = {
  '.apk' : 'application/vnd.android.package-archive',
  '.jpg' : 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png' : 'image/png',
  '.webp': 'image/webp',
  '.pdf' : 'application/pdf',
  '.zip' : 'application/zip',
};

/**
 * Buffer ko Supabase Storage pe upload karo
 * @param {Buffer} buffer
 * @param {string} folder   — e.g. 'apk' | 'images'
 * @param {string} origName — original filename with extension
 * @returns {{ publicUrl, storagePath, originalFilename }}
 */
const uploadToSupabase = async (buffer, folder, origName) => {
  const ext      = path.extname(origName).toLowerCase();
  const base     = path.basename(origName, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
  const filename = `${base}_${Date.now()}${ext}`;          // unique naam
  const filePath = `${folder}/${filename}`;                // bucket ke andar ka path
  const mime     = MIME[ext] || 'application/octet-stream';

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, buffer, { contentType: mime, upsert: false });

  if (error) throw new Error(`Supabase upload error: ${error.message}`);

  // Public URL — bucket public hona chahiye Supabase dashboard mein
  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(filePath);

  return { publicUrl, storagePath: data.path, originalFilename: origName };
};

/**
 * Supabase Storage se file delete karo
 * @param {string} storagePath — e.g. 'apk/file_123456789.apk'
 */
const deleteFromSupabase = async (storagePath) => {
  const { error } = await supabase.storage.from(BUCKET).remove([storagePath]);
  if (error) throw new Error(`Supabase delete error: ${error.message}`);
};

module.exports = { upload, uploadToSupabase, deleteFromSupabase };
