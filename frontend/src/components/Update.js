import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const port = 7000;
const Update = ({ propertyId, closeUpdate }) => {
  const [updatedProperty, setUpdatedProperty] = useState({
    name: "",
    price: "",
    location: "",
    description: "",
    type:"",
    amenities:"",
    picture: null, 
  });


  
useEffect(() => {
  const fetchPropertyData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:${port}/property/${propertyId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const propertyData = await response.json();
        setUpdatedProperty({
          name: propertyData.name,
          price: propertyData.price.toString(),
          location: propertyData.location,
          description: propertyData.description,
          type:propertyData.type,
          amenities:propertyData.amenities,
          picture: null, 
        });
      } else {
        console.error("Failed to fetch property data", response);
        toast.error("Failed to fetch property data", {
        });
      }
    } catch (error) {
      console.error("Error occurred while fetching property data", error);
      toast.error("Error occurred while fetching property data", {
      });
    }
  };

  fetchPropertyData();
}, [propertyId]);




  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedProperty({
      ...updatedProperty,
      [name]: value,
    });
  };

  const handleUpdateProperty = async () => {
    const { name, price, location, description, picture,type,amenities } = updatedProperty;
    if (!name || !price || !location || !description || !amenities|| !type ) {
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

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("location", location);
      formData.append("description", description);
      formData.append("amenities", amenities);
      formData.append("type", type);

      if (picture) {
        formData.append("picture", picture); 
      }

      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:${port}/property/edit/${propertyId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData, 
        }
      );

      if (response.status === 200) {
        toast.success("Property updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        closeUpdate();
      } else if (response.status === 400) {
        const errorData = await response.json();
        toast.error(errorData.error, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (response.status === 404) {
        toast.error("Property not found", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (response.status === 403) {
        toast.error("Unauthorized: You are not the author of this property", {
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
        toast.error("Failed to update property", {
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
    } catch (error) {
      console.error("Error occurred while updating property", error);
      toast.error("An error occurred while updating the property", {
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

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    setUpdatedProperty({
      ...updatedProperty,
      picture: file,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Update Property</h2>
        <form className="flex flex-col gap-1 mt-5">
          <label htmlFor="name" className="ml-2">
            Name
          </label>
          <input
            type="text"
            className="p-1 border rounded-lg"
            name="name"
            placeholder="Enter your name of the property"
            value={updatedProperty.name}
            onChange={handleInputChange}
          />
          <label htmlFor="type" className="ml-2">
          Property Type
        </label>
        <input
          type="text"
          className="p-1 border rounded-lg"
          name="type"
          placeholder="Enter your Type of the property"
          value={updatedProperty.type}
          onChange={handleInputChange}
        />

          <label htmlFor="picture" className="ml-2">
            Picture
          </label>
          <input
            type="file"
            accept="image/*"
            className="ml-2"
            onChange={handlePictureChange}
          />

          <label htmlFor="location" className="ml-2">
            Location
          </label>
          <input
            type="text"
            className="p-1 border rounded-lg"
            name="location"
            placeholder="Enter the location of this property"
            value={updatedProperty.location}
            onChange={handleInputChange}
          />

          <label htmlFor="price" className="ml-2">
            Price
          </label>
          <input
            type="text"
            className="p-1 border rounded-lg"
            name="price"
            placeholder="Add price"
            value={updatedProperty.price}
            onChange={handleInputChange}
          />

          <label htmlFor="amenities" className="ml-2">
          Amenities
        </label>
        <input
          type="text"
          className="p-1 border rounded-lg"
          name="amenities"
          placeholder="Enter your Type of the property"
          value={updatedProperty.amenities}
          onChange={handleInputChange}
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
            value={updatedProperty.description}
            onChange={handleInputChange}
          />
          <div className="flex justify-between">
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleUpdateProperty}
            >
              Update
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={closeUpdate}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Update;