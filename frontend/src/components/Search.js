import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Search = ({ onSearch }) => {
  const [filter1Value, setFilter1Value] = useState("");
  const [filter2Value, setFilter2Value] = useState("");
  const [filter3Value, setFilter3Value] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    handleSearch();
  }, [filter1Value, filter2Value, filter3Value]);

  const handleSearch = async () => {
    try {
      const queryParams = new URLSearchParams({
        price: filter1Value,
        location: filter2Value,
        type: filter3Value,
      });

      const url = `http://localhost:7000/property/showproperty?${queryParams}`;

      const response = await fetch(url);
      if (response.status >= 400) {
        toast.warn("No property match your querry", {
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
      const data = await response.json();
      onSearch(data);
    } catch (error) {
      console.error("Error fetching filtered properties:", error);
      toast.error(`some error occure  ${error}`, {
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

  const searchName = async () => {
  
    try {
      const queryParams = new URLSearchParams({
        q: search,
      });

      const url = `http://localhost:7000/property/showproperty?${queryParams}`;

      const response = await fetch(url);
      const data = await response.json();

      if (response.status >= 400) {
        toast.warn("No property match your query", {
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
        onSearch(data);
      }
    } catch (error) {
      console.error("Error fetching filtered properties:", error);
      toast.error(`some error occure  ${error}`, {
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
  const handleSearchFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    searchName();
  };
  return (
    <div className="p-4 bg-blue-100 border rounded-lg my-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <select
          value={filter1Value}
          onChange={(e) => setFilter1Value(e.target.value)}
          className="p-2 border rounded-md bg-blue-200 w-40" // Adjusted width
        >
          <option value="">Price</option>
          <option value="10000-50000">10000-50000</option>
          <option value="50000-2500000">50000-2500000</option>
          <option value="250000-5000000">250000-5000000</option>
          <option value="5000000-1000000000">5000000-10000000000000</option>
        </select>

        <select
          value={filter2Value}
          onChange={(e) => setFilter2Value(e.target.value)}
          className="p-2 border rounded-md bg-blue-200 w-40" // Adjusted width
        >
          <option value="">Location</option>
          <option value="delhi">Delhi</option>
          <option value="bbsr">bbsr</option>
          <option value="mumbai,maharastra">mumbai</option>
          <option value="ctc">ctc</option>
          <option value="japan">Japan</option>
        </select>

        <select
          value={filter3Value}
          onChange={(e) => setFilter3Value(e.target.value)}
          className="p-2 border rounded-md bg-blue-200 w-40" // Adjusted width
        >
          <option value="">Types</option>
          <option value="villa">Villa</option>
          <option value="corporate">Corporal</option>
          <option value="other">other</option>
        </select>

        <form onSubmit={handleSearchFormSubmit}>
          <input
            type="text"
            className="p-1 rounded border m-2"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              searchName()
            }}
            name="searchInput"
          />
          <button
            type="submit"
            className="p-1 bg-blue-700 text-white rounded-md hover:bg-blue-400"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
