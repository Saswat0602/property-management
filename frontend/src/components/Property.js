import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Addproperty from "./Addproperty";
import Showlist from "./Showlist";

let mount = false;

const Property = () => {
  const navigate = useNavigate();

  const data = localStorage.getItem("token");
  console.log(data);

  useEffect(() => {
    if (mount) {
      getAuthData();
    }
    mount = true;
    return () => {
    };
  }, [data]);  

  const getAuthData = async () => {
    if (!data) {
      toast.warn("plese login ", {
        position: "top-right",
        autoClose: 1500,   
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      navigate("/login");
    }
  };

 const [showAddProperty] = useState(false);
 const [properties] = useState([]);
  

  return (
    <>
      <div className="w-full px-2  flex flex-col gap-[0.5rem] justify-between md:flex-row">
        <div className="flex flex-wrap mt-4 ">
          {showAddProperty ? (
            <Addproperty />
          ) : (
            <Showlist properties={properties} />
          )}
        </div>
      </div>
    </>
  );
};

export default Property;