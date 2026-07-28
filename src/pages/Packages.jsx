import { useEffect, useState } from "react";
import api from "../api/axios";


function Packages() {

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

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

    setSelectedImage(null);
   
    setEditingId(null);

  }


async function uploadImage() {

  if (!selectedImage) return null;

  try {

    setUploading(true);

    const imageData = new FormData();
    imageData.append("image", selectedImage);

    const token = localStorage.getItem("adminToken");

    const res = await api.post(
      "/admin/upload-image",
      imageData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.image_url;

  } catch (err) {

    console.log(err.response?.data || err.message);

    alert("Image upload failed.");

    return null;

  } finally {

    setUploading(false);

  }

}


  async function savePackage(e){

    e.preventDefault();


    let imageUrl = formData.image_url;

if (selectedImage) {

  imageUrl = await uploadImage();

  if (!imageUrl) {
    return;
  }

}

const data = {
  ...formData,
  image_url: imageUrl,
  price: Number(formData.price)
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


///////////////////////////////////////////////////////////////


return (

  <div className="min-h-screen bg-[#FAF6EE] p-6">


    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">


      <div>

        <h1
          className="
          text-3xl
          md:text-4xl
          font-serif
          font-bold
          text-[#2C1810]
          "
        >
          Safari Packages
        </h1>

        <p className="text-[#6B5744] mt-2">
          Manage your safari experiences and packages.
        </p>

      </div>



      <button

        onClick={()=>{

          resetForm();
          setShowForm(!showForm);

        }}

        className="
        bg-[#2C1810]
        text-white
        px-5
        py-3
        rounded-lg
        hover:bg-[#4A2C20]
        transition
        w-full
        md:w-auto
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
        border
        border-[#E8DCC5]
        p-6
        mb-8
        space-y-5
        "

      >


        <h2
          className="
          text-2xl
          font-serif
          font-bold
          text-[#2C1810]
          "
        >

          {editingId ? "Edit Package" : "Create Package"}

        </h2>




        <input
          name="title"
          placeholder="Package title"
          value={formData.title}
          onChange={handleChange}
          className="
          border
          border-[#E8DCC5]
          p-3
          w-full
          rounded-lg
          focus:outline-none
          focus:ring-2
          focus:ring-[#C4873A]
          "
        />



        <input
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          className="
          border
          border-[#E8DCC5]
          p-3
          w-full
          rounded-lg
          "
        />



        <input
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
          className="
          border
          border-[#E8DCC5]
          p-3
          w-full
          rounded-lg
          "
        />



        <input
          name="price"
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="
          border
          border-[#E8DCC5]
          p-3
          w-full
          rounded-lg
          "
        />



        <textarea

          name="description"

          placeholder="Description"

          value={formData.description}

          onChange={handleChange}

          className="
          border
          border-[#E8DCC5]
          p-3
          w-full
          rounded-lg
          "

        />




        <div className="space-y-4">


          <div>

            <label className="block font-medium text-[#2C1810] mb-2">
              Upload Image
            </label>


            <input

              type="file"

              accept="image/*"

              onChange={(e)=>{
                setSelectedImage(e.target.files[0]);
              }}

              className="
              border
              border-[#E8DCC5]
              p-3
              w-full
              rounded-lg
              "

            />


            {selectedImage && (

              <p className="text-sm text-[#2D5016] mt-2">

                Selected: {selectedImage.name}

              </p>

            )}


          </div>



          <div className="flex items-center gap-3">

            <hr className="flex-1 border-[#E8DCC5]" />

            <span className="text-[#6B5744] text-sm">
              OR
            </span>

            <hr className="flex-1 border-[#E8DCC5]" />

          </div>



          <div>


            <label className="block font-medium text-[#2C1810] mb-2">

              Image URL

            </label>


            <input

              type="text"

              name="image_url"

              placeholder="https://example.com/image.jpg"

              value={formData.image_url}

              onChange={handleChange}

              className="
              border
              border-[#E8DCC5]
              p-3
              w-full
              rounded-lg
              "

            />


          </div>


        </div>





        <label className="flex gap-3 items-center text-[#2C1810]">


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
            bg-[#2D5016]
            text-white
            px-6
            py-2
            rounded-lg
            hover:bg-[#3E6B20]
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
              bg-[#6B5744]
              text-white
              px-6
              py-2
              rounded-lg
              "

            >

              Cancel

            </button>

          )}


        </div>


      </form>

    )}







    {loading ? (

      <p className="text-[#6B5744]">
        Loading packages...
      </p>


    ) : (


      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">


        {packages.map((pkg)=>(


          <div

            key={pkg.id}

            className="
            bg-white
            rounded-xl
            shadow-md
            border
            border-[#E8DCC5]
            p-5
            "

          >



            {pkg.image_url && (

              <img

                src={pkg.image_url}

                alt={pkg.title}

                className="
                w-full
                h-48
                object-cover
                rounded-lg
                mb-4
                "

              />

            )}




            <h2
              className="
              font-serif
              font-bold
              text-xl
              text-[#2C1810]
              "
            >

              {pkg.title}

            </h2>




            <p className="text-[#6B5744] mt-2">
              📍 {pkg.destination}
            </p>



            <p className="text-[#6B5744]">
              🕒 {pkg.duration}
            </p>




            <p className="
            font-bold
            text-[#C4873A]
            mt-3
            ">

              KSh {pkg.price.toLocaleString()}

            </p>





            <p className="text-[#6B5744] mt-3">

              {pkg.description}

            </p>





            <span

              className={`

              inline-block
              mt-4
              px-3
              py-1
              rounded-full
              text-sm
              font-medium

              ${
                pkg.active
                ? "bg-[#E7F0DD] text-[#2D5016]"
                : "bg-[#F5ECD7] text-[#6B5744]"
              }

              `}

            >

              {pkg.active ? "Published" : "Draft"}

            </span>






            <div className="flex gap-3 mt-5">


              <button

                onClick={()=>editPackage(pkg)}

                className="
                bg-[#C4873A]
                text-white
                px-4
                py-2
                rounded-lg
                w-full
                "

              >

                Edit

              </button>





              <button

                onClick={()=>deletePackage(pkg.id)}

                className="
                bg-[#8B2E2E]
                text-white
                px-4
                py-2
                rounded-lg
                w-full
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