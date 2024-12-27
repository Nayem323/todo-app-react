import { useState } from "react";
import { useBoard } from "../contexts/Board";

export default function CreateBoardButton() {
    const [showModal, setShowModal] = useState(false);
    const [boardTitle, setBoardTitle] = useState("");

    const { createBoard } = useBoard();

    const submitHandler = (e) => {
        e.preventDefault();
        createBoard(boardTitle);
        setShowModal(false);
        setBoardTitle("");
    };

    return (
        <div className="relative bg-gray-200 rounded-lg shadow-md flex items-center justify-center p-4">
            <button onClick={() => setShowModal(true)} className="py-3">
                Create New Board
            </button>

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    {/* Modal Container */}
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96 z-10">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">
                            Create a New Board
                        </h2>
                        <form onSubmit={submitHandler}>
                            <input
                                type="text"
                                placeholder="Enter board name"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                                value={boardTitle}
                                onChange={(e) => setBoardTitle(e.target.value)}
                            />
                            <div className="flex justify-end space-x-2">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                    {/* Overlay */}
                    <div
                        onClick={() => setShowModal(false)}
                        className="fixed inset-0 bg-black bg-opacity-30"
                    ></div>
                </div>
            )}
        </div>
    );
}
