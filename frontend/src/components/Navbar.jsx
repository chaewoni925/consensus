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
        {/* Brand Logo with Neon Glow & Hover Scale */}
        <Link
          to="/"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
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
          {/* Backdrop Glow Filter */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '18px',
              transform: 'translate(-50%, -50%)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.65) 0%, rgba(59, 130, 246, 0.45) 55%, transparent 75%)',
              filter: 'blur(14px)',
              opacity: isLogoHovered ? 1 : 0,
              scale: isLogoHovered ? 1.25 : 0.8,
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: 'none',
              zIndex: 0
            }}
          />

          {/* Logo Image */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              filter: isLogoHovered
                ? 'drop-shadow(0 0 16px rgba(16, 185, 129, 0.9)) drop-shadow(0 0 28px rgba(59, 130, 246, 0.7))'
                : 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.2))',
              transition: 'all 0.35s ease'
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

          {/* Brand Text & Since 2024 Pill */}
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
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: isScrolled ? '20px' : '24px',
                letterSpacing: '-.03em',
                color: isLogoHovered ? '#FFFFFF' : '#F8FAFC',
                textShadow: isLogoHovered ? '0 0 12px rgba(16, 185, 129, 0.5)' : 'none',
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
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  padding: isScrolled ? '6px 14px' : '8px 18px',
                  borderRadius: '10px',
                  font: '600 13.5px "IBM Plex Sans KR", sans-serif',
                  transition: 'all .25s ease',
                  color: active ? '#FFFFFF' : '#10B981',
                  background: active ? '#10B981' : 'rgba(16, 185, 129, 0.12)',
                  border: '1px solid ' + (active ? '#10B981' : 'rgba(16, 185, 129, 0.45)'),
                  textDecoration: 'none',
                  boxShadow: active ? '0 0 20px rgba(16, 185, 129, 0.5)' : '0 2px 10px rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  textShadow: active ? 'none' : '0 0 8px rgba(16, 185, 129, 0.3)'
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