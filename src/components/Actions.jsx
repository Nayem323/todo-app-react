import { useState } from "react";
import { useTask } from "../contexts/Task";
import { useList } from "../contexts/List";
import { useBoard } from "../contexts/Board";
import { toast } from "react-toastify";

const Actions = ({ item, type }) => {
    const [showActions, setShowActions] = useState(false);
    const [showActionDetails, setShowActionDetails] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [selectedBoardList, setSelectedBoardList] = useState([]);
    const [selectedList, setSelectedList] = useState("");
    const [selectedBoard, setSelectedBoard] = useState("");

    const { tasks, createTask, deleteTask } = useTask();
    const { lists, deleteTaskFromList, addTaskToList, deleteList, createList } =
        useList();
    const {
        boards,
        deleteTaskFromBoard,
        addTaskToBoard,
        deleteListFromBoard,
        addListToBoard,
    } = useBoard();

    const removeHandler = () => {
        if (type === "task") {
            deleteTask(item.id);
            deleteTaskFromList({ id: item.listId, taskId: item.id });
            deleteTaskFromBoard({ id: item.boardId, taskId: item.id });
        }
        if (type === "list") {
            deleteList(item.id);
            deleteListFromBoard({ id: item.boardId, listId: item.id });
            item.tasks.forEach((taskId) => {
                deleteTaskFromList({ id: item.id, taskId });
                deleteTaskFromBoard({ id: item.boardId, taskId });
            });
        }
        setShowActions(false);
    };

    const handleBoardChange = (e) => {
        const boardId = e.target.value;
        setSelectedBoard(boardId);
        if (type === "task") {
            const renderedLists = lists.filter(
                actionType === "move"
                    ? (list) =>
                          list.boardId === boardId && list.id !== item.listId
                    : (list) => list.boardId === boardId
            );
            setSelectedBoardList(renderedLists);
        }
    };

    const handleListChange = (e) => {
        const listId = e.target.value;
        setSelectedList(listId);
    };

    const handleItemAction = (e) => {
        e.preventDefault();
        const id = Date.now().toString();
        if (type === "task") {
            if (selectedList === "" || selectedBoard === "") {
                toast.error("Please select board and list properly");
                return;
            } else {
                createTask(id, item.title, selectedList, selectedBoard);
                addTaskToList({ id: selectedList, taskId: id });
                addTaskToBoard({ id: selectedBoard, taskId: id });
            }
        }
        if (type === "list") {
            if (selectedBoard === "") {
                toast.error("Please select a board");
                return;
            } else {
                createList(id, item.title, selectedBoard);
                addListToBoard({ id: selectedBoard, listId: id });
                item.tasks.forEach((oldTaskId) => {
                    const taskId =
                        Date.now().toString() +
                        Math.floor(Math.random() * 1000);
                    tasks.forEach((task) => {
                        if (task.id === oldTaskId) {
                            console.log(task);
                            console.log(taskId);
                            createTask(taskId, task.title, id, selectedBoard);
                            addTaskToList({ id, taskId });
                            addTaskToBoard({ id: selectedBoard, taskId });
                        }
                    });
                });
            }
        }

        if (actionType === "move") {
            removeHandler();
        }

        setActionType(null);
        setShowActions(false);
        setShowActionDetails(false);
        setSelectedBoardList([]);
        setSelectedBoard("");
        setSelectedList("");
    };

    const handleOutsideClick = () => {
        setActionType(null);
        setShowActions(false);
        setShowActionDetails(false);
        setSelectedBoardList([]);
        setSelectedBoard("");
        setSelectedList("");
    };

    return (
        <>
            <button
                className="pl-1 pr-2"
                onClick={() => setShowActions(!showActions)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    className="h-4 current-fill"
                    viewBox="0 0 16 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                    />
                </svg>
            </button>
            {showActions && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={handleOutsideClick}
                    ></div>
                    <div className="absolute top-full right-0 -mt-2 bg-white shadow-md rounded-md z-10">
                        <ul className="relative">
                            <li
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-t-md"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowActionDetails(true);
                                    setActionType("copy");
                                }}
                            >
                                Copy
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowActionDetails(true);
                                    setActionType("move");
                                }}
                            >
                                Move
                            </li>
                            <li
                                className="px-4 py-2 hover:bg-red-200 text-red-500 cursor-pointer rounded-b-md"
                                onClick={removeHandler}
                            >
                                Delete
                            </li>
                        </ul>
                        {showActionDetails && (
                            <div className="bg-white p-6 rounded-md shadow-md w-96 absolute left-full top-0 z-20">
                                <h2 className="text-lg font-semibold mb-4">
                                    {actionType === "copy"
                                        ? `Copy ${
                                              type === "task" ? "Task" : "List"
                                          }`
                                        : `Move ${
                                              type === "task" ? "Task" : "List"
                                          }`}
                                </h2>

                                <div>
                                    <p>
                                        Specify where to{" "}
                                        {actionType === "copy"
                                            ? "copy"
                                            : "move"}{" "}
                                        this {type === "task" ? "task" : "list"}{" "}
                                        :
                                    </p>
                                    <form
                                        className="mt-4"
                                        onSubmit={handleItemAction}
                                    >
                                        <select
                                            className="mt-2 w-full p-2 border rounded-md"
                                            value={selectedBoard}
                                            onChange={handleBoardChange}
                                            required
                                        >
                                            <option>Select Board</option>
                                            {boards?.map((board) => {
                                                if (
                                                    actionType === "move" &&
                                                    type === "list" &&
                                                    board.id === item.boardId
                                                ) {
                                                    return null;
                                                }
                                                return (
                                                    <option
                                                        key={board.id}
                                                        value={board.id}
                                                    >
                                                        {board.title}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                        {selectedBoardList.length > 0 && (
                                            <select
                                                className="mt-2 w-full p-2 border rounded-md"
                                                value={selectedList}
                                                onChange={handleListChange}
                                                required
                                            >
                                                <option>Select List</option>
                                                {selectedBoardList.map(
                                                    (list) => (
                                                        <option
                                                            key={list.id}
                                                            value={list.id}
                                                        >
                                                            {list.title}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        )}
                                        <button
                                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                            type="submit"
                                        >
                                            Confirm
                                        </button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default Actions;
