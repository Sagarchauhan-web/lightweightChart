// Tooltip.jsx
import React from 'react';

const Tooltip = ({ children, text }) => {
    return (
        <div className="relative flex items-center group">
            {children}
            <div className="absolute left-full mr-2 whitespace-nowrap bg-gray-900 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {text}
            </div>
        </div>
    );
};

export default Tooltip;
