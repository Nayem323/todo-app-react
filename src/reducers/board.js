export const boardReducer = (boards = [], action) => {
    switch (action.type) {
        case "CREATE_BOARD": {
            const newBoard = {
                id: Date.now().toString(),
                title: action.payload.title,
                lists: [],
                tasks: [],
            };

            return [...boards, newBoard];
        }
        case "EDIT_BOARD_TITLE": {
            const { id, title } = action.payload;
            return boards.map((board) =>
                board.id === id ? { ...board, title } : board
            );
        }
        case "DELETE_BOARD": {
            return boards.filter((board) => board.id !== action.payload.id);
        }
        case "ADD_LIST_ID_TO_BOARD": {
            return boards.map((board) => {
                if (board.id === action.payload.id) {
                    return {
                        ...board,
                        lists: [...board.lists, action.payload.listId],
                    };
                }
                return board;
            });
        }
        case "DELETE_LIST_ID_FROM_BOARD": {
            return boards.map((board) => {
                if (board.id === action.payload.id) {
                    return {
                        ...board,
                        lists: board.lists.filter(
                            (listId) => listId !== action.payload.listId
                        ),
                    };
                }
                return board;
            });
        }
        case "ADD_TASK_ID_TO_BOARD": {
            return boards.map((board) => {
                if (board.id === action.payload.id) {
                    return {
                        ...board,
                        tasks: [...board.tasks, action.payload.taskId],
                    };
                }
                return board;
            });
        }
        case "DELETE_TASK_ID_FROM_BOARD": {
            return boards.map((board) => {
                if (board.id === action.payload.id) {
                    return {
                        ...board,
                        tasks: board.tasks.filter(
                            (taskId) => taskId != action.payload.taskId
                        ),
                    };
                }
                return board;
            });
        }
        default: {
            return boards;
        }
    }
};
