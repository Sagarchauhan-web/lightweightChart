import React, { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const dummySymbols = [
  { name: 'IRFC', description: 'INDIAN RAILWAY FIN CORP L', type: 'stock', exchange: 'NSE' },
  { name: 'RELIANCE', description: 'RELIANCE INDUSTRIES LTD', type: 'stock', exchange: 'NSE' },
  { name: 'HDFCBANK', description: 'HDFC BANK LTD', type: 'stock', exchange: 'NSE' },
  { name: 'EURUSD', description: 'EURO FX/U.S. DOLLAR', type: 'forex', exchange: 'FX' },
  { name: 'BTCUSD', description: 'BITCOIN TO USD', type: 'crypto', exchange: 'Crypto' },
  { name: 'ETHUSD', description: 'ETHEREUM TO USD', type: 'crypto', exchange: 'Crypto' },
  { name: 'SPY', description: 'SPDR S&P 500 ETF TRUST', type: 'stock', exchange: 'NYSE' },
  { name: 'USOIL', description: 'CRUDE OIL', type: 'forex', exchange: 'FX' },
  // ... Add more dummy symbols if needed
];

const filters = ['All', 'Forex', 'Crypto', 'Options'];

const SymbolSearchModal = ({ isOpen, onClose, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredSymbols = dummySymbols.filter(symbol => {
    if (selectedFilter !== 'All' && symbol.type !== selectedFilter.toLowerCase()) {
      return false;
    }
    return symbol.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className={`fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className={`bg-white rounded-lg shadow-lg w-3/4 max-w-3xl p-5 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Symbol Search</h2>
          <button onClick={onClose}>
            <FaTimes className="text-gray-600" size={24} />
          </button>
        </div>

        {/* Search Input */}
        <div className="flex items-center mb-4">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search symbol"
            value={searchQuery}
            onChange={handleSearchChange}
            className="ml-2 p-2 border border-gray-300 rounded w-full outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex space-x-2 mb-4">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-3 py-1 rounded-full border ${selectedFilter === filter ? 'bg-blue-500 text-white' : 'border-gray-300'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Symbol List */}
        <div className="overflow-y-auto max-h-64">
          <ul>
            {filteredSymbols.map((symbol, index) => (
              <li
                key={index}
                onClick={() => {
                  onSelect(symbol.name);
                  onClose();
                }}
                className="flex justify-between p-2 border-b hover:bg-gray-100 cursor-pointer"
              >
                <div>
                  <p className="font-medium">{symbol.name}</p>
                  <p className="text-sm text-gray-600">{symbol.description}</p>
                </div>
                <p className="text-sm">{symbol.type.toUpperCase()} {symbol.exchange}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const SearchTicker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSymbolSelect = (symbol) => {
    setSearchQuery(symbol); // Update input box with selected symbol
  };

  return (
    <>
      {/* Header */}
      <header className="flex items-center justify-between p-2 bg-white shadow-md w-full">
        <div className="flex items-center border border-gray-300 rounded-full p-2">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search symbol"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search input
            className="ml-2 outline-none bg-transparent"
            onClick={openModal}  // Open modal on click
          />
        </div>
      </header>

      {/* Symbol Search Modal */}
      <SymbolSearchModal isOpen={isModalOpen} onClose={closeModal} onSelect={handleSymbolSelect} />
    </>
  );
};

export default SearchTicker;
