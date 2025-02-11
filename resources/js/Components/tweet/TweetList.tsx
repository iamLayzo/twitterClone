// src/components/tweet/TweetList.tsx
"use client";
import React from "react";
import Tweet from "./Tweet";

interface TweetType {
  id: number;
  user: {
    username: string;
    name: string;
  };
  content: string;
  created_at: string;
}

interface TweetListProps {
  tweets: TweetType[];
}

export default function TweetList({ tweets }: TweetListProps) {
  if (!tweets || tweets.length === 0) {
    return <p className="text-gray-500 p-4">No tweets available</p>;
  }

  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </div>
  );
}
