<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(Task $task) {
      $tasks = $task->get();
      //dd($tasks);
      return view('home')->with('tasks', $tasks);
    }
}
