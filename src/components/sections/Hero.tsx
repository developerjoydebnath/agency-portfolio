'use client';

import { SplitText } from '@/components/ui/AnimatedText';
import { ArrowIcon, MagneticButton } from '@/components/ui/MagneticButton';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Hero.module.css';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className={styles.hero} id="hero">
      <motion.div className={styles.content} style={{ y, opacity }}>
        {/* Tagline */}
        <motion.div
          className={styles.tagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.taglineText}>Digital Excellence</span>
          <span className={styles.taglineDivider}>/</span>
          <span className={styles.taglineText}>Since 2020</span>
        </motion.div>

        {/* Main Heading */}
        <div className={styles.headingWrapper}>
          <SplitText className={styles.heading} delay={0.3}>
            We craft digital
          </SplitText>
          <SplitText className={`${styles.heading} ${styles.headingItalic}`} delay={0.5}>
            experiences
          </SplitText>
          <SplitText className={styles.heading} delay={0.7}>
            that inspire
          </SplitText>
        </div>

        {/* Description */}
        <motion.p
          className={styles.description}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          We are a premier digital agency specializing in creating stunning websites,
          powerful applications, and memorable brand experiences for forward-thinking companies.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className={styles.ctas}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <MagneticButton variant="primary" href="#work">
            View Our Work <ArrowIcon />
          </MagneticButton>
          <MagneticButton variant="underline" href="#contact">
            Start a Project
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <span className={styles.scrollText}>Scroll</span>
        <motion.div
          className={styles.scrollLine}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Background Elements */}
      <div className={styles.bgElements}>
        <motion.div
          className={styles.bgCircle}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.03 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
        <motion.div
          className={styles.bgLine}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </section>
  );
}
