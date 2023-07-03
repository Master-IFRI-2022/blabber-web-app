<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\{Contact, Discussion, DiscussionParticipant, Message, Requests, User};

class ContactController extends Controller
{
    public function show(): \Illuminate\Http\JsonResponse
    {
        // Récupérez la liste des contacts
        $contacts = Contact::get();

        return response()->json($contacts);
    }
    public function showById($id): \Illuminate\Http\JsonResponse
    {
        // Récupérez le contact correspondant à l'ID donné
        $contact = Contact::findOrFail($id);

        return response()->json($contact);
    }

    public function deleteContact($contactId): \Illuminate\Http\JsonResponse
    {
        // Recherchez le contact à supprimer dans la base de données
        $contact = Contact::findOrFail($contactId);

        // Supprimez le contact
        $contact->delete();

        // Répondez avec un message de succès ou tout autre contenu approprié
        return response()->json(['message' => 'Contact deleted successfully']);
    }

}
