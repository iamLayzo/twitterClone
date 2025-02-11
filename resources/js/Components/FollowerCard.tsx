// src/components/follower/FollowerCard.tsx
"use client";
import React from "react";
import { Button } from "../Button";

interface Follower {
  id: number;
  avatar: string;
  name: string;
  username: string;
  description: string;
}

interface FollowerCardProps {
  follower: Follower;
}

export default function FollowerCard({ follower }: FollowerCardProps) {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-800">
      <img src={follower.avatar} alt={follower.name} className="w-12 h-12 rounded-full" />
      <div className="flex-1">
        <p className="font-bold">{follower.name}</p>
        <p className="text-gray-500">{follower.username}</p>
        <p className="text-gray-400 text-sm">{follower.description}</p>
      </div>
      <Button className="bg-gray-700 hover:bg-gray-600">Following</Button>
    </div>
  );
}
