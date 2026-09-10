import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function ParallaxItem({ children, speed = 40, style = {} }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const yRaw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(yRaw, { stiffness: 90, damping: 25 });

  return (
    <motion.div ref={ref} style={{ y, ...style }}>
      {children}
    </motion.div>
  );
}

export function ParallaxHero({ children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '80px']);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.16)',
        minHeight: '100vh',
        paddingTop: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box'
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          top: '-10%',
          left: 0,
          right: 0,
          bottom: '-10%',
          backgroundImage: "linear-gradient(rgba(12, 21, 38, 0.4), rgba(12, 21, 38, 0.7)), url('/bg_hero_buildings.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: bgY,
          zIndex: 1
        }}
      />
      <motion.div style={{ y: contentY, opacity, zIndex: 2, width: '100%' }}>
        {children}
      </motion.div>
    </section>
  );
}
