import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa"; // Import the search icon

const SearchSymbol = () => {
  const [symbol, setSymbol] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("https://f3e8-150-107-43-95.ngrok-free.app/order/tickerData", {
        symbol,
        start_date: startDate,
        end_date: endDate,
      });
      setResults(response.data); // Assuming response.data is an array of results
    } catch (err) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4">Search Symbol</h2>

      {/* Input with search icon */}
      <div className="relative mb-2">
        <FaSearch className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          placeholder="Symbol"
          className="border border-gray-300 p-2 pl-10 rounded w-full" // Adjusted padding for the icon
        />
      </div>

      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-2 w-full"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 transition duration-200"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      
      {/* Results section with custom scrollbar */}
      {results.length > 0 && (
        <div className="mt-4 scrollbar-thin scrollbar-thumb-sky-700 scrollbar-track-sky-300 h-32 overflow-y-scroll">
          <h3 className="font-semibold">Results:</h3>
          <ul className="list-disc pl-5">
            {results.map((item, index) => (
              <li key={index} className="text-gray-800">
                {JSON.stringify(item)} {/* Adjust based on the structure of your data */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchSymbol;
