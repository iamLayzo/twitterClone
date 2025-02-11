"use client";
import React from "react";
import { Link } from "@inertiajs/react";
import { Avatar } from "@/components/Avatar";

interface TweetType {
  id: number;
  user: {
    username: string;
    name: string;
    avatar?: string; // Opcional: URL del avatar
  };
  content: string;
  created_at: string;
}

interface TweetProps {
  tweet: TweetType;
}

export default function Tweet({ tweet }: TweetProps) {
  return (
    <div className="border-b border-gray-800 p-4">
      <div className="flex items-start gap-3">
        {/* Avatar clickable: se usa el componente Avatar con tamaño 40px */}
        <Link href={`/profile/${tweet.user.username}`}>
          <Avatar
            src={tweet.user.avatar}
            name={tweet.user.name}
            username={tweet.user.username}
            size={40}
          />
        </Link>

        <div className="flex-1">
          {/* Información del usuario en columna */}
          <div className="flex flex-col">
            <Link
              href={`/profile/${tweet.user.username}`}
              className="font-bold text-lg hover:underline"
            >
              {tweet.user.name}
            </Link>
            <span className="text-gray-500 text-sm">
              @{tweet.user.username}
            </span>
          </div>

          <p className="mt-2">{tweet.content}</p>
          <p className="text-sm text-gray-500">
            {new Date(tweet.created_at).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
