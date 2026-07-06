import { useEffect, useState } from "react";
import api from "../api/axios";
import { logout } from "../services/auth";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    api.get("/admin/bookings")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
      });
  }, []);

  function updateStatus(id, status) {
    api.put(`/admin/bookings/${id}/status`, { status })
      .then(() => {
        setBookings((prev) =>
          prev.map((b) =>
            b.id === id ? { ...b, status } : b
          )
        );
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
      });
  }

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full text-sm text-left">

          <thead className="bg-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Destination</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">People</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">

            {bookings.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">

                <td className="px-4 py-3">{b.id}</td>
                <td className="px-4 py-3 font-medium">{b.full_name}</td>
                <td className="px-4 py-3">{b.email}</td>
                <td className="px-4 py-3">{b.destination}</td>

                {/* STATUS BADGE */}
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      b.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : b.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className="px-4 py-3">{b.number_of_people}</td>

                {/* ACTIONS */}
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => updateStatus(b.id, "confirmed")}
                    className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() => updateStatus(b.id, "cancelled")}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </div>
  );
}

export default Dashboard;