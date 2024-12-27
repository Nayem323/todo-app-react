import { createContext, useContext, useReducer } from "react";
import { taskReducer } from "../reducers/task";

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [tasks, dispatch] = useReducer(taskReducer, []);

    const handleAddTask = (id, title, listId, boardId) => {
        dispatch({
            type: "CREATE_TASK",
            payload: { id, title, listId, boardId },
        });
    };

    const handleEditTaskTitle = ({ id, title }) => {
        dispatch({
            type: "EDIT_TASK_TITLE",
            payload: { id, title },
        });
    };

    const handleChangeList = ({ id, listId }) => {
        dispatch({
            type: "CHANGE_LIST_ID",
            payload: { id, listId },
        });
    };

    const handleChangeBoard = ({ id, boardId }) => {
        dispatch({
            type: "CHANGE_BOARD_ID",
            payload: { id, boardId },
        });
    };

    const handleDeleteTask = (id) => {
        dispatch({ type: "DELETE_TASK", payload: { id } });
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                createTask: handleAddTask,
                editTask: handleEditTaskTitle,
                changeTaskList: handleChangeList,
                changeTaskBoard: handleChangeBoard,
                deleteTask: handleDeleteTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

export function useTask() {
    return useContext(TaskContext);
}

export default TaskProvider;
