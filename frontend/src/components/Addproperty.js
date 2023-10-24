import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const port = 7000;

const Addproperty = () => {
  const [image, setImage] = useState(null);

  const [input, setInput] = useState({
    name: "",
    description: "",
    location: "",
    price: "",
    type:"",
    amenities:"",
  });

  const [token, setToken] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    getAuthdata();
  }, []);

  const getAuthdata = async () => {
    const data = localStorage.getItem("token");
    if (!data) {
      toast.warn("Please login ", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/login");
    } else {
      setToken(data); 
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addProperty = async (e) => {
    e.preventDefault();
    const { name, description, location, price ,type,amenities } = input;
    if (!name || !description || !location || !amenities|| !type || !price || !image) {
      toast.warn("All fields are required", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    if (!token) {
      toast.error("You need to be authenticated to add a new property", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("price", price);
      formData.append("amenities", amenities);
      formData.append("type", type);
      if (image) {
        formData.append("picture", image); 
      }
      const response = await fetch(`http://localhost:${port}/property/addproperty`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log("data", data);
      if (response.status >= 400 || !data) {
        toast.error("Some error occurred while adding the property", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.success("Property added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/property");
      }
    } catch (error) {
      console.error("Error occurred while adding the property", error);
      toast.error("An error occurred while adding the property", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleCancel = () => {
    navigate("/property");
  };

  return (
    <div className="bg-white p-3 border rounded-xl shadow-xl max-w-xl mt-4 mx-auto sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%]">
      <h2 className="text-3xl  text-blue-700 font-bold text-center">Add new property</h2>
      <form className="flex flex-col gap-3 mt-5" encType="multipart/form-data">
          <label htmlFor="name" className="ml-2">
            Name
          </label>
          <input
            type="text"
            className="p-1 border rounded-lg"
            name="name"
            placeholder="Enter your name of the property"
            onChange={handleChange}
          />
          <label htmlFor="type" className="ml-2">
          Proerty Type
        </label>
        <input
          type="text"
          className="p-1 border rounded-lg"
          name="type"
          placeholder="Enter your name of the property"
          onChange={handleChange}
        />
          <label htmlFor="picture" className="ml-2">
            Picture
          </label>
          <input
            type="file"
            className="p-1 border rounded-lg"
            name="picture"
            accept="image/*" 
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
          />

          <label htmlFor="location" className="ml-2">
            Location
          </label>
          <input
            type="text"
            className="p-1 border rounded-lg"
            name="location"
            placeholder="Enter the location of this property"
            onChange={handleChange}
          />

          <label htmlFor="price" className="ml-2">
            Price
          </label>
          <input
            type="text"
            className="p-1 border rounded-lg"
            name="price"
            placeholder="Add price"
            onChange={handleChange}
          />
          <label htmlFor="amenities" className="ml-2">
         Add  Amenities
        </label>
        <input
          type="text"
          className="p-1 border rounded-lg"
          name="amenities"
          placeholder="Enter your name of the property"
          onChange={handleChange}
        />
          <label htmlFor="description" className="ml-2">
            Description
          </label>
          <textarea
            className="p-1 border rounded-lg"
            name="description"
            placeholder="Describe something about this property"
            cols={40}
            rows={3}
            onChange={handleChange}
          />
          <button
          onClick={addProperty}
          className="bg-[#074FB2] text-white py-2 rounded-lg mt-3 hover:bg-blue-600"
        >
          Add property
        </button>
        <div className="flex justify-around gap-3 mt-4">
          <div className="flex justify-center items-center">
            <button
              onClick={handleCancel}
              className="py-2 px-4 bg-red-500 border rounded-lg text-sm hover:bg-slate-400"
            >
              Cancel
            </button>
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => navigate("/")}
              className="py-2 px-4 bg-blue-300 border rounded-lg text-sm hover:bg-slate-400"
            >
              Home
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addproperty;