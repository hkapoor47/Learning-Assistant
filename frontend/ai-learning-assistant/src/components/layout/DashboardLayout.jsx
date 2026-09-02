import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-dark flex">

            <Sidebar />

            <div className="flex-1 flex flex-col min-w-0">
                <Topbar />

                <main className="flex-1 p-6 lg:p-8">
                    {children}
                </main>
            </div>

        </div>
    );
}