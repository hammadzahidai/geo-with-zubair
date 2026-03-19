import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Eye, Brain, Code2, Globe2, BarChart3, Shield,
  ChevronDown, Play, Star, Menu, X, Mail, Phone, MapPin,
  ArrowRight, Target, TrendingUp, Users, Award, Search,
  Sparkles, Check, CircleCheck, Linkedin, Twitter, Instagram, ExternalLink,
  MessageSquare, Zap, Database, FileText
} from 'lucide-react';

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', system-ui, sans-serif;
      background: #0f0f0f;
      color: #f0ece4;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
    }

    /* Grain overlay */
    body::after {
      content: '';
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: 9999;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      opacity: 0.025;
    }

    /* Typography */
    .font-serif { font-family: 'Instrument Serif', 'Playfair Display', Georgia, serif; }
    .font-sans  { font-family: 'DM Sans', system-ui, sans-serif; }

    /* Logo gradient text */
    .logo-gradient {
      background: linear-gradient(135deg, #e8c896 0%, #d4a87a 30%, #c8956c 55%, #dbb892 80%, #f0dcc0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Headline styles */
    .headline-hero {
      font-family: 'Instrument Serif', serif;
      font-weight: 400;
      line-height: 1.05;
      letter-spacing: -0.02em;
    }
    .headline-section {
      font-family: 'Instrument Serif', serif;
      font-weight: 400;
      line-height: 1.1;
      letter-spacing: -0.01em;
      background: linear-gradient(to bottom, #1a1a1a 15%, #9a7050 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    /* headline-section variant for dark backgrounds */
    .h-dark {
      background: linear-gradient(to bottom, #ffffff 15%, #d4a87a 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .label-tag {
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #d4a87a;
    }

    /* Copper accent */
    .text-copper { color: #d4a87a; }
    .text-copper-dark { color: #b8854e; }
    .bg-copper-gradient { background: linear-gradient(135deg, #d4a87a, #c08a58); }
    .border-copper { border-color: #d4a87a; }

    /* Scroll-reveal animations */
    .reveal {
      opacity: 0;
      transform: translateY(18px);
      transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }
    .reveal.visible {
      opacity: 1;
      transform: translateY(0);
      will-change: auto;
    }
    .reveal-delay-1 { transition-delay: 0.06s; }
    .reveal-delay-2 { transition-delay: 0.12s; }
    .reveal-delay-3 { transition-delay: 0.18s; }
    .reveal-delay-4 { transition-delay: 0.24s; }
    .reveal-delay-5 { transition-delay: 0.3s; }

    /* Hero word animation */
    @keyframes wordReveal {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .word-reveal {
      display: inline-block;
      opacity: 0;
      animation: wordReveal 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }

    /* Logo marquee */
    @keyframes marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    .marquee-track {
      display: flex;
      width: max-content;
      animation: marquee 28s linear infinite;
    }
    .marquee-track:hover { animation-play-state: paused; }

    /* CTA button */
    .btn-copper {
      background: linear-gradient(135deg, #d4a87a, #c08a58);
      color: #1a1a1a;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 15px;
      border: none;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
      box-shadow: 0 4px 24px rgba(212,168,122,0.35), 0 0 48px rgba(212,168,122,0.12);
    }
    .btn-copper:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(212,168,122,0.45), 0 0 60px rgba(212,168,122,0.18);
      filter: brightness(1.08);
    }
    .btn-ghost {
      background: transparent;
      color: #f0ece4;
      border: 1px solid rgba(240,236,228,0.2);
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: 15px;
      cursor: pointer;
      transition: border-color 0.2s ease, color 0.2s ease, background 0.2s ease;
    }
    .btn-ghost:hover {
      border-color: #d4a87a;
      color: #d4a87a;
      background: rgba(212,168,122,0.06);
      transform: translateY(-1px);
    }

    /* Service card */
    .who-we-serve-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .industry-card {
      background: #fff;
      border: 1px solid rgba(200,149,108,0.15);
      border-radius: 16px;
      padding: 32px 28px;
      border-top: 3px solid #c8956c;
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    .industry-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(200,149,108,0.12);
    }
    .service-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 36px;
      border-top: 2px solid transparent;
      transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease, background 0.25s ease;
    }
    .service-card:hover {
      transform: translateY(-4px);
      background: rgba(255,255,255,0.05);
      box-shadow: 0 12px 40px rgba(0,0,0,0.2);
      border-top-color: #d4a87a;
    }

    /* Dark glass card */
    .glass-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px;
      padding: 36px;
      transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    }
    .glass-card:hover {
      border-color: rgba(212,168,122,0.2);
      transform: translateY(-3px);
      box-shadow: 0 10px 32px rgba(0,0,0,0.25);
    }

    /* Why card */
    .why-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 36px;
      border-top: 2px solid transparent;
      transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease;
    }
    .why-card:hover {
      transform: translateY(-4px);
      background: rgba(255,255,255,0.05);
      box-shadow: 0 12px 36px rgba(0,0,0,0.22), 0 0 0 1px rgba(212,168,122,0.08);
      border-top-color: rgba(212,168,122,0.5);
    }

    /* FAQ item */
    .faq-item {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 12px;
      border-left: 3px solid transparent;
      overflow: hidden;
      transition: border-color 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
    }
    .faq-item:hover {
      background: rgba(255,255,255,0.05);
      border-left-color: rgba(212,168,122,0.3);
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    }
    .faq-item.open { border-left-color: #d4a87a; }

    /* Form inputs */
    .form-input {
      width: 100%;
      background: #1a1a1a;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 10px;
      padding: 14px 16px;
      color: #f0ece4;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    .form-input::placeholder { color: #6b6560; }
    .form-input:focus {
      border-color: #d4a87a;
      box-shadow: 0 0 0 3px rgba(212,168,122,0.15);
    }
    .form-label {
      display: block;
      font-family: 'DM Sans', sans-serif;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: #8a8580;
      margin-bottom: 8px;
    }

    /* Testimonial card */
    .testimonial-card {
      background: rgba(255,255,255,0.03);
      border-radius: 16px;
      padding: 32px;
      border: 1px solid rgba(255,255,255,0.06);
      border-top: 2px solid transparent;
      transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
    }
    .testimonial-card:hover {
      background: rgba(255,255,255,0.055);
      transform: translateY(-4px);
      box-shadow: 0 12px 36px rgba(0,0,0,0.2);
      border-top-color: rgba(212,168,122,0.4);
    }

    /* Metric card */
    .metric-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 40px 36px;
      text-align: center;
      border-bottom: 2px solid transparent;
      transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease, border-color 0.25s ease;
    }
    .metric-card:hover {
      transform: translateY(-4px);
      background: rgba(255,255,255,0.055);
      box-shadow: 0 12px 36px rgba(0,0,0,0.2), 0 0 24px rgba(212,168,122,0.06);
      border-bottom-color: rgba(212,168,122,0.45);
    }
    @media (max-width: 480px) {
      .metric-card { padding: 24px 12px; }
      .metric-grid { gap: 12px !important; }
    }

    /* Process step */
    .process-step {
      position: relative;
      flex: 1;
      min-width: 0;
    }
    .process-connector {
      position: absolute;
      top: 24px;
      right: -1px;
      width: 2px;
      height: 40px;
      background: linear-gradient(to bottom, #d4a87a, transparent);
      opacity: 0.3;
    }

    /* Process layouts */
    .process-desktop {
      display: flex;
      gap: 0;
      align-items: flex-start;
    }
    .process-mobile {
      display: none;
      flex-direction: column;
      gap: 16px;
    }

    /* Book a call two-column grid responsive */
    .book-grid {
      display: grid;
      grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
      gap: 48px;
      align-items: start;
    }

    /* Contact form 2-col responsive */
    .form-two-col {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }

    @media (max-width: 767px) {
      .process-desktop { display: none; }
      .process-mobile { display: flex; }
      .book-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }
      .form-two-col {
        grid-template-columns: 1fr;
      }
    }

    /* Navbar */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100;
      transition: background 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease;
      padding: 20px 0;
    }
    .navbar.scrolled {
      background: rgba(15,15,15,0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      padding: 14px 0;
      box-shadow: 0 1px 0 rgba(255,255,255,0.05);
    }

    /* Nav links */
    .nav-link {
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.03em;
      color: #a09890;
      text-decoration: none;
      position: relative;
      padding-bottom: 3px;
      transition: color 0.25s ease, transform 0.2s ease;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 1.5px;
      background: linear-gradient(90deg, #c8956c, #e8c896);
      border-radius: 2px;
      transition: width 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .nav-link:hover {
      color: #d4a87a;
      transform: translateY(-1px);
    }
    .nav-link:hover::after { width: 100%; }

    /* Logo hover */
    .nav-logo {
      transition: transform 0.22s ease, filter 0.22s ease;
    }
    .nav-logo:hover {
      transform: translateY(-1px);
      filter: drop-shadow(0 0 8px rgba(212,168,122,0.35));
    }

    /* Video container */
    .video-container {
      position: relative;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      transition: border-color 0.4s ease;
    }
    .video-container:hover {
      border-color: rgba(212,168,122,0.3);
    }

    /* Play button — elegant hover with halo ring */
    .play-btn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 68px;
      height: 68px;
      border-radius: 50%;
      border: 1.5px solid rgba(212,168,122,0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(15,15,15,0.55);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      color: #d4a87a;
      transition:
        background  0.4s cubic-bezier(0.16, 1, 0.3, 1),
        border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
        color       0.35s ease,
        transform   0.4s cubic-bezier(0.16, 1, 0.3, 1),
        box-shadow  0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Halo ring — expands outward on hover */
    .play-btn::before {
      content: '';
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      border: 1px solid rgba(212,168,122,0);
      transition:
        border-color 0.4s ease,
        inset        0.45s cubic-bezier(0.16, 1, 0.3, 1),
        opacity      0.4s ease;
      opacity: 0;
    }

    /* Inner shimmer ring */
    .play-btn::after {
      content: '';
      position: absolute;
      inset: 4px;
      border-radius: 50%;
      background: transparent;
      border: 1px solid rgba(212,168,122,0);
      transition: border-color 0.4s ease, opacity 0.4s ease;
      opacity: 0;
    }

    .video-container:hover .play-btn {
      background: #d4a87a;
      border-color: #d4a87a;
      color: #1a1a1a;
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 0 0 0px rgba(212,168,122,0.35), 0 8px 32px rgba(212,168,122,0.3);
    }
    .video-container:hover .play-btn::before {
      border-color: rgba(212,168,122,0.25);
      inset: -14px;
      opacity: 1;
    }
    .video-container:hover .play-btn::after {
      border-color: rgba(212,168,122,0.18);
      opacity: 1;
    }

    /* Icon inside play button inherits color */
    .play-btn svg {
      transition: fill 0.35s ease, color 0.35s ease;
      fill: currentColor;
    }

    /* Stat hero card */
    .stat-hero-card {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 14px;
      padding: 24px 28px;
      flex: 1;
      min-width: 0;
      transition: border-color 0.25s ease;
    }
    .stat-hero-card:hover { border-color: rgba(212,168,122,0.25); }
    @media (max-width: 480px) {
      .stat-hero-card { padding: 18px 16px; }
      .stat-hero-card .font-serif { font-size: 28px !important; }
    }

    /* Copper icon container */
    .icon-container {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      background: rgba(212,168,122,0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    /* Mobile menu */
    .mobile-menu {
      position: fixed;
      inset: 0;
      background: #0f0f0f;
      z-index: 99;
      display: flex;
      flex-direction: column;
      padding: 100px 32px 48px;
      transform: translateX(100%);
      transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .mobile-menu.open { transform: translateX(0); }

    /* Calendly wrapper */
    .calendly-wrapper {
      background: #ffffff;
      border-radius: 16px;
      border-top: 3px solid #d4a87a;
      box-shadow: 0 4px 30px rgba(100,80,60,0.08);
      overflow: hidden;
    }
    .calendly-wrapper-dark {
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 0 0 1px rgba(212,168,122,0.25), 0 8px 48px rgba(0,0,0,0.5);
      overflow: hidden;
      position: relative;
    }
    .calendly-wrapper-dark::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, transparent, #d4a87a 30%, #e8c896 50%, #d4a87a 70%, transparent);
      z-index: 2;
    }
    .book-grid {
      display: grid;
      grid-template-columns: 1fr 1.4fr;
      gap: 40px;
      align-items: start;
    }
    @media (max-width: 860px) {
      .book-grid { grid-template-columns: 1fr; gap: 28px; }
      .edge-callout-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
      .who-we-serve-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 560px) {
      .who-we-serve-grid { grid-template-columns: 1fr; }
    }
    .video-grid {
      display: grid;
      grid-template-columns: 1.6fr 1fr;
      gap: 36px;
      align-items: center;
    }
    @media (max-width: 860px) {
      .video-grid { grid-template-columns: 1fr; gap: 24px; }
    }
    .value-point {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px;
      color: #c0b8b0;
      line-height: 1.55;
      padding: 14px 16px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 10px;
      transition: border-color 0.2s ease, background 0.2s ease;
    }
    .value-point:hover {
      border-color: rgba(212,168,122,0.2);
      background: rgba(212,168,122,0.04);
    }
    .value-point svg { flex-shrink: 0; margin-top: 2px; }
    .mini-stat-row {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .mini-stat {
      flex: 1;
      min-width: 90px;
      padding: 18px 12px;
      background: rgba(212,168,122,0.06);
      border: 1px solid rgba(212,168,122,0.15);
      border-radius: 12px;
      text-align: center;
      transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
      cursor: default;
    }
    .mini-stat:hover {
      background: rgba(212,168,122,0.1);
      border-color: rgba(212,168,122,0.3);
      transform: translateY(-2px);
    }
    .mini-stat .num {
      font-family: 'Instrument Serif', serif;
      font-size: 22px;
      color: #d4a87a;
      display: block;
      line-height: 1.2;
    }
    .mini-stat .lbl {
      font-family: 'DM Sans', sans-serif;
      font-size: 11px;
      color: #8a8580;
      letter-spacing: 0.03em;
      margin-top: 4px;
      display: block;
    }

    /* Section readability removed — filter: brightness on sections forces
       GPU compositing layers per section and causes scroll jank */

    /* Floating mobile CTA */
    .mobile-fab {
      position: fixed;
      bottom: 24px;
      right: 20px;
      z-index: 90;
      display: none;
    }
    @media (max-width: 768px) { .mobile-fab { display: flex; } }

    /* Custom scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #0f0f0f; }
    ::-webkit-scrollbar-thumb { background: #3a3530; border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #d4a87a; }

    /* Section spacing */
    section { position: relative; }

    /* Section separator — dark to light */
    .section-sep-dark-to-light {
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(200,149,108,0.3) 30%, rgba(200,149,108,0.5) 50%, rgba(200,149,108,0.3) 70%, transparent 100%);
      box-shadow: 0 1px 12px rgba(200,149,108,0.15), 0 0 40px rgba(200,149,108,0.05);
    }
    /* Section separator — light to dark */
    .section-sep-light-to-dark {
      height: 1px;
      background: linear-gradient(90deg, transparent 0%, rgba(200,149,108,0.25) 30%, rgba(200,149,108,0.4) 50%, rgba(200,149,108,0.25) 70%, transparent 100%);
      box-shadow: 0 -1px 12px rgba(200,149,108,0.15), 0 0 40px rgba(200,149,108,0.05);
    }

    /* Calendly loading pulse */
    @keyframes calPulse {
      0%, 100% { opacity: 0.4; transform: scale(0.9); }
      50%       { opacity: 1;   transform: scale(1.1); }
    }
    .cal-pulse { animation: calPulse 1.6s ease-in-out infinite; }

    /* Hero grid overlay */
    .hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(212,168,122,0.055) 1px, transparent 1px),
        linear-gradient(90deg, rgba(212,168,122,0.055) 1px, transparent 1px);
      background-size: 60px 60px;
      pointer-events: none;
    }

    /* Opportunity card */
    .opportunity-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 16px;
      padding: 36px;
      border-left: 4px solid transparent;
      transition: background 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
    }
    .opportunity-card:hover {
      background: rgba(255,255,255,0.05);
      border-left-color: rgba(212,168,122,0.5);
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(0,0,0,0.18);
    }

    /* Star rating */
    .star { color: #d4a87a; }

    /* Footer social */
    .social-icon {
      width: 38px; height: 38px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.1);
      display: flex; align-items: center; justify-content: center;
      color: #8a8580;
      cursor: pointer;
      transition: border-color 0.2s ease, color 0.2s ease;
    }
    .social-icon:hover { border-color: #d4a87a; color: #d4a87a; }

    /* Copper divider */
    .copper-divider {
      width: 60px; height: 3px;
      background: linear-gradient(90deg, #d4a87a, #c08a58);
      border-radius: 2px;
      margin: 16px 0 24px;
    }

    /* Ambient section glow */
    @keyframes ambientPulse {
      0%, 100% { opacity: 0.5; transform: translateX(-50%) scale(1); }
      50%       { opacity: 1;   transform: translateX(-50%) scale(1.08); }
    }
    .ambient-glow {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 50%;
      pointer-events: none;
      z-index: 0;
    }
    .ambient-glow-top {
      top: -100px;
      width: 900px; height: 400px;
      background: radial-gradient(ellipse, rgba(212,168,122,0.13) 0%, transparent 68%);
      animation: ambientPulse 7s ease-in-out infinite;
    }
    .ambient-glow-bottom {
      bottom: -80px;
      width: 650px; height: 280px;
      background: radial-gradient(ellipse, rgba(212,168,122,0.09) 0%, transparent 65%);
      animation: ambientPulse 9s ease-in-out infinite reverse;
    }

    /* Subtle grid for non-hero sections */
    .section-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(212,168,122,0.065) 1px, transparent 1px),
        linear-gradient(90deg, rgba(212,168,122,0.065) 1px, transparent 1px);
      background-size: 72px 72px;
      pointer-events: none;
      z-index: 0;
    }

    /* CTA button pulse rings */
    @keyframes ripple {
      0%   { transform: scale(1);   opacity: 0.35; }
      100% { transform: scale(2.2); opacity: 0; }
    }
    .btn-pulse-wrap {
      position: relative;
      display: inline-flex;
    }
    .btn-pulse-wrap::before,
    .btn-pulse-wrap::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 12px;
      background: rgba(212,168,122,0.25);
      pointer-events: none;
      animation: ripple 2.4s ease-out infinite;
    }
    .btn-pulse-wrap::after {
      animation-delay: 1.2s;
    }

    /* Hero radial glow */
    .hero-glow {
      position: absolute;
      top: 0; left: 50%;
      transform: translateX(-50%);
      width: 1100px; height: 600px;
      background: radial-gradient(ellipse at center top, rgba(212,168,122,0.18) 0%, rgba(212,168,122,0.06) 40%, transparent 70%);
      pointer-events: none;
    }

    /* Hero floating orbs */
    @keyframes orbDrift1 {
      0%   { transform: translate(0, 0) scale(1); }
      33%  { transform: translate(40px, -30px) scale(1.05); }
      66%  { transform: translate(-20px, 20px) scale(0.97); }
      100% { transform: translate(0, 0) scale(1); }
    }
    @keyframes orbDrift2 {
      0%   { transform: translate(0, 0) scale(1); }
      40%  { transform: translate(-50px, 30px) scale(1.04); }
      70%  { transform: translate(25px, -15px) scale(0.98); }
      100% { transform: translate(0, 0) scale(1); }
    }
    @keyframes orbDrift3 {
      0%   { transform: translate(0, 0); }
      50%  { transform: translate(30px, 40px); }
      100% { transform: translate(0, 0); }
    }
    .hero-orb {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      filter: blur(90px);
    }
    .hero-orb-1 {
      width: 420px; height: 420px;
      top: 10%; left: 8%;
      background: radial-gradient(circle, rgba(212,168,122,0.1) 0%, transparent 70%);
      animation: orbDrift1 28s ease-in-out infinite;
    }
    .hero-orb-2 {
      width: 360px; height: 360px;
      top: 30%; right: 6%;
      background: radial-gradient(circle, rgba(212,168,122,0.07) 0%, transparent 70%);
      animation: orbDrift2 34s ease-in-out infinite;
    }
    .hero-orb-3 {
      width: 300px; height: 300px;
      bottom: 15%; left: 35%;
      background: radial-gradient(circle, rgba(240,220,190,0.04) 0%, transparent 70%);
      animation: orbDrift3 22s ease-in-out infinite;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .headline-hero { font-size: clamp(1.68rem, 7vw, 2.45rem); }
      .headline-section { font-size: clamp(1.8rem, 7vw, 2.5rem); }
    }
    @media (min-width: 769px) {
      .headline-hero { font-size: clamp(2.45rem, 4.2vw, 4.2rem); }
      .headline-section { font-size: clamp(2.4rem, 4vw, 3.2rem); }
    }

    /* Process horizontal line */
    .process-h-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, rgba(212,168,122,0.45), rgba(212,168,122,0.1));
      margin-top: 28px;
    }

    /* Calendly iframe override for border radius */
    .calendly-inline-widget iframe {
      border-radius: 13px;
    }

    /* ── Mobile overrides ── */
    @media (max-width: 480px) {
      section { padding-left: 20px !important; padding-right: 20px !important; }
      .headline-section { font-size: 28px !important; }
      .opp-stat { padding: 28px 20px !important; min-width: 0 !important; }
      .opp-stat-num { font-size: 36px !important; }
      .testimonial-card { padding: 24px !important; }
      .service-card { padding: 28px 22px !important; }
      .why-card { padding: 28px 22px !important; }
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
// Shared global IntersectionObserver for scroll reveals (created once)
let _revealObserver = null;
function getRevealObserver() {
  if (!_revealObserver) {
    _revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            _revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 40px 0px' }
    );
  }
  return _revealObserver;
}

function useScrollReveal() {
  useEffect(() => {
    const observer = getRevealObserver();
    document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
  }, []);
}

/* ─────────────────────────────────────────────
   SECTION 1: NAVBAR
───────────────────────────────────────────── */
function Navbar({ onBookCall }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a href="#hero" className="nav-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#d4a87a', fontSize: 20 }}>◆</span>
            <span className="font-serif" style={{ fontSize: 28, fontWeight: 400, letterSpacing: '-0.01em' }}>
              <span className="logo-gradient">GEO</span><span style={{ color: '#f0ece4' }}>phinx</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 36 }}>
            {links.map((l) => (
              <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>

          {/* Book a Call */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              className="btn-copper hidden md:block"
              style={{ padding: '10px 22px', borderRadius: 10 }}
              onClick={onBookCall}
            >
              Book a Call
            </button>
            {/* Hamburger */}
            <button
              className="md:hidden"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#f0ece4', padding: 4 }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 28,
                fontWeight: 500,
                color: '#f0ece4',
                textDecoration: 'none',
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                transition: 'color 0.2s ease',
                animationDelay: `${i * 0.07}s`,
              }}
              onMouseEnter={e => e.target.style.color = '#d4a87a'}
              onMouseLeave={e => e.target.style.color = '#f0ece4'}
            >
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ marginTop: 'auto' }}>
          <button
            className="btn-copper"
            style={{ width: '100%', padding: '16px', borderRadius: 12, marginTop: 32, fontSize: 16 }}
            onClick={() => { setMenuOpen(false); onBookCall(); }}
          >
            Book a Call →
          </button>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   SECTION 2: HERO
───────────────────────────────────────────── */
function Hero({ onBookCall }) {
  const words1 = ['SEO', 'Is', 'for', 'Yesterday;'];
  const words2 = ['GEO', 'Is', 'for'];

  const platforms = ['ChatGPT', 'Google AI', 'Perplexity', 'Claude', 'Gemini', 'Copilot'];

  const scrollToGeo = () => {
    document.getElementById('what-is-geo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        background: '#0f0f0f',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 100,
        paddingBottom: 60,
      }}
    >
      {/* Grid overlay */}
      <div className="hero-grid" />

      {/* Warm glow */}
      <div className="hero-glow" />

      {/* Floating orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div style={{ maxWidth: 1280, width: '100%', margin: '0 auto', padding: '0 32px', position: 'relative', zIndex: 1 }}>

        {/* Hero Headline */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h1 className="headline-hero" style={{ color: '#ffffff' }}>
            {/* Line 1 */}
            <div style={{ marginBottom: 6 }}>
              {words1.map((w, i) => (
                <span key={w} className="word-reveal" style={{ animationDelay: `${0.3 + i * 0.12}s`, marginRight: '0.25em' }}>
                  {w}
                </span>
              ))}
            </div>
            {/* Line 2 — "GEO Is for What's Next." with copper italic "What's Next." */}
            <div>
              {words2.map((w, i) => (
                <span key={w} className="word-reveal" style={{ animationDelay: `${0.78 + i * 0.12}s`, marginRight: '0.25em' }}>
                  {w}
                </span>
              ))}
              <span className="word-reveal text-copper" style={{ animationDelay: '1.14s', fontStyle: 'italic' }}>
                What's Next.
              </span>
            </div>
          </h1>
        </div>

        {/* Subheadline — accessible, pain-focused, no AI jargon assumed */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 17,
            lineHeight: 1.55,
            color: '#9a928a',
            maxWidth: 580,
            margin: '0 auto 18px',
            letterSpacing: '0.01em',
          }}>
            When a potential client asks ChatGPT "best divorce lawyer in San Francisco"
            or "top beauty spa near me" — does your business come up confidently?
            Generative Engine Optimization (GEO) is how you change that.
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 18,
            fontWeight: 600,
            lineHeight: 1.45,
            color: '#f0ece4',
            maxWidth: 500,
            margin: '0 auto',
            letterSpacing: '-0.01em',
          }}>
            Geophinx makes AI recommend you —<br />every time, ahead of your competitors.
          </p>
        </div>

        {/* Stat Cards */}
        <div className="reveal reveal-delay-1" style={{ display: 'flex', gap: 16, marginBottom: 52, flexWrap: 'wrap' }}>
          {[
            { num: '40%', label: 'AI-Answered Searches' },
            { num: '$2.1T', label: 'AI Revenue by 2027' },
            { num: '347%', label: 'Client Visibility Lift' },
          ].map((s) => (
            <div key={s.num} className="stat-hero-card" style={{ textAlign: 'center' }}>
              <div className="font-serif text-copper" style={{ fontSize: 36, fontWeight: 400, marginBottom: 6 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: '#8a8580', fontFamily: "'DM Sans', sans-serif", lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Row */}
        <div className="reveal reveal-delay-2" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <div className="btn-pulse-wrap">
            <button
              className="btn-copper"
              style={{ padding: '16px 36px', borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 1 }}
              onClick={onBookCall}
            >
              Claim Your AI Dominance <ArrowRight size={16} />
            </button>
          </div>
          <button
            className="btn-ghost"
            style={{ padding: '16px 36px', borderRadius: 12 }}
            onClick={scrollToGeo}
          >
            See How GEO Works
          </button>
        </div>

        {/* Trust Bar */}
        <div className="reveal reveal-delay-3" style={{ textAlign: 'center' }}>
          <div className="label-tag" style={{ color: '#6b6560', marginBottom: 14 }}>Optimized For</div>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
            {platforms.map((p, i) => (
              <span key={p} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    color: '#6b6560',
                    cursor: 'default',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={e => e.target.style.color = '#d4a87a'}
                  onMouseLeave={e => e.target.style.color = '#6b6560'}
                >
                  {p}
                </span>
                {i < platforms.length - 1 && <span style={{ color: '#3a3530' }}>·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 3: THE OPPORTUNITY — LIGHT
───────────────────────────────────────────── */
function TheOpportunity() {
  useScrollReveal();

  return (
    <section style={{ background: '#161616', padding: '80px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="label-tag" style={{ marginBottom: 16 }}>The Opportunity</div>
          <h2 className="headline-section h-dark" style={{ maxWidth: 640, marginBottom: 16, margin: '0 auto 16px' }}>
            The Biggest Shift in Search History Is Happening Right Now
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: '#a09890', maxWidth: 560, margin: '0 auto' }}>
            And 99% of businesses are completely unprepared.
          </p>
        </div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 48 }}>
          {/* Reality Card */}
          <div className="reveal reveal-delay-1 opportunity-card" style={{ borderLeftColor: '#c45c45' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#c45c45', flexShrink: 0 }} />
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: '#f0ece4' }}>
                What's Happening Right Now
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'AI chatbots like ChatGPT and Perplexity are replacing Google for millions of users every day',
                "Customers ask ChatGPT 'What's the best [your service] near me?' — and your brand isn't in the answer",
                'Traditional SEO alone cannot protect you — Google AI Overviews are cutting organic click-through rates',
                'Businesses that invest in GEO now will own AI recommendations in their market for years to come',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#c45c45', flexShrink: 0, marginTop: 7 }} />
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#a09890', lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunity Card */}
          <div className="reveal reveal-delay-2 opportunity-card" style={{ borderLeftColor: '#d4a87a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#d4a87a', flexShrink: 0 }} />
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: '#f0ece4' }}>
                What This Means For Your Business
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                'Brands with strong GEO scores get recommended by ChatGPT, Google AI, and Perplexity — for free, at scale',
                'Generative Engine Optimization today is like SEO in 2005 — the early movers capture everything',
                'A single AI citation in ChatGPT or Google AI Overviews builds more trust than an entire ad campaign',
                'One AI recommendation to a high-intent searcher converts faster than any paid lead',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#d4a87a', flexShrink: 0, marginTop: 7 }} />
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#a09890', lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="reveal reveal-delay-3" style={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 48 }}>
          {[
            { num: '67%', label: 'of users trust AI recommendations over traditional advertising', color: '#d4a87a' },
            { num: '4.2B', label: 'AI search queries per month — growing 300% year over year', color: '#d4a87a' },
            { num: '0%', label: 'of your competitors are optimized for this. Your window is now.', color: '#c45c45' },
          ].map((s, i) => (
            <div key={s.num} className="opp-stat" style={{
              flex: 1, minWidth: 220,
              padding: '40px 32px',
              textAlign: 'center',
              borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <div className="font-serif opp-stat-num" style={{ fontSize: 48, color: s.color, lineHeight: 1, marginBottom: 12 }}>{s.num}</div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#8a8580', lineHeight: 1.6 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Competitive Edge Callout */}
        <div className="reveal" style={{
          background: 'linear-gradient(160deg, rgba(212,168,122,0.07) 0%, rgba(15,15,15,0.6) 60%)',
          border: '1px solid rgba(212,168,122,0.2)',
          borderRadius: 20,
          padding: '56px 48px 48px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
            width: 500, height: 260,
            background: 'radial-gradient(ellipse, rgba(212,168,122,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          {/* Centered headline */}
          <div style={{ textAlign: 'center', marginBottom: 44, position: 'relative', zIndex: 1 }}>
            <div className="label-tag" style={{ marginBottom: 16, color: '#d4a87a', display: 'inline-block' }}>Your Competitive Edge</div>
            <h3 className="font-serif" style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#f0ece4', fontWeight: 400, lineHeight: 1.25, margin: '0 auto', maxWidth: 680 }}>
              The businesses that start GEO today<br />will be <em style={{ color: '#d4a87a' }}>impossible to displace</em> in 12 months.
            </h3>
          </div>

          {/* 3 cards in a row */}
          <div className="edge-callout-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, position: 'relative', zIndex: 1 }}>
            {[
              { icon: <Zap size={18} />, title: 'First-Mover Lock-In', desc: "AI models build long-term trust with brands they've cited before. The earlier you optimize, the deeper your AI authority compounds." },
              { icon: <Target size={18} />, title: 'Outrank Sleeping Competitors', desc: 'Most local businesses have zero GEO presence. Own the AI answer before your competitor even knows the question exists.' },
              { icon: <TrendingUp size={18} />, title: 'AI as a 24/7 Sales Rep', desc: 'Every time ChatGPT recommends your law firm, spa, or clinic — it\'s a warm referral from a customer already looking to buy.' },
            ].map((pt) => (
              <div key={pt.title} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(212,168,122,0.15)',
                borderRadius: 14,
                padding: '28px 24px',
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(212,168,122,0.1)',
                  border: '1px solid rgba(212,168,122,0.22)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#d4a87a',
                }}>
                  {pt.icon}
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: '#f0ece4', lineHeight: 1.3 }}>{pt.title}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: '#8a8580', lineHeight: 1.65 }}>{pt.desc}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: 36, position: 'relative', zIndex: 1 }}>
            <button
              onClick={() => document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'linear-gradient(135deg, #d4a87a, #c8956c)',
                color: '#0f0f0f',
                border: 'none',
                borderRadius: 10,
                padding: '13px 36px',
                fontSize: 15,
                fontWeight: 700,
                fontFamily: "'DM Sans', sans-serif",
                cursor: 'pointer',
                letterSpacing: '0.01em',
              }}
            >
              Claim Your Edge — Book a Free Audit →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 4: WHO WE SERVE — LIGHT
───────────────────────────────────────────── */
function WhoWeServe() {
  const industries = [
    {
      icon: '✨',
      title: 'Med Spas & Cosmetic Clinics',
      tagline: 'When someone asks "best med spa near me" — you need to be the name that comes up.',
      examples: ['Botox & filler clinics', 'Laser treatment centers', 'IV therapy lounges'],
    },
    {
      icon: '⚖️',
      title: 'Law Firms',
      tagline: 'AI is the first place injured clients, immigrants, and entrepreneurs look for help.',
      examples: ['Personal injury', 'Immigration law', 'Business & contract law'],
    },
    {
      icon: '🦷',
      title: 'Cosmetic & Multi-Location Dentists',
      tagline: 'Patients search by procedure and neighborhood — be the answer they trust.',
      examples: ['Invisalign & veneers', 'Implant specialists', 'Multi-location practices'],
    },
    {
      icon: '🏡',
      title: 'Real Estate Teams & Brokerages',
      tagline: 'Buyers and sellers ask AI for agent recommendations before they call anyone.',
      examples: ['Buyer & seller agents', 'Luxury property teams', 'Regional brokerages'],
    },
    {
      icon: '🔨',
      title: 'Luxury Home Services',
      tagline: 'High-ticket homeowners research contractors on ChatGPT before requesting a quote.',
      examples: ['Custom remodeling', 'Solar installation', 'Outdoor living & landscaping'],
    },
  ];

  return (
    <section id="who-we-serve" style={{ background: '#faf9f7', padding: '96px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(200,149,108,0.1)',
            border: '1px solid rgba(200,149,108,0.3)',
            borderRadius: '100px',
            padding: '6px 20px',
            marginBottom: '20px',
          }}>
            <span style={{ color: '#c8956c', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Who We Serve</span>
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(32px,4vw,48px)', color: '#1a1a1a', marginBottom: '16px', lineHeight: 1.2 }}>
            Built for Local Service Businesses<br />
            <em style={{ color: '#c8956c' }}>That Can't Afford to Be Invisible</em>
          </h2>
          <p style={{ color: '#666', fontSize: '18px', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            We specialize in the industries where AI search drives real revenue — and where being the first name mentioned changes everything.
          </p>
        </div>

        {/* Industry Cards Grid */}
        <div className="who-we-serve-grid">
          {industries.map((ind, i) => (
            <div key={i} className="industry-card">
              <div style={{ fontSize: '36px', marginBottom: '16px', lineHeight: 1 }}>{ind.icon}</div>
              <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '22px', color: '#1a1a1a', marginBottom: '10px', lineHeight: 1.3 }}>{ind.title}</h3>
              <p style={{ color: '#555', fontSize: '15px', lineHeight: 1.65, marginBottom: '16px' }}>{ind.tagline}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {ind.examples.map((ex, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#888', fontSize: '13px', marginBottom: '6px' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#c8956c', flexShrink: 0 }} />
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA nudge */}
        <div style={{ textAlign: 'center', marginTop: '56px' }}>
          <p style={{ color: '#888', fontSize: '15px', marginBottom: '20px' }}>Don't see your industry? If AI search drives clients to your competitors, we can help.</p>
          <a href="#contact" style={{
            display: 'inline-block',
            background: 'transparent',
            border: '1.5px solid #c8956c',
            color: '#c8956c',
            padding: '12px 32px',
            borderRadius: '8px',
            fontSize: '15px',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'background 0.2s, color 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#c8956c'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c8956c'; }}
          >
            Check If We're a Fit →
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 5: WHAT IS GEO — DARK
───────────────────────────────────────────── */
function WhatIsGeo() {
  const cards = [
    {
      icon: <Search size={20} />,
      title: 'SEO = Ranking in Links',
      body: 'Traditional search shows 10 blue links. Users browse, compare, and leave. Your brand competes with nine others on every page.',
    },
    {
      icon: <Target size={20} />,
      title: 'GEO = Being THE Recommended Answer',
      body: "AI search gives one definitive recommendation. If that recommendation isn't your brand, you simply don't exist in the conversation — no matter how good your traditional SEO is.",
    },
    {
      icon: <Shield size={20} />,
      title: 'Geophinx = Your Advantage',
      body: 'We engineer every element of your digital presence so that AI engines cite, recommend, and trust your brand. Consistently. Reliably. First.',
    },
  ];

  return (
    <section id="what-is-geo" style={{ background: '#141414', padding: '80px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="label-tag" style={{ marginBottom: 16 }}>What Is GEO?</div>
          <h2 className="headline-section h-dark" style={{ maxWidth: 640, marginBottom: 16, margin: '0 auto 16px' }}>
            Generative Engine Optimization Explained
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: '#a09890', maxWidth: 560, margin: '0 auto' }}>
            GEO is the practice of optimizing your brand so AI models — ChatGPT, Google AI Overviews, Perplexity — recommend you by name.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {cards.map((c, i) => (
            <div key={c.title} className={`reveal reveal-delay-${i + 1} glass-card`}>
              <div className="icon-container" style={{ marginBottom: 24 }}>
                <span style={{ color: '#d4a87a' }}>{c.icon}</span>
              </div>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 600, color: '#f0ece4', marginBottom: 14 }}>
                {c.title}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#8a8580', lineHeight: 1.7 }}>
                {c.body}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 5: SERVICES — LIGHT
───────────────────────────────────────────── */
function Services() {
  const services = [
    {
      icon: <Eye size={20} />,
      title: 'AI Search Audit & Visibility Analysis',
      desc: 'Deep-dive analysis of your brand\'s presence across ChatGPT, Gemini, Perplexity, Claude, and Google AI Overviews. We map every gap and opportunity.',
    },
    {
      icon: <Brain size={20} />,
      title: 'AI Content Optimization',
      desc: 'We rewrite and restructure your content so ChatGPT, Perplexity, and Google AI recommend your business when customers ask for what you offer.',
    },
    {
      icon: <Code2 size={20} />,
      title: 'Structured Data & Schema',
      desc: 'Advanced schema markup, entity optimization, and knowledge graph signals that help AI models understand and cite your business with confidence.',
    },
    {
      icon: <Globe2 size={20} />,
      title: 'Authority Building & Digital PR',
      desc: 'Build the AI citations and brand mentions across authoritative sources that make ChatGPT and Google AI trust — and recommend — your business by name.',
    },
    {
      icon: <Shield size={20} />,
      title: 'Technical GEO Infrastructure',
      desc: 'Behind-the-scenes technical setup that helps AI tools find, understand, and trust your website — so they recommend you with confidence.',
    },
    {
      icon: <BarChart3 size={20} />,
      title: 'Monitoring & Reporting',
      desc: 'Track your GEO score, AI citation frequency, and brand mention growth across ChatGPT, Perplexity, and Google AI with clear monthly dashboards.',
    },
  ];

  return (
    <section id="services" style={{ background: '#111111', padding: '80px 32px', position: 'relative' }}>
      <div className="section-grid" />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="label-tag" style={{ marginBottom: 16 }}>Our Services</div>
          <h2 className="headline-section h-dark" style={{ maxWidth: 640, marginBottom: 16, margin: '0 auto 16px' }}>
            Full-Service GEO & AI Search Optimization
          </h2>
          <div className="copper-divider" style={{ margin: '16px auto 24px' }} />
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: '#a09890', maxWidth: 600, margin: '0 auto' }}>
            End-to-end Generative Engine Optimization — every service engineered to make ChatGPT, Google AI, and Perplexity recommend your business.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {services.map((s, i) => (
            <div key={s.title} className={`reveal reveal-delay-${(i % 3) + 1} service-card`}>
              <div className="icon-container" style={{ marginBottom: 22 }}>
                <span style={{ color: '#d4a87a' }}>{s.icon}</span>
              </div>
              <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, color: '#f0ece4', marginBottom: 12 }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#8a8580', lineHeight: 1.7 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 6: PROCESS — DARK
───────────────────────────────────────────── */
function Process() {
  const steps = [
    { num: '01', title: 'Discovery & AI Audit', desc: "We check how your business currently appears across ChatGPT, Google AI, and Perplexity — and find exactly where you're missing out." },
    { num: '02', title: 'Strategy Blueprint', desc: 'Custom GEO roadmap tailored to your industry, competitors, and growth targets. No cookie-cutter plans.' },
    { num: '03', title: 'GEO Content & Technical Optimization', desc: 'Restructure content, implement schema markup, and deploy technical GEO upgrades so AI models can easily parse, trust, and cite your business.' },
    { num: '04', title: 'AI Citation & Authority Building', desc: 'Earn brand mentions and citations across the authoritative sources ChatGPT, Perplexity, and Google AI rely on when forming recommendations.' },
    { num: '05', title: 'Monitor GEO Score & Scale', desc: 'Track AI citation frequency, GEO score, and brand mention growth monthly — then iterate to compound your AI search visibility over time.' },
  ];

  return (
    <section id="process" style={{ background: '#0f0f0f', padding: '80px 32px', position: 'relative' }}>
      <div className="section-grid" />
      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="label-tag" style={{ marginBottom: 16 }}>Our Process</div>
          <h2 className="headline-section h-dark" style={{ maxWidth: 640, marginBottom: 16, margin: '0 auto 16px' }}>
            How We Make AI Engines Recommend You
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: '#a09890', maxWidth: 560, margin: '0 auto' }}>
            A proven 5-step framework refined across 100+ engagements.
          </p>
        </div>

        {/* Desktop: horizontal */}
        <div className="process-desktop">
          {steps.map((s, i) => (
            <div key={s.num} className="process-step reveal" style={{ animationDelay: `${i * 0.1}s`, padding: '0 12px 0 0' }}>
              <div className="glass-card" style={{ padding: '28px 24px', position: 'relative', overflow: 'hidden' }}>
                {/* Watermark number */}
                <div style={{
                  position: 'absolute', top: -10, right: -4,
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 80, fontWeight: 400,
                  color: 'rgba(212,168,122,0.12)',
                  lineHeight: 1, userSelect: 'none',
                  pointerEvents: 'none',
                }}>
                  {s.num}
                </div>
                <div className="text-copper" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 14 }}>
                  {s.num}
                </div>
                <h4 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: '#f0ece4', marginBottom: 12, lineHeight: 1.4 }}>
                  {s.title}
                </h4>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#8a8580', lineHeight: 1.65 }}>
                  {s.desc}
                </p>
              </div>
              {i < steps.length - 1 && (
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: 28, paddingLeft: 8 }}>
                  <div className="process-h-line" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="process-mobile">
          {steps.map((s, i) => (
            <div key={s.num} className={`reveal reveal-delay-${i + 1} glass-card`} style={{ position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: -10, right: 8,
                fontFamily: "'Instrument Serif', serif",
                fontSize: 72, color: 'rgba(212,168,122,0.1)', lineHeight: 1, userSelect: 'none',
              }}>
                {s.num}
              </div>
              <div className="text-copper" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 12 }}>{s.num}</div>
              <h4 style={{ fontSize: 16, fontWeight: 600, color: '#f0ece4', marginBottom: 10 }}>{s.title}</h4>
              <p style={{ fontSize: 14, color: '#8a8580', lineHeight: 1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 7: VIDEO SHOWCASE — DARK
───────────────────────────────────────────── */
function VideoShowcase() {
  const highlights = [
    { icon: <Eye size={16} />, text: 'Full AI visibility audit walkthrough' },
    { icon: <BarChart3 size={16} />, text: 'Real client results & case studies' },
    { icon: <Target size={16} />, text: 'Our proven GEO framework explained' },
  ];

  return (
    <section style={{ background: '#141414', padding: '56px 32px 48px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="label-tag" style={{ marginBottom: 12 }}>See It In Action</div>
          <h2 className="headline-section h-dark" style={{ margin: '0 auto 10px', maxWidth: 540 }}>
            Watch GEO Transform Brands
          </h2>
        </div>

        {/* Centered video */}
        <div className="reveal" style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            borderRadius: 18,
            background: '#0a0a0a',
            border: '1px solid rgba(212,168,122,0.22)',
            borderTop: '2px solid rgba(212,168,122,0.55)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 20px 80px rgba(0,0,0,0.7), 0 0 60px rgba(212,168,122,0.08)',
            padding: '10px',
          }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 12, overflow: 'hidden' }}>
              <iframe
                src="https://www.youtube.com/embed/qlIpNr6Qq4c?rel=0&modestbranding=1"
                title="Geophinx — Agency Overview"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '100%', height: '100%',
                  border: 'none',
                }}
              />
            </div>
          </div>
        </div>

        {/* Highlights row below video */}
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px 40px', marginTop: 36 }}>
          {highlights.map((h, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#b0a898',
            }}>
              <span style={{ color: '#d4a87a', flexShrink: 0 }}>{h.icon}</span>
              {h.text}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal" style={{ textAlign: 'center', marginTop: 28 }}>
          <button
            onClick={() => document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' })}
            className="copper-link"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 600,
              color: '#d4a87a', background: 'none', border: 'none', cursor: 'pointer',
              padding: 0,
            }}
          >
            Book your strategy session <ArrowRight size={15} />
          </button>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 9: FAQ — LIGHT (WARMER)
───────────────────────────────────────────── */
function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const items = [
    {
      q: 'What exactly is AI Search Optimization?',
      a: "When someone types 'best family lawyer in Chicago' or 'top med spa near me' into ChatGPT or Google AI, the AI recommends specific businesses. AI Search Optimization (also called GEO) is the process of making sure your business is the one it recommends — not your competitor's.",
    },
    {
      q: 'How is GEO different from traditional SEO?',
      a: 'SEO (Search Engine Optimization) focuses on ranking in traditional search results — the blue links on Google. GEO (Generative Engine Optimization) focuses on getting your brand recommended inside AI-generated answers on ChatGPT, Google AI Overviews, and Perplexity. Both matter, but GEO is the new frontier where local business visibility is won or lost.',
    },
    {
      q: 'How long until we see results?',
      a: 'Most clients see measurable improvements in AI search visibility within 60–90 days — including more frequent brand mentions in ChatGPT and Perplexity. Significant GEO score increases typically occur within 4–6 months, with compounding growth continuing thereafter.',
    },
    {
      q: 'What AI platforms do you optimize for?',
      a: 'We optimize across ChatGPT, Google AI Overviews, Perplexity, Claude, Gemini, Microsoft Copilot, and emerging platforms. Our strategies are platform-agnostic and built to remain effective as the landscape evolves.',
    },
    {
      q: 'Do you work with small and local businesses?',
      a: "Absolutely — that's our sweet spot. We work with law firms, medical practices, salons, spas, dental offices, financial advisors, and other local service businesses. AI search is where your next client is looking, and we help make sure they find you.",
    },
    {
      q: 'My business already shows up in ChatGPT — do I still need GEO?',
      a: "Yes — and this is one of the most common situations we see. Appearing occasionally in AI results is very different from having a strong GEO score. A weak GEO presence means you show up inconsistently, get mentioned after competitors, or disappear entirely on certain queries. We audit your current AI visibility and systematically improve how often, how prominently, and how confidently AI tools recommend your business.",
    },
    {
      q: 'What does pricing look like?',
      a: "We offer customized monthly retainers based on scope, industry complexity, and your specific goals. Book a free strategy session and we'll deliver a transparent proposal within 48 hours — no obligation.",
    },
  ];

  return (
    <section id="faq" style={{ background: '#141414', padding: '80px 32px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>

        <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="label-tag" style={{ marginBottom: 16 }}>FAQ</div>
          <h2 className="headline-section h-dark" style={{ maxWidth: 640, marginBottom: 16, margin: '0 auto 16px' }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((item, i) => (
            <div key={i} className={`reveal reveal-delay-${(i % 3) + 1}`}>
            <div
              className={`faq-item ${openIdx === i ? 'open' : ''}`}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '22px 24px', cursor: 'pointer', userSelect: 'none',
              }}>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: '#f0ece4', paddingRight: 16, lineHeight: 1.4 }}>
                  {item.q}
                </h3>
                <ChevronDown
                  size={18}
                  style={{
                    color: '#d4a87a',
                    flexShrink: 0,
                    transform: openIdx === i ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </div>
              <div style={{
                maxHeight: openIdx === i ? 300 : 0,
                opacity: openIdx === i ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
              }}>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, color: '#8a8580', lineHeight: 1.7,
                  padding: '0 24px 22px',
                }}>
                  {item.a}
                </p>
              </div>
            </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 11: BOOK A CALL — CALENDLY
───────────────────────────────────────────── */
function BookACall() {
  const [calLoaded, setCalLoaded] = useState(false);

  const calRef = useRef(null);
  useEffect(() => {
    // Lazy-load Calendly only when section scrolls into view
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const script = document.createElement('script');
          script.src = 'https://assets.calendly.com/assets/external/widget.js';
          script.async = true;
          script.onload = () => setCalLoaded(true);
          document.body.appendChild(script);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (calRef.current) observer.observe(calRef.current);
    return () => observer.disconnect();
  }, []);

  const valuePoints = [
    'Complete AI search visibility audit of your brand',
    'Competitor analysis — see who AI is recommending instead of you',
    'Custom GEO roadmap tailored to your industry',
    'Clear pricing proposal within 48 hours — no obligation',
  ];

  const miniStats = [
    { num: '30 min', label: 'Strategy session' },
    { num: '100%', label: 'Free, no obligation' },
    { num: '48 hrs', label: 'Proposal delivered' },
  ];

  return (
    <section ref={calRef} id="book-call" style={{ background: '#0f0f0f', padding: '80px 32px 72px', position: 'relative', overflow: 'hidden' }}>
      <div className="section-grid" />
      <div className="ambient-glow ambient-glow-top" />
      <div className="ambient-glow ambient-glow-bottom" />
      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Label */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="label-tag" style={{ marginBottom: 14 }}>Book Your Session</div>
          <h2 className="headline-section h-dark" style={{ margin: '0 auto 12px', maxWidth: 560 }}>
            Your Free GEO Strategy Session
          </h2>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: '#6b6560', margin: '0 auto', maxWidth: 420 }}>
            30 minutes. No pitch. Just a clear picture of where you stand and how to get ahead.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="reveal book-grid">

          {/* Left — value proposition */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, paddingTop: 8 }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 16, color: '#a09890', lineHeight: 1.6 }}>
              In 30 minutes, we'll audit your AI search presence, identify your biggest opportunities,
              and map your path to domination.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {valuePoints.map((point, i) => (
                <div key={i} className="value-point">
                  <CircleCheck size={16} style={{ color: '#d4a87a' }} />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Mini stats */}
            <div className="mini-stat-row">
              {miniStats.map((s, i) => (
                <div key={i} className="mini-stat">
                  <span className="num">{s.num}</span>
                  <span className="lbl">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Fallback email */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '12px 18px',
              background: 'rgba(255,255,255,0.03)', borderRadius: 10,
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <Mail size={15} style={{ color: '#d4a87a', flexShrink: 0 }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: '#8a8580', margin: 0 }}>
                Prefer email?{' '}
                <a href="mailto:hello@geophinx.agency" className="copper-link" style={{ color: '#d4a87a', textDecoration: 'none', fontWeight: 500 }}>
                  hello@geophinx.agency
                </a>
              </p>
            </div>
          </div>

          {/* Right — Calendly embed */}
          <div className="calendly-wrapper calendly-wrapper-dark">
            {!calLoaded && (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                height: 580, gap: 16,
              }}>
                <div className="cal-pulse" style={{
                  width: 14, height: 14, borderRadius: '50%', background: '#d4a87a',
                }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#8a8580' }}>
                  Loading calendar...
                </span>
              </div>
            )}
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/aiworkshopdevelopment/30min?month=2026-03"
              style={{
                width: '100%',
                height: '580px',
                display: calLoaded ? 'block' : 'none',
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 12: CONTACT FORM — DARK
───────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const scrollToCalendly = () => {
    document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="contact" style={{ background: '#0f0f0f', padding: '80px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20,
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}>

          {/* Left */}
          <div className="reveal" style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 className="headline-section h-dark" style={{ maxWidth: 640, marginBottom: 16 }}>
              Or Send Us a Message
            </h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#8a8580', lineHeight: 1.7, marginBottom: 48, maxWidth: 380 }}>
              Not ready to book a call? Drop us a message and we'll get back to you within 24 hours with a personalized response.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { icon: <Mail size={16} />, text: 'hello@geophinx.agency', href: 'mailto:hello@geophinx.agency' },
                { icon: <Phone size={16} />, text: '+1 (415) 555-0192', href: 'tel:+14155550192' },
                { icon: <MapPin size={16} />, text: '548 Market St, San Francisco, CA 94104' },
              ].map((item) => (
                <div key={item.text} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div className="icon-container" style={{ width: 36, height: 36, borderRadius: 9, flexShrink: 0 }}>
                    <span style={{ color: '#d4a87a' }}>{item.icon}</span>
                  </div>
                  {item.href ? (
                    <a href={item.href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#a09890', textDecoration: 'none', paddingTop: 9 }}
                      onMouseEnter={e => e.target.style.color = '#d4a87a'}
                      onMouseLeave={e => e.target.style.color = '#a09890'}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#a09890', paddingTop: 9, lineHeight: 1.5 }}>{item.text}</span>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={scrollToCalendly}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, marginTop: 36, padding: 0 }}
            >
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#d4a87a' }}>Book directly instead</span>
              <ArrowRight size={14} style={{ color: '#d4a87a' }} />
            </button>
          </div>

          {/* Right: Form */}
          <div className="reveal reveal-delay-1" style={{ background: '#0a0a0a', padding: '64px 48px' }}>
            {submitted ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 20, textAlign: 'center' }}>
                <div className="icon-container" style={{ width: 64, height: 64, borderRadius: 16 }}>
                  <Check size={28} style={{ color: '#d4a87a' }} />
                </div>
                <h3 className="font-serif" style={{ fontSize: 28, color: '#f0ece4' }}>Message Sent</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: '#8a8580', maxWidth: 320, lineHeight: 1.6 }}>
                  Thank you. We'll reach back within 24 hours with a personalized response.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-two-col">
                  <div>
                    <label className="form-label">Full Name</label>
                    <input className="form-input" type="text" placeholder="Jane Smith" required
                      value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div>
                    <label className="form-label">Work Email</label>
                    <input className="form-input" type="email" placeholder="jane@company.com" required
                      value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                  </div>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Company</label>
                  <input className="form-input" type="text" placeholder="Acme Inc." required
                    value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label className="form-label">Monthly Marketing Budget</label>
                  <select
                    className="form-input"
                    value={form.budget}
                    onChange={e => setForm(p => ({ ...p, budget: e.target.value }))}
                    required
                  >
                    <option value="" disabled>Select your budget range</option>
                    <option value="2.5-5k">$2.5K – $5K</option>
                    <option value="5-10k">$5K – $10K</option>
                    <option value="10-25k">$10K – $25K</option>
                    <option value="25-50k">$25K – $50K</option>
                    <option value="50k+">$50K+</option>
                  </select>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label className="form-label">Message</label>
                  <textarea className="form-input" rows={4} placeholder="Tell us about your brand and goals..."
                    value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ resize: 'vertical', minHeight: 120 }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-copper"
                  style={{ width: '100%', padding: '16px', borderRadius: 12, fontSize: 15 }}
                >
                  Send Message →
                </button>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: '#6b6560', textAlign: 'center', marginTop: 14 }}>
                  We respond within 24 hours · No spam, ever
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SECTION 13: FOOTER — DARK
───────────────────────────────────────────── */
function Footer({ onBookCall }) {
  const quickLinks = ['Services', 'Process', 'FAQ', 'Contact'];
  const services = ['AI Search Audit', 'AI Content Optimization', 'Structured Data', 'Authority Building', 'Technical GEO', 'Monitoring'];

  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '80px 32px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48, marginBottom: 48 }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <span style={{ color: '#d4a87a', fontSize: 14 }}>◆</span>
              <span className="font-serif" style={{ fontSize: 20, fontWeight: 400 }}>
                <span className="logo-gradient">GEO</span><span style={{ color: '#f0ece4' }}>phinx</span>
              </span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#6b6560', lineHeight: 1.7, marginBottom: 28, maxWidth: 240 }}>
              Generative Engine Optimization (GEO) for local service businesses — get recommended by ChatGPT, Google AI Overviews, and Perplexity.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { icon: <Linkedin size={15} />, label: 'LinkedIn' },
                { icon: <Twitter size={15} />, label: 'Twitter' },
                { icon: <Instagram size={15} />, label: 'Instagram' },
              ].map((s) => (
                <div key={s.label} className="social-icon" title={s.label}>{s.icon}</div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="label-tag" style={{ color: '#6b6560', marginBottom: 20 }}>Quick Links</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {quickLinks.map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} style={{
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#8a8580',
                  textDecoration: 'none', transition: 'color 0.2s ease',
                }}
                  onMouseEnter={e => e.target.style.color = '#d4a87a'}
                  onMouseLeave={e => e.target.style.color = '#8a8580'}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div className="label-tag" style={{ color: '#6b6560', marginBottom: 20 }}>Services</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {services.map((s) => (
                <span key={s} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#8a8580' }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="label-tag" style={{ color: '#6b6560', marginBottom: 20 }}>Contact</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: <Mail size={13} />, text: 'hello@geophinx.agency' },
                { icon: <Phone size={13} />, text: '+1 (415) 555-0192' },
                { icon: <MapPin size={13} />, text: '548 Market St\nSan Francisco, CA 94104' },
              ].map((item) => (
                <div key={item.text} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: '#d4a87a', marginTop: 1, flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#8a8580', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.04)',
          padding: '24px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#6b6560' }}>
            © 2026 Geophinx. All rights reserved.
          </span>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
            {['Privacy Policy', 'Terms of Service'].map((t) => (
              <a key={t} href="#" style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#6b6560',
                textDecoration: 'none', transition: 'color 0.2s ease',
              }}
                onMouseEnter={e => e.target.style.color = '#d4a87a'}
                onMouseLeave={e => e.target.style.color = '#6b6560'}
              >
                {t}
              </a>
            ))}
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: '#6b6560' }}>
              Made in San Francisco 🌁
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   MOBILE FAB
───────────────────────────────────────────── */
function MobileFAB({ onBookCall }) {
  return (
    <div className="mobile-fab">
      <button
        className="btn-copper"
        style={{ padding: '14px 22px', borderRadius: 100, display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, boxShadow: '0 4px 24px rgba(212,168,122,0.3)' }}
        onClick={onBookCall}
      >
        <Phone size={15} />
        Book a Call
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLOATING PARTICLES
───────────────────────────────────────────── */
function FloatingParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const COLORS = [
      [200, 149, 108],
      [240, 220, 190],
      [255, 245, 230],
    ];

    const particles = Array.from({ length: 40 }, () => {
      const c = COLORS[Math.floor(Math.random() * COLORS.length)];
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.8 + 0.5,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        baseOpacity: Math.random() * 0.22 + 0.08,
        phase: Math.random() * Math.PI * 2,
        color: c,
      };
    });

    let t = 0;
    let lastFrame = 0;
    const FPS = 24;
    const INTERVAL = 1000 / FPS;
    const MAX_DIST_SQ = 110 * 110; // use squared distance — avoids Math.sqrt

    const animate = (now) => {
      animId = requestAnimationFrame(animate);
      if (document.hidden || now - lastFrame < INTERVAL) return;
      lastFrame = now;
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -2) p.x = canvas.width + 2;
        else if (p.x > canvas.width + 2) p.x = -2;
        if (p.y < -2) p.y = canvas.height + 2;
        else if (p.y > canvas.height + 2) p.y = -2;
      }

      // Batch all connections into a single stroke call
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(212,168,122,0.07)';
      ctx.lineWidth = 0.6;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          if (dx * dx + dy * dy < MAX_DIST_SQ) {
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
          }
        }
      }
      ctx.stroke();

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const opacity = p.baseOpacity * (0.7 + 0.3 * Math.sin(t + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color[0]},${p.color[1]},${p.color[2]},${opacity})`;
        ctx.fill();
      }
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        willChange: 'transform',
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────── */
export default function App() {
  useScrollReveal();

  const scrollToBookCall = useCallback(() => {
    document.getElementById('book-call')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      <GlobalStyles />
      <FloatingParticles />
      <Navbar onBookCall={scrollToBookCall} />

      <Hero onBookCall={scrollToBookCall} />
      <VideoShowcase />
      <BookACall />
      <TheOpportunity />
      <WhoWeServe />
      <WhatIsGeo />
      <Services />
      <Process />
      <FAQ />
      <Contact />
      <Footer onBookCall={scrollToBookCall} />

      <MobileFAB onBookCall={scrollToBookCall} />
    </>
  );
}
