import { useEffect, useState } from "react";
import api from "../api/axios";

function Bookings() {

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);


  useEffect(() => {

    fetchBookings();

  }, []);



  function fetchBookings(){

    api.get("/admin/bookings")

      .then((res)=>{

        setBookings(res.data);

      })

      .catch((err)=>{

        console.log(
          err.response?.data || err.message
        );

      });

  }


function deleteBooking(id){

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this booking?"
  );


  if(!confirmDelete){
    return;
  }



  api.delete(`/admin/bookings/${id}`)

  .then(()=>{

    setBookings((previous)=>

      previous.filter(
        (booking)=>booking.id !== id
      )

    );


    if(
      selectedBooking &&
      selectedBooking.id === id
    ){

      setSelectedBooking(null);

    }


  })


  .catch((err)=>{

    console.log(
      err.response?.data || err.message
    );

  });


}


  function updateStatus(id,status){

    api.put(
      `/admin/bookings/${id}/status`,
      {status}
    )

    .then(()=>{

      setBookings((previous)=>

        previous.map((booking)=>

          booking.id === id

          ? {...booking,status}

          : booking

        )

      );

    })


    .catch((err)=>{

      console.log(
        err.response?.data || err.message
      );

    });

  }





  function getTotalPeople(booking){

    return (

      Number(booking.resident_adults || 0) +

      Number(booking.resident_children || 0) +

      Number(booking.non_resident_adults || 0) +

      Number(booking.non_resident_children || 0)

    );

  }





  const filteredBookings = bookings.filter((booking)=>{


    const term = search.toLowerCase();


    return (

      booking.full_name
      ?.toLowerCase()
      .includes(term)


      ||

      booking.email
      ?.toLowerCase()
      .includes(term)


      ||

      booking.destination
      ?.toLowerCase()
      .includes(term)

    );


  });




////////////////////////////////////////////////////////////////////////////////////////////////


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
Bookings
</h1>





<div className="mb-6">

<input

type="text"

