// import React, { useEffect, useRef, useState } from "react";
// import { createChart } from "lightweight-charts";
// import Sidebar from "../../components/ui/Sidebar";
// import SearchTicker from "../../components/SearchTicker/SearchTicker";
// import { placeOrder } from "../../services/Order/Order";
// import { useNavigate } from "react-router-dom"; // Import useNavigate

// function Dashboard() {
//   // State Variables
//   const [entryPrice, setEntryPrice] = useState(100);
//   const [stopLossPrice, setStopLossPrice] = useState(500);
//   const [takeProfit, setTakeProfit] = useState(40);
//   const [isBuyActive, setIsBuyActive] = useState(true);
//   const [orderType, setOrderType] = useState("market");
//   const [quantity, setQuantity] = useState(1); // Quantity state
//   const [arePricesVisible, setArePricesVisible] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [draggedLine, setDraggedLine] = useState(null);
//   const [showCalculator, setShowCalculator] = useState(false);
  
//   const chartRef = useRef(null);
//   const navigate = useNavigate(); // Initialize useNavigate

//   // Function to toggle the visibility of price boxes
//   const togglePriceBoxes = () => {
//     setArePricesVisible((prev) => !prev);
//     setShowCalculator(false);
//   };

//   // Function to toggle Buy/Sell
//   const toggleBuySell = () => {
//     setIsBuyActive((prev) => !prev);
//   };

//   // Function to toggle calculator visibility
//   const toggleCalculator = () => {
//     setShowCalculator((prev) => !prev);
//     setArePricesVisible(false);
//   };

//   // Function to place an order
//   const handlePlaceOrder = async () => {
//     const orderData = {
//       symbol: "NQZ4",
//       side: isBuyActive ? 'buy' : 'sell', // Determine side based on isBuyActive
//       order_type: orderType, // Use selected order type
//       price: entryPrice, // Use entryPrice for the order price
//       quantity: quantity, // Use user-defined quantity
//       stop_loss_price: stopLossPrice, // Optional: include stop loss if needed
//       take_profit: takeProfit // Optional: include take profit if needed
//     };

//     try {
//       const result = await placeOrder(orderData);
//       alert(`Order placed successfully: ${JSON.stringify(result)}`);
      
//       // Redirect to the dashboard after placing an order
//       navigate('/dashboard'); // Adjust the path as necessary
//     } catch (error) {
//       alert(`Error placing order: ${error.message}`);
//     }
//   };

//   // Chart Setup and Event Listeners
//   useEffect(() => {
//     const chart = createChart(chartRef.current, {
//       layout: {
//         textColor: "#333",
//         background: { type: "solid", color: "#ffffff" },
//       },
//       grid: {
//         horzLines: { color: "#efefef" },
//         vertLines: { color: "#efefef" },
//       },
//       crossHair: { mode: 0 },
//     });

//     // Add Candlestick Series to the Chart
//     const candlestickSeries = chart.addCandlestickSeries({
//       upColor: "#26a69a",
//       downColor: "#ef5350",
//       borderVisible: false,
//       wickUpColor: "#26a69a",
//       wickDownColor: "#ef5350",
//     });

//     // Sample Data for the Chart
//     candlestickSeries.setData([
//       { time: "2018-12-22", open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
//       { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
//       // Add more data as needed...
//     ]);

//     // Initialize Lines for Stop Loss, Take Profit, and Entry
//     const stopLossLine = chart.addLineSeries({ color: "red", lineWidth: 2 });
//     const takeProfitLine = chart.addLineSeries({ color: "green", lineWidth: 2 });
//     const entryLine = chart.addLineSeries({ color: "blue", lineWidth: 2 });

//     const initialTime = "2018-12-22";

//     if (arePricesVisible) {
//       stopLossLine.setData([{ time: initialTime, value: stopLossPrice }]);
//       takeProfitLine.setData([{ time: initialTime, value: takeProfit }]);
//       entryLine.setData([{ time: initialTime, value: entryPrice }]);
//     }

//     // Event Handlers
//     const singleClickHandler = (e) => {
//       const { offsetY } = e;
//       const priceAtPoint = candlestickSeries.coordinateToPrice(offsetY);
//       const tolerance = 3;

//       if (Math.abs(priceAtPoint - stopLossPrice) < tolerance) {
//         setDraggedLine("stop_loss");
//         setIsDragging(true);
//       } else if (Math.abs(priceAtPoint - takeProfit) < tolerance) {
//         setDraggedLine("take_profit");
//         setIsDragging(true);
//       } else if (Math.abs(priceAtPoint - entryPrice) < tolerance) {
//         setDraggedLine("entry");
//         setIsDragging(true);
//       }
//     };

