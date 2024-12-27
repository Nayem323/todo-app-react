import { Link } from "react-router";
import { useBoard } from "../contexts/Board";
import { useList } from "../contexts/List";
import { useTask } from "../contexts/Task";

export default function BoardList() {
    const { boards, deleteBoard } = useBoard();
    const { deleteList } = useList();
    const { deleteTask } = useTask();

    const handleDeleteBoard = (board) => {
        deleteBoard(board.id);
        board.lists.forEach((list) => {
            deleteList(list);
        });
        board.tasks.forEach((task) => {
            deleteTask(task);
        });
    };

    return (
        <>
            {boards?.map((board) => (
                <div
                    className="bg-white py-3 px-4 rounded-lg shadow-md relative"
                    key={board.id}
                >
                    <button
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition"
                        onClick={() => handleDeleteBoard(board)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.366-.448.936-.707 1.514-.707h.458c.577 0 1.147.26 1.513.707L12.434 4H17a1 1 0 110 2h-.416l-.798 10.379A2 2 0 0113.796 18H6.204a2 2 0 01-1.99-1.621L3.416 6H3a1 1 0 110-2h4.566l.691-.901zM8.338 5l-.529.691-.787 9.853c-.02.25.065.486.237.653.171.167.4.262.647.262h7.592c.247 0 .476-.095.647-.262.172-.167.257-.403.237-.653l-.787-9.853-.529-.691H8.338z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <Link to={`/board/${board.id}`}>
                        <h4 className="text-md font-bold mb-4 truncate pr-2">
                            {board.title}
                        </h4>
                        <p className="text-xs">List: {board.lists.length}</p>
                    </Link>
                </div>
            ))}
        </>
    );
}
