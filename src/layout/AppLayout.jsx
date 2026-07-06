import { Outlet, Link } from "react-router-dom";
import { logout } from "../services/auth";

function AppLayout() {

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6">
          Joven Safaris Admin
        </h2>

        <nav className="space-y-3">
          <Link className="block hover:text-blue-400" to="/dashboard">
            Bookings
          </Link>

          <Link className="block hover:text-blue-400" to="/bookings">
            Manage Bookings
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500 px-3 py-2 rounded w-full"
        >
          Logout
        </button>
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
}

export default AppLayout;