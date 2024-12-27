import { useState } from "react";
import AddItem from "./AddItem";
import AddItemForm from "./AddItemForm";
import { useTask } from "../contexts/Task";
import { useList } from "../contexts/List";
import { useBoard } from "../contexts/Board";
import TaskCard from "./TaskCard";
import { Droppable } from "@hello-pangea/dnd";

const ListCard = ({ list }) => {
    const [editMode, setEditMode] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");

    const { tasks, createTask } = useTask();
    const { addTaskToList, deleteList, deleteTaskFromList } = useList();
    const { addTaskToBoard, deleteListFromBoard, deleteTaskFromBoard } =
        useBoard();

    const submitHandler = (e) => {
        e.preventDefault();
        const id = Date.now().toString();
        createTask(id, taskTitle, list.id, list.boardId);
        addTaskToList({ id: list.id, taskId: id });
        addTaskToBoard({ id: list.boardId, taskId: id });
        setTaskTitle("");
        setEditMode(false);
    };

    const removeHandler = (list) => {
        deleteList(list.id);
        deleteListFromBoard({ id: list.boardId, listId: list.id });
        list.tasks.forEach((taskId) => {
            deleteTaskFromList({ id: list.id, taskId });
            deleteTaskFromBoard({ id: boardId, taskId });
        });
    };

    return (
        <Droppable droppableId={list.id}>
            {(provided) => (
                <div
                    className="bg-white py-3 px-4 rounded-lg shadow-md w-72 h-fit hover:shadow-lg mr-4"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-lg font-semibold text-gray-800 truncate">
                                {list.title}
                            </p>
                            <button
                                className="pl-1"
                                onClick={() => removeHandler(list)}
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
                        </div>

                        {list.tasks
                            ?.map((taskId) => {
                                return tasks.find(
                                    (listTask) => listTask.id === taskId
                                );
                            })
                            .map((task, index) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    index={index}
                                />
                            ))}

                        {editMode ? (
                            <AddItemForm
                                type="Task"
                                setEditMode={setEditMode}
                                title={taskTitle}
                                onChangeHandler={(e) =>
                                    setTaskTitle(e.target.value)
                                }
                                submitHandler={submitHandler}
                            />
                        ) : (
                            <AddItem type="Task" setEditMode={setEditMode} />
                        )}
                    </div>
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default ListCard;
