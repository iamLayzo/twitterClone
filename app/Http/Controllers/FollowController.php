<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class FollowController extends Controller
{
    // 🔹 1) Seguir a un usuario
    public function follow($username)
    {
        try {
            $userToFollow = User::where('username', $username)->firstOrFail();

            if ($userToFollow->id == Auth::id()) {
                return response()->json(['message' => 'No puedes seguirte a ti mismo'], 400);
            }

            Auth::user()->followings()->syncWithoutDetaching([$userToFollow->id]);

            return response()->json(['message' => 'Has seguido a ' . $username]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error en el servidor', 'error' => $e->getMessage()], 500);
        }
    }

    // 🔹 2) Dejar de seguir a un usuario
    public function unfollow($username)
    {
        try {
            $userToUnfollow = User::where('username', $username)->firstOrFail();
            Auth::user()->followings()->detach($userToUnfollow->id);

            return response()->json(['message' => 'Has dejado de seguir a ' . $username]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error en el servidor', 'error' => $e->getMessage()], 500);
        }
    }

    // 🔹 3) Listar los SEGUIDORES de un usuario (quiénes lo siguen)
    public function listFollowers($username)
    {
        try {
            $user = User::where('username', $username)->firstOrFail();
    
            $followers = $user->followers()
                              ->orderBy('users.name', 'asc')
                              ->get(['users.id', 'users.name', 'users.username']);
    
            // Obtenemos el usuario autenticado
            $authUser = Auth::user();
    
            if ($authUser) {
                // Obtenemos un array con los IDs de los usuarios a los que sigue el usuario autenticado
                $authFollowingsIds = $authUser->followings()->pluck('followed_id')->toArray();
    
                // Agregamos a cada seguidor la propiedad "is_following"
                $followers->transform(function ($follower) use ($authFollowingsIds) {
                    $follower->is_following = in_array($follower->id, $authFollowingsIds);
                    return $follower;
                });
            } else {
                // Si no hay usuario autenticado, marcamos "is_following" como false
                $followers->transform(function ($follower) {
                    $follower->is_following = false;
                    return $follower;
                });
            }
    
            return response()->json([
                'username' => $user->username,
                'followers_count' => $followers->count(),
                'followers' => $followers,
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error en el servidor', 'error' => $e->getMessage()], 500);
        }
    }
    

    // 🔹 4) Listar a quién sigue un usuario (sus "seguidos")
    public function listFollowings($username)
{
    try {
        $user = User::where('username', $username)->firstOrFail();

        $followings = $user->followings()
                           ->orderBy('users.name', 'asc')
                           ->get(['users.id', 'users.name', 'users.username']);

        // Obtenemos el usuario autenticado
        $authUser = Auth::user();

        if ($authUser) {
            // Obtenemos un array con los IDs de los usuarios a los que sigue el usuario autenticado
            $authFollowingsIds = $authUser->followings()->pluck('followed_id')->toArray();

            // Agregamos a cada "seguido" la propiedad "is_following"
            $followings->transform(function ($followed) use ($authFollowingsIds) {
                $followed->is_following = in_array($followed->id, $authFollowingsIds);
                return $followed;
            });
        } else {
            // Si no hay usuario autenticado, marcamos "is_following" como false
            $followings->transform(function ($followed) {
                $followed->is_following = false;
                return $followed;
            });
        }

        return response()->json([
            'username' => $user->username,
            'followings_count' => $followings->count(),
            'followings' => $followings,
        ]);
    } catch (ModelNotFoundException $e) {
        return response()->json(['message' => 'Usuario no encontrado'], 404);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error en el servidor', 'error' => $e->getMessage()], 500);
    }
}

    

    // 🔹 5) Obtener la cantidad de seguidores y seguidos + listas completas
    public function getFollowStats($username)
    {
        try {
            $user = User::where('username', $username)->firstOrFail();
            $authUser = Auth::user();
    
            $followers = $user->followers()
                ->orderBy('users.name', 'asc')
                ->get(['users.id', 'users.name', 'users.username']);
    
            $followings = $user->followings()
                ->orderBy('users.name', 'asc')
                ->get(['users.id', 'users.name', 'users.username']);
    
            // ✅ Verificamos si el usuario autenticado lo sigue
            $isFollowing = $authUser ? $authUser->followings()->where('followed_id', $user->id)->exists() : false;
    
            return response()->json([
                'user_id' => $user->id,
                'username' => $user->username,
                'name' => $user->name,
                'followers_count' => $followers->count(),
                'followings_count' => $followings->count(),
                'followers' => $followers,
                'followings' => $followings,
                'is_following' => $isFollowing, // ✅ Nuevo campo
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error en el servidor', 'error' => $e->getMessage()], 500);
        }
    }
}
