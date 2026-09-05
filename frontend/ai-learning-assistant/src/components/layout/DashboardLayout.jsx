import Topbar from "./Topbar";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-dark">
            <Topbar />

            <main className="min-h-[calc(100vh-80px)] px-6 py-8 lg:px-10">
                {children}
            </main>
        </div>
    );
}