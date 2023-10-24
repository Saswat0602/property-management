import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


const port = 7000;

const [properties, setProperties] = useState([]);
  const [token, setToken] = useState("");

const handleEditProperty = async (propertyId) => {

    try {
      // Check if the user is authenticated and has the appropriate role
      if (!token) {
        // Modify "admin" to the appropriate role that can edit properties
        toast.error("You need to be an authorized user to edit a property", {
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

      setCurrentPropertyId(propertyId);
      setShowUpdate(true);
    } catch (error) {
      console.error("Error occurred while editing property", error);
      toast.error("An error occurred while editing the property", {
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
// export default handleEditProperty;