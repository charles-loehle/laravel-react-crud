<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\TaskController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

Route::get('/home', [HomeController::class, 'index'])->name('home');

require __DIR__.'/auth.php';

Route::resource('tasks', TaskController::class);
Route::post('/tasks/{task}/replicateRecord', [TaskController::class, 'replicateRecord']);
