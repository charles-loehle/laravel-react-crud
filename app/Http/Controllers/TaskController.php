<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function __construct() {
      $this->middleware('auth');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Task $task)
    {
		// get all the tasks based on current user id
		$allTasks = $task->whereIn('user_id', $request->user())->with('user');
		$tasks = $allTasks->orderBy('created_at', 'desc')->take(20)->get();
		// return json response
		return response()->json([
			'tasks' => $tasks,
		]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
		// validatino
		$this->validate($request, [
			'name' => 'required|max:255',
		]);
		// create a new task based on user tasks relationship
		$task = $request->user()->tasks()->create([
			'name' => $request->name,
		]);
		// return task with user object
		return response()->json($task->with('user')->find($task->id));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        // find the task by id
        $task = Task::findOrFail($id);
        // return an associative array with the task as a json object for populating the form 
        return response()->json([
            'task' => $task
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // get the task by id 
        $task = Task::findOrFail($id);
        // update the task 
        $task->update($request->all());
        // return a json response with the user's task 
        return response()->json($task->with('user')->find($task->id));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Task::findOrFail($id)->delete();
    }
}
