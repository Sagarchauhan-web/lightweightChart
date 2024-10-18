import React, { useState, useMemo } from 'react';
import Select from 'react-select';
import { FaSearch } from 'react-icons/fa';

const StockSymbolSearch = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [options, setOptions] = useState([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  // Dummy stock data
  const dummyStockData = useMemo(() => [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corporation' },
    { symbol: 'FB', name: 'Meta Platforms Inc.' },
    { symbol: 'NFLX', name: 'Netflix Inc.' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation' },
  ], []);

  const fetchStockSymbols = (inputValue) => {
    if (!inputValue) {
      setOptions([]);
      return;
    }

    const filteredOptions = dummyStockData
      .filter(stock => stock.symbol.toLowerCase().includes(inputValue.toLowerCase()))
      .map(stock => ({
        label: `${stock.symbol} - ${stock.name}`,
        value: stock.symbol,
      }));

    setOptions(filteredOptions);
  };

  const handleInputChange = (inputValue) => {
    fetchStockSymbols(inputValue);
  };

  const handleSymbolSelect = (selectedOption) => {
    setSelectedSymbol(selectedOption);
    console.log('Selected Symbol:', selectedOption);
  };

  return (
    <div className="relative w-full">
      {/* Search Icon to toggle visibility */}
      <div 
        className="flex items-center cursor-pointer bg-gray-600 text-white rounded-md p-1 hover:bg-gray-500 transition duration-200"
        onClick={() => setIsSearchVisible(!isSearchVisible)}
      >
        <FaSearch className="text-lg" />
      </div>

      {/* Conditional rendering of the search box */}
      {isSearchVisible && (
        <div className="mt-1">
          <Select
            value={selectedSymbol}
            onInputChange={handleInputChange}
            onChange={handleSymbolSelect}
            options={options}
            placeholder="Search..."
            className="text-gray-800"
            styles={{
              control: (provided) => ({
                ...provided,
                border: '1px solid #ccc',
                boxShadow: 'none',
                minHeight: '32px',
                borderRadius: '4px',
                padding: '0',
                '&:hover': {
                  border: '1px solid #888',
                },
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                display: 'none',
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 9999,
                marginTop: '4px',
                borderRadius: '4px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? '#f0f4ff' : 'white',
                color: state.isFocused ? '#000' : '#333',
                padding: '6px',
                borderRadius: '4px',
              }),
            }}
          />
          {selectedSymbol && (
            <div className="mt-1 text-gray-700 text-xs">
              <p><strong>Selected:</strong> {selectedSymbol.label}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockSymbolSearch;
