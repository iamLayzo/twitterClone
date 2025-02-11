"use client";
import React from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import CircularProgress from "@/components/CircularProgress";
import { Avatar } from "@/components/Avatar";
import { usePage } from "@inertiajs/react";

const MAX_TWEET_LENGTH = 280;

interface PostComposerProps {
  newTweet: string;
  setNewTweet: (value: string) => void;
  onTweetSubmit: () => void;
}

export default function PostComposer({ newTweet, setNewTweet, onTweetSubmit }: PostComposerProps) {
  const progress = Math.min((newTweet.length / MAX_TWEET_LENGTH) * 100, 100);
  const isLimitExceeded = newTweet.length > MAX_TWEET_LENGTH;

  // Obtenemos la información del usuario autenticado
  const { auth } = usePage().props as { auth?: { user?: { avatar?: string; name?: string; username: string } } };

  return (
    <div className="border-b border-gray-800 p-4">
      <div className="flex items-center gap-4">
        {/* Avatar del usuario autenticado */}
        <Avatar
          src={auth?.user?.avatar}
          name={auth?.user?.name}
          username={auth?.user?.username || ""}
          size={40} // equivalente a w-10 h-10
        />
        {/* Input de texto */}
        <div className="relative flex-1">
          <Input
            value={newTweet}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewTweet(e.target.value)}
            placeholder="¿Qué está pasando?"
            className="bg-transparent text-lg placeholder:text-gray-500"
          />
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 px-4">
        {/* Indicador de progreso */}
        <CircularProgress progress={progress} />
        {/* Contador de caracteres */}
        <span className={`text-sm ${isLimitExceeded ? "text-red-500" : "text-gray-500"}`}>
          {newTweet.length}/{MAX_TWEET_LENGTH}
        </span>
        {/* Botón de envío */}
        <Button
          onClick={onTweetSubmit}
          className={`rounded-full transition-all duration-300 ${
            isLimitExceeded ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isLimitExceeded}
        >
          Post
        </Button>
      </div>
    </div>
  );
}
