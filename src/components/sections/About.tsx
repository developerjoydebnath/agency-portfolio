'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './About.module.css';

const stats = [
  { number: '50+', label: 'Projects Delivered' },
  { number: '30+', label: 'Happy Clients' },
  { number: '5+', label: 'Years Experience' },
  { number: '15+', label: 'Team Members' },
];

const values = [
  {
    title: 'Excellence',
    description: 'We pursue excellence in every pixel, every line of code, and every interaction we create.',
  },
  {
    title: 'Innovation',
    description: 'We embrace new technologies and methodologies to deliver cutting-edge solutions.',
  },
  {
    title: 'Collaboration',
    description: 'We work closely with our clients, treating their goals as our own.',
  },
];

export function About() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  return (
    <section ref={containerRef} className={styles.about} id="about">
      <div className={styles.container}>
        {/* Split Layout */}
        <div className={styles.splitLayout}>
          {/* Image Side */}
          <motion.div
            className={styles.imageColumn}
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.imageWrapper}>
              <motion.img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=1000&fit=crop"
                alt="Our team collaborating"
                className={styles.image}
                style={{ y: imageY }}
              />
              <div className={styles.imageOverlay} />
            </div>
            
            {/* Experience Badge */}
            <motion.div
              className={styles.badge}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className={styles.badgeNumber}>5+</span>
              <span className={styles.badgeText}>Years of Excellence</span>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <div className={styles.contentColumn}>
            <motion.div
              className={styles.content}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.label}>About Us</span>
              <h2 className={styles.title}>
                A team obsessed with <span className={styles.titleItalic}>craft</span>
              </h2>
              <p className={styles.description}>
                We are a collective of designers, developers, and strategists united by a 
                shared passion for creating exceptional digital experiences. Since 2020, 
                we&apos;ve been helping brands transform their digital presence and connect 
                with their audiences in meaningful ways.
              </p>
              <p className={styles.description}>
                Our approach combines strategic thinking with creative execution, 
                ensuring every project we deliver not only looks beautiful but 
                drives real business results.
              </p>
            </motion.div>

            {/* Values */}
            <motion.div
              className={styles.values}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {values.map((value, index) => (
                <div key={value.title} className={styles.valueItem}>
                  <span className={styles.valueNumber}>0{index + 1}</span>
                  <div className={styles.valueContent}>
                    <h4 className={styles.valueTitle}>{value.title}</h4>
                    <p className={styles.valueDescription}>{value.description}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className={styles.statItem}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <span className={styles.statNumber}>{stat.number}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
