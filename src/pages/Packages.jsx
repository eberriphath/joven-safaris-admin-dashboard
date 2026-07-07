import { useEffect, useState } from "react";
import api from "../api/axios";

function Packages() {

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    duration: "",
    price: "",
    description: "",
    image_url: "",
    active: true
  });


  useEffect(() => {
    fetchPackages();
  }, []);



  function fetchPackages() {

    api.get("/admin/packages")
      .then((res) => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response?.data || err.message);
        setLoading(false);
      });

  }




  function handleChange(e) {

    const {name, value, type, checked} = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });

  }




  function resetForm(){

    setFormData({
      title:"",
      destination:"",
      duration:"",
      price:"",
      description:"",
      image_url:"",
      active:true
    });

    setEditingId(null);

  }





  function savePackage(e){

    e.preventDefault();


    const data = {
      ...formData,
      price:Number(formData.price)
    };


    if(editingId){


      api.put(`/admin/packages/${editingId}`, data)

      .then(()=>{

        resetForm();
        setShowForm(false);
        fetchPackages();

      })

      .catch((err)=>{
        console.log(err.response?.data || err.message);
      });



    } else {



      api.post("/admin/packages", data)

      .then(()=>{

        resetForm();
        setShowForm(false);
        fetchPackages();

      })

      .catch((err)=>{
        console.log(err.response?.data || err.message);
      });


    }

  }





  function editPackage(pkg){

    setEditingId(pkg.id);


    setFormData({

      title:pkg.title,
      destination:pkg.destination,
      duration:pkg.duration,
      price:pkg.price,
      description:pkg.description,
      image_url:pkg.image_url,
      active:pkg.active

    });


    setShowForm(true);

  }







  function deletePackage(id){


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );


    if(!confirmDelete){
      return;
    }



    api.delete(`/admin/packages/${id}`)

    .then(()=>{

      fetchPackages();

    })

    .catch((err)=>{

      console.log(err.response?.data || err.message);

    });


  }





  return (

    <div className="min-h-screen bg-gray-100 p-6">


      <div className="flex justify-between items-center mb-6">


        <h1 className="text-3xl font-bold">
          Safari Packages
        </h1>



        <button

          onClick={()=>{

            resetForm();
            setShowForm(!showForm);

          }}

          className="
          bg-blue-600
          text-white
          px-4
          py-2
          rounded-lg
          hover:bg-blue-700
          "

        >

          Add Package

        </button>


      </div>







      {showForm && (


        <form

          onSubmit={savePackage}

          className="
          bg-white
          shadow-md
          rounded-xl
          p-6
          mb-8
          space-y-4
          "

        >


          <h2 className="text-xl font-bold">

            {editingId ? "Edit Package" : "Create Package"}

          </h2>



          <input
            name="title"
            placeholder="Package title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />



          <input
            name="destination"
            placeholder="Destination"
            value={formData.destination}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />



          <input
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />



          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />



          <textarea

            name="description"

            placeholder="Description"

            value={formData.description}

            onChange={handleChange}

            className="border p-2 w-full rounded"

          />



          <input

            name="image_url"

            placeholder="Image URL"

            value={formData.image_url}

            onChange={handleChange}

            className="border p-2 w-full rounded"

          />



          <label className="flex gap-2">


            <input

              type="checkbox"

              name="active"

              checked={formData.active}

              onChange={handleChange}

            />


            Publish package


          </label>





          <div className="flex gap-3">


            <button

              className="
              bg-green-600
              text-white
              px-5
              py-2
              rounded
              "

            >

              {editingId ? "Update Package" : "Save Package"}

            </button>



            {editingId && (

              <button

                type="button"

                onClick={()=>{

                  resetForm();
                  setShowForm(false);

                }}

                className="
                bg-gray-500
                text-white
                px-5
                py-2
                rounded
                "

              >

                Cancel

              </button>

            )}


          </div>


        </form>

      )}








      {loading ? (

        <p>Loading packages...</p>


      ) : (



        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">


          {packages.map((pkg)=>(


            <div

              key={pkg.id}

              className="
              bg-white
              rounded-xl
              shadow-md
              p-5
              "

            >


              <h2 className="font-bold text-xl">

                {pkg.title}

              </h2>



              <p>
                📍 {pkg.destination}
              </p>



              <p>
                🕒 {pkg.duration}
              </p>



              <p className="font-semibold mt-2">

                KSh {pkg.price.toLocaleString()}

              </p>



              <p className="text-gray-600 mt-3">

                {pkg.description}

              </p>



              <span

                className={`
                inline-block
                mt-3
                px-3
                py-1
                rounded-full
                text-sm
                ${
                  pkg.active
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-700"
                }
                `}

              >

                {pkg.active ? "Published" : "Draft"}

              </span>




              <div className="flex gap-3 mt-5">


                <button

                  onClick={()=>editPackage(pkg)}

                  className="
                  bg-yellow-500
                  text-white
                  px-4
                  py-2
                  rounded
                  "

                >

                  Edit

                </button>




                <button

                  onClick={()=>deletePackage(pkg.id)}

                  className="
                  bg-red-600
                  text-white
                  px-4
                  py-2
                  rounded
                  "

                >

                  Delete

                </button>



              </div>



            </div>


          ))}



        </div>


      )}



    </div>

  );

}


export default Packages;