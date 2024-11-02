// Header.js
import React from 'react';
import SearchTicker from '../SearchTicker/SearchTicker'; // Ensure this is the correct path

const Header = ({ onSearch }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-auto">
       
      <SearchTicker onSearch={onSearch} />
    </header>
  );
};

export default Header;
