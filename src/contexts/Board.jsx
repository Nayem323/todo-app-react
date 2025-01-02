import { createContext, useContext, useReducer } from "react";
import { boardReducer } from "../reducers/board";

export const BoardContext = createContext();

const BoardProvider = ({ children }) => {
    const [boards, dispatch] = useReducer(boardReducer, []);

    const handleAddBoard = (title) => {
        dispatch({ type: "CREATE_BOARD", payload: { title } });
    };

    const handleEditBoardTitle = ({ id, title }) => {
        dispatch({ type: "EDIT_BOARD_TITLE", payload: { id, title } });
    };

    const handleDeleteBoard = (id) => {
        dispatch({ type: "DELETE_BOARD", payload: { id } });
    };

    const handleAddListIdToBoard = ({ id, listId }) => {
        dispatch({ type: "ADD_LIST_ID_TO_BOARD", payload: { id, listId } });
    };

    const handleDeleteListIdFromBoard = ({ id, listId }) => {
        dispatch({
            type: "DELETE_LIST_ID_FROM_BOARD",
            payload: { id, listId },
        });
    };

    const handleAddTaskIdToBoard = ({ id, taskId }) => {
        dispatch({ type: "ADD_TASK_ID_TO_BOARD", payload: { id, taskId } });
    };

    const handleDeleteTaskIdFromBoard = ({ id, taskId }) => {
        dispatch({
            type: "DELETE_TASK_ID_FROM_BOARD",
            payload: { id, taskId },
        });
    };

    return (
        <BoardContext.Provider
            value={{
                boards,
                createBoard: handleAddBoard,
                editBoard: handleEditBoardTitle,
                deleteBoard: handleDeleteBoard,
                addListToBoard: handleAddListIdToBoard,
                deleteListFromBoard: handleDeleteListIdFromBoard,
                addTaskToBoard: handleAddTaskIdToBoard,
                deleteTaskFromBoard: handleDeleteTaskIdFromBoard,
            }}
        >
            {children}
        </BoardContext.Provider>
    );
};

export function useBoard() {
    return useContext(BoardContext);
}

export default BoardProvider;
