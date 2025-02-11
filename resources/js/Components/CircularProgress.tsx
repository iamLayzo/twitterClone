import React from "react";

interface CircularProgressProps {
  progress: number; // Porcentaje de caracteres usados (0-100)
}

export default function CircularProgress({ progress }: CircularProgressProps) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg className="w-10 h-10" viewBox="25 25 50 50">
      {/* Fondo gris del círculo */}
      <circle
        r={radius}
        cx="50"
        cy="50"
        fill="none"
        stroke="hsl(214, 10%, 30%)"
        strokeWidth="3"
      />
      {/* Progreso dinámico */}
      <circle
        r={radius}
        cx="50"
        cy="50"
        fill="none"
        stroke={progress >= 100 ? "hsl(0, 100%, 50%)" : "hsl(214, 97%, 59%)"} // Rojo si se excede el límite
        strokeWidth="3"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        className="transition-all duration-300"
      />
    </svg>
  );
}
