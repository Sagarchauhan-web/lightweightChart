// import React, { useState } from "react";
// import { FaSearch, FaTimes } from "react-icons/fa";

// const dummySymbols = [
//   {
//     name: "IRFC",
//     description: "INDIAN RAILWAY FIN CORP L",
//     type: "stock",
//     exchange: "NSE",
//   },
//   {
//     name: "RELIANCE",
//     description: "RELIANCE INDUSTRIES LTD",
//     type: "stock",
//     exchange: "NSE",
//   },
//   {
//     name: "HDFCBANK",
//     description: "HDFC BANK LTD",
//     type: "stock",
//     exchange: "NSE",
//   },
//   {
//     name: "EURUSD",
//     description: "EURO FX/U.S. DOLLAR",
//     type: "forex",
//     exchange: "FX",
//   },
//   {
//     name: "BTCUSD",
//     description: "BITCOIN TO USD",
//     type: "crypto",
//     exchange: "Crypto",
//   },
//   {
//     name: "ETHUSD",
//     description: "ETHEREUM TO USD",
//     type: "crypto",
//     exchange: "Crypto",
//   },
//   {
//     name: "SPY",
//     description: "SPDR S&P 500 ETF TRUST",
//     type: "stock",
//     exchange: "NYSE",
//   },
//   { name: "USOIL", description: "CRUDE OIL", type: "forex", exchange: "FX" },
// ];

// const filters = ["All", "Forex", "Crypto", "Options"];

// const SymbolSearchModal = ({ isOpen, onClose, onSelect }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedFilter, setSelectedFilter] = useState("All");

//   const handleSearchChange = (e) => setSearchQuery(e.target.value);

//   const handleFilterClick = (filter) => setSelectedFilter(filter);

//   const filteredSymbols = dummySymbols.filter((symbol) => {
//     if (
//       selectedFilter !== "All" &&
//       symbol.type !== selectedFilter.toLowerCase()
//     )
//       return false;
//     return symbol.name.toLowerCase().includes(searchQuery.toLowerCase());
//   });

//   return (
//     <div
//       className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
//         isOpen ? "opacity-100 visible" : "opacity-0 invisible"
//       } bg-gray-900 bg-opacity-50`}
//     >
//       <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6 transform transition-transform duration-300 scale-95">
//         {/* Modal Header */}
//         <div className="flex justify-between items-center mb-5">
//           <h2 className="text-2xl font-semibold text-gray-700">
//             Symbol Search
//           </h2>
//           <button onClick={onClose} className="focus:outline-none">
//             <FaTimes
//               className="text-gray-600 hover:text-gray-800 transition-colors"
//               size={24}
//             />
//           </button>
//         </div>

//         {/* Search Input */}
//         <div className="flex items-center mb-6 border border-gray-300 rounded-full px-3 py-2 shadow-sm hover:shadow-md transition-shadow">
//           <FaSearch className="text-gray-500 mr-2" />
//           <input
//             type="text"
//             placeholder="Search symbol"
//             value={searchQuery}
//             onChange={handleSearchChange}
//             className="w-full outline-none text-gray-800 placeholder-gray-500"
//           />
//         </div>

//         {/* Filters */}
//         <div className="flex space-x-2 mb-6">
//           {filters.map((filter) => (
//             <button
//               key={filter}
//               onClick={() => handleFilterClick(filter)}
//               className={`px-4 py-2 rounded-full ${
//                 selectedFilter === filter
//                   ? "bg-blue-600 text-white shadow-md"
//                   : "bg-gray-100 text-gray-700 hover:bg-blue-100"
//               } transition duration-200`}
//             >
//               {filter}
//             </button>
//           ))}
//         </div>

//         {/* Symbol List */}
//         <div className="overflow-y-auto max-h-64 border-t border-gray-200 pt-4">
//           {filteredSymbols.length > 0 ? (
//             <ul>
//               {filteredSymbols.map((symbol, index) => (
//                 <li
//                   key={index}
//                   onClick={() => {
//                     onSelect(symbol.name);
//                     onClose();
//                   }}
//                   className="flex justify-between items-center p-4 border-b border-gray-100 hover:bg-gray-100 cursor-pointer rounded-md transition-colors duration-200"
//                 >
//                   <div>
//                     <p className="font-medium text-gray-800">{symbol.name}</p>
//                     <p className="text-sm text-gray-500">
//                       {symbol.description}
//                     </p>
//                   </div>
//                   <p className="text-sm text-gray-600 font-light">
//                     {symbol.type.toUpperCase()} / {symbol.exchange}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-center text-gray-500">No symbols found</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const SearchTicker = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSymbolSelect = (symbol) => setSearchQuery(symbol);

