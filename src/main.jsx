import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./router/router.jsx";
import TaskProvider from "./contexts/Task.jsx";
import ListProvider from "./contexts/List.jsx";
import BoardProvider from "./contexts/Board.jsx";
import { StrictMode } from "react";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BoardProvider>
            <ListProvider>
                <TaskProvider>
                    <RouterProvider router={router} />
                    <ToastContainer />
                </TaskProvider>
            </ListProvider>
        </BoardProvider>
    </StrictMode>
);
