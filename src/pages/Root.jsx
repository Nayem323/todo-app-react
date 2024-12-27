import { Outlet } from "react-router";
import Nav from "../components/Nav";

export default function Root() {
    return (
        <div className="flex h-screen bg-gray-100">
            <Nav />
            <Outlet />
        </div>
    );
}
