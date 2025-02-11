// src/components/RightSidebar.tsx
"use client";
import React from "react";
import { Button } from "./Button";

export default function RightSidebar() {
  return (
    <div className="w-80 p-4 space-y-4">
      <div className="bg-gray-900 rounded-xl p-4">
        <h2 className="text-xl font-bold mb-4">Subscribe to Premium</h2>
        <p className="text-gray-400 mb-4">
          Subscribe to unlock new features and, if eligible, receive a share of revenue.
        </p>
        <Button className="bg-blue-500 hover:bg-blue-600">Subscribe</Button>
      </div>
    </div>
  );
}
