"use client";
import React from "react";

interface ProfileFollowTabsProps {
  username: string;
  activeTab: "followers" | "followings";
}

export default function ProfileFollowTabs({ username, activeTab }: ProfileFollowTabsProps) {
  return (
    <div className="flex border-b border-gray-800">
      <a
        href={`/profile/${username}/followers`}
        className={`flex-1 px-4 py-4 hover:bg-gray-900 transition-colors ${
          activeTab === "followers" ? "border-b-4 border-blue-500 text-white" : "text-gray-500"
        }`}
      >
        Followers
      </a>
      <a
        href={`/profile/${username}/followings`}
        className={`flex-1 px-4 py-4 hover:bg-gray-900 transition-colors ${
          activeTab === "followings" ? "border-b-4 border-blue-500 text-white" : "text-gray-500"
        }`}
      >
        Following
      </a>
    </div>
  );
}
