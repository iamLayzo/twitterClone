<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TweetController extends Controller
{
    /**
     * Obtener tweets del usuario autenticado, de los seguidos y de los seguidores.
     * GET /api/tweets
     */
    public function index()
    {
        $user = Auth::user();

        // Obtener los IDs de los usuarios que el usuario autenticado sigue
        $seguidosIds = $user->followings()->pluck('followed_id');

        // Obtener los IDs de los usuarios que siguen al usuario autenticado
        $seguidoresIds = $user->followers()->pluck('follower_id');

        // Tweets del usuario autenticado
        $myTweets = Tweet::where('user_id', $user->id)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        // Tweets de los usuarios que sigue
        $followingTweets  = Tweet::whereIn('user_id', $seguidosIds)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        // Tweets de los usuarios que lo siguen
        $followersTweets  = Tweet::whereIn('user_id', $seguidoresIds)
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'user' => $user,
            'myTweets' => $myTweets,
            'followingTweets' => $followingTweets ,
            'followersTweets' => $followersTweets ,
        ]);
    }

    /**
     * Crear un tweet
     * POST /api/tweets
     */
    public function store(Request $request)
    {
        // Validar datos
        $request->validate([
            'content' => 'required|string|max:280', // límite 280 caracteres
        ]);

        // Crear tweet con user_id del usuario autenticado
        $tweet = Tweet::create([
            'user_id' => Auth::id(),
            'content' => $request->input('content'),
        ]);

        return response()->json([
            'message' => 'Tweet creado exitosamente',
            'tweet'   => $tweet
        ], 201);
    }

    /**
     * Obtener los tweets de un usuario específico
     * GET /api/u/{username}
     */
    public function userTweets($username)
    {
        // Buscar el usuario por username
        $user = User::where('username', $username)->firstOrFail();

        // Obtener sus tweets
        $tweets = $user->tweets()
            ->with('user')
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'profileUser' => $user,
            'tweets'      => $tweets,
        ]);
    }
}
