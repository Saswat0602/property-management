import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSimplybuilt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { toast } from "react-toastify";
const port = 7000;
let mount = false;

const UserWidget = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const data = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (mount) {
      getAuthData();
    }
    mount = true;
    return () => {
      
    }
  }, [data, navigate]);

  const getAuthData = async () => {
    if (!data) {
      return; 
    }

    try {
      const responce = await fetch(`http://localhost:${port}/api/property`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${data}`,
        },
        mode: "cors",
      });
      const result = await responce.json();
      console.log(result);
      setUser(result);
    } catch (error) {
      toast.error("An error occurred", {
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

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between gap-[1rem]  ">
      <div>
        <BiLogOut onClick={logout} className="h-[20px] w-[20px]" />
      </div>

      <div className="flex items-center justify-between gap-[1rem] cursor-pointer">
        <FaSimplybuilt className=" h-[30px] w-[30px]" />
        <div>
          <div className="flex flex-col gap-2">
            <h3>{user.name}</h3>
          </div>
          <p className="font-normal text-sm text-[#074FB2]">@{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserWidget;
