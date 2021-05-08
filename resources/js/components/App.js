import axios from "axios";
import { useState, useEffect } from "react";
import Tasks from "./Tasks";

const App = () => {
    const [name, setName] = useState("");
    const [tasks, setTasks] = useState([]);
    const getTasks = () => {
        axios
            .get("/tasks")
            .then((res) => {
                // console.log(res.data.tasks);
                setTasks(...tasks, res.data.tasks);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getTasks();
    }, []);

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("submitted", name);
        axios
            .post("/tasks", {
                name: name,
            })
            .then((res) => {
                // console.log("handleSubmit", res.data);
                setTasks([...tasks, res.data]);
                setName("");
            });
    };

    const handleDelete = (id) => {
        axios
            .delete(`/tasks/${id}`)
            .then(setTasks(tasks.filter((task) => task.id !== id)));
    };

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="px-6 pt-6 bg-white">
                            Create A New Task
                        </div>
                        <div className="md:mt-0 md:col-span-2">
                            <form onSubmit={handleSubmit}>
                                <div className="shadow sm:rounded-md sm:overflow-hidden">
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <div>
                                            <div className="mt-1">
                                                <textarea
                                                    onChange={handleChange}
                                                    value={name}
                                                    id="about"
                                                    name="about"
                                                    rows={3}
                                                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                                                />
                                            </div>
                                            <p className="mt-2 text-sm text-gray-500">
                                                Brief description for your task.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <hr />
                            <Tasks
                                handleDelete={handleDelete}
                                allTasks={tasks}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
