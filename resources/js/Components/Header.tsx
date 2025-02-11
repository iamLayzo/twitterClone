// src/components/Header.tsx
"use client";
import React from "react";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  activeTab: "followers" | "following";
  onBack?: () => void;
}

export default function Header({ activeTab, onBack }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm p-5 flex items-center gap-6 border-b border-gray-800">
      {onBack && (
        <button className="rounded-full p-3 hover:bg-gray-900" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </button>
      )}
      <div>
        <h1 className="font-bold text-2xl">
          {activeTab === "followers" ? "Followers" : "Following"}
        </h1>
      </div>
    </header>
  );
}
