"use client";
import React, { useState } from "react";
import {
  Home,
  Search,
  Bell,
  Mail,
  Bookmark,
  Users,
  User,
  Settings,
  MoreHorizontal,
} from "lucide-react";
import NavItem from "./NavItem";
import { Button } from "./Button";
import { usePage } from "@inertiajs/react";
import { Avatar } from "@/components/Avatar";
import axios from "axios";

export default function LeftSidebar() {
  const { auth } = usePage().props as {
    auth?: { user?: { username: string; name?: string; avatar?: string } };
  };
  const userProfileUrl = auth?.user?.username
    ? `/profile/${auth.user.username}`
    : "/profile";

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No se encontró token de autenticación");
        return;
      }
      await axios.post(
        "http://localhost:8000/api/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error al hacer logout:", error);
    }
  };

  return (
    <div className="w-64 p-4 border-r border-gray-800 flex flex-col h-screen">
      {/* Menú principal - Se expande hasta llenar el espacio */}
      <div className="space-y-4 flex-grow">
        <NavItem icon={<Home />} label="Home" href="/home" active />
        <NavItem icon={<Search />} label="Explore" />
        <NavItem icon={<Bell />} label="Notifications" />
        <NavItem icon={<Mail />} label="Messages" />
        <NavItem icon={<Bookmark />} label="Bookmarks" />
        <NavItem icon={<Users />} label="Communities" />
        <NavItem icon={<User />} label="Profile" href={userProfileUrl} />
        <NavItem icon={<Settings />} label="More" />
        <Button className="w-full bg-blue-500 hover:bg-blue-600">Post</Button>
      </div>

      {/* Footer fijo abajo */}
      <div className="mt-auto border-t border-gray-800 pt-4">
        <div className="flex items-center gap-3">
          <Avatar
            src={auth?.user?.avatar}
            name={auth?.user?.name}
            username={auth?.user?.username || ""}
            size={40}
          />
          <div className="flex-1">
            <p className="font-bold">{auth?.user?.name || auth?.user?.username}</p>
            <p className="text-sm text-gray-500">@{auth?.user?.username}</p>
          </div>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-1 rounded hover:bg-gray-700"
          >
            <MoreHorizontal className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        {dropdownOpen && (
          <div className="mt-2">
            <Button onClick={handleLogout} variant="outline" className="w-full">
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
