"use client";
import React from "react";
import { Link } from "@inertiajs/react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  href?: string;
}

export default function NavItem({ icon, label, active, href }: NavItemProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={`flex items-center gap-4 p-3 rounded-full hover:bg-gray-900 cursor-pointer ${
          active ? "font-bold" : ""
        }`}
      >
        {icon}
        <span>{label}</span>
      </Link>
    );
  }
  return (
    <div
      className={`flex items-center gap-4 p-3 rounded-full hover:bg-gray-900 cursor-pointer ${
        active ? "font-bold" : ""
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}
