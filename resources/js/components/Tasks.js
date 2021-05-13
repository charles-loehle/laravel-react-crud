import { Link } from "react-router-dom";

const Tasks = ({ allTasks, handleDelete, handleDuplicate }) => {
    const sorted = allTasks.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    //console.log(sorted[0]);
    return (
        <div className="Tasks p-4">
            {sorted.map((task) => (
                <div
                    key={task.id}
                    className="task border-b border-gray-400 border-b border-gray-400 p-2"
                >
                    <h2 className="text-xl">{task.name}</h2>
                    <p className="text-sm text-gray-600">
                        by {task.user.name} on{" "}
                        {task.updated_at.split("T").slice(0, 1)} at{" "}
                        {task.updated_at
                            .split("T")
                            .slice(1)
                            .join("")
                            .slice(0, 8)}
                    </p>
                    <Link
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        to={`/${task.id}/edit`}
                    >
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(task.id)}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => handleDuplicate(task.id)}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Duplicate
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Tasks;
