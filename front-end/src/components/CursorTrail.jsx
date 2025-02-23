import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";

// Configuration Constants
const TRAIL_LENGTH = 20;
const GLOW_INTENSITY = 0.7;
const THROTTLE_DELAY = 10; // Throttle delay in ms to reduce excessive updates

const CursorTrail = () => {
  const [trail, setTrail] = useState([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastMoveTime = useRef(0);

  // Throttle the mousemove events to prevent high-frequency updates
  const handleMouseMove = useCallback((e) => {
    const currentTime = Date.now();
    if (currentTime - lastMoveTime.current >= THROTTLE_DELAY) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = currentTime;
    }
  }, []);

  // Update trail points at a reasonable interval
  useEffect(() => {
    const updateTrail = () => {
      setTrail((prevTrail) => {
        const newPoint = { x: mouseRef.current.x, y: mouseRef.current.y };
        return [...prevTrail, newPoint].slice(-TRAIL_LENGTH); // Keep only the latest trail points
      });
      requestAnimationFrame(updateTrail); // Ensures smooth animation
    };

    window.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(updateTrail); // Start the animation loop

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  // Memoize the trail path for better performance
  const trailPath = useMemo(() => {
    return trail.map((p) => `${p.x},${p.y}`).join(" ");
  }, [trail]);

  return (
    <svg className="fixed top-0 left-0 w-screen h-screen pointer-events-none">
      {/* Static Definitions: Gradient and Glow Filter */}
      <defs>
        <linearGradient id="trail-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(0, 102, 255, 1)" /> {/* Deep Blue */}
          <stop offset="60%" stopColor="rgba(0, 204, 255, 0.8)" /> {/* Bright Blue */}
          <stop offset="100%" stopColor="rgba(0, 255, 255, 0)" /> {/* Fading Cyan */}
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Polyline for the trail */}
      <polyline
        points={trailPath} // Memoized path for performance
        fill="none"
        stroke="url(#trail-gradient)"
        strokeWidth="10" // Slightly thicker for better visibility
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={GLOW_INTENSITY} // Glowing effect
        filter="url(#glow)" // Apply glow effect
      />
    </svg>
  );
};

export default CursorTrail;
