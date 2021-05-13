import { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";

const TaskEdit = ({ match }) => {
    let history = useHistory();
    let { id } = useParams();
    // console.log(id);
    const [name, setName] = useState("");
    const [task, setTask] = useState([]);

    const getTask = (props) => {
        axios
            .get(`/tasks/${id}/edit`)
            .then((res) => {
                // console.log(res.data.tasks);
                setTask(...task, res.data.task);
                setName(res.data.task.name);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        getTask();
    }, []);

    const handleChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("submitted", name);
        axios
            .put(`/tasks/${id}`, {
                name: name,
            })
            .then((res) => {
                history.push("/dashboard");
            });
    };

    // console.log("from TaskEdit line 42" + name);

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="md:grid md:grid-cols-3 md:gap-6">
                        <div className="px-6 pt-6 bg-white">
                            Edit Task id:{id}
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
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                        <Link
                                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            to={"/dashboard"}
                                        >
                                            Go Back
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskEdit;
