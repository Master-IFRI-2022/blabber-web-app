<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{Contact, Discussion, DiscussionParticipant, Message, Requests, User};

class UserController extends Controller
{
    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        $validatedData = $request->validate([
            'lastname' => 'required|string',
            'firstname' => 'required|string',
            'username' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = new User();
        $user->lastname = $validatedData['lastname'];
        $user->firstname = $validatedData['firstname'];
        $user->username = $validatedData['username'];
        $user->email = $validatedData['email'];
        $user->password = Hash::make($validatedData['password']);
        $user->save();

        // Création du tableau JSON de réponse
        $response = [
            '_id' => $user->id,
            'lastname' => $user->lastname,
            'firstname' => $user->firstname,
            'createdAt' => $user->created_at->timestamp,
            'updatedAt' => $user->updated_at->timestamp,
            'photoUrl' => null,
            'username' => $user->username,
            'email' => $user->email,
        ];

        return response()->json($response, 201);
    }

    function AuthUser(Request $request): \Illuminate\Http\JsonResponse
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            $response = [
                'accessToken' => $token,
                'authentication' => [
                    'strategy' => 'local',
                    'payload' => [
                        'iat' => time(),
                        'exp' => time() + (60 * 60 * 24), // 1 day
                        'aud' => 'https://yourdomain.com',
                        'sub' => $user->_id,
                        'jti' => Str::uuid(),
                    ],
                ],
                'user' => [
                    '_id' => $user->_id,
                    'lastname' => $user->lastname,
                    'firstname' => $user->firstname,
                    'createdAt' => $user->created_at->timestamp,
                    'updatedAt' => $user->updated_at->timestamp,
                    'photoUrl' => null,
                    'username' => $user->username,
                    'email' => $user->email,
                ],
            ];

            return response()->json($response, 200);
        }

