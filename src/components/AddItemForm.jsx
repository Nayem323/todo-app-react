const AddItemForm = ({
    type,
    submitHandler,
    onChangeHandler,
    title,
    setEditMode,
    label,
}) => {
    return (
        <div
            className={`bg-white py-3 px-4 rounded-lg shadow-md hover:shadow-lg mb-2 ${
                type === "List" ? "w-72 h-fit mr-4" : "w-full"
            }`}
        >
            <form onSubmit={submitHandler}>
                {type === "Task" ? (
                    <textarea
                        className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        cols="30"
                        placeholder="Enter task title"
                        value={title}
                        onChange={onChangeHandler}
                    ></textarea>
                ) : (
                    <input
                        type="text"
                        placeholder={`Enter ${type} title`}
                        className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={title}
                        onChange={onChangeHandler}
                    />
                )}

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mr-2"
                >
                    {label ? label : "Add"} {type}
                </button>
                <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default AddItemForm;
