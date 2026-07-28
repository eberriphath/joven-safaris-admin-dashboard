import { NavLink } from "react-router-dom";
import { logout } from "../services/auth";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  return (
    <aside
  className={`
    fixed
    inset-y-0
    left-0
    z-50
    w-64
   bg-[#2C1810]
    text-[#F5ECD7]
    flex
    flex-col
    transform
    transition-transform
    duration-300

    md:static
    md:translate-x-0

    ${
      sidebarOpen
      ? "translate-x-0"
      : "-translate-x-full"
    }
  `}

  

>

  <button
  onClick={() => setSidebarOpen(false)}
  className="
    md:hidden
    absolute
    top-4
    right-4
    text-[#F5ECD7]
    text-2xl
  "
>
  ✕
</button>

      {/* Logo */}
      <div className="p-6 border-b border-[#4A3427]">
<h1 className="
text-2xl
font-serif
font-bold
text-[#D4A940]
">
  Joven Safaris
</h1>

<p className="
text-sm
text-[#D8C8B4]
tracking-wide
">
  Administration
</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block rounded-lg px-4 py-3 mb-2 ${
              isActive
                ? "bg-[#D4A940] text-[#2C1810]"
                : "hover:bg-[#3A2417]"
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
                ? "bg-[#D4A940] text-[#2C1810]"
                : "hover:bg-[#3A2417]"
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
                ? "bg-[#D4A940] text-[#2C1810]"
                : "hover:bg-[#3A2417]"
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
                ? "bg-[#D4A940] text-[#2C1810]"
                : "hover:bg-[#3A2417]"
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
                ? "bg-[#D4A940] text-[#2C1810]"
                : "hover:bg-[#3A2417]"
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
          className="w-full rounded-lg bg-[#8B2E2E] hover:bg-[#6F2323]"
        >
          Logout
        </button>
      </div>

    </aside>
  );
}

export default Sidebar;