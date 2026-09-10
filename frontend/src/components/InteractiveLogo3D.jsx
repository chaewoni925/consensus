import { useState, useRef } from 'react';

function InteractiveLogo3D() {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles (max ±22 degrees)
    const rotateY = ((x - centerX) / centerX) * 22;
    const rotateX = -((y - centerY) / centerY) * 22;

    setRotation({ x: rotateX, y: rotateY });
    setGlowPos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100)
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '380px',
        height: '380px',
        margin: '0 auto',
        perspective: '1000px',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      {/* Dynamic 3D Object Container */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.05 : 1}, ${isHovered ? 1.05 : 1}, 1)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          borderRadius: '32px',
          background: 'radial-gradient(circle at ' + glowPos.x + '% ' + glowPos.y + '%, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.1) 45%, rgba(14, 22, 45, 0.85) 100%)',
          border: '1px solid ' + (isHovered ? 'rgba(16, 185, 129, 0.45)' : 'rgba(59, 130, 246, 0.2)'),
          boxShadow: isHovered
            ? '0 24px 60px -12px rgba(16, 185, 129, 0.35), inset 0 0 30px rgba(16, 185, 129, 0.15)'
            : '0 16px 40px -10px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(59, 130, 246, 0.05)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justify: 'center',
          padding: '24px',
          boxSizing: 'border-box'
        }}
      >
        {/* Holographic Glow Layer */}
        <div
          style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '40px',
            background: 'radial-gradient(circle at ' + glowPos.x + '% ' + glowPos.y + '%, rgba(16, 185, 129, 0.4), rgba(59, 130, 246, 0.25) 50%, transparent 80%)',
            filter: 'blur(30px)',
            opacity: isHovered ? 0.85 : 0.25,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
            zIndex: 0
          }}
        />

        {/* Floating 3D Emblem Base */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            transform: 'translateZ(50px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '140px',
              height: '140px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              filter: isHovered
                ? 'drop-shadow(0 0 25px rgba(16, 185, 129, 0.85)) drop-shadow(0 0 45px rgba(59, 130, 246, 0.6))'
                : 'drop-shadow(0 0 15px rgba(59, 130, 246, 0.3))',
              transition: 'filter 0.4s ease'
            }}
          >
            <img
              src="/logo.png"
              alt="3D Consensus Emblem"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transform: `rotate(${rotation.y * 0.3}deg)`
              }}
            />
          </div>

          {/* 3D Label & Status */}
          <div style={{ textAlign: 'center', transform: 'translateZ(30px)' }}>
            <span
              style={{
                fontFamily: "'Pretendard', sans-serif",
                fontWeight: 800,
                fontSize: '22px',
                letterSpacing: '-.02em',
                background: 'linear-gradient(135deg, #FFFFFF 0%, #10B981 50%, #3B82F6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block'
              }}
            >
              CONSENSUS 3D
            </span>
            <span
              style={{
                font: "600 11px 'Pretendard', sans-serif",
                letterSpacing: '.18em',
                color: isHovered ? '#10B981' : '#94A3B8',
                textTransform: 'uppercase',
                marginTop: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.3s'
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: isHovered ? '#10B981' : '#3B82F6',
                  boxShadow: '0 0 8px ' + (isHovered ? '#10B981' : '#3B82F6')
                }}
              />
              {isHovered ? 'PHYSICAL INTERACTION ACTIVE' : 'MOVE CURSOR TO INTERACT'}
            </span>
          </div>
        </div>

        {/* Subtle Bottom Grid lines overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            right: '20px',
            font: "500 10px 'Pretendard', sans-serif",
            color: 'rgba(148, 163, 184, 0.4)',
            letterSpacing: '.1em',
            transform: 'translateZ(20px)'
          }}
        >
          ROT: X={Math.round(rotation.x)}° Y={Math.round(rotation.y)}°
        </div>
      </div>
    </div>
  );
}

export default InteractiveLogo3D;
