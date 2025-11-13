import React, { useRef, useState, useEffect } from 'react';
import { Facebook, Instagram, Play, Pause, Zap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

// --- CONSTANTS ---
const FACEBOOK_URL = 'https://www.facebook.com/profile.php?id=61580153529409';
const INSTAGRAM_URL = 'https://www.instagram.com/farhascent/';
const VIDEO_PLACEHOLDER_URL = '/farhaScent.mp4';
const DEEP_LINK_SCHEME = 'farhascent://home';

// --- Navbar Component ---
const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
            <Zap className="w-6 h-6 text-purple-600" style={{width: '1.5rem', height: '1.5rem', color: '#9333ea'}} />
            <span className="navbar-logo-text">Farha Scent</span>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-menu">
            <a href="#home" className="navbar-link">Дома</a>
            <a href="#products" className="navbar-link">Производи</a>
            <a href="#about" className="navbar-link">За Нас</a>
            <a href="#contact" className="navbar-link">Контакт</a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="navbar-mobile-button">
            {mobileMenuOpen ? <X style={{width: '1.5rem', height: '1.5rem'}} /> : <Menu style={{width: '1.5rem', height: '1.5rem'}} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="navbar-mobile-menu">
            <div className="navbar-mobile-links">
              <a href="#home" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>Дома</a>
              <a href="#products" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>Производи</a>
              <a href="#about" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>За Нас</a>
              <a href="#contact" className="navbar-mobile-link" onClick={() => setMobileMenuOpen(false)}>Контакт</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};



const App = () => {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null);

  // Simulate deep link activation
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertMessage('Opened Farha App via QR Code ✅');
    }, 1000); // Simulate after 1 second
    return () => clearTimeout(timer);
  }, []);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play();
        setPaused(false);
      } else {
        video.pause();
        setPaused(true);
      }
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="farha-page-container" style={{paddingTop: '4rem'}}>
        {/* Blurred Orbs */}
        <div className="farha-orb-purple"></div>
        <div className="farha-orb-pink"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="farha-container"
        >
          {/* Header */}
          <div className="farha-header">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="farha-icon-wrapper"
            >
              <Zap style={{width: '2.5rem', height: '2.5rem', color: 'white'}} />
            </motion.div>
            <h1 className="farha-header-title">Farha Scent</h1>
            <p className="farha-header-subtitle">Мирис, Емоција и Хармонија</p>
          </div>

          {/* Video Section */}
          <div onClick={handleVideoClick} className="video-wrapper">
            <video
              ref={videoRef}
              src={VIDEO_PLACEHOLDER_URL}
              className="video-player"
              loop
              autoPlay
              muted
              onLoadedData={() => setIsLoading(false)}
              onError={(e) => {
                console.error("Video error:", e);
                setIsLoading(false);
              }}
            />
            
            {/* Loading Overlay */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="video-loading"
                >
                  <div className="loading-spinner"></div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Play/Pause Overlay */}
            <AnimatePresence>
              {!isLoading && paused && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="video-paused-overlay"
                >
                  <div className="play-button">
                    <Play style={{width: '4rem', height: '4rem', color: 'white'}} fill="white" />
                  </div>
                </motion.div>
              )}
              {!isLoading && !paused && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pause-button-overlay"
                >
                  <Pause style={{width: '1.25rem', height: '1.25rem', color: 'white'}} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Product Info Section */}
          <div className="farha-info-section">
            <h2 className="farha-info-title">
              Луксузна Ароматерапија
            </h2>
            <p className="farha-info-text">
              Луксузни арома дифузери и есенцијални масла за твојот дом, канцеларија или комерцијален простор.
            </p>
          </div>

          {/* Social Buttons */}
          <div className="farha-social-section">
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="farha-social-button farha-facebook"
            >
              <Facebook style={{width: '1.25rem', height: '1.25rem'}} />
              <span>Следете нѐ на Facebook</span>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="farha-social-button farha-instagram"
            >
              <Instagram style={{width: '1.25rem', height: '1.25rem'}} />
              <span>Следете нѐ на Instagram</span>
            </a>
          </div>

          {/* Footer */}
          <div className="farha-footer">
            <p>© 2025 Farha Scent. Сите права задржани.</p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default App;