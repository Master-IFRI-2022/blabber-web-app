<?php

namespace App\Http\Controllers;

use App\Discussion;
use Illuminate\Http\Request;
use \Illuminate\Http\JsonResponse;
use App\{Contact, DiscussionParticipant, Message, Requests, User};

class DiscussionController extends Controller
{
    public function createDiscussion(Request $request): JsonResponse
    {
        // Validez les données de la requête
        $validatedData = $request->validate([
            'userId' => 'required',
            'tag' => 'required'
        ]);

        // Créez une nouvelle discussion avec les données fournies
        $discussion = Discussion::create($validatedData);

        // Répondez avec les données de la nouvelle discussion ou tout autre contenu approprié
        return response()->json($discussion,200);
    }

    public function updateDiscussion(Request $request, $id): JsonResponse
    {
        // Validez les données de la requête
        $validatedData = $request->validate([
            'action' => 'required',
            'isArchived' => 'required|boolean'
        ]);

        // Recherchez la discussion correspondante dans la base de données
        $discussion = Discussion::findOrFail($id);

        // Mettez à jour les attributs de la discussion avec les données fournies
        $discussion->action = $validatedData['action'];
        $discussion->isArchived = $validatedData['isArchived'];

        // Enregistrez les modifications dans la base de données
        $discussion->save();

        // Répondez avec les données de la discussion mise à jour ou tout autre contenu approprié
        return response()->json($discussion,200);
    }

    public function updateDiscussionGroup(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        // Validez les données de la requête
        $validatedData = $request->validate([
            'action' => 'required',
            'name' => 'required|string',
            'description' => 'required|string'
        ]);

        // Recherchez la discussion correspondante dans la base de données
        $discussion = Discussion::findOrFail($id);

        // Mettez à jour les attributs de la discussion avec les données fournies
        $discussion->action = $validatedData['action'];
        $discussion->name = $validatedData['name'];
        $discussion->description = $validatedData['description'];

        // Enregistrez les modifications dans la base de données
        $discussion->save();

        // Répondez avec les données de la discussion mise à jour ou tout autre contenu approprié
        return response()->json($discussion);
    }

    public function getDiscussion($id): JsonResponse
    {
        // Recherchez la discussion correspondante dans la base de données
        $discussion = Discussion::findOrFail($id);

        // Répondez avec les données de la discussion ou tout autre contenu approprié
        return response()->json($discussion);
    }

    public function createDiscussionGroup(Request $request): JsonResponse
    {
        // Validez les données de la requête
        $validatedData = $request->validate([
            'tag' => 'required|string',
            'name' => 'required|string',
            'description' => 'required|string',
            'participants' => 'required|array',
            'participants.*' => 'exists:users,_id' // Assurez-vous d'adapter cela à votre modèle utilisateur
        ]);

        // Créez une nouvelle instance de Discussion avec les données validées
        $discussion = new Discussion();
        $discussion->tag = $validatedData['tag'];
        $discussion->name = $validatedData['name'];
        $discussion->description = $validatedData['description'];
        $discussion->participants = $validatedData['participants'];

        // Enregistrez la discussion dans la base de données
        $discussion->save();

        // Répondez avec les données de la nouvelle discussion ou tout autre contenu approprié
        return response()->json($discussion, 201);
    }

    public function updateAdminDiscussion(Request $request, $discussionId): JsonResponse
    {
        // Validez les données de la requête
        $validatedData = $request->validate([
            'action' => 'required|string',
            'adminUsers' => 'required|array',
            'adminUsers.*' => 'exists:users,_id' // Assurez-vous d'adapter cela à votre modèle utilisateur
        ]);

        // Recherchez la discussion par son ID
        $discussion = Discussion::findOrFail($discussionId);

        // Mettez à jour la discussion en fonction de l'action spécifiée
        if ($validatedData['action'] === 'DEFINE_ADMINS_GROUP') {
            $discussion->adminUsers = $validatedData['adminUsers'];
        } else {
            // Gérez d'autres actions si nécessaire
        }

        // Enregistrez les modifications dans la base de données
        $discussion->save();

        // Répondez avec les données mises à jour de la discussion ou tout autre contenu approprié
        return response()->json($discussion, 200);
    }

