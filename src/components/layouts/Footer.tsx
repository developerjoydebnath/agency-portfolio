'use client';

import { motion } from 'framer-motion';
import styles from './Footer.module.css';

const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#about', label: 'About' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

const socialLinks = [
  { href: '#', label: 'Twitter' },
  { href: '#', label: 'LinkedIn' },
  { href: '#', label: 'Instagram' },
  { href: '#', label: 'Dribbble' },
];

export function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Content */}
        <div className={styles.content}>
          {/* Logo & Description */}
          <div className={styles.brand}>
            <a href="#" className={styles.logo} data-cursor="hover">
              <span className={styles.logoText}>STACK</span>
              <span className={styles.logoAccent}>ROVER</span>
            </a>
            <p className={styles.description}>
              Crafting digital experiences that inspire and transform brands.
            </p>
          </div>

          {/* Navigation */}
          <nav className={styles.nav}>
            <h4 className={styles.navTitle}>Navigation</h4>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={styles.navLink}
                    onClick={(e) => handleNavClick(e, link.href)}
                    data-cursor="hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <div className={styles.social}>
            <h4 className={styles.navTitle}>Connect</h4>
            <ul className={styles.navList}>
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={styles.navLink} data-cursor="hover">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <motion.div
          className={styles.divider}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Bottom */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} StackRover. All rights reserved.
          </p>

          <button
            className={styles.backToTop}
            onClick={scrollToTop}
            aria-label="Back to top"
            data-cursor="hover"
          >
            <span>Back to Top</span>
            <motion.svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              initial={{ y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <path
                d="M8 14V2M8 2L2 8M8 2L14 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
