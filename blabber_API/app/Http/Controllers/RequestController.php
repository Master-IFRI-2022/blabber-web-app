<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{Contact, Discussion, DiscussionParticipant, Message, Requests, User};

class RequestController extends Controller
{
    public function create(HttpRequest $request): \Illuminate\Http\JsonResponse
    {
        $requestData = $request->validate([
            'senderId' => 'required',
            'receiverId' => 'required',
        ]);

        // Créez la demande en utilisant les données fournies
        $createdRequest = Requests::create($requestData);

        // Vous pouvez retourner la demande créée en tant que réponse JSON si vous le souhaitez
        return response()->json($createdRequest, 201);
    }

    public function getByReceiverId(HttpRequest $request): \Illuminate\Http\JsonResponse
    {
        $receiverId = $request->query('receiverId');

        // Récupérez les demandes en fonction de l'ID du destinataire
        $requests = Requests::where('receiverId', $receiverId)->get();

        // Retournez les demandes récupérées en tant que réponse JSON
        return response()->json($requests);
    }

    public function update(HttpRequest $request, $id): \Illuminate\Http\JsonResponse
    {
        $requestData = $request->only('accepted');

        // Mettez à jour la demande spécifique avec les nouvelles données
        $request = Requests::findOrFail($id);
        $request->update($requestData);

        // Retournez la demande mise à jour en tant que réponse JSON
        return response()->json($request);
    }

    public function updateContact($contactId, Request $request)
    {
        // Recherchez le contact à mettre à jour dans la base de données
        $contact = Contact::findOrFail($contactId);

        // Vérifiez les champs de données à mettre à jour
        if ($request->has('blockedUser2')) {
            $contact->blockedUser2 = $request->input('blockedUser2');
        }

        // Enregistrez les modifications du contact
        $contact->save();

        // Répondez avec les données mises à jour du contact ou tout autre contenu approprié
        return response()->json($contact);
    }
}
