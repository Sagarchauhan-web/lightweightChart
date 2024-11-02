import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header'; // Ensure this path is correct
import Dashboard from '../pages/Dashboard/Dashboard';

export default function DashboardLayout({ togglePriceBoxes, toggleCalculator, toggleOrder }) {
  const handleSearch = (ticker) => {
    console.log("Searching for:", ticker);
    // Implement your search logic here, such as filtering or API calls
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-100 to-gray-200 overflow-hidden">
    {/* Using a gradient background for a modern look */}
    <div className="flex-1 flex flex-col">
      {/* Pass the handleSearch function to Header */}
      <Header onSearch={handleSearch} />
      <main className="flex-1 p-0 overflow-hidden">
        {/* Increased padding for a more spacious feel */}
        <div className="bg-white rounded-lg shadow-md p-1 mt-0"> {/* Minimal top margin */}
          {/* Dashboard with minimal margin from the header */}
          <Dashboard />
          <Outlet />
        </div>
      </main>
    </div>
  </div>
  
  );
}