//     const mouseMoveHandler = (e) => {
//       if (isDragging) {
//         const { offsetY } = e;
//         const newPrice = candlestickSeries.coordinateToPrice(offsetY);
//         switch (draggedLine) {
//           case "stop_loss":
//             setStopLossPrice(newPrice);
//             stopLossLine.setData([{ time: initialTime, value: newPrice }]);
//             break;
//           case "take_profit":
//             setTakeProfit(newPrice);
//             takeProfitLine.setData([{ time: initialTime, value: newPrice }]);
//             break;
//           case "entry":
//             setEntryPrice(newPrice);
//             entryLine.setData([{ time: initialTime, value: newPrice }]);
//             break;
//           default:
//             break;
//         }
//       }
//     };

//     const mouseUpHandler = () => {
//       setIsDragging(false);
//       setDraggedLine(null);
//     };

//     const chartElement = chartRef.current;

//     // Attach Event Listeners
//     chartElement.addEventListener("click", singleClickHandler);
//     chartElement.addEventListener("mousemove", mouseMoveHandler);
//     chartElement.addEventListener("mouseup", mouseUpHandler);

//     // Cleanup Function
//     return () => {
//       chartElement.removeEventListener("click", singleClickHandler);
//       chartElement.removeEventListener("mousemove", mouseMoveHandler);
//       chartElement.removeEventListener("mouseup", mouseUpHandler);
//       chart.remove();
//     };
//   }, [entryPrice, stopLossPrice, takeProfit, isDragging, arePricesVisible]);

//   return (
//     <div className="relative w-full h-screen bg-gray-50 flex flex-col">
//       {/* Header Section */}
//       <header className="sticky top-0 z-10 w-full flex items-center justify-between">
//         <SearchTicker />
//       </header>

//       {/* Main Dashboard Layout */}
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar togglePriceBoxes={togglePriceBoxes} toggleCalculator={toggleCalculator} />

//         <div className="flex-1 p-2 flex flex-row overflow-hidden space-x-1">
//           {arePricesVisible && (
//             <div className="flex flex-col space-y-6 p-6 bg-white border border-gray-300 rounded-lg shadow-md min-w-[200px] max-w-[300px]">
//               {/* Toggle buttons for Buy/Sell */}
//               <div className="flex justify-between">
//                 <button
//                   className={`flex-1 py-3 rounded-lg ${isBuyActive ? "bg-green-600" : "bg-gray-200"} text-white font-bold transition duration-200 hover:bg-green-700`}
//                   onClick={toggleBuySell}
//                 >
//                   Buy
//                 </button>
//                 <button
//                   className={`flex-1 py-3 rounded-lg ${!isBuyActive ? "bg-red-600" : "bg-gray-200"} text-white font-bold transition duration-200 hover:bg-red-700`}
//                   onClick={toggleBuySell}
//                 >
//                   Sell
//                 </button>
//               </div>

//               {/* Order Type Radio Buttons */}
//               <div>
//                 <div className="flex space-x-4 mt-2">
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       value="MKT"
//                       checked={orderType === "MKT"}
//                       onChange={(e) => setOrderType(e.target.value)}
//                       className="mr-2"
//                     />
//                     Market
//                   </label>
//                   <label className="flex items-center">
//                     <input
//                       type="radio"
//                       value="LMT"
//                       checked={orderType === "LMT"}
//                       onChange={(e) => setOrderType(e.target.value)}
//                       className="mr-2"
//                     />
//                     Limit
//                   </label>
//                 </div>
//               </div>

//               {/* Price Inputs */}
//               <div>
//                 <label className="block text-gray-700">Entry Price:</label>
//                 <input
//                   type="number"
//                   value={entryPrice}
//                   onChange={(e) => setEntryPrice(parseFloat(e.target.value))}
//                   className="mt-1 p-2 border border-gray-300 rounded w-full"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700">Stop Loss Price:</label>
//                 <input
//                   type="number"
//                   value={stopLossPrice}
//                   onChange={(e) => setStopLossPrice(parseFloat(e.target.value))}
//                   className="mt-1 p-2 border border-gray-300 rounded w-full"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700">Take Profit:</label>
//                 <input
//                   type="number"
//                   value={takeProfit}
//                   onChange={(e) => setTakeProfit(parseFloat(e.target.value))}
//                   className="mt-1 p-2 border border-gray-300 rounded w-full"
//                 />
//               </div>

//               {/* Quantity Input */}
//               <div>
//                 <label className="block text-gray-700">Quantity:</label>
//                 <input
//                   type="number"
//                   value={quantity}
//                   onChange={(e) => setQuantity(parseInt(e.target.value))}
//                   className="mt-1 p-2 border border-gray-300 rounded w-full"
//                 />
//               </div>

