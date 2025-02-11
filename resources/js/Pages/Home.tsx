// src/pages/HomePage.tsx
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Layout from "@/Layouts/Layout";
import TabNavigation from "@/components/TabNavigation";
import PostComposer from "@/components/tweet/PostComposer";
import TweetList from "@/components/tweet/TweetList";

interface Tweet {
  id: number;
  user: {
    username: string;
    name: string;
  };
  content: string;
  created_at: string;
}

export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [activeTab, setActiveTab] = useState<"followers" | "following">("following");
  const [newTweet, setNewTweet] = useState<string>("");

  useEffect(() => {
    loadTweets();
  }, [activeTab]);

  const loadTweets = async () => {
    try {
      const response = await axios.get(`/api/tweets`);
      const data = response.data;
      const tweetList =
        activeTab === "following"
          ? data["followingTweets"] || []
          : data["followersTweets"] || [];
      setTweets(tweetList);
    } catch (error) {
      console.error("Error fetching tweets", error);
      setTweets([]);
    }
  };

  const handleTweetSubmit = async () => {
    if (!newTweet.trim()) return;

    try {
      await axios.post("/api/tweets", { content: newTweet });
      setNewTweet("");
      loadTweets();
    } catch (error) {
      console.error("Error posting tweet", error);
    }
  };

  return (
    <Layout>
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <PostComposer newTweet={newTweet} setNewTweet={setNewTweet} onTweetSubmit={handleTweetSubmit} />
      <TweetList tweets={tweets} />
    </Layout>
  );
}
