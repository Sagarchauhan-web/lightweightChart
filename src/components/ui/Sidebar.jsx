import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaChartLine,
  FaCog,
  FaSignOutAlt,
  FaCalculator,
} from "react-icons/fa";
import Tooltip from "./Toolips"; // Import the Tooltip component

const icons = [
  { name: "toggle", icon: FaBars, tooltip: "Toggle Price Boxes", action: "togglePriceBoxes" },
  { name: "home", icon: FaHome, tooltip: "Home" },
  { name: "chart", icon: FaChartLine, tooltip: "Chart" },
  { name: "calculator", icon: FaCalculator, tooltip: "Trade Calculator", action: "toggleCalculator" },
  { name: "settings", icon: FaCog, tooltip: "Settings" },
  { name: "logout", icon: FaSignOutAlt, tooltip: "Logout" },
];

const Sidebar = ({ togglePriceBoxes, toggleCalculator }) => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleIconClick = (iconName, action) => {
    setActiveIcon(iconName);
    if (action === "togglePriceBoxes") togglePriceBoxes();
    if (action === "toggleCalculator") toggleCalculator();
  };

  return (
    <div className="w-16 bg-white flex flex-col items-center py-6 space-y-4 border-r border-gray-200 shadow-md h-full rounded-lg">
      {icons.map(({ name, icon: Icon, tooltip, action }) => (
        <div
          key={name}
          className="relative flex items-center justify-center w-full"
          onMouseEnter={() => setHoveredIcon(name)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <div
            className={`flex items-center justify-center rounded-lg transition-colors duration-200 ease-in-out cursor-pointer w-10 h-10
            ${activeIcon === name ? "bg-gray-100" : "hover:bg-gray-50"}
          `}
            onClick={() => handleIconClick(name, action)}
            aria-label={tooltip}
          >
            <Icon
              size={20}
              className={`${
                activeIcon === name ? "text-black" : "text-gray-500"
              }`}
            />
          </div>

          {/* Render tooltip only when hovered */}
          {hoveredIcon === name && (
            <Tooltip text={tooltip}>
              <div className="absolute left-18   py-1 text-xs font-medium text-white bg-gray-700 rounded-md shadow-lg z-10 whitespace-nowrap">
                {tooltip}
              </div>
            </Tooltip>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
