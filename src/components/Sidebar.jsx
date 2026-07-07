import { NavLink } from "react-router-dom";
import { logout } from "../services/auth";

function Sidebar() {

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col">

      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold">
          Joven Safaris
        </h1>

        <p className="text-sm text-slate-400">
          Admin Panel
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 mb-2 ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/bookings"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 mb-2 ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`
          }
        >
          Bookings
        </NavLink>

        <NavLink
          to="/reviews"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 mb-2 ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`
          }
        >
          Reviews
        </NavLink>

        <NavLink
          to="/packages"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`
          }
        >
          Packages
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 ${
              isActive
                ? "bg-blue-600"
                : "hover:bg-slate-800"
            }`
          }
        >
          Settings
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full rounded-lg bg-red-500 py-2 hover:bg-red-600"
        >
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;