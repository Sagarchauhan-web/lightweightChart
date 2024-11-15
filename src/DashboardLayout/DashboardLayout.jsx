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
    <div className="flex h-screen bg-gradient-to-b from-gray-100 to-gray-300 overflow-hidden">
      {/* Main Container fills the viewport height */}
      <div className="flex-1 flex flex-col h-full">
        
        {/* Header */}
        <Header onSearch={handleSearch} />
        
        {/* Main Content Area without scrolling */}
        <main className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="bg-white rounded-lg shadow-md p-0.5 flex-1 ">
            {/* Dashboard and Outlet */}
            <Dashboard />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )}