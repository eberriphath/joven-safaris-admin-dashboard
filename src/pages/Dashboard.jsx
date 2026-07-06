import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {

  const [stats, setStats] = useState(null);

  useEffect(() => {

    api.get("/admin/dashboard")
      .then((res) => {
        setStats(res.data);
      })
      .catch((err) => {
        console.log(
          err.response?.data || err.message
        );
      });

  }, []);


  if (!stats) {
    return (
      <div className="text-gray-600">
        Loading dashboard...
      </div>
    );
  }


  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">
        Dashboard Overview
      </h1>


      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Total Bookings
          </h2>

          <p className="text-3xl font-bold mt-2">
            {stats.total_bookings}
          </p>
        </div>


        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Pending
          </h2>

          <p className="text-3xl font-bold mt-2 text-yellow-500">
            {stats.pending}
          </p>
        </div>


        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Confirmed
          </h2>

          <p className="text-3xl font-bold mt-2 text-green-600">
            {stats.confirmed}
          </p>
        </div>


        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">
            Cancelled
          </h2>

          <p className="text-3xl font-bold mt-2 text-red-500">
            {stats.cancelled}
          </p>
        </div>

      </div>


      {/* RECENT BOOKINGS */}
      <div className="mt-8 bg-white rounded-xl shadow p-6">

        <h2 className="text-xl font-bold mb-4">
          Recent Bookings
        </h2>


        <table className="w-full">

          <thead>
            <tr className="border-b">

              <th className="text-left p-3">
                Name
              </th>

              <th className="text-left p-3">
                Destination
              </th>

              <th className="text-left p-3">
                Status
              </th>

            </tr>
          </thead>


          <tbody>

            {stats.recent_bookings.map((booking) => (

              <tr
                key={booking.id}
                className="border-b"
              >

                <td className="p-3">
                  {booking.full_name}
                </td>


                <td className="p-3">
                  {booking.destination}
                </td>


                <td className="p-3">

                  <span
                    className={`
                      px-3 py-1 rounded-full text-sm
                      ${
                        booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        :
                        booking.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        :
                        "bg-yellow-100 text-yellow-700"
                      }
                    `}
                  >
                    {booking.status}
                  </span>

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