import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

/**
 * Shell used to wrap every authenticated route:
 *
 * <Route element={<ProtectedRoute />}>
 *   <Route element={<AppLayout />}>
 *     <Route path="/dashboard" element={<DashboardPage />} />
 *     ...
 *   </Route>
 * </Route>
 */
const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;