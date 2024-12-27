import BoardList from "../components/BoardList";
import CreateBoardButton from "../components/CreateBoardButton";

export default function Boards() {
    return (
        <div className="flex-1 flex flex-col">
            <header className="bg-customBlueDark shadow-md p-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-white">Boards</h1>
            </header>

            <main className="p-4 py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <CreateBoardButton />
                    <BoardList />
                </div>
            </main>
        </div>
    );
}