placeholder="Search by name, email or destination..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
w-full
md:w-96
rounded-xl
border
border-[#D9C7A6]
bg-white
px-4
py-3
text-[#2C1810]
placeholder:text-[#8C735B]
focus:outline-none
focus:ring-2
focus:ring-[#C4873A]
focus:border-[#C4873A]
"

/>

</div>


<div
  className="
    hidden
    lg:block
    bg-white
    rounded-2xl
    border
    border-[#E8DCC5]
    shadow-md
    overflow-hidden
  "
>


<table className="min-w-full text-sm text-left">


<thead
  className="
    bg-[#F5ECD7]
    text-[#6B5744]
    uppercase
    text-xs
    tracking-wider
  "
>

<tr>

<th className="px-4 py-3">ID</th>

<th className="px-4 py-3">Name</th>

<th className="px-4 py-3">Email</th>

<th className="px-4 py-3">Destination</th>

<th className="px-4 py-3">People</th>

<th className="px-4 py-3">Status</th>

<th className="px-4 py-3">Actions</th>

</tr>

</thead>





<tbody className="divide-y divide-gray-200">


{
filteredBookings.map((booking)=>(


<tr 
key={booking.id}
className="
border-b
border-[#F5ECD7]
hover:bg-[#FAF6EE]
transition
"
>


<td className="px-4 py-3">
{booking.id}
</td>



<td className="px-4 py-3 font-medium">
{booking.full_name}
</td>



<td className="px-4 py-3">
{booking.email}
</td>



<td className="px-4 py-3">
{booking.destination}
</td>




<td className="px-4 py-3">

{getTotalPeople(booking)}

</td>






<td className="px-4 py-3">


<span

className={`
px-2
py-1
rounded
text-xs
font-semibold

${
booking.status === "confirmed"
? "bg-[#2D5016] text-white"

: booking.status === "cancelled"
? "bg-[#FDECEC] text-[#8B2E2E]"

: booking.status === "completed"

? "bg-[#E9F3E4] text-[#2D5016]"

: "bg-[#F5ECD7] text-[#8B4513]"

}

`}

>

{booking.status}

</span>


</td>






<td className="px-4 py-3 space-x-2">



<button

onClick={()=>setSelectedBooking(booking)}

className="
bg-[#8B5E3C] hover:bg-[#6F4A2E]
text-white
px-2
py-1
rounded
text-xs
"

>

View

</button>





<button

onClick={()=>updateStatus(
booking.id,
"confirmed"
)}

className="
bg-[#2D5016] hover:bg-[#234111]
text-white
px-2
py-1
rounded
text-xs
"

>

Confirm

</button>





<button

onClick={()=>updateStatus(
booking.id,
"completed"
)}

className="
bg-[#C4873A] hover:bg-[#A8732F]
text-white
px-2
py-1
rounded
text-xs
"

>

Complete

</button>





<button

onClick={()=>updateStatus(
booking.id,
"cancelled"
)}

className="
bg-[#8B2E2E] hover:bg-[#6E2323]
text-white
px-2
py-1
rounded
text-xs
"

>

Cancel

</button>



<button

onClick={()=>deleteBooking(
booking.id
)}

className="
bg-[#2C1810] hover:bg-[#1D120C]
text-white
px-2
py-1
rounded
text-xs
"

>

Delete

</button>




</td>



</tr>


))

}


</tbody>


</table>


</div>


<div className="lg:hidden space-y-4">

  {filteredBookings.map((booking) => (

    <div
      key={booking.id}
      className="
bg-white
rounded-2xl
border
border-[#E8DCC5]
shadow-md
p-5
"
    >

      <div className="flex justify-between items-start">

        <div>

          <h3 className="font-bold text-lg">
            {booking.full_name}
          </h3>

          <p className="text-[#6B5744] text-sm">
            {booking.email}
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
              booking.status === "confirmed"
                ? "bg-green-100 text-green-700"
                : booking.status === "cancelled"
                ? "bg-red-100 text-red-700"
                : booking.status === "completed"
                ? "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
            }
          `}
        >
          {booking.status}
        </span>

      </div>

      <div className="mt-4 space-y-1 text-sm">

        <p>
          <strong className="text-[#2C1810]">Destination:</strong> {booking.destination}
        </p>

        <p>
          <strong className="text-[#2C1810]">People:</strong> {getTotalPeople(booking)}
        </p>

      </div>

      <div className="grid grid-cols-2 gap-2 mt-5">

        <button
          onClick={() => setSelectedBooking(booking)}
          className="bg-blue-500 text-white py-2 rounded"
        >
          View
        </button>

        <button
          onClick={() => updateStatus(booking.id, "confirmed")}
          className="bg-green-500 text-white py-2 rounded"
        >
          Confirm
        </button>

        <button
          onClick={() => updateStatus(booking.id, "completed")}
          className="bg-blue-600 text-white py-2 rounded"
        >
          Complete
        </button>

        <button
          onClick={() => updateStatus(booking.id, "cancelled")}
          className="bg-red-500 text-white py-2 rounded"
        >
          Cancel
        </button>

      </div>

      <button
        onClick={() => deleteBooking(booking.id)}
        className="mt-3 w-full bg-gray-700 text-white py-2 rounded"
      >
        Delete Booking
      </button>

    </div>

  ))}

</div>





{
selectedBooking && (


<div className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
">


<div
className="
bg-white
rounded-xl
shadow-xl
w-[95%]
max-w-3xl
p-4
md:p-6
max-h-[90vh]
overflow-y-auto
"
>


<div className="
flex
justify-between
items-center
mb-6
">


<h2 className="text-2xl font-bold">

Booking Details

</h2>


<button

onClick={()=>setSelectedBooking(null)}

className="
text-gray-500
text-xl
"

>

✕

</button>


</div>





<div className="
grid
grid-cols-1
md:grid-cols-2
gap-6
text-sm
">


<div>
<p className="text-gray-500">
Full Name
</p>

<p className="font-semibold">
{selectedBooking.full_name}
</p>

</div>

<div>

<p className="text-gray-500">
Email
</p>

<p className="font-semibold">
{selectedBooking.email}
</p>

</div>

<div>

<p className="text-gray-500">
Phone
</p>

<p className="font-semibold">
{selectedBooking.phone}
</p>

</div>

<div>

<p className="text-gray-500">
Passport Number
</p>

<p className="font-semibold">
{selectedBooking.passport_number}
</p>

</div>

<div>

<p className="text-gray-500">
Destination
</p>

<p className="font-semibold">
{selectedBooking.destination}
</p>

</div>

<div>

<p className="text-gray-500">
Travel Date
</p>

<p className="font-semibold">
{selectedBooking.travel_date}
</p>

</div>

<div>

<p className="text-gray-500">
Travellers
</p>

<p className="font-semibold">

{getTotalPeople(selectedBooking)}

</p>

</div>

<div>

<p className="text-gray-500">
Nights
</p>

<p className="font-semibold">

{selectedBooking.number_of_nights}

</p>

</div>

<div>

<p className="text-gray-500">
Emergency Contact
</p>

<p className="font-semibold">

{selectedBooking.emergency_contact_name}

</p>

</div>

<div>
<p className="text-gray-500">
Status
</p>

<p className="font-semibold">

{selectedBooking.status}
</p>
</div>
</div>
</div>
</div>

)
}
</div>
);
}

export default Bookings;