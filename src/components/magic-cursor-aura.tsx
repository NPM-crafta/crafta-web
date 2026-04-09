"use client";

import { useEffect, useState } from "react";

export function MagicCursorAura() {
  const [pos, setPos] = useState({ x: -500, y: -500 });

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="cursor-aura"
      style={{
        transform: `translate(${pos.x - 140}px, ${pos.y - 140}px)`,
      }}
      aria-hidden="true"
    />
  );
}
