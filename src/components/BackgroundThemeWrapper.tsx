"use client";

import { useTheme } from "next-themes";
import LightRays from "./LightRays";
import RippleGrid from "./RippleGrid";

export default function BackgroundThemeWrapper() {
  const { theme } = useTheme();
  
  if (theme === "light") {
    return (
      <div style={{position: 'fixed', inset: 0, zIndex: -1, width: '100vw', height: '100vh', pointerEvents: 'none' }}>
        <RippleGrid
          enableRainbow={true}
          gridColor="#d1d5db"
          rippleIntensity={0.03}
          gridSize={60}
          gridThickness={1}
          mouseInteraction={false}
          mouseInteractionRadius={1.2}
          opacity={0.4}
        />
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, width: '100vw', height: '100vh', pointerEvents: 'none' }}>
      <LightRays 
        raysOrigin="top-center"
        raysColor="#00ffff"
        raysSpeed={0.2}
        lightSpread={0.8}
        rayLength={2.5}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        saturation={2.4}
        className="custom-rays"
      />
    </div>
  );
} 