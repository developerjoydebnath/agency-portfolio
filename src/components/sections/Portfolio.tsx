'use client';

import { ArrowIcon, MagneticButton } from '@/components/ui/MagneticButton';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styles from './Portfolio.module.css';

const projects = [
  {
    id: 1,
    title: 'Meridian Finance',
    category: 'Web Development',
    year: '2024',
    description: 'A comprehensive fintech platform with real-time analytics and seamless user experience.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
  },
  {
    id: 2,
    title: 'Aurora Wellness',
    category: 'Brand Identity',
    year: '2024',
    description: 'Complete brand transformation for a luxury wellness retreat and spa.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=800&fit=crop',
  },
  {
    id: 3,
    title: 'Nexus Technology',
    category: 'Mobile App',
    year: '2023',
    description: 'Enterprise mobile solution connecting teams across global offices.',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&h=800&fit=crop',
  },
  {
    id: 4,
    title: 'Velvet Studios',
    category: 'UI/UX Design',
    year: '2023',
    description: 'Creative agency website with immersive storytelling and bold visuals.',
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&h=800&fit=crop',
  },
];

const categories = ['All', 'Web Development', 'Brand Identity', 'Mobile App', 'UI/UX Design'];

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section className={styles.portfolio} id="work">
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.label}>Selected Work</span>
          <h2 className={styles.title}>
            Projects that <br />
            <span className={styles.titleItalic}>define</span> excellence
          </h2>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`${styles.filterButton} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => setActiveCategory(category)}
              data-cursor="hover"
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div className={styles.projectsGrid} layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                className={styles.projectCard}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                data-cursor="hover"
              >
                {/* Image */}
                <div className={styles.imageWrapper}>
                  <motion.div
                    className={styles.imageOverlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                  />
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className={styles.projectImage}
                    animate={{
                      scale: hoveredProject === project.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  
                  {/* Hover Content */}
                  <motion.div
                    className={styles.hoverContent}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredProject === project.id ? 1 : 0,
                      y: hoveredProject === project.id ? 0 : 20,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <p className={styles.projectDescription}>{project.description}</p>
                    <span className={styles.viewProject}>
                      View Project <ArrowIcon />
                    </span>
                  </motion.div>
                </div>

                {/* Info */}
                <div className={styles.projectInfo}>
                  <div className={styles.projectMeta}>
                    <span className={styles.projectCategory}>{project.category}</span>
                    <span className={styles.projectYear}>{project.year}</span>
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <MagneticButton variant="outline" href="#contact">
            Start Your Project <ArrowIcon />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
