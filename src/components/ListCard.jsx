import { useState } from "react";
import AddItem from "./AddItem";
import AddItemForm from "./AddItemForm";
import { useTask } from "../contexts/Task";
import { useList } from "../contexts/List";
import { useBoard } from "../contexts/Board";
import TaskCard from "./TaskCard";
import Actions from "./Actions";
import { Droppable } from "@hello-pangea/dnd";

const ListCard = ({ list }) => {
    const [editMode, setEditMode] = useState(false);
    const [taskTitle, setTaskTitle] = useState("");
    const [listTitle, setListTitle] = useState(list.title);
    const [editListMode, setEditListMode] = useState(false);

    const { tasks, createTask } = useTask();
    const { addTaskToList, editList } = useList();
    const { addTaskToBoard } = useBoard();

    const submitHandler = (e) => {
        e.preventDefault();
        const id = Date.now().toString();
        createTask(id, taskTitle, list.id, list.boardId);
        addTaskToList({ id: list.id, taskId: id });
        addTaskToBoard({ id: list.boardId, taskId: id });
        setTaskTitle("");
        setEditMode(false);
    };

    const editListHandler = (e) => {
        e.preventDefault();
        editList({ id: list.id, title: listTitle });
        setEditListMode(false);
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
                        <div className="flex items-center justify-between mb-4 relative">
                            {editListMode ? (
                                <AddItemForm
                                    type="List"
                                    setEditMode={setEditListMode}
                                    title={listTitle}
                                    onChangeHandler={(e) =>
                                        setListTitle(e.target.value)
                                    }
                                    submitHandler={editListHandler}
                                    label="Update"
                                />
                            ) : (
                                <>
                                    <p
                                        className="text-lg font-semibold text-gray-800 truncate w-full"
                                        onClick={() => setEditListMode(true)}
                                    >
                                        {list.title}
                                    </p>
                                    <Actions item={list} type="list" />
                                </>
                            )}
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
