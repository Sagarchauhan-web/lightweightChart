// import React, { useState } from "react";
// import {
//   FaBars,
//   FaHome,
//   FaChartLine,
//   FaShoppingCart, // Order icon
//   FaWallet, // Portfolio icon
//   FaCalculator, // Trade Calculator icon
//   FaHistory, // Transactions icon
//   FaCog, // Settings icon
//   FaSignOutAlt, // Logout icon
// } from "react-icons/fa";

// import Toolip from './Toolips' // Corrected import name for Tooltip component

// const icons = [
//   { name: "toggle", icon: FaBars, tooltip: "Toggle Price Boxes", action: "togglePriceBoxes" },
//   { name: "home", icon: FaHome, tooltip: "Home" },
//   { name: "order", icon: FaShoppingCart, tooltip: "Order", action: "toggleOrder" }, // Order icon
//   { name: "portfolio", icon: FaWallet, tooltip: "My Portfolio" }, // Portfolio icon
//   { name: "calculator", icon: FaCalculator, tooltip: "Trade Calculator", action: "toggleCalculator" },
//   { name: "logout", icon: FaSignOutAlt, tooltip: "Logout" },
// ];

// const Sidebar = ({ togglePriceBoxes, toggleCalculator, toggleOrder }) => {
//   console.log( toggleOrder )
//    const [activeIcon, setActiveIcon] = useState(null);
//   const [hoveredIcon, setHoveredIcon] = useState(null);

//   const handleIconClick = (iconName, action) => {
//     setActiveIcon(iconName);
//     switch (action) {
//       case "togglePriceBoxes":
//         togglePriceBoxes();
//         break;
//       case "toggleCalculator":
//         toggleCalculator();
//         break;
//       case "toggleOrder":
//         toggleOrder();
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <div className="w-16 flex flex-col items-center py-6 space-y-4 border-r border-gray-200 shadow-md h-full bg-white rounded-lg">
//       {icons.map(({ name, icon: Icon, tooltip, action }) => (
//         <div
//           key={name}
//           className="relative flex items-center justify-center w-full"
//           onMouseEnter={() => setHoveredIcon(name)}
//           onMouseLeave={() => setHoveredIcon(null)}
//         >
//           <button
//             className={`flex items-center justify-center rounded-lg transition-all duration-200 ease-in-out cursor-pointer w-10 h-10
//             ${activeIcon === name ? "bg-blue-400 text-white" : "hover:bg-gray-100"}`}
//             onClick={() => handleIconClick(name, action)}
//             aria-label={tooltip}
//           >
//             <Icon
//               size={20}
//               className={`${
//                 activeIcon === name ? "text-white" : "text-gray-600"
//               } transition-colors duration-200`}
//             />
//           </button>

//           {/* Render tooltip only when hovered */}
//           {hoveredIcon === name && (
//             <Toolip text={tooltip}>
//               <div className="absolute left-full ml-2 py-1 text-xs font-medium text-white bg-gray-800 rounded-md shadow-lg z-10 whitespace-nowrap">
//                 {tooltip}
//               </div>
//             </Toolip>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import {
  FaBars,
  FaHome,
  FaChartLine,
  FaShoppingCart, // Order icon
  FaWallet, // Portfolio icon
  FaCalculator, // Trade Calculator icon
  FaHistory, // Transactions icon
  FaCog, // Settings icon
  FaSignOutAlt, // Logout icon
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Toolip from "./Toolips"; // Corrected import name for Tooltip component

const icons = [
  { name: "toggle", icon: FaBars, tooltip: "Toggle Price Boxes", action: "togglePriceBoxes" },
  { name: "home", icon: FaHome, tooltip: "Home" },
  { name: "order", icon: FaShoppingCart, tooltip: "Order", action: "navigateToOrderTable" }, // Updated action
  { name: "portfolio", icon: FaWallet, tooltip: "My Portfolio" }, // Portfolio icon
  { name: "calculator", icon: FaCalculator, tooltip: "Trade Calculator", action: "toggleCalculator" },
  { name: "logout", icon: FaSignOutAlt, tooltip: "Logout" },
];

const Sidebar = ({ togglePriceBoxes, toggleCalculator }) => {
  const [activeIcon, setActiveIcon] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleIconClick = (iconName, action) => {
    setActiveIcon(iconName);
    switch (action) {
      case "togglePriceBoxes":
        togglePriceBoxes();
        break;
      case "toggleCalculator":
        toggleCalculator();
        break;
      case "navigateToOrderTable": // New case for navigation
        navigate("/order-table"); // Navigate to the "Order Table" page
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-16 flex flex-col items-center py-6 space-y-4 border-r border-gray-200 shadow-md h-full bg-white rounded-lg">
      {icons.map(({ name, icon: Icon, tooltip, action }) => (
        <div
          key={name}
          className="relative flex items-center justify-center w-full"
          onMouseEnter={() => setHoveredIcon(name)}
          onMouseLeave={() => setHoveredIcon(null)}
        >
          <button
            className={`flex items-center justify-center rounded-lg transition-all duration-200 ease-in-out cursor-pointer w-10 h-10
            ${activeIcon === name ? "bg-blue-400 text-white" : "hover:bg-gray-100"}`}
            onClick={() => handleIconClick(name, action)}
            aria-label={tooltip}
          >
            <Icon
              size={20}
              className={`${
                activeIcon === name ? "text-white" : "text-gray-600"
              } transition-colors duration-200`}
            />
          </button>

          {/* Render tooltip only when hovered */}
          {hoveredIcon === name && (
            <Toolip text={tooltip}>
              <div className="absolute left-full ml-2 py-1 text-xs font-medium text-white bg-gray-800 rounded-md shadow-lg z-10 whitespace-nowrap">
                {tooltip}
              </div>
            </Toolip>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
