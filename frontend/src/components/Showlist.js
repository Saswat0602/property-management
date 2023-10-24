import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Update from "./Update";
import { Link } from "react-router-dom";
import PropertyCard from "../widgets/PropertyCard";
import Search from "./Search";

const port = 7000;


const Showlist = () => {
  const [properties, setProperties] = useState([]);
  const [token, setToken] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);

  const [showUpdate, setShowUpdate] = useState(false);
  const [currentPropertyId, setCurrentPropertyId] = useState("");

  useEffect(() => {
    fetchProperties();
    const userToken = localStorage.getItem("token");
    setToken(userToken);
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(
        `http://localhost:${port}/property/showproperty`
      );
      const data = await response.json();

      if (response.status >= 400 || !data) {
        toast.error("Failed to fetch properties", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }else {
        setProperties(data);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      toast.error("An error occurred while fetching properties", {
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

  const handleSearch = (filteredProperties) => {
    if (filteredProperties.length === 0) {
      toast.info('No properties matched your search criteria', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
    setFilteredProperties(filteredProperties);
  };

  return (
    <>
      {showUpdate && (
        <Update
          propertyId={currentPropertyId}
          closeUpdate={() => setShowUpdate(false)}
        />
      )}
      <div className="max-w-screen">
        <h2 className="text-3xl text-blue-700 font-bold text-center mb-4">
          Property List
        </h2>
   
        <Search onSearch={handleSearch} />
        <div className="grid lg:grid-cols-4 w-[98%] ml-2 sm:grid-cols-1 gap-4">
          
          {filteredProperties && filteredProperties.length > 0
            ? filteredProperties.map((property) => (
                <Link key={property._id} to={`/property/${property._id}`}>
                  <PropertyCard property={property} />
                </Link>
              ))
            : properties.map((property) => (
                <Link key={property._id} to={`/property/${property._id}`}>
                  <PropertyCard property={property} />
                </Link>
              ))}
        </div>
      </div>
    </>
  );
};

export default Showlist;