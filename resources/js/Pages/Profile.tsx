// src/pages/Profile.tsx
"use client";

import { useState, useEffect } from "react";
import { usePage } from "@inertiajs/react"; // Para obtener datos con Inertia.js
import { ArrowLeft } from "lucide-react";
import Layout from "@/Layouts/Layout";
import ProfileHeader from "@/components/ProfileHeader";
import PostComposer from "@/components/tweet/PostComposer";
import TweetList from "@/components/tweet/TweetList";
import axios from "axios";

export default function Profile() {
  // Obtenemos el username desde Inertia (enviado desde la ruta, por ejemplo)
  const { username } = usePage().props as { username?: string } || {};

  // Estado para el perfil, los tweets, el tweet a publicar y loading
  const [profile, setProfile] = useState<{
    username: string;
    name?: string;
    followers_count: number;
    followings_count: number;
    is_following: boolean;
  } | null>(null);
  const [tweets, setTweets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTweet, setNewTweet] = useState<string>("");

  // Consulta para obtener las estadísticas del perfil usando axios
  useEffect(() => {
    async function fetchProfileStats() {
      try {
        const response = await axios.get(`http://localhost:8000/api/follow/stats/${username}`);
        const data = response.data;
        setProfile({
          username: data.username,
          name: data.name || "",
          followers_count: data.followers_count,
          followings_count: data.followings_count,
          is_following: data.is_following,
        });
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      } finally {
        setLoading(false);
      }
    }
    if (username) {
      fetchProfileStats();
    }
  }, [username]);

  // Consulta para obtener los tweets del usuario usando axios
  useEffect(() => {
    async function fetchTweets() {
      try {
        const response = await axios.get(`http://localhost:8000/api/tweets/user/${username}`);
        // Asumimos que la respuesta tiene la propiedad "tweets" con el array de tweets
        setTweets(response.data.tweets);
      } catch (error) {
        console.error("Error al obtener tweets:", error);
      }
    }
    if (username) {
      fetchTweets();
    }
  }, [username]);

  // Función para enviar un nuevo tweet usando axios
  const handleTweetSubmit = async () => {
    if (!newTweet.trim()) return;
    try {
      await axios.post(`http://localhost:8000/api/tweets`, { content: newTweet });
      setNewTweet("");
      // Luego de publicar, volvemos a consultar la lista de tweets para actualizarla
      const response = await axios.get(`http://localhost:8000/api/tweets/user/${username}`);
      setTweets(response.data.tweets);
    } catch (error) {
      console.error("Error al publicar tweet:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-white mt-10">Cargando perfil...</p>;
  }

  if (!profile) {
    return <p className="text-center text-red-500 mt-10">Error al cargar el perfil</p>;
  }

  return (
    <Layout>
      {/* Cabecera personalizada para el perfil */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm p-5 flex items-center gap-6 border-b border-gray-800">
        <button className="rounded-full p-3 hover:bg-gray-900">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <div>
          <h1 className="font-bold text-2xl">{profile.name || profile.username}</h1>
          <p className="text-md text-gray-500">{profile.followers_count} seguidores</p>
        </div>
      </header>

      {/* Información del perfil (avatar, follow/unfollow, estadísticas, etc.) */}
      <ProfileHeader profile={profile} />

      {/* Compositor de tweet */}
      <PostComposer
        newTweet={newTweet}
        setNewTweet={setNewTweet}
        onTweetSubmit={handleTweetSubmit}
      />

      {/* Lista de tweets del perfil */}
      <TweetList tweets={tweets} />
    </Layout>
  );
}
