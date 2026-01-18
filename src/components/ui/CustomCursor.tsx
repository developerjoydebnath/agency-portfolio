"use client";

import { useMousePosition } from "@/hooks/useMousePosition";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface CustomCursorProps {
  color?: string;
}

export function CustomCursor({ color = "#ffffff" }: CustomCursorProps) {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth cursor movement with spring physics
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorSize = useSpring(12, { stiffness: 400, damping: 30 });

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const trailXSpring = useSpring(cursorX, { damping: 50, stiffness: 200 });
  const trailYSpring = useSpring(cursorY, { damping: 50, stiffness: 200 });

  useEffect(() => {
    // Detect touch device
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  useEffect(() => {
    cursorX.set(x - cursorSize.get() / 2);
    cursorY.set(y - cursorSize.get() / 2);
  }, [x, y, cursorX, cursorY, cursorSize]);

  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover"
      ) {
        setIsHovering(true);
        cursorSize.set(48);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.dataset.cursor === "hover"
      ) {
        setIsHovering(false);
        cursorSize.set(12);
      }
    };

    const handleMouseOut = () => {
      setIsHidden(true);
    };

    const handleMouseOver = () => {
      setIsHidden(false);
    };

    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);
    document.documentElement.addEventListener("mouseleave", handleMouseOut);
    document.documentElement.addEventListener("mouseenter", handleMouseOver);

    return () => {
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      document.documentElement.removeEventListener(
        "mouseleave",
        handleMouseOut,
      );
      document.documentElement.removeEventListener(
        "mouseenter",
        handleMouseOver,
      );
    };
  }, [cursorSize]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="cursor-main"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: cursorXSpring,
          y: cursorYSpring,
          width: cursorSize,
          height: cursorSize,
          borderRadius: "50%",
          backgroundColor: isHovering ? "transparent" : color,
          border: isHovering ? `1px solid ${color}` : "none",
          pointerEvents: "none",
          zIndex: "var(--z-cursor)",
          mixBlendMode: isHovering ? "difference" : "normal",
          opacity: isHidden ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      />

      {/* Trailing cursor (larger, more subtle) */}
      <motion.div
        className="cursor-trail"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          x: trailXSpring,
          y: trailYSpring,
          width: isHovering ? 64 : 40,
          height: isHovering ? 64 : 40,
          borderRadius: "50%",
          border: `1px solid ${color}`,
          opacity: isHidden ? 0 : 0.3,
          pointerEvents: "none",
          zIndex: 999,
          transition: "width 0.3s ease, height 0.3s ease, opacity 0.2s ease",
        }}
      />
    </>
  );
}
