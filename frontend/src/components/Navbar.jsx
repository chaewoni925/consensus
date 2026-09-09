import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'About Us', path: '/' },
    { label: 'Member', path: '/members' },
    { label: 'Project', path: '/activities' },
    { label: 'Join Us', path: '/join-us' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
        background: isScrolled ? 'rgba(14, 22, 45, 0.88)' : 'transparent',
        borderBottom: isScrolled ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow: isScrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.5)' : 'none',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '100%',
          margin: '0',
          padding: '0 clamp(16px, 2vw, 32px)',
          height: isScrolled ? '54px' : '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          transition: 'height 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            gap: isScrolled ? '4px' : '6px',
            flex: 'none',
            textDecoration: 'none',
            transition: 'gap 0.35s ease'
          }}
        >
          {/* Logo Image */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src="/logo.png"
              alt="CONSENSUS Logo"
              style={{
                height: isScrolled ? '32px' : '44px',
                width: 'auto',
                objectFit: 'contain',
                transition: 'height 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          </div>

          {/* Brand Text */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontWeight: 800,
                fontSize: isScrolled ? '20px' : '24px',
                letterSpacing: '-.03em',
                color: '#F8FAFC',
                transition: 'all 0.35s ease'
              }}
            >
              CONSENSUS
            </span>

            {/* Since 2024 Pill (Button 3 Layout) */}
            {/*<span*/}
            {/*  style={{*/}
            {/*    font: "600 10.5px 'JetBrains Mono', monospace",*/}
            {/*    color: '#10B981',*/}
            {/*    background: 'rgba(16, 185, 129, 0.12)',*/}
            {/*    border: '1px solid rgba(16, 185, 129, 0.3)',*/}
            {/*    borderRadius: '12px',*/}
            {/*    padding: '3px 8px',*/}
            {/*    letterSpacing: '.05em',*/}
            {/*    opacity: isScrolled ? 0.75 : 1,*/}
            {/*    scale: isScrolled ? 0.9 : 1,*/}
            {/*    transition: 'all 0.35s ease'*/}
            {/*  }}*/}
            {/*>*/}
            {/*  SINCE 2024*/}
            {/*</span>*/}
          </div>
        </Link>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px', marginLeft: 'auto' }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  fontFamily: "'Pretendard', sans-serif",
                  fontWeight: active ? 800 : 700,
                  fontSize: isScrolled ? '15px' : '16px',
                  letterSpacing: '0.06em',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  opacity: active ? 1 : 0.9,
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)',
                  transition: 'all 0.25s ease',
                  position: 'relative',
                  padding: '4px 0'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.style.textShadow = '0 2px 12px rgba(255, 255, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.opacity = '0.9';
                    e.currentTarget.style.textShadow = '0 2px 8px rgba(0, 0, 0, 0.7)';
                  }
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;