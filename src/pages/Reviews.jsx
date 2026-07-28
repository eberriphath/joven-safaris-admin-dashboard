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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////


return (
  <div className="min-h-screen bg-[#FAF6EE] p-6">


    <h1
      className="
      text-3xl
      md:text-4xl
      font-serif
      font-bold
      text-[#2C1810]
      mb-6
      "
    >
      Reviews
    </h1>



    {/* DESKTOP TABLE */}

    <div
      className="
      hidden
      lg:block
      bg-white
      rounded-2xl
      shadow-md
      border
      border-[#E8DCC5]
      overflow-hidden
      "
    >

      <table className="min-w-full">


        <thead
          className="
          bg-[#F5ECD7]
          text-[#6B5744]
          uppercase
          text-xs
          tracking-wide
          "
        >

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


          {reviews.map((review)=>(


            <tr
              key={review.id}
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
                text-[#2C1810]
                font-medium
                "
              >
                {review.name}
              </td>



              <td
                className="
                px-4
                py-4
                text-[#6B5744]
                "
              >
                {review.location}
              </td>



              <td className="px-4 py-4 text-lg">
                {"⭐".repeat(review.rating)}
              </td>



              <td className="px-4 py-4">


                {review.approved ? (

                  <span
                    className="
                    bg-[#2D5016]
                    text-white
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    "
                  >
                    Approved
                  </span>

                ) : (

                  <span
                    className="
                    bg-[#F5ECD7]
                    text-[#8B4513]
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    "
                  >
                    Pending
                  </span>

                )}


              </td>



              <td className="px-4 py-4 space-x-2">


                <button
                  onClick={()=>setSelectedReview(review)}
                  className="
                  bg-[#8B5E3C]
                  hover:bg-[#6F4A2E]
                  text-white
                  px-3
                  py-1
                  rounded
                  text-xs
                  "
                >
                  View
                </button>



                {!review.approved && (

                  <button
                    onClick={()=>approveReview(review.id)}
                    className="
                    bg-[#2D5016]
                    hover:bg-[#234111]
                    text-white
                    px-3
                    py-1
                    rounded
                    text-xs
                    "
                  >
                    Approve
                  </button>

                )}



                <button
                  onClick={()=>deleteReview(review.id)}
                  className="
                  bg-[#8B2E2E]
                  hover:bg-[#6E2323]
                  text-white
                  px-3
                  py-1
                  rounded
                  text-xs
                  "
                >
                  Delete
                </button>


              </td>


            </tr>


          ))}


        </tbody>


      </table>


    </div>





    {/* MOBILE CARDS */}


    <div className="lg:hidden space-y-4">


      {reviews.map((review)=>(


        <div
          key={review.id}
          className="
          bg-white
          rounded-2xl
          shadow-md
          border
          border-[#E8DCC5]
          p-5
          "
        >


          <div className="flex justify-between items-start">


            <div>

              <h3
                className="
                font-serif
                font-bold
                text-lg
                text-[#2C1810]
                "
              >
                {review.name}
              </h3>


              <p className="text-[#6B5744] text-sm">
                {review.location || "No location"}
              </p>


            </div>



            <span
              className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold

              ${
                review.approved
                ? "bg-[#2D5016] text-white"
                : "bg-[#F5ECD7] text-[#8B4513]"
              }
              `}
            >

              {review.approved ? "Approved" : "Pending"}

            </span>



          </div>





          <div className="mt-4">


            <p className="text-lg">
              {"⭐".repeat(review.rating)}
            </p>


            <p
              className="
              text-sm
              text-[#6B5744]
              mt-2
              line-clamp-3
              "
            >
              {review.message}
            </p>


          </div>





          <div className="grid grid-cols-2 gap-2 mt-5">


            <button
              onClick={()=>setSelectedReview(review)}
              className="
              bg-[#8B5E3C]
              hover:bg-[#6F4A2E]
              text-white
              py-2
              rounded
              "
            >
              View
            </button>



            {!review.approved && (

              <button
                onClick={()=>approveReview(review.id)}
                className="
                bg-[#2D5016]
                hover:bg-[#234111]
                text-white
                py-2
                rounded
                "
              >
                Approve
              </button>

            )}


          </div>





          <button
            onClick={()=>deleteReview(review.id)}
            className="
            mt-3
            w-full
            bg-[#8B2E2E]
            hover:bg-[#6E2323]
            text-white
            py-2
            rounded
            "
          >
            Delete Review
          </button>



        </div>


      ))}



    </div>





    {/* MODAL */}


    {selectedReview && (

      <div
        className="
        fixed
        inset-0
        bg-[#2C1810]/60
        flex
        items-center
        justify-center
        z-50
        "
      >


        <div
          className="
          bg-white
          rounded-2xl
          shadow-2xl
          border
          border-[#E8DCC5]
          w-[95%]
          max-w-lg
          p-6
          max-h-[90vh]
          overflow-y-auto
          "
        >


          <div className="flex justify-between items-center mb-6">


            <h2
              className="
              text-3xl
              font-serif
              font-bold
              text-[#2C1810]
              "
            >
              Review Details
            </h2>



            <button
              onClick={()=>setSelectedReview(null)}
              className="
              text-[#8C735B]
              hover:text-[#2C1810]
              text-xl
              "
            >
              ✕
            </button>


          </div>





          <div className="space-y-4">



            <div>

              <p className="text-[#8C735B]">
                Name
              </p>

              <p className="font-semibold text-[#2C1810]">
                {selectedReview.name}
              </p>

            </div>




            <div>

              <p className="text-[#8C735B]">
                Location
              </p>

              <p className="font-semibold text-[#2C1810]">
                {selectedReview.location || "Not provided"}
              </p>

            </div>





            <div>

              <p className="text-[#8C735B]">
                Rating
              </p>

              <p className="text-xl">
                {"⭐".repeat(selectedReview.rating)}
              </p>

            </div>





            <div>

              <p className="text-[#8C735B]">
                Message
              </p>

              <p className="
              font-medium
              text-[#2C1810]
              leading-relaxed
              ">
                {selectedReview.message}
              </p>

            </div>





            <div>

              <p className="text-[#8C735B]">
                Status
              </p>

              <p className="font-semibold text-[#2C1810]">
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