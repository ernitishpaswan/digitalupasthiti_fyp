// Download section — APK info dynamically backend se aata hai
import React, { useEffect } from 'react';

const QRCode = () => {
  useEffect(() => {
    const grid = document.getElementById('qr-grid');
    if (!grid) return;
    const size = 11;
    const pattern = [
      [1,1,1,1,1,1,1,0,1,0,1],
      [1,0,0,0,0,0,1,0,0,1,1],
      [1,0,1,1,1,0,1,0,1,0,1],
      [1,0,1,1,1,0,1,0,0,1,0],
      [1,0,1,1,1,0,1,0,1,1,1],
      [1,0,0,0,0,0,1,0,1,0,0],
      [1,1,1,1,1,1,1,0,1,0,1],
      [0,0,0,0,0,0,0,0,0,1,0],
      [1,0,1,1,0,1,1,0,1,1,1],
      [0,1,0,0,1,0,0,0,0,0,1],
      [1,1,1,0,1,1,1,0,1,0,1],
    ];
    grid.innerHTML = '';
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        const cell = document.createElement('div');
        cell.className = `qr-cell ${pattern[r][c] ? 'qr-dark' : 'qr-light'}`;
        grid.appendChild(cell);
      }
    }
  }, []);

  return (
    <div className="qr-wrap" id="qrcode">
      <div className="qr-box" id="qr-grid"></div>
      <div className="qr-label">Scan to download on your phone</div>
    </div>
  );
};

const DownloadSection = ({ release }) => {
  const version    = release?.version    || '1.0.0';
  const fileSize   = release?.fileSize   || '~18 MB';
  const minAndroid = release?.minAndroid || 'Android 7.0+';

  // Supabase direct public URL use karo — koi proxy nahi chahiye
  // Agar release mein downloadUrl hai toh seedha wahi, warna '#'
  const downloadUrl = release?.downloadUrl || '#';

  return (
    <section id="download">
      <div className="dl-bg"></div>
      <div className="dl-inner fade-up">
        <span className="dl-tag">Free Download</span>
        <h2 className="dl-h2">
          Download DigitalUpasthiti<br />and go proxy-free today
        </h2>
        <p className="dl-sub">
          Trusted by institutions across India. One tap to install, zero compromises on security.
        </p>

        <div className="dl-btns">
          <div>
            <a
              href={downloadUrl}
              className="btn-dl-main"
              onClick={downloadUrl === '#' ? (e) => e.preventDefault() : undefined}
              rel="noreferrer"
              // Supabase public URL seedha browser download trigger karta hai
              download={release?.originalFilename || undefined}
            >
              <svg viewBox="0 0 24 24">
                <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
              </svg>
              Download APK · Android
            </a>
            <div className="dl-version">
              v{version} · {fileSize} · Requires {minAndroid}
            </div>
          </div>
        </div>

        <QRCode />
      </div>
    </section>
  );
};

export default DownloadSection;
