import { useEffect, useState } from "react";
import api from "../api/axios";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);

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

  const filteredBookings = bookings.filter((booking) => {

  const term = search.toLowerCase();

  return (
    booking.full_name.toLowerCase().includes(term) ||
    booking.email.toLowerCase().includes(term) ||
    booking.destination.toLowerCase().includes(term)
  );

});

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Bookings
      </h1>

      <div className="mb-6">

        <input
          type="text"
          placeholder="Search by name, email or destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

       </div>

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

            {filteredBookings.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50">

                <td className="px-4 py-3">{b.id}</td>
                <td className="px-4 py-3 font-medium">{b.full_name}</td>
                <td className="px-4 py-3">{b.email}</td>
                <td className="px-4 py-3">{b.destination}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      b.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : b.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : b.status === "completed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {b.number_of_people}
                </td>

                <td className="px-4 py-3 space-x-2">

                  <button
                    onClick={() => setSelectedBooking(b)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600">
                        View
                  </button>

                  <button
                    onClick={() => updateStatus(b.id, "pending")}
                    className="bg-yellow-500 text-white px-2 py-1 rounded text-xs hover:bg-yellow-600"
                  >
                    Pending
                  </button>

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
{selectedBooking && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Booking Details
        </h2>

        <button
          onClick={() => setSelectedBooking(null)}
          className="text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

      </div>


      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-gray-500">Full Name</p>
          <p className="font-semibold">
            {selectedBooking.full_name}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-semibold">
            {selectedBooking.email}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Destination</p>
          <p className="font-semibold">
            {selectedBooking.destination}
          </p>
        </div>

        <div>
          <p className="text-gray-500">People</p>
          <p className="font-semibold">
            {selectedBooking.number_of_people}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Status</p>
          <p className="font-semibold">
            {selectedBooking.status}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Created</p>
          <p className="font-semibold">
            {selectedBooking.created_at}
          </p>
        </div>

      </div>

    </div>

  </div>
)}
    </div>
  );
}

export default Bookings;