        return response()->json(['error' => 'Invalid credentials'], 401);
    }

    public function authenticate(Request $request): \Illuminate\Http\JsonResponse
    {
        $accessToken = $request->input('accessToken');
        $authentication = $request->input('authentication');
        $user = $request->input('user');

        // Vérifiez et utilisez les données selon vos besoins
        // Par exemple, vous pouvez valider le jeton d'accès JWT et effectuer les opérations d'authentification nécessaires

        // Exemple de code pour valider le jeton d'accès JWT et renvoyer la réponse JSON
        if ($accessToken && $authentication && $user) {
            // Vérifiez le jeton d'accès JWT, effectuez les opérations d'authentification nécessaires
            // ...

            // Construisez la réponse JSON
            $response = [
                'accessToken' => $accessToken,
                'authentication' => $authentication,
                'user' => $user,
            ];

            return response()->json($response, 200);
        } else {
            return response()->json(['error' => 'Invalid request data'], 400);
        }
    }

    public function update(Request $request, $userId): \Illuminate\Http\JsonResponse
    {
        // Récupérez les données du corps de la requête
        $action = $request->input('action');
        $lastname = $request->input('lastname');
        $firstname = $request->input('firstname');
        $username = $request->input('username');
        $email = $request->input('email');

        // Vérifiez et utilisez les données selon vos besoins
        // Par exemple, vous pouvez valider les champs et mettre à jour les informations de l'utilisateur correspondant à $userId dans la base de données

        // Recherchez l'utilisateur correspondant à $userId dans la base de données
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Mettez à jour les champs souhaités de l'utilisateur avec les nouvelles valeurs
        if ($action === 'UPDATE_INFOS') {
            $user->lastname = $lastname;
            $user->firstname = $firstname;
            $user->username = $username;
            $user->email = $email;
            $user->save();

            // Retournez la réponse JSON avec les informations de l'utilisateur mises à jour
            $response = $user;

            return response()->json($response, 200);
        } else {
            return response()->json(['error' => 'Invalid action'], 400);
        }
    }

    public function updatePassword(Request $request, $userId): \Illuminate\Http\JsonResponse
    {
        // Récupérez les données du corps de la requête
        $action = $request->input('action');
        $currentPassword = $request->input('currentPassword');
        $newPassword = $request->input('newPassword');

        // Vérifiez et utilisez les données selon vos besoins
        // Par exemple, vous pouvez valider les champs et changer le mot de passe de l'utilisateur correspondant à $userId dans la base de données

        // Recherchez l'utilisateur correspondant à $userId dans la base de données
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        // Vérifiez si le mot de passe actuel correspond au mot de passe stocké
        if (!Hash::check($currentPassword, $user->password)) {
            return response()->json(['error' => 'Current password is incorrect'], 400);
        }

        // Changez le mot de passe de l'utilisateur avec le nouveau mot de passe
        $user->password = Hash::make($newPassword);
        $user->save();

        // Mettez à jour la date de modification
        $user->updatedAt = time();

        // Retournez la réponse JSON avec les informations mises à jour de l'utilisateur
        return response()->json($user, 200);
    }

    public function retrieveUsers(Request $request): \Illuminate\Http\JsonResponse
    {
        // Récupérez les paramètres de recherche
        $regex = $request->input('username.$regex');
        $options = $request->input('username.$options');

        // Effectuez la recherche dans la base de données
        $users = User::where('username', 'regex', "/$regex/$options")->get();

        // Construisez la réponse JSON
        $response = [
            "total" => count($users),
            "limit" => 10,
            "skip" => 0,
            "data" => $users
        ];

        // Retournez la réponse JSON
        return response()->json($response, 200);
    }

    public function searchUsers(Request $request): \Illuminate\Http\JsonResponse
    {
        // Récupérer les paramètres de recherche
        $usernameRegex = $request->input('$or[0][username][$regex]');
        $usernameOptions = $request->input('$or[0][username][$options]');
        $emailRegex = $request->input('$or[1][email][$regex]');
        $emailOptions = $request->input('$or[1][email][$options]');
        $limit = $request->input('$limit', 10); // Valeur par défaut : 10

        // Effectuer la recherche dans la base de données
        $users = User::where(function ($query) use ($usernameRegex, $usernameOptions, $emailRegex, $emailOptions) {
            $query->orWhere('username', 'regex', "/$usernameRegex/$usernameOptions")
                ->orWhere('email', 'regex', "/$emailRegex/$emailOptions");
        })->limit($limit)->get();

        // Construire la réponse JSON
        $response = [
            "total" => count($users),
            "limit" => $limit,
            "skip" => 0,
            "data" => $users
        ];

        // Retourner la réponse JSON
        return response()->json($response, 200);
    }

    public function getUser($id): \Illuminate\Http\JsonResponse
    {
        // Rechercher l'utilisateur par son ID
        $user = User::find($id);

        // Vérifier si l'utilisateur existe
        if (!$user) {
            return response()->json(['message' => 'Utilisateur introuvable'], 404);
        }

        // Retourner les informations de l'utilisateur en tant que réponse JSON
        return response()->json($user, 200);
    }

    public function updateProfilePhoto(Request $request): \Illuminate\Http\JsonResponse
    {
        // Valider la requête et s'assurer que le champ de fichier est présent
        $request->validate([
            'file' => 'required|image',
        ]);

        // Récupérer le fichier de la requête
        $file = $request->file('file');

        // Générer un nom unique pour le fichier
        $fileName = time() . '_' . $file->getClientOriginalName();

        // Enregistrer le fichier dans le stockage
        $file->storeAs('public/uploads', $fileName);

        // Mettre à jour le chemin de la photo de profil de l'utilisateur dans la base de données
        $user = auth()->user();
        $user->photoUrl = 'uploads/' . $fileName;
        $user->save();

        // Retourner la réponse avec les données mises à jour de l'utilisateur
        return response()->json($user,200);
    }

    function photoProfile($filename) {
        $filePath = storage_path('app/public/' . $filename);
        if (file_exists($filePath)) {
            return response()->file($filePath);
        } else {
            return response()->json(['error' => 'Le profil demandé n\'existe pas.'], Response::HTTP_NOT_FOUND);
        }
    }


}
