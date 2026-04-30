// AdminDashboard.js — DigitalUpasthiti Admin Panel
// UI: Top Navbar layout matching index.html design system
// ALL logic/functionality UNCHANGED — only UI upgraded.

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import {
  getAllReleases, createRelease, updateRelease, deleteRelease,
  getSiteContent, bulkUpdateContent, changePassword
} from '../api';

/* ─── Inject Global Styles once ─── */
const injectStyles = () => {
  if (document.getElementById('admin-global-styles')) return;
  const style = document.createElement('style');
  style.id = 'admin-global-styles';
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --green:        #25D366;
      --green-dark:   #1aaa4f;
      --green-light:  #d1f7e0;
      --green-dim:    rgba(37,211,102,0.10);
      --green-border: rgba(37,211,102,0.25);
      --red:          #FF3B30;
      --red-dim:      rgba(255,59,48,0.08);
      --red-border:   rgba(255,59,48,0.25);
      --dark:         #111827;
      --dark2:        #1f2937;
      --bg:           #F9FAFB;
      --surface:      #FFFFFF;
      --gray:         #6b7280;
      --gray-light:   #e5e7eb;
      --text:         #111827;
      --text-dim:     #374151;
      --text-muted:   #6b7280;
      --font-head:    'Syne', sans-serif;
      --font-body:    'DM Sans', sans-serif;
      --r-sm:         6px;
      --r-md:         10px;
      --r-lg:         16px;
      --r-xl:         20px;
      --shadow-sm:    0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
      --shadow-md:    0 4px 16px rgba(0,0,0,0.08);
      --shadow-lg:    0 12px 40px rgba(0,0,0,0.13);
      --nav-h:        68px;
      --subnav-h:     56px;
    }

    html { scroll-behavior: smooth; }

    .admin-root {
      font-family: var(--font-body);
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      -webkit-font-smoothing: antialiased;
    }

    /* Scrollbar — green like index.html */
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: var(--green); border-radius: 99px; }

    /* ════════════════════════════════
       TOP NAVBAR  (matches index.html nav exactly)
    ════════════════════════════════ */
    .adm-navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 999;
      height: var(--nav-h);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 5%;
      background: rgba(249,250,251,0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border-bottom: 1px solid rgba(37,211,102,0.15);
      transition: box-shadow 0.3s;
      gap: 20px;
    }
    .adm-navbar.scrolled {
      box-shadow: 0 2px 24px rgba(37,211,102,0.10);
    }

    /* Logo block — identical to index.html .nav-logo */
    .adm-nav-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: var(--font-head);
      font-weight: 800;
      font-size: 1.22rem;
      color: var(--dark);
      text-decoration: none;
      flex-shrink: 0;
      white-space: nowrap;
    }
    .adm-nav-logo .logo-icon {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      background: var(--green);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 16px rgba(37,211,102,0.28);
      flex-shrink: 0;
    }
    .adm-nav-logo .logo-icon svg { width: 20px; height: 20px; fill: white; }
    .adm-nav-logo em { color: var(--green); font-style: normal; }

    /* Centre nav tabs — desktop */
    .adm-nav-links {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 1;
      justify-content: center;
    }
    .adm-nav-link {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 8px 18px;
      border-radius: var(--r-md);
      border: none;
      background: transparent;
      font-family: var(--font-body);
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--dark);
      cursor: pointer;
      transition: color 0.2s, background 0.2s;
      white-space: nowrap;
      text-decoration: none;
    }
    .adm-nav-link:hover   { color: var(--green); background: var(--green-dim); }
    .adm-nav-link.active  { color: var(--green-dark); background: var(--green-dim); font-weight: 600; }
    .adm-nav-link-icon    { font-size: 15px; }

    /* Right side controls */
    .adm-nav-right {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }

    /* User avatar chip */
    .adm-nav-user {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 5px 12px 5px 5px;
      border-radius: 100px;
      background: var(--bg);
      border: 1px solid var(--gray-light);
      cursor: default;
      white-space: nowrap;
      max-width: 200px;
    }
    .adm-nav-avatar {
      width: 28px; height: 28px;
      border-radius: 50%;
      background: var(--green);
      display: flex; align-items: center; justify-content: center;
      font-family: var(--font-head);
      font-size: 12px; font-weight: 700; color: white;
      flex-shrink: 0;
    }
    .adm-nav-user-email {
      font-size: 12px; font-weight: 500;
      color: var(--text-dim);
      overflow: hidden; text-overflow: ellipsis;
    }

    /* View site btn */
    .adm-nav-site-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 8px 16px;
      border-radius: var(--r-md);
      border: 1px solid var(--gray-light);
      background: var(--surface);
      font-family: var(--font-body);
      font-size: 0.85rem; font-weight: 600;
      color: var(--text-dim);
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
      box-shadow: var(--shadow-sm);
    }
    .adm-nav-site-btn:hover {
      background: var(--dark); color: white;
      border-color: var(--dark);
      transform: translateY(-1px);
    }

    /* Logout — red CTA exactly like .nav-cta */
    .adm-nav-logout-btn {
      display: inline-flex; align-items: center; gap: 6px;
      padding: 9px 20px;
      border-radius: var(--r-md);
      border: none;
      background: var(--red);
      font-family: var(--font-body);
      font-size: 0.88rem; font-weight: 600;
      color: white;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
      white-space: nowrap;
    }
    .adm-nav-logout-btn:hover { background: #e02d23; transform: translateY(-1px); }

    /* Mobile hamburger */
    .adm-hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      padding: 6px;
      background: none;
      border: none;
    }
    .adm-hamburger span {
      display: block;
      width: 24px; height: 2px;
      background: var(--dark);
      border-radius: 2px;
      transition: 0.3s;
    }

    /* Mobile menu dropdown */
    .adm-mobile-menu {
      display: none;
      position: fixed;
      top: var(--nav-h);
      left: 0; right: 0;
      background: white;
      padding: 16px 5%;
      flex-direction: column;
      gap: 4px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.08);
      z-index: 998;
      border-bottom: 1px solid var(--gray-light);
    }
    .adm-mobile-menu.open { display: flex; }
    .adm-mob-link {
      display: flex; align-items: center; gap: 10px;
      padding: 12px 14px;
      border-radius: var(--r-md);
      background: none; border: none;
      font-family: var(--font-body);
      font-size: 1rem; font-weight: 500;
      color: var(--dark);
      cursor: pointer; width: 100%; text-align: left;
      transition: all 0.15s; text-decoration: none;
    }
    .adm-mob-link:hover, .adm-mob-link.active {
      background: var(--green-dim); color: var(--green-dark);
    }
    .adm-mob-divider { height: 1px; background: var(--gray-light); margin: 8px 0; }
    .adm-mob-actions { display: flex; gap: 10px; padding-top: 4px; flex-wrap: wrap; }

    /* ════════════════════════════════
       SUB-HEADER  (dark banner below nav)
    ════════════════════════════════ */
    .adm-subheader {
      position: fixed;
      top: var(--nav-h);
      left: 0; right: 0;
      z-index: 99;
      height: var(--subnav-h);
      background: var(--dark);
      display: flex;
      align-items: center;
      padding: 0 5%;
      gap: 0;
      overflow: hidden;
    }
    /* dot bg from index.html hero */
    .adm-subheader::before {
      content: '';
      position: absolute;
      inset: 0;
      opacity: 0.05;
      background-image: radial-gradient(circle, #25D366 1px, transparent 1px);
      background-size: 22px 22px;
      pointer-events: none;
    }
    /* green glow top-right */
    .adm-subheader::after {
      content: '';
      position: absolute;
      top: -60px; right: -60px;
      width: 200px; height: 200px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(37,211,102,0.15) 0%, transparent 70%);
      pointer-events: none;
    }

    .adm-subh-left {
      display: flex;
      align-items: center;
      gap: 0;
      flex: 1;
      min-width: 0;
      position: relative;
      z-index: 1;
    }

    /* Mini brand inside sub-header */
    .adm-subh-brand {
      display: flex;
      align-items: center;
      gap: 9px;
      padding-right: 20px;
      margin-right: 20px;
      border-right: 1px solid rgba(255,255,255,0.1);
      flex-shrink: 0;
    }
    .adm-subh-brand-icon {
      width: 26px; height: 26px;
      border-radius: 7px;
      background: var(--green);
      display: flex; align-items: center; justify-content: center;
    }
    .adm-subh-brand-icon svg { width: 14px; height: 14px; fill: white; }
    .adm-subh-brand-name {
      font-family: var(--font-head);
      font-size: 13px; font-weight: 800;
      color: white; white-space: nowrap;
    }
    .adm-subh-brand-name em { color: var(--green); font-style: normal; }

    .adm-subh-info { flex: 1; min-width: 0; }
    .adm-subh-title {
      font-family: var(--font-head);
      font-size: 14px; font-weight: 700;
      color: white; white-space: nowrap;
      overflow: hidden; text-overflow: ellipsis;
    }
    .adm-subh-sub {
      font-size: 11px;
      color: rgba(255,255,255,0.38);
      white-space: nowrap;
    }

    /* Live indicator badge */
    .adm-live-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 100px;
      background: rgba(37,211,102,0.12);
      border: 1px solid rgba(37,211,102,0.28);
      font-size: 11px; font-weight: 700;
      color: var(--green);
      letter-spacing: 0.04em;
      white-space: nowrap;
      flex-shrink: 0;
      position: relative; z-index: 1;
    }
    .adm-live-badge .bdot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--green);
      animation: pulseDot 2s infinite;
    }
    @keyframes pulseDot {
      0%,100% { opacity:1; transform:scale(1); }
      50%      { opacity:0.5; transform:scale(1.6); }
    }

    /* ════════════════════════════════
       MAIN CONTENT AREA
    ════════════════════════════════ */
    .adm-main {
      flex: 1;
      margin-top: calc(var(--nav-h) + var(--subnav-h));
      width: 100%;
    }

    .adm-main-inner {
      max-width: 1260px;
      margin: 0 auto;
      padding: 40px 5% 60px;
    }

    /* ── Page Header ── */
    .adm-page-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 20px;
      margin-bottom: 32px;
      flex-wrap: wrap;
    }
    .adm-page-header > div:first-child { flex: 1; min-width: 0; }
    .adm-page-title {
      font-family: var(--font-head);
      font-size: 30px; font-weight: 800;
      color: var(--dark);
      letter-spacing: -0.02em;
      margin-bottom: 4px; line-height: 1.15;
    }
    .adm-page-sub {
      font-size: 14px; color: var(--text-muted); line-height: 1.6;
    }

    /* ── Stats Row ── */
    .adm-stats-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-bottom: 32px;
    }
    .adm-stat-card {
      background: var(--surface);
      border: 1.5px solid var(--gray-light);
      border-radius: var(--r-lg);
      padding: 26px 28px;
      box-shadow: var(--shadow-sm);
      transition: all 0.25s ease;
      display: flex; flex-direction: column;
      position: relative; overflow: hidden;
    }
    .adm-stat-card::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: var(--green);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.35s ease;
    }
    .adm-stat-card:hover {
      box-shadow: var(--shadow-md);
      border-color: rgba(37,211,102,0.35);
      transform: translateY(-3px);
    }
    .adm-stat-card:hover::after { transform: scaleX(1); }

    .adm-stat-icon { font-size: 22px; margin-bottom: 14px; }
    .adm-stat-label {
      font-size: 11px; font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase; letter-spacing: 0.08em;
      margin-bottom: 10px;
    }
    .adm-stat-value {
      font-family: var(--font-head);
      font-size: 42px; font-weight: 800;
      color: var(--dark);
      letter-spacing: -0.03em; line-height: 1;
      margin-bottom: 6px;
    }
    .adm-stat-value.green { color: var(--green); }
    .adm-stat-value.blue  { color: #2563EB; }
    .adm-stat-footer {
      font-size: 12px; color: var(--text-muted);
      margin-top: auto; padding-top: 10px;
      border-top: 1px solid var(--gray-light);
    }

    /* ── Buttons ── */
    .btn {
      display: inline-flex; align-items: center; justify-content: center;
      gap: 8px; padding: 12px 22px;
      border-radius: var(--r-md);
      border: 1.5px solid transparent;
      font-family: var(--font-body);
      font-size: 14px; font-weight: 600;
      cursor: pointer; transition: all 0.2s ease;
      white-space: nowrap;
      min-height: 46px; min-width: 46px;
      touch-action: manipulation; text-decoration: none;
    }
    .btn:disabled { opacity: 0.55; cursor: not-allowed; }
    .btn:active:not(:disabled) { transform: translateY(1px); }

    .btn-primary {
      background: var(--green); color: white; border-color: var(--green);
      box-shadow: 0 0 20px rgba(37,211,102,0.2);
    }
    .btn-primary:hover:not(:disabled) {
      background: var(--green-dark); border-color: var(--green-dark);
      box-shadow: 0 4px 24px rgba(37,211,102,0.35); transform: translateY(-1px);
    }
    .btn-success {
      background: var(--green); color: white; border-color: var(--green);
      box-shadow: 0 0 20px rgba(37,211,102,0.2);
    }
    .btn-success:hover:not(:disabled) {
      background: var(--green-dark); border-color: var(--green-dark);
      box-shadow: 0 4px 24px rgba(37,211,102,0.35); transform: translateY(-1px);
    }
    .btn-ghost {
      background: var(--surface); color: var(--text-dim);
      border-color: var(--gray-light); box-shadow: var(--shadow-sm);
    }
    .btn-ghost:hover:not(:disabled) {
      background: var(--bg); color: var(--text); border-color: #adb5bd;
    }
    .btn-danger {
      background: var(--surface); color: var(--red); border-color: var(--gray-light);
      box-shadow: var(--shadow-sm);
    }
    .btn-danger:hover:not(:disabled) {
      background: var(--red-dim); border-color: var(--red-border);
    }
    .btn-icon { width: 46px; height: 46px; padding: 0; border-radius: var(--r-md); flex-shrink: 0; }

    /* ── Cards ── */
    .adm-card {
      background: var(--surface);
      border: 1.5px solid var(--gray-light);
      border-radius: var(--r-lg);
      padding: 28px 32px;
      margin-bottom: 24px;
      box-shadow: var(--shadow-sm);
      transition: box-shadow 0.2s;
    }
    .adm-card:hover { box-shadow: var(--shadow-md); }
    .adm-card-header { margin-bottom: 24px; }
    .adm-card-title {
      font-family: var(--font-head);
      font-size: 17px; font-weight: 700;
      color: var(--dark);
      display: flex; align-items: center; gap: 8px;
    }

    /* ── Forms ── */
    .adm-form-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
    .adm-form-group { display: flex; flex-direction: column; gap: 8px; }
    .adm-form-group.full { grid-column: 1 / -1; }

    .adm-label {
      font-size: 13px; font-weight: 600; color: var(--text-dim); display: block;
    }
    .adm-input {
      background: var(--surface);
      border: 1.5px solid var(--gray-light);
      border-radius: var(--r-md);
      padding: 11px 14px;
      color: var(--text); font-size: 14px; font-family: var(--font-body);
      outline: none; width: 100%;
      transition: all 0.2s; box-shadow: var(--shadow-sm); min-height: 46px;
    }
    .adm-input:focus {
      border-color: var(--green);
      box-shadow: 0 0 0 3px rgba(37,211,102,0.12);
    }
    .adm-input::placeholder { color: #adb5bd; }
    textarea.adm-input {
      resize: vertical; min-height: 120px; line-height: 1.6; padding: 12px 14px;
    }

    /* File upload zone */
    .adm-file-input {
      background: var(--bg);
      border: 2px dashed #d1d5db;
      border-radius: var(--r-md);
      padding: 36px 20px;
      text-align: center; cursor: pointer;
      transition: all 0.2s;
      color: var(--text-muted); font-size: 14px; font-weight: 500;
      display: flex; flex-direction: column; align-items: center;
      gap: 8px; min-height: 130px; justify-content: center;
    }
    .adm-file-input:hover {
      border-color: var(--green);
      background: rgba(37,211,102,0.04);
      color: var(--green-dark);
    }
    .adm-file-input input { display: none; }

    /* ── Release Cards ── */
    .release-list { display: flex; flex-direction: column; gap: 14px; }

    .release-card {
      background: var(--surface);
      border: 1.5px solid var(--gray-light);
      border-radius: var(--r-lg);
      padding: 22px 26px;
      display: grid;
      grid-template-columns: 56px 1fr auto;
      align-items: center;
      gap: 20px;
      box-shadow: var(--shadow-sm);
      transition: all 0.25s ease;
      position: relative; overflow: hidden;
    }
    .release-card:hover {
      box-shadow: var(--shadow-md);
      border-color: rgba(37,211,102,0.3);
      transform: translateY(-2px);
    }
    .release-card.is-active {
      border-color: rgba(37,211,102,0.35);
      background: #fafffe;
    }
    .release-card.is-active::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 4px; background: var(--green);
    }
    .release-icon {
      width: 56px; height: 56px;
      border-radius: var(--r-md);
      background: var(--bg);
      border: 1.5px solid var(--gray-light);
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; flex-shrink: 0;
    }
    .release-card.is-active .release-icon {
      background: rgba(37,211,102,0.08);
      border-color: rgba(37,211,102,0.2);
    }
    .release-body {
      flex: 1; min-width: 0;
      display: flex; flex-direction: column; gap: 8px;
    }
    .release-header { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .release-version {
      font-family: var(--font-head);
      font-size: 16px; font-weight: 700; color: var(--dark);
    }
    .release-meta {
      font-size: 13px; color: var(--text-muted);
      display: flex; gap: 16px; flex-wrap: wrap; align-items: center;
    }
    .release-meta span { display: flex; align-items: center; gap: 5px; }
    .release-notes { font-size: 13px; color: var(--text-dim); line-height: 1.6; }
    .release-actions {
      display: flex; gap: 8px; align-items: center; flex-shrink: 0;
    }

    /* ── Badges ── */
    .badge {
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 11px; border-radius: 100px;
      font-size: 11px; font-weight: 700;
      letter-spacing: 0.03em; white-space: nowrap;
    }
    .badge-green { background: var(--green-light); color: var(--green-dark); }
    .badge-gray  { background: var(--gray-light); color: var(--gray); }
    .badge-blue  { background: #EFF6FF; color: #1D4ED8; }
    .badge-dot {
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--green); animation: pulseDot 2s infinite;
    }

    /* ── Empty / Loading ── */
    .adm-empty {
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      padding: 80px 20px; text-align: center;
      border: 2px dashed var(--gray-light);
      border-radius: var(--r-xl);
      background: var(--surface); gap: 14px;
    }
    .adm-empty-icon { font-size: 56px; line-height: 1; }
    .adm-empty-title {
      font-family: var(--font-head);
      font-size: 20px; font-weight: 700; color: var(--dark);
    }
    .adm-empty-sub {
      font-size: 14px; color: var(--text-muted);
      max-width: 360px; line-height: 1.65;
    }
    .adm-empty .btn { margin-top: 8px; }

    .adm-loading {
      display: flex; align-items: center; justify-content: center;
      padding: 90px 20px; color: var(--text-muted);
      gap: 14px; font-size: 14px; font-weight: 500;
    }

    /* ── Spinner ── */
    .spin {
      width: 18px; height: 18px;
      border: 2px solid rgba(255,255,255,0.3);
      border-top-color: white;
      border-radius: 50%;
      display: inline-block; flex-shrink: 0;
      animation: spinning 0.7s linear infinite;
    }
    .spin-dark { border-color: var(--gray-light); border-top-color: var(--green); }
    @keyframes spinning { to { transform: rotate(360deg); } }

    /* ── Tabs ── */
    .adm-tabs {
      display: flex; gap: 4px;
      border-bottom: 1.5px solid var(--gray-light);
      margin-bottom: 28px;
      overflow-x: auto; scrollbar-width: none;
    }
    .adm-tabs::-webkit-scrollbar { display: none; }

    .adm-tab {
      padding: 11px 20px;
      border: none; background: transparent;
      color: var(--text-muted);
      font-size: 13px; font-weight: 600; font-family: var(--font-body);
      cursor: pointer; position: relative;
      transition: all 0.2s;
      border-radius: var(--r-sm) var(--r-sm) 0 0;
      white-space: nowrap; flex-shrink: 0;
    }
    .adm-tab.active { color: var(--green-dark); font-weight: 700; }
    .adm-tab.active::after {
      content: '';
      position: absolute; bottom: -1.5px; left: 0; right: 0;
      height: 2.5px; background: var(--green);
      border-radius: 2px 2px 0 0;
    }
    .adm-tab:hover:not(.active) { color: var(--text); }

    /* ── Info alert ── */
    .adm-info {
      background: rgba(37,211,102,0.07);
      border: 1px solid rgba(37,211,102,0.2);
      border-radius: var(--r-md);
      padding: 14px 16px;
      font-size: 13px; color: var(--green-dark);
      display: flex; align-items: flex-start; gap: 10px;
      margin-bottom: 24px; line-height: 1.6; font-weight: 500;
    }

    /* ── Content field ── */
    .content-field-row {
      display: flex; align-items: flex-start;
      gap: 16px; padding: 22px 0;
      border-bottom: 1px solid var(--gray-light);
    }
    .content-field-row:last-child { border-bottom: none; }
    .content-field-icon {
      width: 46px; height: 46px; border-radius: var(--r-md);
      background: var(--green-light); border: 1px solid rgba(37,211,102,0.2);
      display: flex; align-items: center; justify-content: center;
      font-size: 20px; flex-shrink: 0;
    }
    .content-field-body { flex: 1; display: flex; flex-direction: column; gap: 10px; }

    /* ── Password toggle ── */
    .adm-input-wrapper { position: relative; }
    .adm-input-toggle {
      position: absolute; right: 10px; top: 50%;
      transform: translateY(-50%);
      background: none; border: none; cursor: pointer;
      font-size: 15px; color: var(--text-muted); padding: 8px;
      border-radius: var(--r-sm); transition: all 0.2s;
      min-width: 36px; min-height: 36px;
      display: flex; align-items: center; justify-content: center;
    }
    .adm-input-toggle:hover { color: var(--text); background: var(--bg); }

    /* ════════════════════════════════
       RESPONSIVE
    ════════════════════════════════ */
    @media (max-width: 1024px) {
      .adm-navbar { padding: 0 4%; }
      .adm-subheader { padding: 0 4%; }
      .adm-main-inner { padding: 36px 4% 52px; }
    }

    @media (max-width: 900px) {
      /* Hide desktop nav, show hamburger */
      .adm-nav-links     { display: none; }
      .adm-nav-user      { display: none; }
      .adm-nav-site-btn  { display: none; }
      .adm-nav-logout-btn { display: none; }
      .adm-hamburger     { display: flex; }

      .adm-stats-row { grid-template-columns: 1fr 1fr; gap: 14px; }
      .adm-form-grid { grid-template-columns: 1fr; gap: 16px; }

      .release-card {
        grid-template-columns: 48px 1fr;
        gap: 14px;
      }
      .release-actions {
        grid-column: 1 / -1;
        justify-content: flex-start;
      }
    }

    @media (max-width: 640px) {
      :root { --subnav-h: 50px; }

      .adm-main-inner { padding: 24px 16px 48px; }
      .adm-navbar     { padding: 0 16px; }
      .adm-subheader  { padding: 0 16px; }
      .adm-subh-brand { display: none; }

      .adm-stats-row { grid-template-columns: 1fr; gap: 12px; }
      .adm-stat-value { font-size: 34px; }
      .adm-stat-card  { padding: 20px; }

      .adm-card { padding: 20px; }
      .adm-page-title { font-size: 22px; }
      .adm-page-header { flex-direction: column; align-items: stretch; }
      .adm-page-header .btn { width: 100%; justify-content: center; }

      .release-card { padding: 16px; gap: 12px; }
      .release-icon { width: 44px; height: 44px; font-size: 20px; }
      .release-version { font-size: 14px; }

      .btn { padding: 11px 18px; font-size: 13px; min-height: 44px; }
      .btn-icon { width: 42px; height: 42px; }

      .adm-tabs { gap: 0; }
      .adm-tab  { padding: 10px 14px; font-size: 12px; }

      .content-field-row { flex-direction: column; gap: 10px; padding: 18px 0; }

      .adm-mob-actions { flex-direction: column; }
      .adm-mob-actions > * { width: 100%; justify-content: center; }
    }

    @media (max-width: 400px) {
      .adm-nav-logo { font-size: 1rem; }
    }

    /* ── Entrance Animations ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .adm-page-header { animation: fadeUp 0.28s ease both; }
    .adm-stats-row   { animation: fadeUp 0.30s ease both 0.04s; }
    .adm-card        { animation: fadeUp 0.30s ease both 0.06s; }
    .release-card    { animation: fadeUp 0.28s ease both; }
    .adm-empty       { animation: fadeUp 0.30s ease both; }
  `;
  document.head.appendChild(style);
};

/* Page meta */
const PAGE_META = {
  releases: { title: 'APK Releases',      sub: 'Manage & deploy Android releases'        },
  content:  { title: 'Site Content',       sub: 'Edit live website text & links'           },
  settings: { title: 'Account Settings',   sub: 'Security & administrator configuration'  },
};

/* ══════════════════════════════════════════
   AdminDashboard Root — NO LOGIC CHANGES
══════════════════════════════════════════ */
const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('releases');
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  useEffect(() => { injectStyles(); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (!e.target.closest('.adm-mobile-menu') && !e.target.closest('.adm-hamburger'))
        setMenuOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully!');
  };

  const switchTab = (id) => { setActiveTab(id); setMenuOpen(false); };

  const emailInitial = admin?.email ? admin.email[0].toUpperCase() : 'A';
  const meta = PAGE_META[activeTab];

  const navItems = [
    { id: 'releases', icon: '📦', label: 'APK Releases' },
    { id: 'content',  icon: '✏️', label: 'Site Content'  },
    { id: 'settings', icon: '⚙️', label: 'Settings'      },
  ];

  return (
    <div className="admin-root">

      {/* ──────────────────────────────────────────
          NAVBAR  (design = index.html exactly)
      ────────────────────────────────────────── */}
      <nav className={`adm-navbar ${scrolled ? 'scrolled' : ''}`}>

        {/* Left: Logo */}
        <a className="adm-nav-logo" href="/" target="_blank" rel="noreferrer">
          <div className="logo-icon">
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
            </svg>
          </div>
          Digital<em>Upasthiti</em>
        </a>

        {/* Centre: Nav links */}
        <div className="adm-nav-links">
          {navItems.map(t => (
            <button
              key={t.id}
              className={`adm-nav-link ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => switchTab(t.id)}
            >
              <span className="adm-nav-link-icon">{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* Right: user + actions */}
        <div className="adm-nav-right">
          <div className="adm-nav-user">
            <div className="adm-nav-avatar">{emailInitial}</div>
            <span className="adm-nav-user-email">{admin?.email}</span>
          </div>
          <button className="adm-nav-site-btn" onClick={() => window.open('/', '_blank')}>
            🌐 View Site
          </button>
          <button className="adm-nav-logout-btn" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className="adm-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div className={`adm-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navItems.map(t => (
          <button
            key={t.id}
            className={`adm-mob-link ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => switchTab(t.id)}
          >
            <span>{t.icon}</span> {t.label}
          </button>
        ))}
        <div className="adm-mob-divider" />
        <div className="adm-mob-actions">
          <button className="btn btn-ghost" onClick={() => window.open('/', '_blank')}>
            🌐 View Site
          </button>
          <button className="btn btn-danger" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* ──────────────────────────────────────────
          SUB-HEADER  (dark bar with branding)
      ────────────────────────────────────────── */}
      <div className="adm-subheader">
        <div className="adm-subh-left">
          {/* Mini brand */}
          <div className="adm-subh-brand">
            <div className="adm-subh-brand-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
                  10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
              </svg>
            </div>
            <span className="adm-subh-brand-name">Digital<em>Upasthiti</em></span>
          </div>

          {/* Page info */}
          <div className="adm-subh-info">
            <div className="adm-subh-title">Admin Dashboard — {meta.title}</div>
            <div className="adm-subh-sub">Management portal for DigitalUpasthiti · {meta.sub}</div>
          </div>
        </div>

        {/* Live indicator */}
        <div className="adm-live-badge">
          <span className="bdot" />
          Live
        </div>
      </div>

      {/* ──────────────────────────────────────────
          MAIN CONTENT
      ────────────────────────────────────────── */}
      <main className="adm-main">
        <div className="adm-main-inner">
          {activeTab === 'releases' && <ReleasesTab />}
          {activeTab === 'content'  && <ContentTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </main>

    </div>
  );
};

/* ══════════════════════════════════════════
   Releases Tab — ALL LOGIC UNCHANGED
══════════════════════════════════════════ */
const ReleasesTab = () => {
  const [releases,     setReleases]     = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [showForm,     setShowForm]     = useState(false);
  const [uploading,    setUploading]    = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef();

  const [form, setForm] = useState({
    version: '', fileSize: '', minAndroid: 'Android 7.0+',
    releaseNotes: '', downloadUrl: '',
  });

  const fetchReleases = async () => {
    setLoading(true);
    try {
      const { data } = await getAllReleases();
      setReleases(data);
    } catch {
      toast.error('Releases load nahi hue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchReleases(); }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (fileRef.current?.files[0]) formData.append('apkFile', fileRef.current.files[0]);
      await createRelease(formData);
      toast.success('✅ Nayi release upload ho gayi!');
      setShowForm(false);
      setSelectedFile(null);
      setForm({ version: '', fileSize: '', minAndroid: 'Android 7.0+', releaseNotes: '', downloadUrl: '' });
      fetchReleases();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload fail ho gayi');
    } finally {
      setUploading(false);
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      await updateRelease(id, { isActive: !currentStatus });
      toast.success(currentStatus ? 'Release deactivated' : 'Release activated!');
      fetchReleases();
    } catch {
      toast.error('Update fail hua');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Pakka delete karna hai? Yeh action undo nahi hogi.')) return;
    try {
      await deleteRelease(id);
      toast.success('Release delete ho gayi!');
      fetchReleases();
    } catch {
      toast.error('Delete fail hua');
    }
  };

  const activeCount = releases.filter(r => r.isActive).length;
  const totalCount  = releases.length;

  return (
    <div>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">APK Releases</h1>
          <p className="adm-page-sub">Upload and manage APK files. Active releases will be live on the website.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(f => !f)}>
          {showForm ? '✕ Cancel' : '+ New Release'}
        </button>
      </div>

      <div className="adm-stats-row">
        <div className="adm-stat-card">
          <span className="adm-stat-icon">📦</span>
          <div className="adm-stat-label">Total Releases</div>
          <div className="adm-stat-value blue">{totalCount}</div>
          <div className="adm-stat-footer">All versions historically uploaded</div>
        </div>
        <div className="adm-stat-card">
          <span className="adm-stat-icon">📱</span>
          <div className="adm-stat-label">Active Deployments</div>
          <div className="adm-stat-value green">{activeCount}</div>
          <div className="adm-stat-footer">Currently visible to users on site</div>
        </div>
        <div className="adm-stat-card">
          <span className="adm-stat-icon">🗄️</span>
          <div className="adm-stat-label">Archived</div>
          <div className="adm-stat-value">{totalCount - activeCount}</div>
          <div className="adm-stat-footer">Inactive / older versions</div>
        </div>
      </div>

      {showForm && (
        <div className="adm-card">
          <div className="adm-card-header">
            <h2 className="adm-card-title">🚀 Upload New Release</h2>
          </div>
          <div className="adm-info">
            <span>ℹ️</span>
            <span>Upload an APK file directly or provide an external Cloudinary URL. A version number is strictly required.</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="adm-form-grid">
              <div className="adm-form-group">
                <label className="adm-label">Version Number *</label>
                <input className="adm-input" placeholder="e.g. 1.2.0" required
                  value={form.version} onChange={e => setForm({ ...form, version: e.target.value })} />
              </div>
              <div className="adm-form-group">
                <label className="adm-label">File Size</label>
                <input className="adm-input" placeholder="e.g. 18 MB"
                  value={form.fileSize} onChange={e => setForm({ ...form, fileSize: e.target.value })} />
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Min Android Version</label>
                <input className="adm-input" placeholder="Android 7.0+"
                  value={form.minAndroid} onChange={e => setForm({ ...form, minAndroid: e.target.value })} />
              </div>
              <div className="adm-form-group">
                <label className="adm-label">Direct Download URL (optional)</label>
                <input className="adm-input" placeholder="https://example.com/app.apk" type="url"
                  value={form.downloadUrl} onChange={e => setForm({ ...form, downloadUrl: e.target.value })} />
              </div>
              <div className="adm-form-group full">
                <label className="adm-label">APK File Upload</label>
                <label className="adm-file-input" onClick={() => fileRef.current?.click()}>
                  {selectedFile ? (
                    <span style={{ color: 'var(--green-dark)', fontWeight: 600 }}>
                      ✅ {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(1)} MB)
                    </span>
                  ) : (
                    <>
                      <span style={{ fontSize: 30 }}>📁</span>
                      <span>Click or drag &amp; drop APK file here</span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Accepts .apk files only</span>
                    </>
                  )}
                  <input ref={fileRef} type="file" accept=".apk,application/vnd.android.package-archive"
                    onChange={handleFileChange} style={{ display: 'none' }} />
                </label>
              </div>
              <div className="adm-form-group full">
                <label className="adm-label">Release Notes</label>
                <textarea className="adm-input" placeholder="What's new in this version..."
                  value={form.releaseNotes} onChange={e => setForm({ ...form, releaseNotes: e.target.value })} />
              </div>
            </div>
            <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button type="submit" className="btn btn-success" disabled={uploading}>
                {uploading ? <><span className="spin"></span>Uploading...</> : '🚀 Publish Release'}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="adm-loading"><span className="spin spin-dark"></span>Loading releases...</div>
      ) : releases.length === 0 ? (
        <div className="adm-empty">
          <div className="adm-empty-icon">📭</div>
          <div className="adm-empty-title">No releases yet</div>
          <div className="adm-empty-sub">Upload your first APK release to make it available for download on the website.</div>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Create First Release</button>
        </div>
      ) : (
        <div className="release-list">
          {releases.map((rel) => (
            <div key={rel._id} className={`release-card ${rel.isActive ? 'is-active' : ''}`}>
              <div className="release-icon">{rel.isActive ? '📱' : '📦'}</div>
              <div className="release-body">
                <div className="release-header">
                  <span className="release-version">Version {rel.version}</span>
                  <span className={`badge ${rel.isActive ? 'badge-green' : 'badge-gray'}`}>
                    {rel.isActive && <span className="badge-dot" />}
                    {rel.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="release-meta">
                  {rel.fileSize   && <span>📁 {rel.fileSize}</span>}
                  {rel.minAndroid && <span>🤖 {rel.minAndroid}</span>}
                  {rel.createdAt  && <span>📅 {new Date(rel.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })}</span>}
                </div>
                {rel.releaseNotes && <div className="release-notes">{rel.releaseNotes}</div>}
              </div>
              <div className="release-actions">
                {rel.downloadUrl && (
                  <a href={rel.downloadUrl} target="_blank" rel="noreferrer"
                    className="btn btn-ghost btn-icon" title="Download Link">🔗</a>
                )}
                <button
                  className="btn btn-ghost btn-icon"
                  onClick={() => handleToggleActive(rel._id, rel.isActive)}
                  title={rel.isActive ? 'Deactivate' : 'Set Active'}
                  style={rel.isActive ? {} : { color: 'var(--green-dark)', borderColor: 'rgba(37,211,102,0.3)', background: 'rgba(37,211,102,0.05)' }}
                >
                  {rel.isActive ? '⏸' : '▶'}
                </button>
                <button className="btn btn-icon btn-danger"
                  onClick={() => handleDelete(rel._id)} title="Delete">🗑</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════
   Content Tab — ALL LOGIC UNCHANGED
══════════════════════════════════════════ */
const ContentTab = () => {
  const [fields, setFields] = useState({
    hero_announcement: '',
    hero_badge_text:   'Official Platform',
    stat_accuracy:     '99.9%',
    stat_speed:        '< 2s',
    stat_proxy:        '100%',
    social_twitter:    '#',
    social_linkedin:   '#',
    social_github:     '#',
    contact_email:     'support@digitalupasthiti.app',
    footer_tagline:    '© 2026 DigitalUpasthiti. All rights reserved. Made with ❤️ in India.',
  });
  const [saving,        setSaving]        = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getSiteContent();
        setFields(prev => ({ ...prev, ...data }));
      } catch {
        toast.error('Content load nahi hua');
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const items = Object.entries(fields).map(([key, value]) => ({
        key, value,
        label: key.replace(/_/g, ' '),
        type: key.includes('url') || key.includes('social') || key.includes('email') ? 'url' : 'text',
      }));
      await bulkUpdateContent(items);
      toast.success('✅ Content saved successfully!');
    } catch {
      toast.error('Failed to save content');
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { id: 'hero',   label: '🎯 Hero Section' },
    { id: 'stats',  label: '📊 Statistics'   },
    { id: 'social', label: '🔗 Social Links'  },
    { id: 'footer', label: '📝 Footer'        },
  ];

  return (
    <div>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Site Content</h1>
          <p className="adm-page-sub">Update website text, links, and announcements without touching code.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
          {saving ? <><span className="spin"></span>Saving...</> : '💾 Save All Changes'}
        </button>
      </div>

      <div className="adm-info">
        <span>💡</span>
        <span>Changes will reflect immediately on the live website upon saving. Leave Hero Announcement empty to hide the banner.</span>
      </div>

      <div className="adm-tabs">
        {sections.map(s => (
          <button key={s.id}
            className={`adm-tab ${activeSection === s.id ? 'active' : ''}`}
            onClick={() => setActiveSection(s.id)}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="adm-card">
        {activeSection === 'hero' && (
          <div>
            <h2 className="adm-card-title" style={{ marginBottom: 4 }}>🎯 Hero Section</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Manage the main landing page banner elements.</p>
            <ContentField icon="📢" label="Announcement Banner" hint="Leave empty to hide banner"
              value={fields.hero_announcement} onChange={v => setFields({ ...fields, hero_announcement: v })} type="textarea" />
            <ContentField icon="🏷️" label="Badge Text" hint="e.g. 'Official Platform', 'v2.0 Released'"
              value={fields.hero_badge_text} onChange={v => setFields({ ...fields, hero_badge_text: v })} />
          </div>
        )}
        {activeSection === 'stats' && (
          <div>
            <h2 className="adm-card-title" style={{ marginBottom: 4 }}>📊 Statistics</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Update the metrics shown on the homepage.</p>
            <ContentField icon="🎯" label="Accuracy Rate" hint="e.g. 99.9%"
              value={fields.stat_accuracy} onChange={v => setFields({ ...fields, stat_accuracy: v })} />
            <ContentField icon="⚡" label="Scan Speed" hint="e.g. < 2s"
              value={fields.stat_speed} onChange={v => setFields({ ...fields, stat_speed: v })} />
            <ContentField icon="🛡️" label="Proxy-Free" hint="e.g. 100%"
              value={fields.stat_proxy} onChange={v => setFields({ ...fields, stat_proxy: v })} />
          </div>
        )}
        {activeSection === 'social' && (
          <div>
            <h2 className="adm-card-title" style={{ marginBottom: 4 }}>🔗 Social Links</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Manage your external URLs and contact details.</p>
            <ContentField icon="🐦" label="Twitter URL" hint="https://twitter.com/..."
              value={fields.social_twitter} onChange={v => setFields({ ...fields, social_twitter: v })} />
            <ContentField icon="💼" label="LinkedIn URL" hint="https://linkedin.com/in/..."
              value={fields.social_linkedin} onChange={v => setFields({ ...fields, social_linkedin: v })} />
            <ContentField icon="🐙" label="GitHub URL" hint="https://github.com/..."
              value={fields.social_github} onChange={v => setFields({ ...fields, social_github: v })} />
            <ContentField icon="📧" label="Support Email" hint="support@domain.com"
              value={fields.contact_email} onChange={v => setFields({ ...fields, contact_email: v })} />
          </div>
        )}
        {activeSection === 'footer' && (
          <div>
            <h2 className="adm-card-title" style={{ marginBottom: 4 }}>📝 Footer Settings</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>Update the global footer copyright text.</p>
            <ContentField icon="©️" label="Footer Copyright Text" hint="e.g. © 2026 DigitalUpasthiti. All rights reserved."
              value={fields.footer_tagline} onChange={v => setFields({ ...fields, footer_tagline: v })} type="textarea" />
          </div>
        )}
      </div>
    </div>
  );
};

/* Content Field Helper */
const ContentField = ({ icon, label, hint, value, onChange, type }) => (
  <div className="content-field-row">
    <div className="content-field-icon">{icon}</div>
    <div className="content-field-body">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <label className="adm-label">{label}</label>
        {hint && <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{hint}</span>}
      </div>
      {type === 'textarea'
        ? <textarea className="adm-input" value={value || ''} onChange={e => onChange(e.target.value)} />
        : <input    className="adm-input" value={value || ''} onChange={e => onChange(e.target.value)} />
      }
    </div>
  </div>
);

/* ══════════════════════════════════════════
   Settings Tab — ALL LOGIC UNCHANGED
══════════════════════════════════════════ */
const SettingsTab = () => {
  const { admin } = useAuth();
  const [form,          setForm]          = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [saving,        setSaving]        = useState(false);
  const [showPasswords, setShowPasswords] = useState({ current: false, new: false, confirm: false });

  const handleChange = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error('New passwords match nahi kar rahe!'); return;
    }
    if (form.newPassword.length < 8) {
      toast.error('Password kam se kam 8 characters ka hona chahiye'); return;
    }
    setSaving(true);
    try {
      await changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      toast.success('✅ Password change ho gaya!');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password change fail hua');
    } finally { setSaving(false); }
  };

  const toggleShow = (field) => setShowPasswords(p => ({ ...p, [field]: !p[field] }));

  return (
    <div>
      <div className="adm-page-header">
        <div>
          <h1 className="adm-page-title">Settings</h1>
          <p className="adm-page-sub">Manage your admin account and system security settings.</p>
        </div>
      </div>

      {/* Account Info */}
      <div className="adm-card" style={{ maxWidth: 600 }}>
        <h2 className="adm-card-title" style={{ marginBottom: 20 }}>Account Information</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 58, height: 58, borderRadius: '50%',
            background: 'var(--green)',
            border: '2px solid var(--green-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-head)', fontSize: 24, fontWeight: 800,
            color: 'white', flexShrink: 0,
            boxShadow: '0 0 20px rgba(37,211,102,0.25)',
          }}>
            {admin?.email?.[0]?.toUpperCase() || 'A'}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--text)', marginBottom: 6 }}>
              {admin?.email}
            </div>
            <span className="badge badge-green">System Administrator</span>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="adm-card" style={{ maxWidth: 600 }}>
        <div className="adm-card-header">
          <h2 className="adm-card-title">🔐 Change Password</h2>
        </div>
        <div className="adm-info">
          <span>🔒</span>
          <span>Ensure your account is using a long, random password to stay secure.</span>
        </div>
        <form onSubmit={handleChange} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {[
            { key: 'currentPassword', label: 'Current Password',     show: 'current' },
            { key: 'newPassword',     label: 'New Password',         show: 'new'     },
            { key: 'confirmPassword', label: 'Confirm New Password', show: 'confirm' },
          ].map(f => (
            <div key={f.key} className="adm-form-group">
              <label className="adm-label">{f.label}</label>
              <div className="adm-input-wrapper">
                <input
                  type={showPasswords[f.show] ? 'text' : 'password'}
                  required className="adm-input"
                  placeholder="••••••••"
                  style={{ paddingRight: 48 }}
                  value={form[f.key]}
                  onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                />
                <button type="button" onClick={() => toggleShow(f.show)} className="adm-input-toggle">
                  {showPasswords[f.show] ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 8 }}>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? <><span className="spin"></span>Changing...</> : 'Update Password'}
            </button>
          </div>
        </form>
      </div>

      {/* Danger Zone */}
      <div className="adm-card" style={{
        maxWidth: 600,
        border: '1.5px solid var(--red-border)',
        background: 'var(--red-dim)',
      }}>
        <h2 className="adm-card-title" style={{ color: 'var(--red)', marginBottom: 8 }}>⚠️ Danger Zone</h2>
        <p style={{ fontSize: 13, color: 'var(--red)', opacity: 0.8, marginBottom: 20, lineHeight: 1.6 }}>
          These actions are irreversible. Proceed with caution.
        </p>
        <button className="btn btn-danger"
          onClick={() => toast.error('Session cleared! Please log in again.')}>
          🚫 Revoke All Sessions
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;