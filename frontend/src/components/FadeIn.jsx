import { motion } from 'framer-motion';

function FadeIn({ children, delay = 0, yOffset = 36, duration = 0.7, style = {}, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration,
        delay,
        ease: [0.215, 0.61, 0.355, 1.0]
      }}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default FadeIn;
