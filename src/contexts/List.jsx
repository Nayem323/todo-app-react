import { createContext, useContext, useReducer } from "react";
import { listReducer } from "../reducers/list";

export const ListContext = createContext();

const ListProvider = ({ children }) => {
    const [lists, dispatch] = useReducer(listReducer, []);

    const handleAddList = (id, title, boardId) => {
        dispatch({
            type: "CREATE_LIST",
            payload: { id, title, boardId },
        });
    };

    const handleEditListTitle = ({ id, title }) => {
        dispatch({
            type: "EDIT_LIST_TITLE",
            payload: { id, title },
        });
    };

    const handleChangeBoard = ({ id, boardId }) => {
        dispatch({
            type: "CHANGE_BOARD",
            payload: { id, boardId },
        });
    };

    const handleDeleteList = (id) => {
        dispatch({ type: "DELETE_LIST", payload: { id } });
    };

    const handleAddTaskIdToList = ({ id, taskId }) => {
        dispatch({
            type: "ADD_TASK_ID_TO_LIST",
            payload: { id, taskId },
        });
    };

    const handleDeleteTaskIdFromList = ({ id, taskId }) => {
        dispatch({
            type: "DELETE_TASK_ID_FROM_LIST",
            payload: { id, taskId },
        });
    };

    const handleSortTasks = ({ source, destination, draggableId }) => {
        dispatch({
            type: "SORT_TASKS",
            payload: { source, destination, draggableId },
        });
    };

    return (
        <ListContext.Provider
            value={{
                lists,
                createList: handleAddList,
                editList: handleEditListTitle,
                changeListBoard: handleChangeBoard,
                deleteList: handleDeleteList,
                addTaskToList: handleAddTaskIdToList,
                deleteTaskFromList: handleDeleteTaskIdFromList,
                sortTasks: handleSortTasks,
            }}
        >
            {children}
        </ListContext.Provider>
    );
};

export function useList() {
    return useContext(ListContext);
}

export default ListProvider;
