
import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property}) => {
  return (
    <div className="border p-4 rounded-lg shadow-md w-full">
      <h3 className="text-lg font-bold mb-2">
        <Link to={""}>{property.name}</Link>
      </h3>
      <img src={property.picture[0].url} className="w-full h-96 mr-5 border rounded-md" alt="" />
      <p className="mb-2">
        <span className="font-bold">Price:</span> ₹ {property.price}
      </p>
      <p className="mb-2">
        <span className="font-bold">Location:</span> {property.location}
      </p>
      <div className="h-20 overflow-y-auto mb-2">
        <p className="mb-2">
          <span className="font-bold">Description:</span> {property.description}
        </p>
      </div>
   
    </div>
  );
};

export default PropertyCard;
