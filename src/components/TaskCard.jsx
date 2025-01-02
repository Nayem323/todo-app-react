import { useState } from "react";
import AddItemForm from "./AddItemForm";
import { useTask } from "../contexts/Task";
import { Draggable } from "@hello-pangea/dnd";
import Actions from "./Actions";

const TaskCard = ({ task, index }) => {
    const [editMode, setEditMode] = useState(false);
    const [taskTitle, setTaskTitle] = useState(task.title);

    const { editTask } = useTask();

    const submitHandler = (e) => {
        e.preventDefault();
        editTask({ id: task.id, title: taskTitle });
        setEditMode(false);
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
                        <div className="bg-customBlue rounded-lg shadow-md py-2 px-3 mb-4 text-sm font-medium flex items-center justify-between relative cursor-default">
                            <span
                                className="block truncate w-full"
                                onClick={() => setEditMode(true)}
                            >
                                {task.title}
                            </span>
                            <Actions item={task} type="task" />
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;
