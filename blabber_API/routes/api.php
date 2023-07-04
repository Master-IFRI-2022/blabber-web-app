<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\DiscussionController;
use App\Http\Controllers\MessageController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/authentication', [UserController::class, 'AuthUser']);

Route::post('/users', [UserController::class, 'create']);

Route::post('/authenticationJwt', [UserController::class, 'authenticate']);

Route::patch('/users/{userId}', [UserController::class, 'update']);

Route::patch('/usersPassword/{userId}', [UserController::class, 'updatePassword']);

Route::patch('/updateProfilePhoto', [UserController::class, 'updateProfilePhoto']);

Route::get('/getUser/{id}', [UserController::class, 'getUser']);

Route::get('/retrieveUsers', [UserController::class, 'retrieveUsers']);

Route::get('/searchUsers', [UserController::class, 'searchUsers']);

Route::get('/photoProfile/{filename}', [UserController::class, 'photoProfils']);

Route::post('/requests', [RequestController::class, 'create']);

Route::get('/requests', [RequestController::class, 'getByReceiverId']);

Route::patch('/requests/{id}', [RequestController::class, 'update']);

Route::get('/contacts', [\App\Http\Controllers\ContactController::class, 'show']);

Route::get('/contacts/{id}', [\App\Http\Controllers\ContactController::class, 'showById']);

Route::delete('/deleteContact/{contactId}', [ContactController::class, 'deleteContact']);

Route::patch('/updateContact/{contactId}', [ContactController::class, 'updateContact']);

Route::post('/discussions', [DiscussionController::class, 'createDiscussion']);

Route::patch('/discussions/{id}', [DiscussionController::class, 'updateDiscussion']);

Route::patch('/updateDiscussionGroup/{id}', [DiscussionController::class, 'updateDiscussionGroup']);

Route::get('/getDiscussions/{id}', [DiscussionController::class, 'getDiscussion']);

Route::post('/createDiscussionGroup', [DiscussionController::class, 'createDiscussionGroup']);

Route::patch('/updateAdminDiscussion/{discussionId}', [DiscussionController::class, 'updateAdminDiscussion']);

Route::patch('/addUsersDiscussion/{discussionId}', [DiscussionController::class, 'addUsersDiscussion']);

Route::patch('/removeUserDiscussion/{discussionId}', [DiscussionController::class, 'removeUserDiscussion']);

Route::delete('/deleteDiscussion/{discussionId}', [DiscussionController::class, 'deleteDiscussion']);

Route::patch('/discussions/{discussionId}/leave', [DiscussionController::class, 'leaveGroup']);

Route::get('/getListDiscussions', [DiscussionController::class, 'getListDiscussions']);

Route::get('/RetrieveDiscussions', [DiscussionController::class, 'RetrieveDiscussions']);

Route::get('/messages', [MessageController::class, 'getMessages']);

Route::post('/messages', [MessageController::class, 'create']);

Route::patch('/Updatemessages/{messageId}', [MessageController::class, 'Updatemessage']);

Route::get('/downloads', [MessageController::class, 'download']);
