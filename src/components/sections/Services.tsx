'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import styles from './Services.module.css';

const services = [
  {
    number: '01',
    title: 'Web Development',
    description: 'Custom websites and web applications built with cutting-edge technologies. From simple landing pages to complex enterprise solutions.',
    capabilities: ['React & Next.js', 'Node.js & Python', 'Cloud Architecture', 'API Development'],
  },
  {
    number: '02',
    title: 'UI/UX Design',
    description: 'User-centered design that combines aesthetics with functionality. We create interfaces that users love and businesses trust.',
    capabilities: ['User Research', 'Wireframing', 'Visual Design', 'Prototyping'],
  },
  {
    number: '03',
    title: 'Mobile Apps',
    description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.',
    capabilities: ['iOS & Android', 'React Native', 'Flutter', 'App Store Optimization'],
  },
  {
    number: '04',
    title: 'Brand Identity',
    description: 'Strategic brand development that tells your story and connects with your audience on a deeper level.',
    capabilities: ['Logo Design', 'Brand Strategy', 'Visual Systems', 'Brand Guidelines'],
  },
  {
    number: '05',
    title: 'Digital Strategy',
    description: 'Data-driven strategies that help businesses grow their digital presence and achieve measurable results.',
    capabilities: ['SEO & SEM', 'Analytics', 'Content Strategy', 'Growth Marketing'],
  },
];

export function Services() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.label}>What We Do</span>
          <h2 className={styles.title}>
            Services built for <br />
            <span className={styles.titleItalic}>ambitious</span> brands
          </h2>
        </motion.div>

        {/* Service List */}
        <div className={styles.serviceList}>
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              className={`${styles.serviceItem} ${activeIndex === index ? styles.active : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              data-cursor="hover"
            >
              <div className={styles.serviceHeader}>
                <span className={styles.serviceNumber}>{service.number}</span>
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <motion.div
                  className={styles.arrow}
                  animate={{ rotate: activeIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </div>

              <motion.div
                className={styles.serviceContent}
                initial={false}
                animate={{
                  height: activeIndex === index ? 'auto' : 0,
                  opacity: activeIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.capabilityList}>
                  {service.capabilities.map((cap) => (
                    <li key={cap} className={styles.capability}>
                      {cap}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <div className={styles.serviceLine} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
