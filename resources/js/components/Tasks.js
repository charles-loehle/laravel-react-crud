import { Link } from "react-router-dom";

const Tasks = ({ allTasks, handleDelete }) => {
    const sorted = allTasks.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    // console.log(sorted);
    return (
        <div className="Tasks p-4">
            {sorted.map((task) => (
                <div
                    key={task.id}
                    className="task border-b border-gray-400 border-b border-gray-400 p-2"
                >
                    <h2 className="text-xl">{task.name}</h2>
                    <p className="text-sm text-gray-600">by {task.user.name}</p>
                    <Link
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        to={`/${task.id}/edit`}
                    >
                        Update
                    </Link>
                    <button
                        onClick={() => handleDelete(task.id)}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Tasks;
