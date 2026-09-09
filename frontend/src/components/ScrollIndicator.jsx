import { useEffect, useState } from 'react';

function ScrollIndicator() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            // Hide scroll arrow if user is within 120px of page bottom
            if (scrollTop + windowHeight >= documentHeight - 120) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!isVisible) return null;

    return (
        <div style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: 0.85,
            animation: 'pulseDot 2s ease-in-out infinite',
            pointerEvents: 'none',
            zIndex: 100,
            transition: 'opacity 0.3s ease'
        }}>
            <span style={{ color: '#9DC4EE', fontSize: '26px', fontWeight: 'bold' }}>↓</span>
        </div>
    );
}

export default ScrollIndicator;
