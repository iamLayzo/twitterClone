"use client";
import React, { useState } from "react";
import { Button } from "@/components/Button";
import axios from "axios";
import { Avatar } from "@/components/Avatar";

interface FollowerItemProps {
  id: number;
  name: string;
  username: string; 
  verified?: boolean;
  avatar: string;
  description: string;
  is_following: boolean;
}

export default function FollowerItem({
  name,
  username,
  verified,
  avatar,
  description,
  is_following: initialIsFollowing,
}: FollowerItemProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  
  const token = localStorage.getItem("token");

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.delete(`http://localhost:8000/api/follow/${username}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(
          `http://localhost:8000/api/follow/${username}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error al realizar follow/unfollow:", error);
    }
  };

  return (
    <div className="flex items-start gap-3 p-4 hover:bg-gray-900/50">
      <Avatar
        src={avatar}
        name={name}
        username={username}
        size={48} // Tamaño equivalente a w-12 h-12
      />
      <div className="flex-1 min-w-0">
        {/* Usamos flex-col para que el nombre y el username se muestren en dos líneas */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="font-bold truncate hover:underline cursor-pointer">
              {name}
            </span>
            {verified && (
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                <g>
                  <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34z"></path>
                </g>
              </svg>
            )}
          </div>
          <span className="text-gray-500 text-sm truncate">@{username}</span>
        </div>
        <p className="text-sm text-gray-300 break-words mt-1">{description}</p>
      </div>
      <Button variant="outline" onClick={handleFollowToggle} className="rounded-full">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
}
