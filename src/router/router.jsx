import { createBrowserRouter } from "react-router";
import Root from "../pages/Root";
import Boards from "../pages/Boards";
import BoardDetails from "../pages/BoardDetails";
import ErrorPage from "../pages/ErrorPage";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            { path: "*", element: <NotFound /> },
            { path: "/", element: <Boards /> },
            { path: "/board/:boardId", element: <BoardDetails /> },
        ],
    },
]);
