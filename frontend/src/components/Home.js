import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true : false);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <>
      <div className="fixed top-0 w-full bg-dark z-10">
        <nav className="container mx-auto flex items-center justify-between py-4">
          <Link
            to="/"
            className="text-white px-4 py-2 rounded hover:text-slate-500 font-bold text-xl"
          >
            DreamHome Realty!
          </Link>
          <div className="flex justify-center items-center flex-row">
            {isLoggedIn ? (
              <Link
                className="text-white px-4 py-2 rounded hover:text-slate-500"
                onClick={handleLogout}
              >
                Logout
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white px-4 py-2 rounded hover:text-slate-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white px-4 py-2 rounded hover:text-slate-500"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      <div className="flex items-center justify-center img">
        <div className="px-3 text-white">
          <h1 className=" text-white font-bold">Welcome to DreamHome Realty! </h1>
          <p className="py-4">
            Jump right in and explore our many homes. <br />
            Feel free to share some of your own and comment on others!
          </p>
          <div className="my-4">
            <Link
              to="/Property"
              className="py-2 my-4 px-4 bg-stone-600 border rounded-lg text-sm hover:bg-slate-400 hover:text-black text-white"
            >
              View Properties
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
