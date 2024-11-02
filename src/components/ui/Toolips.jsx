import React from "react";

const Tooltip = ({ children, text }) => {
  return (
    <div className="relative">
      {children}
      <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-32 text-center py-1 text-sm font-medium text-white bg-gray-800 rounded-md shadow-lg z-10 opacity-0 transition-opacity duration-300 ease-in-out">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
