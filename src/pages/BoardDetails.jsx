import { useState } from "react";
import AddItem from "../components/AddItem";
import AddItemForm from "../components/AddItemForm";
import { useList } from "../contexts/List";
import { Link, useParams } from "react-router";
import { useBoard } from "../contexts/Board";
import ListCard from "../components/ListCard";
import { DragDropContext } from "@hello-pangea/dnd";
import { useTask } from "../contexts/Task";

export default function BoardDetails() {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState("");
    const { boardId } = useParams();
    const { lists, createList, deleteTaskFromList, addTaskToList, sortTasks } =
        useList();
    const { boards, addListToBoard } = useBoard();
    const { tasks, changeTaskList } = useTask();

    const submitHandler = (e) => {
        e.preventDefault();
        const id = Date.now().toString();
        createList(id, title, boardId);
        addListToBoard({ id: boardId, listId: id });
        setTitle("");
        setEditMode(false);
    };

    const renderedLists = lists.filter((list) => list.boardId === boardId);

    const board = boards.find((board) => board.id === boardId);

    const dragHandler = (result) => {
        const { destination, source, draggableId } = result;

        if (
            !destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)
        ) {
            return;
        }

        if (destination.droppableId != source.droppableId) {
            changeTaskList({
                id: draggableId,
                listId: destination.droppableId,
            });
            sortTasks({ source, destination, draggableId });
        } else {
            sortTasks({ source, destination, draggableId });
        }
    };

    return (
        <>
            {board ? (
                <div className="flex-1 flex flex-col overflow-auto bg-gray-50">
                    <header className="bg-customBlueDark shadow-md p-4 flex items-center justify-between fixed w-full">
                        <h1 className="text-xl font-semibold text-white">
                            {board.title}
                        </h1>
                    </header>
                    <DragDropContext onDragEnd={dragHandler}>
                        <main className="p-4 py-8 mt-16">
                            <div className="inline-flex">
                                {renderedLists.map((list) => (
                                    <ListCard list={list} key={list.id} />
                                ))}
                                {editMode ? (
                                    <AddItemForm
                                        type="List"
                                        setEditMode={setEditMode}
                                        title={title}
                                        onChangeHandler={(e) =>
                                            setTitle(e.target.value)
                                        }
                                        submitHandler={submitHandler}
                                    />
                                ) : (
                                    <AddItem
                                        type="List"
                                        setEditMode={setEditMode}
                                    />
                                )}
                            </div>
                        </main>
                    </DragDropContext>
                </div>
            ) : (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-lg text-gray-800">
                        Board not found. Please create a board first{" "}
                        <Link to="/" className="text-blue-600 hover:underline">
                            Boards
                        </Link>
                        .
                    </p>
                </div>
            )}
        </>
    );
}
