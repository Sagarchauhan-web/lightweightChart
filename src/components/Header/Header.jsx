// Header.js
import React from 'react';
import SearchTicker from '../SearchTicker/SearchTicker'; // Ensure this is the correct path

const Header = ({ onSearch }) => {
  return (
    <header className="flex items-center justify-between p-2 bg-white">
      <div className="flex items-center">
       
      <SearchTicker onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;
 