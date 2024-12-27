export const taskReducer = (tasks = [], action) => {
    switch (action.type) {
        case "CREATE_TASK": {
            return [...tasks, action.payload];
        }
        case "EDIT_TASK_TITLE": {
            const { id, title } = action.payload;
            return tasks.map((task) =>
                task.id === id ? { ...task, title } : task
            );
        }
        case "CHANGE_LIST_ID": {
            const { id, listId } = action.payload;
            return tasks.map((task) =>
                task.id === id ? { ...task, listId } : task
            );
        }
        case "CHANGE_BOARD_ID": {
            const { id, boardId } = action.payload;
            return tasks.map((task) =>
                task.id === id ? { ...task, boardId } : task
            );
        }
        case "DELETE_TASK": {
            return tasks.filter((task) => task.id !== action.payload.id);
        }
        default: {
            return tasks;
        }
    }
};
