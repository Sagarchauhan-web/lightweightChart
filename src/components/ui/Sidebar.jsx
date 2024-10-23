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
  { name: "calculator", icon: FaCalculator, tooltip: "Risk Calculator", action: "toggleCalculator" },
  { name: "settings", icon: FaCog, tooltip: "Settings" },
  { name: "logout", icon: FaSignOutAlt, tooltip: "Logout" },
];

const Sidebar = ({ togglePriceBoxes, toggleCalculator }) => {
  const [activeIcon, setActiveIcon] = useState(null);

  const handleIconClick = (iconName, action) => {
    setActiveIcon(iconName);
    if (action === "togglePriceBoxes") togglePriceBoxes();
    if (action === "toggleCalculator") toggleCalculator();
  };

  return (
    <div className="w-11 bg-gradient-to-b from-gray-800 to-gray-900 flex flex-col items-center p-4 space-y-6 shadow-lg rounded-xl h-full">
      {icons.map(({ name, icon: Icon, tooltip, action }) => (
        <Tooltip text={tooltip} key={name}>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-200 ease-in-out cursor-pointer shadow-md ${
              activeIcon === name
                ? "bg-blue-500 transform scale-110"
                : "bg-gray-700 hover:bg-blue-500 hover:scale-105"
            }`}
            onClick={() => handleIconClick(name, action)}
            aria-label={tooltip}
          >
            <Icon
              size={20}
              className={activeIcon === name ? "text-white" : "text-gray-300"}
            />
          </div>
        </Tooltip>
      ))}
    </div>
  );
};

export default Sidebar;
