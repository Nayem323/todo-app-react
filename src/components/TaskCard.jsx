import { useState } from "react";
import AddItemForm from "./AddItemForm";
import { useTask } from "../contexts/Task";
import { useList } from "../contexts/List";
import { useBoard } from "../contexts/Board";
import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ task, index }) => {
    const [editMode, setEditMode] = useState(false);
    const [taskTitle, setTaskTitle] = useState(task.title);

    const { editTask, deleteTask } = useTask();
    const { deleteTaskFromList } = useList();
    const { deleteTaskFromBoard } = useBoard();

    const submitHandler = (e) => {
        e.preventDefault();
        editTask({ id: task.id, title: taskTitle });
        setEditMode(false);
    };

    const removeHandler = (id) => {
        deleteTask(id);
        deleteTaskFromList({ id: task.listId, taskId: id });
        deleteTaskFromBoard({ id: task.boardId, taskId: id });
    };

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    {editMode ? (
                        <AddItemForm
                            type="Task"
                            setEditMode={setEditMode}
                            title={taskTitle}
                            onChangeHandler={(e) =>
                                setTaskTitle(e.target.value)
                            }
                            submitHandler={submitHandler}
                            label="Update"
                        />
                    ) : (
                        <div
                            className="bg-customBlue rounded-lg shadow-md py-2 px-3 mb-4 text-sm font-medium flex items-center justify-between"
                            onClick={() => setEditMode(true)}
                        >
                            <span className="block truncate">{task.title}</span>
                            <button
                                className="pl-1"
                                onClick={() => removeHandler(task.id)}
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
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