//   return (
//     <>
//       {/* Header */}
//       <header className="flex items-center justify-between p-3 bg-white shadow-md w-full">
//         <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 w-3/4 max-w-xs hover:shadow-sm transition-shadow">
//           <FaSearch className="text-gray-500 mr-1" />
//           <input
//             type="text"
//             placeholder="Search symbol"
//             value={searchQuery}
//             onClick={openModal}
//             className="w-full outline-none bg-transparent text-sm text-gray-800"
//             readOnly
//           />
//         </div>
//       </header>

//       {/* Symbol Search Modal */}
//       <SymbolSearchModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         onSelect={handleSymbolSelect}
//       />
//     </>
//   );
// };

// export default SearchTicker; 




// CHANGES CODE 
import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

// Sample symbol data
const dummySymbols = [
  { name: "IRFC", description: "INDIAN RAILWAY FIN CORP L", type: "stock", exchange: "NSE" },
  { name: "RELIANCE", description: "RELIANCE INDUSTRIES LTD", type: "stock", exchange: "NSE" },
  { name: "HDFCBANK", description: "HDFC BANK LTD", type: "stock", exchange: "NSE" },
  { name: "EURUSD", description: "EURO FX/U.S. DOLLAR", type: "forex", exchange: "FX" },
  { name: "BTCUSD", description: "BITCOIN TO USD", type: "crypto", exchange: "Crypto" },
  { name: "ETHUSD", description: "ETHEREUM TO USD", type: "crypto", exchange: "Crypto" },
  { name: "SPY", description: "SPDR S&P 500 ETF TRUST", type: "stock", exchange: "NYSE" },
  { name: "USOIL", description: "CRUDE OIL", type: "forex", exchange: "FX" },
];

const filters = ["All", "Forex", "Crypto", "Options"];

// Symbol Search Modal Component
const SymbolSearchModal = ({ isOpen, onClose, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleFilterClick = (filter) => setSelectedFilter(filter);

  const filteredSymbols = dummySymbols.filter((symbol) => {
    if (selectedFilter !== "All" && symbol.type !== selectedFilter.toLowerCase()) return false;
    return symbol.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
      } bg-gray-900 bg-opacity-50 z-50`} // Added z-50 for higher stacking
    >
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6 transform transition-transform duration-300 scale-95">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-semibold text-gray-700">Symbol Search</h2>
          <button onClick={onClose} className="focus:outline-none">
            <FaTimes className="text-gray-600 hover:text-gray-800 transition-colors" size={24} />
          </button>
        </div>

        {/* Search Input */}
        <div className="flex items-center mb-6 border border-gray-300 rounded-full px-3 py-2 shadow-sm hover:shadow-md transition-shadow">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search symbol"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full outline-none text-gray-800 placeholder-gray-500"
          />
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-6">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-4 py-2 rounded-full ${
                selectedFilter === filter
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              } transition duration-200`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Symbol List */}
        <div className="overflow-y-auto max-h-64 border-t border-gray-200 pt-4">
          {filteredSymbols.length > 0 ? (
            <ul>
              {filteredSymbols.map((symbol, index) => (
                <li
                  key={index}
                  onClick={() => {
                    onSelect(symbol.name);
                    onClose();
                  }}
                  className="flex justify-between items-center p-4 border-b border-gray-100 hover:bg-gray-100 cursor-pointer rounded-md transition-colors duration-200"
                >
                  <div>
                    <p className="font-medium text-gray-800">{symbol.name}</p>
                    <p className="text-sm text-gray-500">{symbol.description}</p>
                  </div>
                  <p className="text-sm text-gray-600 font-light">
                    {symbol.type.toUpperCase()} / {symbol.exchange}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No symbols found</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Component to trigger the Modal
const SearchTicker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSymbolSelect = (symbol) => setSearchQuery(symbol);

  return (
    <>
      {/* Header */}
         <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 w-3/4 max-w-xs hover:shadow-sm transition-shadow">
          <FaSearch className="text-gray-500 mr-1" />
          <input
            type="text"
            placeholder="Search symbol"
            value={searchQuery}
            onClick={openModal}
            className="w-full outline-none bg-transparent text-sm text-gray-800"
            readOnly
          />
        </div>
 
      {/* Symbol Search Modal */}
      <SymbolSearchModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelect={handleSymbolSelect}
      />
    </>
  );
};

export default SearchTicker;

