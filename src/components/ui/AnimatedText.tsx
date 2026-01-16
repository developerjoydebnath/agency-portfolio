'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  animation?: 'chars' | 'words' | 'lines' | 'fade';
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const charVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: 45,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const lineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function AnimatedText({
  children,
  className = '',
  as = 'p',
  animation = 'chars',
  delay = 0,
  staggerDelay,
  once = true,
}: AnimatedTextProps) {
  const Tag = motion[as] as typeof motion.p;

  const getVariants = () => {
    const variants = { ...containerVariants };
    if (staggerDelay) {
      variants.visible = {
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: delay,
        },
      };
    } else {
      variants.visible = {
        transition: {
          staggerChildren: animation === 'chars' ? 0.02 : animation === 'words' ? 0.08 : 0.15,
          delayChildren: delay,
        },
      };
    }
    return variants;
  };

  const renderContent = (): ReactNode => {
    switch (animation) {
      case 'chars':
        return children.split('').map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={charVariants}
            style={{
              display: 'inline-block',
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char}
          </motion.span>
        ));

      case 'words':
        return children.split(' ').map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={wordVariants}
            style={{
              display: 'inline-block',
              marginRight: '0.25em',
            }}
          >
            {word}
          </motion.span>
        ));

      case 'lines':
        return children.split('\n').map((line, index) => (
          <motion.span
            key={`${line}-${index}`}
            variants={lineVariants}
            style={{ display: 'block' }}
          >
            {line}
          </motion.span>
        ));

      case 'fade':
      default:
        return (
          <motion.span variants={fadeVariants}>{children}</motion.span>
        );
    }
  };

  return (
    <Tag
      className={className}
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      style={{ overflow: 'hidden' }}
    >
      {renderContent()}
    </Tag>
  );
}

// Split text component for more complex animations
interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
}

export function SplitText({ children, className = '', delay = 0 }: SplitTextProps) {
  const words = children.split(' ');

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: delay,
          },
        },
      }}
      style={{ overflow: 'hidden' }}
    >
      {words.map((word, index) => (
        <span key={index} style={{ display: 'inline-block', overflow: 'hidden' }}>
          <motion.span
            style={{ display: 'inline-block' }}
            variants={{
              hidden: { y: '100%', opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                },
              },
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </motion.div>
  );
}
