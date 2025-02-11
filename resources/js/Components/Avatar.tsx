// src/components/Avatar.tsx
"use client";

import React from "react";

interface AvatarProps {
  src?: string;
  name?: string;
  username: string;
  size?: number;
  className?: string;
}

const getColorIndex = (username: string, colorsLength: number) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % colorsLength;
};

const COLORS = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
];

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  username,
  size = 48,
  className = "",
}) => {
  const dimension = `${size}px`;
  if (src) {
    return (
      <img
        src={src}
        alt={`${name || username} avatar`}
        className={`rounded-full object-cover ${className}`}
        style={{ width: dimension, height: dimension }}
      />
    );
  }

  const colorIndex = getColorIndex(username, COLORS.length);
  const bgColorClass = COLORS[colorIndex];

  const initial = name ? name.charAt(0).toUpperCase() : username.charAt(0).toUpperCase();

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-bold ${bgColorClass} ${className}`}
      style={{ width: dimension, height: dimension }}
    >
      {initial}
    </div>
  );
};
