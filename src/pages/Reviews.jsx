import { useEffect, useState } from "react";
import api from "../api/axios";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  function fetchReviews() {
    api
      .get("/admin/reviews")
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
      });
  }

  function deleteReview(id) {

  api
    .delete(`/admin/reviews/${id}`)
    .then(() => {

      setReviews((prev) =>
        prev.filter((review) => review.id !== id)
      );

    })
    .catch((err) => {
      console.log(err.response?.data || err.message);
    });

}

  function approveReview(id) {
  api
    .put(`/admin/reviews/${id}/approve`)
    .then(() => {
      setReviews((prev) =>
        prev.map((review) =>
          review.id === id
            ? { ...review, approved: true }
            : review
        )
      );
    })
    .catch((err) => {
      console.log(err.response?.data || err.message);
    });
}

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-6">
        Reviews
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">

        <table className="min-w-full">

          <thead className="bg-gray-200">

            <tr>

              <th className="px-4 py-3 text-left">
                Customer
              </th>

              <th className="px-4 py-3 text-left">
                Location
              </th>

              <th className="px-4 py-3 text-left">
                Rating
              </th>

              <th className="px-4 py-3 text-left">
                Status
              </th>

              <th className="px-4 py-3 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {reviews.map((review) => (

              <tr
                key={review.id}
                className="border-t"
              >

                <td className="px-4 py-3">
                  {review.name}
                </td>

                <td className="px-4 py-3">
                  {review.location}
                </td>

                <td className="px-4 py-3">
                  {"⭐".repeat(review.rating)}
                </td>

                <td className="px-4 py-3">

                  {review.approved ? (

                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      Approved
                    </span>

                  ) : (

                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                      Pending
                    </span>

                  )}

                </td>

<td className="px-4 py-3 space-x-2">

  <button
    onClick={() => setSelectedReview(review)}
    className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
  >
    View
  </button>


  {!review.approved && (
    <button
      onClick={() => approveReview(review.id)}
      className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
    >
      Approve
    </button>
    
  )}

  <button
  onClick={() => deleteReview(review.id)}
  className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
>
  Delete
</button>

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      {selectedReview && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Review Details
        </h2>

        <button
          onClick={() => setSelectedReview(null)}
          className="text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>

      </div>


      <div className="space-y-4">

        <div>
          <p className="text-gray-500">
            Name
          </p>

          <p className="font-semibold">
            {selectedReview.name}
          </p>
        </div>


        <div>
          <p className="text-gray-500">
            Location
          </p>

          <p className="font-semibold">
            {selectedReview.location || "Not provided"}
          </p>
        </div>


        <div>
          <p className="text-gray-500">
            Rating
          </p>

          <p className="text-xl">
            {"⭐".repeat(selectedReview.rating)}
          </p>
        </div>


        <div>
          <p className="text-gray-500">
            Message
          </p>

          <p className="font-medium">
            {selectedReview.message}
          </p>
        </div>


        <div>
          <p className="text-gray-500">
            Status
          </p>

          <p className="font-semibold">
            {selectedReview.approved ? "Approved" : "Pending"}
          </p>
        </div>

      </div>

    </div>

  </div>
)}

    </div>
  );
}

export default Reviews;