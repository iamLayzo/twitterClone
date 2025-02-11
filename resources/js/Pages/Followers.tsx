// src/pages/Followers.tsx
"use client";
import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { ArrowLeft } from "lucide-react";
import Layout from "@/Layouts/Layout";
import ProfileFollowTabs from "@/components/ProfileFollowTabs";
import FollowerItem from "@/components/FollowerItem";
import { useUser } from "@/contexts/UserContext";

export default function FollowersPage() {
  const { username, setUsername } = useUser();
  const pageProps = usePage().props as { username?: string } || {};

  if (!username && pageProps.username) {
    setUsername(pageProps.username);
  }

  const [loading, setLoading] = useState(true);
  const [followers, setFollowers] = useState<any[]>([]);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    async function fetchFollowers() {
      try {
        const res = await fetch(`http://localhost:8000/api/follow/followers/${username}`);
        if (!res.ok) throw new Error("Error al obtener followers");
        const data = await res.json();
        setFollowers(data.followers);
        setFollowersCount(data.followers_count);
      } catch (error) {
        console.error("Error al obtener followers:", error);
      } finally {
        setLoading(false);
      }
    }
    if (username) fetchFollowers();
  }, [username]);

  if (loading) {
    return <p className="text-center text-white mt-10">Cargando...</p>;
  }

  return (
    <Layout>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm p-5 flex items-center gap-6 border-b border-gray-800">
        <button className="rounded-full p-3 hover:bg-gray-900" onClick={() => window.history.back()}>
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="font-bold text-2xl">{username}</h1>
          <p className="text-md text-gray-500">{followersCount} seguidores</p>
        </div>
      </header>

      {/* Navegación entre tabs */}
      <ProfileFollowTabs username={username as string} activeTab="followers" />

      {/* Lista de Followers */}
      <div className="divide-y divide-gray-800">
        {followers.map((follower) => (
          <FollowerItem key={follower.id} {...follower} />
        ))}
      </div>
    </Layout>
  );
}
