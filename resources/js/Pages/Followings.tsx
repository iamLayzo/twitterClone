// src/pages/Followings.tsx
"use client";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { usePage } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import ProfileFollowTabs from "@/components/ProfileFollowTabs";
import FollowerItem from "@/components/FollowerItem";
import { useUser } from "@/contexts/UserContext";

export default function FollowingsPage() {
    const { username, setUsername } = useUser();
    const pageProps = usePage().props as { username?: string } || {};
    if (!username && pageProps.username) {
        setUsername(pageProps.username);
    }
    const [loading, setLoading] = useState(true);
    const [followings, setFollowings] = useState<any[]>([]);
    const [followingsCount, setFollowingsCount] = useState(0);

    useEffect(() => {
        async function fetchFollowings() {
            try {
                const res = await fetch(`http://localhost:8000/api/follow/followings/${username}`);
                if (!res.ok) throw new Error("Error al obtener followings");
                const data = await res.json();
                setFollowings(data.followings);
                setFollowingsCount(data.followings_count);
            } catch (error) {
                console.error("Error al obtener followings:", error);
            } finally {
                setLoading(false);
            }
        }
        if (username) fetchFollowings();
    }, [username]);

    if (loading) {
        return <p className="text-center text-white mt-10">Cargando...</p>;
    }

    return (
        <Layout>
            {/* Header */}
            <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-sm p-5 flex items-center gap-6 border-b border-gray-800">
                <button
                    className="rounded-full p-3 hover:bg-gray-900"
                    onClick={() => window.history.back()}
                >
                    <ArrowLeft className="h-6 w-6" />
                </button>
                <div>
                    <h1 className="font-bold text-2xl">{username}</h1>
                    <p className="text-md text-gray-500">{followingsCount} seguidos</p>
                </div>
            </header>

            {/* Navegación entre tabs */}
            <ProfileFollowTabs username={username as string} activeTab="followings" />

            {/* Lista de Followings */}
            <div className="divide-y divide-gray-800">
                {followings.map((following) => (
                    <FollowerItem key={following.id} {...following} />
                ))}
            </div>
        </Layout>
    );
}
