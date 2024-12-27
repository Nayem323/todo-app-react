export const listReducer = (lists = [], action) => {
    switch (action.type) {
        case "CREATE_LIST": {
            const { id, title, boardId } = action.payload;
            const newList = {
                id,
                title,
                boardId,
                tasks: [],
            };
            return [...lists, newList];
        }
        case "EDIT_LIST_TITLE": {
            const { id, title } = action.payload;
            return lists.map((list) =>
                list.id === id ? { ...list, title } : list
            );
        }
        case "CHANGE_BOARD": {
            const { id, boardId } = action.payload;
            return lists.map((list) =>
                list.id === id ? { ...list, boardId } : list
            );
        }
        case "DELETE_LIST": {
            return lists.filter((list) => list.id !== action.payload.id);
        }
        case "ADD_TASK_ID_TO_LIST": {
            return lists.map((list) =>
                list.id === action.payload.id
                    ? { ...list, tasks: [...list.tasks, action.payload.taskId] }
                    : list
            );
        }
        case "DELETE_TASK_ID_FROM_LIST": {
            return lists.map((list) =>
                list.id === action.payload.id
                    ? {
                          ...list,
                          tasks: list.tasks.filter(
                              (taskId) => taskId !== action.payload.taskId
                          ),
                      }
                    : list
            );
        }
        case "SORT_TASKS": {
            const { source, destination, draggableId } = action.payload;
            return lists.map((list) => {
                if (
                    destination.droppableId === source.droppableId &&
                    source.droppableId === list.id
                ) {
                    const tasksCopy = [...list.tasks];
                    tasksCopy.splice(source.index, 1);
                    tasksCopy.splice(destination.index, 0, draggableId);
                    return { ...list, tasks: tasksCopy };
                }

                if (source.droppableId === list.id) {
                    return {
                        ...list,
                        tasks: list.tasks.filter((id) => id !== draggableId),
                    };
                }

                if (destination.droppableId === list.id) {
                    return {
                        ...list,
                        tasks: [
                            ...list.tasks.slice(0, destination.index),
                            draggableId,
                            ...list.tasks.slice(destination.index),
                        ],
                    };
                }
                return list;
            });
        }
        default: {
            return lists;
        }
    }
};
