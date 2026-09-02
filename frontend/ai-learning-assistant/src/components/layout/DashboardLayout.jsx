import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <Sidebar />

            <div className="flex-1 flex flex-col">
                <Topbar />

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}