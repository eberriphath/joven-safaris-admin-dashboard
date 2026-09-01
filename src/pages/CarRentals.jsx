import { useEffect, useState } from "react";
import api from "../api/axios";

function CarRentals() {

  const [rentals, setRentals] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedRental, setSelectedRental] =
    useState(null);


  // ==========================================
  // FETCH RENTALS
  // ==========================================

  const fetchRentals = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await api.get(
        "/admin/car-rentals"
      );

      setRentals(response.data);

    } catch (err) {

      console.error(err);

      setError(
        err.response?.data?.error ||
        "Unable to load car rental requests."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    fetchRentals();

  }, []);


  // ==========================================
  // UPDATE STATUS
  // ==========================================

  const updateStatus = async (
    rentalId,
    status
  ) => {

    try {

      await api.put(
        `/admin/car-rentals/${rentalId}/status`,
        {
          status
        }
      );


      setRentals((currentRentals) =>

        currentRentals.map((rental) =>

          rental.id === rentalId

            ? {
                ...rental,
                status
              }

            : rental

        )

      );


      setSelectedRental((current) =>

        current
          ? {
              ...current,
              status
            }
          : null

      );


    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.error ||
        "Unable to update rental status."
      );

    }

  };


  // ==========================================
  // DELETE RENTAL
  // ==========================================

  const deleteRental = async (
    rentalId
  ) => {

    const confirmed = window.confirm(
      "Are you sure you want to delete this rental request?"
    );


    if (!confirmed) {
      return;
    }


    try {

      await api.delete(
        `/admin/car-rentals/${rentalId}`
      );


      setRentals((currentRentals) =>

        currentRentals.filter(
          (rental) =>
            rental.id !== rentalId
        )

      );


      setSelectedRental(null);


    } catch (err) {

      console.error(err);

      alert(
        err.response?.data?.error ||
        "Unable to delete rental request."
      );

    }

  };


  // ==========================================
  // STATUS STYLE
  // ==========================================

  const getStatusClass = (status) => {

    switch (status) {

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="p-8">

        <p className="text-gray-500">
          Loading car rental requests...
        </p>

      </div>

    );

  }


  // ==========================================
  // ERROR
  // ==========================================

  if (error) {

    return (

      <div className="p-8">

        <div className="
          bg-red-50
          border
          border-red-200
          text-red-600
          p-4
          rounded-lg
        ">

          {error}

        </div>

      </div>

    );

  }


  return (

    <div className="p-8">


      {/* ======================================
          HEADER
      ======================================= */}

      <div className="
        flex
        justify-between
        items-center
        mb-8
      ">

        <div>

          <h1 className="
            text-3xl
            font-bold
            text-gray-900
          ">

            Car Rentals

          </h1>


          <p className="
            text-gray-500
            mt-2
          ">

            Manage customer vehicle rental requests.

          </p>

        </div>


        <div className="
          bg-white
          border
          border-gray-200
          rounded-lg
          px-5
          py-3
        ">

          <span className="
            text-sm
            text-gray-500
          ">

            Total Requests

          </span>


          <div className="
            text-2xl
            font-bold
            text-gray-900
          ">

            {rentals.length}

          </div>

        </div>

      </div>


      {/* ======================================
          EMPTY STATE
      ======================================= */}

      {rentals.length === 0 ? (

        <div className="
          bg-white
          border
          border-gray-200
          rounded-xl
          p-12
          text-center
        ">

          <h2 className="
            text-xl
            font-semibold
            text-gray-800
          ">

            No rental requests yet

          </h2>


          <p className="
            text-gray-500
            mt-2
          ">

            New car rental requests will appear here.

          </p>

        </div>

      ) : (

        <div className="
          bg-white
          border
          border-gray-200
          rounded-xl
          overflow-hidden
        ">


          {/* ==================================
              TABLE
          =================================== */}

          <div className="overflow-x-auto">

            <table className="
              w-full
              text-left
            ">

              <thead className="
                bg-gray-50
                border-b
                border-gray-200
              ">

                <tr>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Vehicle
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Pickup
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Drop-off
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Status
                  </th>

                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {rentals.map((rental) => (

                  <tr
                    key={rental.id}
                    className="
                      border-b
                      border-gray-100
                      hover:bg-gray-50
                    "
                  >

                    <td className="px-6 py-4">

                      <div className="
                        font-medium
                        text-gray-900
                      ">

                        {rental.full_name}

                      </div>


                      <div className="
                        text-sm
                        text-gray-500
                      ">

                        {rental.email}

                      </div>

                    </td>


                    <td className="
                      px-6
                      py-4
                      text-gray-700
                    ">

                      {rental.vehicle_type}

                    </td>


                    <td className="px-6 py-4">

                      <div className="
                        text-gray-800
                      ">

                        {rental.pickup_location}

                      </div>

                      <div className="
                        text-sm
                        text-gray-500
                      ">

                        {rental.pickup_date}
                        {" · "}
                        {rental.pickup_time}

                      </div>

                    </td>


                    <td className="px-6 py-4">

                      <div className="
                        text-gray-800
                      ">

                        {rental.dropoff_location}

                      </div>

                      <div className="
                        text-sm
                        text-gray-500
                      ">

                        {rental.dropoff_date}
                        {" · "}
                        {rental.dropoff_time}

                      </div>

                    </td>


                    <td className="px-6 py-4">

                      <span className={`
                        inline-flex
                        px-3
                        py-1
                        rounded-full
                        text-xs
                        font-semibold
                        capitalize
                        ${getStatusClass(
                          rental.status
                        )}
                      `}>

                        {rental.status}

                      </span>

                    </td>


                    <td className="px-6 py-4">

                      <button
                        type="button"
                        onClick={() =>
                          setSelectedRental(
                            rental
                          )
                        }
                        className="
                          text-blue-600
                          hover:text-blue-800
                          font-medium
                          text-sm
                        "
                      >

                        View Details

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      )}


      {/* ======================================
          DETAILS MODAL
      ======================================= */}

      {selectedRental && (

        <div className="
          fixed
          inset-0
          bg-black/50
          flex
          items-center
          justify-center
          p-4
          z-50
        ">

          <div className="
            bg-white
            rounded-2xl
            shadow-xl
            w-full
            max-w-3xl
            max-h-[90vh]
            overflow-y-auto
          ">


            {/* MODAL HEADER */}

            <div className="
              flex
              justify-between
              items-center
              px-6
              py-5
              border-b
              border-gray-200
            ">

              <div>

                <h2 className="
                  text-xl
                  font-bold
                  text-gray-900
                ">

                  Car Rental Request

                </h2>


                <p className="
                  text-sm
                  text-gray-500
                  mt-1
                ">

                  Request #{selectedRental.id}

                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setSelectedRental(null)
                }
                className="
                  text-gray-400
                  hover:text-gray-700
                  text-2xl
                "
              >

                ×

              </button>

            </div>


            <div className="p-6 space-y-8">


              {/* CUSTOMER */}

              <section>

                <h3 className="
                  text-lg
                  font-semibold
                  text-gray-900
                  mb-4
                ">

                  Customer Information

                </h3>


                <div className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-4
                ">

                  <Detail
                    label="Full Name"
                    value={
                      selectedRental.full_name
                    }
                  />

                  <Detail
                    label="Email"
                    value={
                      selectedRental.email
                    }
                  />

                  <Detail
                    label="Phone"
                    value={
                      selectedRental.phone
                    }
                  />

                </div>

              </section>


              {/* RENTAL */}

              <section>

                <h3 className="
                  text-lg
                  font-semibold
                  text-gray-900
                  mb-4
                ">

                  Rental Information

                </h3>


                <div className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-4
                ">

                  <Detail
                    label="Vehicle Type"
                    value={
                      selectedRental.vehicle_type
                    }
                  />

                  <Detail
                    label="Pickup Location"
                    value={
                      selectedRental.pickup_location
                    }
                  />

                  <Detail
                    label="Pickup Date"
                    value={
                      selectedRental.pickup_date
                    }
                  />

                  <Detail
                    label="Pickup Time"
                    value={
                      selectedRental.pickup_time
                    }
                  />

                  <Detail
                    label="Drop-off Location"
                    value={
                      selectedRental.dropoff_location
                    }
                  />

                  <Detail
                    label="Drop-off Date"
                    value={
                      selectedRental.dropoff_date
                    }
                  />

                  <Detail
                    label="Drop-off Time"
                    value={
                      selectedRental.dropoff_time
                    }
                  />

                </div>

              </section>


              {/* DRIVER */}

              <section>

                <h3 className="
                  text-lg
                  font-semibold
                  text-gray-900
                  mb-4
                ">

                  Driver Information

                </h3>


                <div className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-4
                ">

                  <Detail
                    label="Driver Age"
                    value={
                      selectedRental.driver_age ||
                      "Not provided"
                    }
                  />

                  <Detail
                    label="Driving License"
                    value={
                      selectedRental.driving_license_number ||
                      "Not provided"
                    }
                  />

                  <Detail
                    label="License Country"
                    value={
                      selectedRental.license_country ||
                      "Not provided"
                    }
                  />

                </div>

              </section>


              {/* SPECIAL REQUESTS */}

              <section>

                <h3 className="
                  text-lg
                  font-semibold
                  text-gray-900
                  mb-4
                ">

                  Special Requests

                </h3>


                <div className="
                  bg-gray-50
                  rounded-lg
                  p-4
                  text-gray-700
                ">

                  {selectedRental.special_requests ||
                    "None"}

                </div>

              </section>


              {/* STATUS */}

              <section>

                <h3 className="
                  text-lg
                  font-semibold
                  text-gray-900
                  mb-4
                ">

                  Manage Status

                </h3>


                <div className="
                  flex
                  flex-wrap
                  gap-3
                ">

                  {[
                    "pending",
                    "confirmed",
                    "rejected",
                    "completed"
                  ].map((status) => (

                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        updateStatus(
                          selectedRental.id,
                          status
                        )
                      }
                      className={`
                        px-4
                        py-2
                        rounded-lg
                        text-sm
                        font-semibold
                        capitalize
                        transition
                        ${
                          selectedRental.status === status
                            ? "bg-gray-900 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }
                      `}
                    >

                      {status}

                    </button>

                  ))}

                </div>

              </section>


              {/* DELETE */}

              <div className="
                pt-4
                border-t
                border-gray-200
                flex
                justify-end
              ">

                <button
                  type="button"
                  onClick={() =>
                    deleteRental(
                      selectedRental.id
                    )
                  }
                  className="
                    text-red-600
                    hover:text-red-800
                    text-sm
                    font-medium
                  "
                >

                  Delete Request

                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}


function Detail({
  label,
  value
}) {

  return (

    <div>

      <p className="
        text-xs
        uppercase
        tracking-wide
        text-gray-400
        mb-1
      ">

        {label}

      </p>


      <p className="
        text-gray-800
        font-medium
      ">

        {value}

      </p>

    </div>

  );

}


export default CarRentals;