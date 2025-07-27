import React, { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher.jsx';

const HamburgerMenu = ({ navButtons, lang }) => {
  const [open, setOpen] = useState(false);

  const handleNavClick = (href, e) => {
    const currentPath = window.location.pathname;
    
    if (href === currentPath) {
      e.preventDefault();
      setOpen(false);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    setOpen(false);
  };

  return (
    <div className="burger-menu-container">
      <button
        className={`burger-icon${open ? ' open' : ''}`}
        aria-label="Toggle navigation menu"
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav className={`burger-nav${open ? ' show' : ''}`}>
        <ul>
          {navButtons.map((btn) => (
            <li key={btn.href}>
              <a href={btn.href} onClick={(e) => handleNavClick(btn.href, e)}>{btn.label}</a>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <LanguageSwitcher lang={lang} />
        </div>
      </nav>
      <style>{`
        .burger-menu-container {
          position: relative;
        }
        .burger-icon {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 40px;
          height: 40px;
          background: none;
          border: none;
          cursor: pointer;
          z-index: 1001;
        }
        .burger-icon span {
          display: block;
          height: 4px;
          width: 28px;
          margin: 4px 0;
          background: var(--text-color, #222);
          border-radius: 2px;
          transition: 0.3s;
        }
        .burger-icon.open span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .burger-icon.open span:nth-child(2) {
          opacity: 0;
        }
        .burger-icon.open span:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
        }
        .burger-nav {
          display: none;
          position: absolute;
          top: 48px;
          right: 0;
          background: var(--background-color, #fff);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border-radius: 8px;
          z-index: 1000;
        }
        .burger-nav.show {
          display: block;
        }
        .burger-nav ul {
          list-style: none;
          margin: 0;
          padding: 1rem 2rem;
        }
        .burger-nav li {
          margin: 1rem 0;
        }
        .burger-nav a {
          color: var(--text-color, #222);
          text-decoration: none;
          font-size: 1.2rem;
        }
        @media (min-width: 768px) {
          .burger-icon, .burger-nav {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HamburgerMenu;
