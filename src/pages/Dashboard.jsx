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

//////////////////////////////////////////////////////////////////////////////////////////////////////

return (
  <div>

    {/* PAGE HEADER */}

    <div className="mb-8">

      <h1
        className="
        text-3xl
        md:text-4xl
        font-serif
        font-bold
        text-[#2C1810]
        "
      >
        Dashboard Overview
      </h1>

      <p
        className="
        mt-2
        text-[#6B5744]
        "
      >
        Welcome back. Here's what's happening today.
      </p>

    </div>

    {/* STAT CARDS */}

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      <div
        className="
        bg-white
        p-6
        rounded-xl
        shadow-md
        border
        border-[#E8DCC5]
        "
      >

        <h2
          className="
          text-[#6B5744]
          uppercase
          tracking-wide
          text-sm
          "
        >
          Total Bookings
        </h2>

        <p
          className="
          text-4xl
          font-bold
          mt-3
          text-[#2C1810]
          "
        >
          {stats.total_bookings}
        </p>

      </div>

      <div
        className="
        bg-white
        p-6
        rounded-xl
        shadow-md
        border
        border-[#E8DCC5]
        "
      >

        <h2
          className="
          text-[#6B5744]
          uppercase
          tracking-wide
          text-sm
          "
        >
          Pending
        </h2>

        <p
          className="
          text-4xl
          font-bold
          mt-3
          text-[#C4873A]
          "
        >
          {stats.pending}
        </p>

      </div>

      <div
        className="
        bg-white
        p-6
        rounded-xl
        shadow-md
        border
        border-[#E8DCC5]
        "
      >

        <h2
          className="
          text-[#6B5744]
          uppercase
          tracking-wide
          text-sm
          "
        >
          Confirmed
        </h2>

        <p
          className="
          text-4xl
          font-bold
          mt-3
          text-[#2D5016]
          "
        >
          {stats.confirmed}
        </p>

      </div>

      <div
        className="
        bg-white
        p-6
        rounded-xl
        shadow-md
        border
        border-[#E8DCC5]
        "
      >

        <h2
          className="
          text-[#6B5744]
          uppercase
          tracking-wide
          text-sm
          "
        >
          Cancelled
        </h2>

        <p
          className="
          text-4xl
          font-bold
          mt-3
          text-[#8B2E2E]
          "
        >
          {stats.cancelled}
        </p>

      </div>

    </div>

    {/* RECENT BOOKINGS */}

    <div
      className="
      mt-8
      bg-white
      rounded-xl
      shadow-md
      border
      border-[#E8DCC5]
      p-4
      md:p-6
      "
    >

      <h2
        className="
        text-2xl
        font-serif
        font-bold
        text-[#2C1810]
        mb-6
        "
      >
        Recent Bookings
      </h2>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead>

            <tr className="border-b border-[#E8DCC5]">

              <th
                className="
                text-left
                px-4
                py-3
                whitespace-nowrap
                text-[#6B5744]
                uppercase
                tracking-wide
                text-xs
                font-semibold
                "
              >
                Name
              </th>

              <th
                className="
                text-left
                px-4
                py-3
                whitespace-nowrap
                text-[#6B5744]
                uppercase
                tracking-wide
                text-xs
                font-semibold
                "
              >
                Destination
              </th>

              <th
                className="
                text-left
                px-4
                py-3
                whitespace-nowrap
                text-[#6B5744]
                uppercase
                tracking-wide
                text-xs
                font-semibold
                "
              >
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {stats.recent_bookings.map((booking) => (

              <tr
                key={booking.id}
                className="
                border-b
                border-[#F5ECD7]
                hover:bg-[#FAF6EE]
                transition
                "
              >

                <td
                  className="
                  px-4
                  py-4
                  whitespace-nowrap
                  text-[#2C1810]
                  "
                >
                  {booking.full_name}
                </td>

                <td
                  className="
                  px-4
                  py-4
                  whitespace-nowrap
                  text-[#6B5744]
                  "
                >
                  {booking.destination}
                </td>

                <td className="px-4 py-4 whitespace-nowrap">

                  <span
                    className={`
                      inline-block
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      md:text-sm
                      font-medium

                      ${
                        booking.status === "confirmed"
                          ? "bg-[#2D5016] text-white"
                          : booking.status === "cancelled"
                          ? "bg-[#FDECEC] text-[#8B2E2E]"
                          : "bg-[#F5ECD7] text-[#8B4513]"
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

  </div>
);
}

export default Dashboard;