    public function addUsersDiscussion(Request $request, $discussionId): JsonResponse
    {
        // Validez les données de la requête
        $validatedData = $request->validate([
            'action' => 'required|string',
            'addUsers' => 'required|array',
            'addUsers.*' => 'exists:users,_id' // Assurez-vous d'adapter cela à votre modèle utilisateur
        ]);

        // Recherchez la discussion par son ID
        $discussion = Discussion::findOrFail($discussionId);

        // Mettez à jour la discussion en fonction de l'action spécifiée
        if ($validatedData['action'] === 'ADD_USERS_GROUP') {
            $discussion->participants = array_merge($discussion->participants, $validatedData['addUsers']);
        } else {
            // Gérez d'autres actions si nécessaire
        }

        // Enregistrez les modifications dans la base de données
        $discussion->save();

        // Répondez avec les données mises à jour de la discussion ou tout autre contenu approprié
        return response()->json($discussion, 200);
    }

    public function removeUserDiscussion(Request $request, $discussionId)
    {
        // Validez les données de la requête
        $validatedData = $request->validate([
            'action' => 'required|string',
            'removeUsers' => 'required|array',
            'removeUsers.*' => 'exists:users,_id' // Assurez-vous d'adapter cela à votre modèle utilisateur
        ]);

        // Recherchez la discussion par son ID
        $discussion = Discussion::findOrFail($discussionId);

        // Mettez à jour la discussion en fonction de l'action spécifiée
        if ($validatedData['action'] === 'REMOVE_USERS_GROUP') {
            $discussion->participants = array_diff($discussion->participants, $validatedData['removeUsers']);
        } else {
            // Gérez d'autres actions si nécessaire
        }

        // Enregistrez les modifications dans la base de données
        $discussion->save();

        // Répondez avec les données mises à jour de la discussion ou tout autre contenu approprié
        return response()->json($discussion, 200);
    }

    public function deleteDiscussion($discussionId): JsonResponse
    {
        // Recherchez la discussion par son ID
        $discussion = Discussion::findOrFail($discussionId);

        // Supprimez la discussion
        $discussion->delete();

        // Répondez avec un message de succès ou tout autre contenu approprié
        return response()->json(['message' => 'Discussion deleted'], 200);
    }

    public function leaveGroup($discussionId): JsonResponse
    {
        // Recherchez la discussion par son ID
        $discussion = Discussion::findOrFail($discussionId);

        // Vérifiez si l'utilisateur connecté fait partie du groupe
        $userId = Auth::id();
        if (!$discussion->participants->contains($userId)) {
            // L'utilisateur n'est pas membre du groupe, renvoyez une erreur ou une réponse appropriée
            return response()->json(['message' => 'User is not a member of the group'], 403);
        }

        // Retirez l'utilisateur du groupe
        $discussion->participants()->detach($userId);

        // Répondez avec un message de succès ou tout autre contenu approprié
        return response()->json(['message' => 'User left the group'], 200);
    }

    public function getListDiscussions(Request $request): JsonResponse
    {
        $userId = $request->query('participants.$elemMatch.userId');
        $isArchivedChat = $request->query('participants.$elemMatch.isArchivedChat');
        $tag = $request->query('tag');

        $discussions = Discussion::where('participants', 'elemMatch', [
            'userId' => $userId,
            'isArchivedChat' => $isArchivedChat,
        ])->where('tag', $tag)->get();

        return response()->json($discussions);
    }

    public function RetrieveDiscussions(Request $request): JsonResponse
    {
        $limit = $request->query('$limit');
        $tag = $request->query('tag');
        $userId1 = $request->query('$and[0][participants.userId]');
        $userId2 = $request->query('$and[1][participants.userId]');

        $discussions = Discussion::where('tag', $tag)
            ->where('participants', 'elemMatch', ['userId' => $userId1])
            ->where('participants', 'elemMatch', ['userId' => $userId2])
            ->limit($limit)
            ->get();

        return response()->json($discussions);
    }
}
