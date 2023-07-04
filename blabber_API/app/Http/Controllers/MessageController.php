<?php

namespace App\Http\Controllers;

use App\{Contact, Discussion, DiscussionParticipant, Message, Requests, User};
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MessageController extends Controller
{
    public function getMessages(Request $request): \Illuminate\Http\JsonResponse
    {
        $discussionId = $request->query('discussionId');
        $messages = Message::where('discussionId', $discussionId)
            ->get();

        return response()->json($messages);
    }

    public function create(Request $request): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'discussionId' => 'required',
            'text' => 'required',
            'file' => 'required|file',
        ]);

        // Récupérez les données du formulaire
        $discussionId = $request->input('discussionId');
        $text = $request->input('text');
        $file = $request->file('file');

        // Effectuez le traitement pour enregistrer le message et le fichier

        // Retournez une réponse appropriée
        return response()->json(['message' => 'Message créé avec succès'], 201);
    }

    public function Updatemessage(Request $request, $messageId): \Illuminate\Http\JsonResponse
    {
        $request->validate([
            'action' => 'required',
            'emoji' => 'required',
        ]);

        // Récupérez les données de la requête
        $action = $request->input('action');
        $emoji = $request->input('emoji');

        // Recherchez le message dans la base de données
        $message = Message::findOrFail($messageId);

        // Mettez à jour le message en fonction de l'action et de l'emoji
        if ($action === 'EMOJI_REACTION') {
            // Ajoutez la réaction emoji au message
            $message->emojiReaction = $emoji;
            // Enregistrez les modifications dans la base de données
            $message->save();
        }

        // Retournez une réponse appropriée
        return response()->json(['message' => 'Message mis à jour avec succès'], 200);
    }

    public function download(Request $request)
    {
        $messageId = $request->query('messageId');

        // Vérifier si le message existe et récupérer le chemin du fichier
        $message = Message::findOrFail($messageId);
        $filePath = $message->file_path;

        // Vérifier si le fichier existe dans le stockage
        if (!Storage::exists($filePath)) {
            return response()->json(['error' => 'Fichier introuvable'], 404);
        }

        // Récupérer le nom de fichier d'origine à partir du chemin du fichier
        $originalFileName = pathinfo($filePath, PATHINFO_FILENAME);

        // Télécharger le fichier
        return Storage::download($filePath, $originalFileName);
    }
}
