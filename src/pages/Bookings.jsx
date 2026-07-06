import { useEffect, useState } from "react";
import api from "../api/axios";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    setLoading(true);

    api.get("/admin/bookings")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log("Error loading bookings:", err.response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = (id, status) => {
    api.put(`/admin/bookings/${id}/status`, { status })
      .then(() => {
        fetchBookings();
      })
      .catch((err) => {
        console.log("Status update failed:", err.response);
      });
  };

  if (loading) {
    return <p className="p-4">Loading bookings...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Destination</th>
            <th className="p-2 border">People</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="text-center">
              <td className="p-2 border">{b.full_name}</td>
              <td className="p-2 border">{b.email}</td>
              <td className="p-2 border">{b.destination}</td>
              <td className="p-2 border">{b.number_of_people}</td>
              <td className="p-2 border">{b.status}</td>

              <td className="p-2 border space-x-2">
                <button
                  className="bg-green-500 text-white px-2 py-1"
                  onClick={() => updateStatus(b.id, "confirmed")}
                >
                  Confirm
                </button>

                <button
                  className="bg-yellow-500 text-white px-2 py-1"
                  onClick={() => updateStatus(b.id, "pending")}
                >
                  Pending
                </button>

                <button
                  className="bg-red-500 text-white px-2 py-1"
                  onClick={() => updateStatus(b.id, "cancelled")}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;