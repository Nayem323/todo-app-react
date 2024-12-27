const AddItem = ({ type, setEditMode }) => {
    return (
        <button
            className={`flex items-center text-customBlueDark rounded-lg font-medium ${
                type === "Task"
                    ? "py-2 hover:bg-customBlueLight w-full text-sm px-2"
                    : "justify-center py-4 bg-customBlueLight shadow-md w-72 h-fit px-4 hover:bg-customBlue mr-4"
            }`}
            onClick={() => setEditMode(true)}
        >
            <svg
                width="16"
                height="16"
                role="presentation"
                focusable="false"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M12 3C11.4477 3 11 3.44772 11 4V11L4 11C3.44772 11 3 11.4477 3 12C3 12.5523 3.44772 13 4 13H11V20C11 20.5523 11.4477 21 12 21C12.5523 21 13 20.5523 13 20V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11L13 11V4C13 3.44772 12.5523 3 12 3Z"
                    fill="currentColor"
                ></path>
            </svg>
            <span className="pl-2">Add a {type}</span>
        </button>
    );
};

export default AddItem;
