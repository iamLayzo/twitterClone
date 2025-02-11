// src/components/TabNavigation.tsx
"use client";
import React from "react";

interface TabNavigationProps {
  activeTab: "followers" | "following";
  setActiveTab: (tab: "followers" | "following") => void;
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <div className="flex border-b border-gray-800">
      <button
        className={`flex-1 px-4 py-4 hover:bg-gray-900 ${activeTab === "followers" ? "border-b-4 border-blue-500" : ""}`}
        onClick={() => setActiveTab("followers")}
      >
        Followers
      </button>
      <button
        className={`flex-1 px-4 py-4 hover:bg-gray-900 ${activeTab === "following" ? "border-b-4 border-blue-500" : ""}`}
        onClick={() => setActiveTab("following")}
      >
        Following
      </button>
    </div>
  );
}
