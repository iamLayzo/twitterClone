"use client";
import React, { useEffect, useRef } from "react";
import LeftSidebar from "../Components/LeftSidebar";
import RightSidebar from "../Components/RightSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Oculta el scroll global
    document.body.style.overflow = "hidden";

    return () => {
      // Restaura el scroll cuando el componente se desmonta
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="h-screen bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-[auto,1fr,auto] max-w-7xl mx-auto h-full">
        <LeftSidebar />
        {/* Contenido principal con scroll interno pero sin barra visible */}
        <main
          ref={mainRef}
          className="border-r border-gray-800 h-full overflow-y-auto"
          style={{
            scrollbarWidth: "none", // Oculta en Firefox
            msOverflowStyle: "none", // Oculta en IE/Edge
          }}
          onScroll={(e) => {
            const target = e.target as HTMLDivElement;
            target.style.overflowY = "scroll";
          }}
        >
          {children}
        </main>
        <RightSidebar />
      </div>
    </div>
  );
}