//               {/* Place Order Button */}
//               <button
//                 onClick={handlePlaceOrder}
//                 className="mt-4 py-3 bg-blue-600 text-white font-bold rounded-lg transition duration-200 hover:bg-blue-700"
//               >
//                 Place Order
//               </button>
//             </div>
//           )}

//           {/* Chart Container */}
//           <div ref={chartRef} className="flex-1 h-full bg-white border border-gray-300 rounded-lg shadow-md" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/ui/Sidebar";
import SearchTicker from "../../components/SearchTicker/SearchTicker";
import { placeOrder } from "../../services/Order/Order";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Chart from "./Chart"; // Import the Chart component

function Dashboard() {
  // State Variables
  const [entryPrice, setEntryPrice] = useState(100);
  const [stopLossPrice, setStopLossPrice] = useState(500);
  const [takeProfit, setTakeProfit] = useState(40);
  const [isBuyActive, setIsBuyActive] = useState(true);
  const [orderType, setOrderType] = useState("market");
  const [quantity, setQuantity] = useState(1); // Quantity state
  const [arePricesVisible, setArePricesVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to toggle the visibility of price boxes
  const togglePriceBoxes = () => {
    setArePricesVisible((prev) => !prev);
  };

  // Function to toggle Buy/Sell
  const toggleBuySell = () => {
    setIsBuyActive((prev) => !prev);
  };

  // Function to place an order
  const handlePlaceOrder = async () => {
    const orderData = {
      symbol: "NQZ4",
      side: isBuyActive ? 'buy' : 'sell', // Determine side based on isBuyActive
      order_type: orderType, // Use selected order type
      price: entryPrice, // Use entryPrice for the order price
      quantity: quantity, // Use user-defined quantity
      stop_loss_price: stopLossPrice, // Optional: include stop loss if needed
      take_profit: takeProfit // Optional: include take profit if needed
    };

    try {
      const result = await placeOrder(orderData);
      alert(`Order placed successfully: ${JSON.stringify(result)}`);
      // Redirect to the dashboard after placing an order
      navigate('/dashboard'); // Adjust the path as necessary
    } catch (error) {
      alert(`Error placing order: ${error.message}`);
    }
  };

  return (
    <div className="relative w-full h-screen bg-gray-50 flex flex-col">
      {/* Header Section */}
      <header className="sticky top-0 z-10 w-full flex items-center justify-between">
        <SearchTicker />
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar togglePriceBoxes={togglePriceBoxes} />

        <div className="flex-1 p-2 flex flex-row overflow-hidden space-x-1">
          {arePricesVisible && (
            <div className="flex flex-col space-y-6 p-6 bg-white border border-gray-300 rounded-lg shadow-md min-w-[200px] max-w-[300px]">
              {/* Toggle buttons for Buy/Sell */}
              <div className="flex justify-between">
                <button
                  className={`flex-1 py-3 rounded-lg ${isBuyActive ? "bg-green-600" : "bg-gray-200"} text-white font-bold transition duration-200 hover:bg-green-700`}
                  onClick={toggleBuySell}
                >
                  Buy
                </button>
                <button
                  className={`flex-1 py-3 rounded-lg ${!isBuyActive ? "bg-red-600" : "bg-gray-200"} text-white font-bold transition duration-200 hover:bg-red-700`}
                  onClick={toggleBuySell}
                >
                  Sell
                </button>
              </div>

              {/* Order Type Radio Buttons */}
              <div>
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="MKT"
                      checked={orderType === "MKT"}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="mr-2"
                    />
                    Market
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="LMT"
                      checked={orderType === "LMT"}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="mr-2"
                    />
                    Limit
                  </label>
                </div>
              </div>

              {/* Price Inputs */}
              <div>
                <label className="block text-gray-700">Entry Price:</label>
                <input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(parseFloat(e.target.value))}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              <div>
                <label className="block text-gray-700">Stop Loss Price:</label>
                <input
                  type="number"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(parseFloat(e.target.value))}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              <div>
                <label className="block text-gray-700">Take Profit:</label>
                <input
                  type="number"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(parseFloat(e.target.value))}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              {/* Quantity Input */}
              <div>
                <label className="block text-gray-700">Quantity:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="mt-4 py-3 bg-blue-600 text-white font-bold rounded-lg transition duration-200 hover:bg-blue-700"
              >
                Place Order
              </button>
            </div>
          )}

          {/* Chart Container */}
          <Chart
            entryPrice={entryPrice}
            stopLossPrice={stopLossPrice}
            takeProfit={takeProfit}
            arePricesVisible={arePricesVisible}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
