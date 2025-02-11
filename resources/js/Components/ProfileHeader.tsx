// src/components/profile/ProfileHeader.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/Button";
import { usePage } from "@inertiajs/react";
import axios from "axios";

interface Profile {
  username: string;
  name?: string;
  followers_count: number;
  followings_count: number;
  is_following: boolean;
}

interface ProfileHeaderProps {
  profile: Profile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const { auth } = usePage().props as { auth?: { user?: { username: string } } };
  const isOwnProfile = auth?.user?.username === profile.username;

  const [isFollowing, setIsFollowing] = useState(profile.is_following);

  const handleFollowToggle = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No se encontró token de autenticación");
        return;
      }

      if (isFollowing) {
        // DELETE para dejar de seguir
        await axios.delete(`http://localhost:8000/api/follow/${profile.username}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        setIsFollowing(false);
      } else {
        // POST para seguir
        await axios.post(
          `http://localhost:8000/api/follow/${profile.username}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("Error al realizar follow/unfollow:", error);
    }
  };

  return (
    <div className="px-6">
      <div className="relative -mt-20">
        <div className="h-40 w-40 rounded-full bg-rose-700 flex items-center justify-center text-5xl font-bold border-4 border-black">
          {profile.name
            ? profile.name[0].toUpperCase()
            : profile.username[0].toUpperCase()}
        </div>
      </div>
      <div className="flex justify-end pt-4">
        {isOwnProfile ? (
          <Button variant="default" className="rounded-full text-lg px-6">
            Edit Profile
          </Button>
        ) : (
          <Button
            variant={isFollowing ? "outline" : "default"}
            className="rounded-full text-lg px-6"
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold">{profile.name || profile.username}</h2>
        <p className="text-gray-500 text-lg">@{profile.username}</p>
        <div className="flex gap-6 mt-4 text-lg">
          <a
            href={`/profile/${profile.username}/followings`}
            className="hover:underline cursor-pointer"
          >
            <span className="font-bold">{profile.followings_count}</span>{" "}
            <span className="text-gray-500">Siguiendo</span>
          </a>
          <a
            href={`/profile/${profile.username}/followers`}
            className="hover:underline cursor-pointer"
          >
            <span className="font-bold">{profile.followers_count}</span>{" "}
            <span className="text-gray-500">Seguidores</span>
          </a>
        </div>
      </div>
    </div>
  );
}
