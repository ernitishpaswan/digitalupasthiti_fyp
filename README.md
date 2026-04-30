# DigitalUpasthiti — Full Stack MERN App

## 🐛 Fixed Issues (Is version mein)
1. **Admin login nahi ho raha tha** → Backend `.env` mein `FRONTEND_URL=http://localhost3000` tha (colon missing!) → Fix: `http://localhost:3000`
2. **CORS default wrong port** → server.js fallback 5000 tha, fix karke 3000 kiya
3. **Custom PNG logo support** → Navbar + AdminLogin dono mein logo.png auto-detect hota hai
4. **Frontend folder structure wrong** → Backend files frontend folder mein theen, structure theek kiya

---

## 📋 Requirements (Pehle install karo)
- **Node.js v18+** → https://nodejs.org (LTS download karo)
- **VS Code** → https://code.visualstudio.com

---

## 🚀 Step-by-Step Run Karo

### Terminal 1 — Backend chalao

```bash
cd backend
npm install
npm run dev
```
✅ Dikhega: `🚀 DigitalUpasthiti server port 5000 pe chal raha hai`

### Terminal 2 — Frontend chalao (naya terminal kholo)

```bash
cd frontend
npm install
npm start
```
✅ Browser mein `http://localhost:3000` automatically khulega!

---

## 🔐 Admin Login
- URL: `http://localhost:3000/admin/login`
- Email: `admin@digitalupasthiti.app`
- Password: `Admin@123`

> ⚠️ Backend ZAROORI chal raha hona chahiye tabhi login hoga!

---

## 🖼️ Custom Logo Kaise Lagayen

1. Apni logo PNG file ka naam **`logo.png`** karo
2. Us file ko `frontend/src/` folder mein rakho (replace karo existing placeholder ko)
3. Frontend restart karo: `npm start`

Logo automatically Navbar aur Admin Login dono mein show hoga! ✅

**Recommended size:** 64×64px ya square PNG (transparent background best lagta hai)

---

## 📁 Project Structure
```
project/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── cloudinary.js      # Cloudinary setup
│   ├── middleware/
│   │   ├── auth.js            # JWT middleware
│   │   └── upload.js          # File upload
│   ├── models/
│   │   ├── Admin.js           # Admin schema
│   │   ├── Release.js         # APK Release schema
│   │   └── SiteContent.js     # Site content schema
│   ├── routes/
│   │   ├── auth.js            # Login/logout routes
│   │   ├── releases.js        # APK release routes
│   │   └── content.js         # Site content routes
│   ├── server.js              # Main server file
│   ├── package.json
│   └── .env                   ← Backend config (MongoDB, JWT, Cloudinary)
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/        # Navbar, Hero, Features etc.
│   │   ├── context/           # AuthContext (login state)
│   │   ├── hooks/             # useSiteData
│   │   ├── pages/             # HomePage, AdminLogin, AdminDashboard
│   │   ├── api.js             # All API calls
│   │   ├── App.js             # Routes
│   │   ├── index.js           # Entry point
│   │   ├── index.css          # All styles
│   │   └── logo.png           ← APNA LOGO YAHAN DAALO (replace this!)
│   ├── package.json
│   └── .env                   ← API URL config
│
└── package.json               # Root - dono run karne ke liye
```

---

## ❓ Common Problems

**Admin login nahi ho raha?**
→ Backend chal raha hai? Terminal 1 mein `npm run dev` kiya?
→ `http://localhost:5000/api/health` browser mein kholo — response aata hai?

**`npm install` error aaya?**
→ Node.js version check karo: `node --version` (v18+ hona chahiye)

**Port 3000 already in use?**
→ Y press karo — 3001 pe chalega

**MongoDB connect nahi ho raha?**
→ Backend `.env` mein `MONGO_URI` check karo
→ MongoDB Atlas dashboard mein IP whitelist check karo (0.0.0.0/0 allow karo testing ke liye)
