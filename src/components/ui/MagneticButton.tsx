'use client';

import { motion } from 'framer-motion';
import { ReactNode, useRef, useState } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost' | 'underline';
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
  href,
  variant = 'primary',
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    setPosition({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const getVariantStyles = () => {
    const base = `
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      font-family: var(--font-sans);
      font-size: var(--text-sm);
      font-weight: 500;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      transition: all 0.3s var(--ease-out-expo);
      position: relative;
      overflow: hidden;
    `;

    switch (variant) {
      case 'primary':
        return {
          base,
          specific: `
            padding: 1rem 2rem;
            background: var(--color-white);
            color: var(--color-black);
            border: none;
          `,
          hover: {
            backgroundColor: 'var(--color-gray-200)',
          },
        };
      case 'outline':
        return {
          base,
          specific: `
            padding: 1rem 2rem;
            background: transparent;
            color: var(--color-white);
            border: 1px solid var(--color-white);
          `,
          hover: {
            backgroundColor: 'var(--color-white)',
            color: 'var(--color-black)',
          },
        };
      case 'ghost':
        return {
          base,
          specific: `
            padding: 0.5rem 1rem;
            background: transparent;
            color: var(--color-white);
            border: none;
          `,
          hover: {
            opacity: 0.7,
          },
        };
      case 'underline':
        return {
          base,
          specific: `
            padding: 0.5rem 0;
            background: transparent;
            color: var(--color-white);
            border: none;
            border-bottom: 1px solid var(--color-white);
          `,
          hover: {
            opacity: 0.7,
          },
        };
      default:
        return { base, specific: '', hover: {} };
    }
  };

  const styles = getVariantStyles();
  const Tag = href ? motion.a : motion.button;

  return (
    <Tag
      ref={buttonRef}
      href={href}
      onClick={onClick}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
      whileHover={styles.hover}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-sm)',
        fontWeight: 500,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'none',
        padding: variant === 'ghost' || variant === 'underline' ? '0.5rem 0' : '1rem 2rem',
        background: variant === 'primary' ? 'var(--color-white)' : 'transparent',
        color: variant === 'primary' ? 'var(--color-black)' : 'var(--color-white)',
        border: variant === 'outline' ? '1px solid var(--color-white)' : 'none',
        borderBottom: variant === 'underline' ? '1px solid var(--color-white)' : undefined,
      }}
      data-cursor="hover"
    >
      {children}
    </Tag>
  );
}

// Simple animated arrow for buttons
export function ArrowIcon() {
  return (
    <motion.svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ x: 0 }}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <path
        d="M1 8H15M15 8L8 1M15 8L8 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}
