'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    id: 1,
    quote: "Working with StackRover was a transformative experience. They didn't just build a website; they crafted a digital masterpiece that truly represents our brand.",
    author: 'Sarah Mitchell',
    role: 'CEO',
    company: 'Meridian Finance',
  },
  {
    id: 2,
    quote: "The attention to detail and commitment to excellence is unmatched. Our new platform has exceeded all expectations and our users love it.",
    author: 'James Chen',
    role: 'Founder',
    company: 'Aurora Wellness',
  },
  {
    id: 3,
    quote: "From concept to launch, the team demonstrated exceptional professionalism and creativity. They truly understand what it takes to build a premium digital experience.",
    author: 'Emily Rodriguez',
    role: 'Marketing Director',
    company: 'Nexus Technology',
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.label}>Testimonials</span>
          <h2 className={styles.title}>
            Kind words from <br />
            <span className={styles.titleItalic}>our clients</span>
          </h2>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className={styles.carousel}>
          <div className={styles.quoteIcon}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <path
                d="M24 16H8V32H16V48H24V16ZM56 16H40V32H48V48H56V16Z"
                fill="currentColor"
                fillOpacity="0.1"
              />
            </svg>
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className={styles.testimonialContent}
            >
              <blockquote className={styles.quote}>
                &ldquo;{testimonials[activeIndex].quote}&rdquo;
              </blockquote>
              <div className={styles.author}>
                <span className={styles.authorName}>
                  {testimonials[activeIndex].author}
                </span>
                <span className={styles.authorRole}>
                  {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Dots */}
          <div className={styles.dots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${activeIndex === index ? styles.active : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                data-cursor="hover"
              >
                <motion.div
                  className={styles.dotFill}
                  initial={false}
                  animate={{
                    scaleX: activeIndex === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
