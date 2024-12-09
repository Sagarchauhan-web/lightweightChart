 
 
// import React, { useEffect, useRef, useState } from "react";

// import { createChart } from "lightweight-charts";
// import Sidebar from "../../components/ui/Sidebar";
// import SearchTicker from "../../components/SearchTicker/SearchTicker";
// import { placeOrder } from "../../services/Order/Order";
// import { useNavigate } from "react-router-dom";
// import TradeCalculator from "../../components/TradeCalculator/TradeCalculator";
// import { toast } from "@/components/ui/use-toast";
// import { cn } from "@/lib/utils";
// import { IoIosCheckmarkCircle } from "react-icons/io";
// import { useLocation } from "react-router-dom";
// import { OrderTable } from "../OrderTable/OrderTable";
// import { modifyOrder } from "../../services/Order/Order";
// import { getTickerData } from "../../services/auth";

// function Dashboard() {
//   const [entryPrice, setEntryPrice] = useState(82);
//   const [stopLossPrice, setStopLossPrice] = useState(60);
//   const [takeProfit, setTakeProfit] = useState(89);
//   const [isBuyActive, setIsBuyActive] = useState(true);
//   const [orderType, setOrderType] = useState(" ");
//   const chartRef = useRef(null);
//   const [arePricesVisible, setArePricesVisible] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [draggedLine, setDraggedLine] = useState(null);
//   const [showCalculator, setShowCalculator] = useState(false);

//   const [quantity, setQuantity] = useState("");
//   const [arePricesVisibleModifiy, setarePricesVisibleModifiy] = useState(true);

//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const clearInputs = () => {
//     setEntryPrice("");
//     setStopLossPrice("");
//     setTakeProfit("");
//   };

//     // State to store the received order data
//     const [orderData, setOrderData] = useState({
//       orderId: 0,
//       initialOrderType: '',
//       orderQty: 0,
//       entry_price :'' ,
//       stopLossId: '',
//       stopLossPricez: 0,
//       takeProfitId: '',
//       takeProfitPricex: 0,
//       isfromModify: false,
//     });
  

//   const togglePriceBoxes = () => {
//     setArePricesVisible((prev) => !prev);
//     setShowCalculator(false);
//   };

//   const toggleBuySell = () => {
//     setIsBuyActive((prev) => !prev);
//   };

//   const toggleCalculator = () => {
//     setShowCalculator((prev) => !prev);
//     setArePricesVisible(false);
//   };
//   const location = useLocation(); // Access the location state directly

//   useEffect(() => {
//     // Initialize the chart instance
//     chartInstance.current = createChart(chartRef.current, {
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

//     // Add candlestick series to the chart
//     candlestickSeries.current = chartInstance.current.addCandlestickSeries({
//       upColor: "#26a69a",
//       downColor: "#ef5350",
//       borderVisible: false,
//       wickUpColor: "#26a69a",
//       wickDownColor: "#ef5350",
//     });

//     // Function to fetch and process ticker data
//     const fetchData = async () => {
//       try {
//         const apiData = await getTickerData("NQ=F", "2010-01-01", "2024-12-31");
//         console.log("Fetched API data:", apiData); // Debugging line

//         // Process the fetched data into the format required by the chart
//         const chartData = apiData
//           .map((item) => ({
//             time: new Date(item.index).getTime() / 1000, // Convert date to Unix timestamp (seconds)
//             open: item.open,
//             high: item.high,
//             low: item.low,
//             close: item.close,
//           }))
//           .filter(
//             (data) =>
//               data.time && data.open && data.high && data.low && data.close
//           )
//           .sort((a, b) => a.time - b.time); // Sort by time in ascending order

//         console.log("Formatted chart data:", chartData); // Debugging line

//         // Update the chart with the processed data
//         candlestickSeries.current.setData(chartData);
//       } catch (error) {
//         console.error("Error fetching ticker data:", error);
//       }
//     };

//     // Call fetchData when the component mounts
//     fetchData();

//     // Initialize horizontal lines for Stop Loss, Take Profit, and Entry
//     stopLossLine.current = chartInstance.current.addLineSeries({
//       color: "red",
//       lineWidth: 2, // Solid line width
//       crosshairMarkerVisible: false,
//       lineStyle: 0, // Solid line
//     });

//     takeProfitLine.current = chartInstance.current.addLineSeries({
//       color: "green",
//       lineWidth: 2, // Solid line width
//       crosshairMarkerVisible: false,
//       lineStyle: 0, // Solid line
//     });

//     entryLine.current = chartInstance.current.addLineSeries({
//       color: "blue",
//       lineWidth: 2, // Solid line width
//       crosshairMarkerVisible: false,
//       lineStyle: 0, // Solid line
//     });

//     // Cleanup function to remove the chart instance when the component unmounts
//     return () => {
//       chartInstance.current.remove();
//     };
//   }, []); // Empty dependency array ensures this effect runs only once

  
//   useEffect(() => {
//     if (location.state) {
//       const {
//         orderId,
//         initialOrderType,
//         orderQty,
//         entry_price,
//         stopLossId,
//         stopLossPricez,
//         takeProfitId,
//         takeProfitPricex,
//         isfromModify,
//       } = location.state;
  
//       console.log("Received State:", {
//         orderId,
//         initialOrderType,
//         orderQty,
//         entry_price,
//         stopLossId,
//         stopLossPricez,
//         takeProfitId,
//         takeProfitPricex,
//         isfromModify,
//       });
  
//       // Update the local state with received data
//       setOrderData({
//         orderId,
//         initialOrderType,
//         orderQty,
//         stopLossId,
//         stopLossPricez,
//         takeProfitId,
//         takeProfitPricex,
//         isfromModify,
//       });
//     }
//   }, [location]);
  
//   // Handle the modify order process
//   const handleModifyOrder = async (updatedTakeProfitPrice, updatedStopLossPrice, updatedEntryPrice) => {
//     // Construct the payload dynamically using orderData
//     const payload = {
//       orderId: orderData?.orderId || 0,
//       orderQty: orderData?.orderQty || 0,
//       orderType: orderData?.initialOrderType || "string",
//       entry_price : updatedEntryPrice || 0 ,
//       takeProfitOrderId: orderData?.takeProfitId || 0,
//       takeProfitPrice: updatedTakeProfitPrice || 0,
//       stopLossOrderId: orderData?.stopLossId || 0,
//       stopLossPrice: updatedStopLossPrice || 0,
//     };
  
//     console.log("Payload for modify order:", JSON.stringify(payload, null, 2));
  
//     try {
//       const response = await modifyOrder(payload); // Assuming modifyOrder is your API function
//       console.log("Order Modified:", response);
//       toast.success("Order modified successfully");
//     } catch (error) {
//       toast.error("Error modifying order");
//       console.error("Error modifying order:", error);
//     }
//   };
 
//   // Effect to initialize the chart with state values when the component mounts
//   useEffect(() => {
//     if (
//       location?.state?.stopLossPricez !== undefined &&
//       location?.state?.takeProfitPricex !== undefined &&
//       location?.state?.entry_price !== undefined
//     ) {
//       const { stopLossPricez, takeProfitPricex, entry_price } = location.state;

//       // Update the chart lines with the received values
//       const currentTime = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds

//       stopLossLine.current?.setData([
//         { time: currentTime, value: stopLossPricez },
//       ]);
//       takeProfitLine.current?.setData([
//         { time: currentTime, value: takeProfitPricex },
//       ]);

//       entryLine.current?.setData([
//         {time:currentTime, value:entry_price},
//       ]);


//       setStopLossPrice(stopLossPricez);
//       setTakeProfit(takeProfitPricex);
//       setEntryPrice(entry_price);

//       console.log("Chart lines updated with state values:", {
//         stopLossPricez,
//         takeProfitPricex,
//         entry_price,
//       });
//     }
//   }, [location.state]); // Dependency on location.state

//   // Function to handle single click events
//   const singleClickHandler = (e) => {
//     if (!chartRef.current || !candlestickSeries.current) return;
  
//     const chartBounds = chartRef.current.getBoundingClientRect();
//     const yCoord = e.clientY - chartBounds.top;
//     const priceAtPoint = candlestickSeries.current.coordinateToPrice(yCoord);
  
//     if (priceAtPoint === null || isNaN(priceAtPoint)) return;
  
//     // Start dragging based on the closest line
//     const distances = [
//       { type: "stop_loss", distance: Math.abs(priceAtPoint - stopLossPrice) },
//       { type: "take_profit", distance: Math.abs(priceAtPoint - takeProfit) },
//       { type: "entry", distance: Math.abs(priceAtPoint - entryPrice) },
//     ];
  
//     const closestLine = distances.reduce((prev, current) =>
//       prev.distance < current.distance ? prev : current
//     );
  
//     setDraggedLine(closestLine.type);
//     setIsDragging(true);
//     highlightLine(closestLine.type);
//   };
  
//   const mouseMoveHandler = (e) => {
//     if (!isDragging || !draggedLine || !chartRef.current) return;
  
//     const chartBounds = chartRef.current.getBoundingClientRect();
//     const yCoord = e.clientY - chartBounds.top;
//     const priceAtPoint = candlestickSeries.current.coordinateToPrice(yCoord);
  
//     if (priceAtPoint === null || isNaN(priceAtPoint)) return;
  
//     // Update the corresponding line freely based on dragging
//     if (draggedLine === "stop_loss") {
//       setStopLossPrice(priceAtPoint);
//       stopLossLine.current?.setData([{ time: Math.floor(Date.now() / 1000), value: priceAtPoint }]);
//     } else if (draggedLine === "take_profit") {
//       setTakeProfit(priceAtPoint);
//       takeProfitLine.current?.setData([{ time: Math.floor(Date.now() / 1000), value: priceAtPoint }]);
//     } else if (draggedLine === "entry") {
//       setEntryPrice(priceAtPoint);
//       entryLine.current?.setData([{ time: Math.floor(Date.now() / 1000), value: priceAtPoint }]);
//     }
//   };
  
//   const mouseUpHandler = () => {
//     setIsDragging(false);
//     setDraggedLine(null);
  
//     if (draggedLine === "stop_loss" || draggedLine === "take_profit" || draggedLine ==="entry") {
//       handleModifyOrder(stopLossPrice, takeProfit, entryPrice);
//     }
//   };
  

//   // Add event listeners for smooth interaction
//   useEffect(() => {
//     const chartElement = chartRef.current;
//     if (!chartElement) return;

//     chartElement.addEventListener("mousemove", mouseMoveHandler);
//     chartElement.addEventListener("mouseup", mouseUpHandler);

//     return () => {
//       chartElement.removeEventListener("mousemove", mouseMoveHandler);
//       chartElement.removeEventListener("mouseup", mouseUpHandler);
//     };
//   }, [isDragging, draggedLine]);

//   const handlePlaceOrder = async () => {
//     const orderData = {
//       symbol: "NQZ4",
//       side: isBuyActive ? "Buy" : "Sell", // Update side based on the buy/sell toggle
//       order_type: orderType,
//       price: entryPrice, // Assuming you want to use entryPrice as the price
//       quantity: Number(quantity), // Ensure quantity is a number
//       take_profit: takeProfit, // Include take profit in the order data
//       stop_loss: stopLossPrice, // Including stop loss in the order data
//     };

//     console.log("Order Data Payload:", JSON.stringify(orderData, null, 2));

//     try {
//       const result = await placeOrder(orderData);

//       if (!result) {
//         toast({
//           className: cn(
//             "fixed top-0 right-0 flex md:max-w-[420px] md:top-4 md:right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg"
//           ),
//           duration: 3000,
//           position: "top-center",
//           title: "No Response",
//           description:
//             "No response received from the server. Please try again later.",
//         });
//         return; // Stop execution if no result
//       }

//       if (result.error) {
//         const toastOptions = {
//           className: cn(
//             "fixed top-0 right-0 flex md:max-w-[200px] md:top-4 md:right-4 p-3 rounded-lg"
//           ),
//           duration: 3000,
//           position: "top-center",
//           title: "Something went wrong",
//           description: result.error.message || "An error occurred.",
//         };

//         // Custom styling and messages based on error type
//         switch (result.error.type) {
//           case "validation":
//             toastOptions.title = "Validation Error";
//             toastOptions.className += " bg-red-500 text-white";
//             break;
//           case "network":
//             toastOptions.title = "Network Error";
//             toastOptions.className += " bg-yellow-500 text-white";
//             break;
//           case "server":
//             toastOptions.title = "Server Error";
//             toastOptions.className += " bg-orange-500 text-white";
//             break;
//           default:
//             toastOptions.title = "Error";
//             toastOptions.className += " bg-red-400 text-white";
//             break;
//         }

//         toast(toastOptions);
//       } else {
//         // Show success toast if no error
//         toast({
//           className: cn(
//             "fixed top-0 right-0 flex md:max-w-[200px] md:top-4 md:right-4 bg-green-500 text-white p-4"
//           ),
//           duration: 3000,
//           position: "top-center",
//           title: (
//             <div className="flex items-center">
//               <IoIosCheckmarkCircle className="mr-2 text-white" />
//               <span>Success</span>
//             </div>
//           ),
//           description: `Order placed successfully.`,
//         });

//         navigate("/");
//       }
//     } catch (error) {
//       // Handle unexpected errors
//       toast({
//         className: cn(
//           "fixed top-0 right-0 flex md:max-w-[420px] md:top-3 md:right-2 bg-red-600 text-white p-4 rounded-lg shadow-lg"
//         ),
//         duration: 3000,
//         position: "top-center",
//         title: "Failed ❌",
//         description:
//           error.message ||
//           "Something went wrong while processing your order. Please try again in a moment.",
//       });
//     }
//   };

//   const chartInstance = useRef(null); // Reference for the chart instance
//   const candlestickSeries = useRef(null); // Reference for the candlestick series
//   const stopLossLine = useRef(null);
//   const takeProfitLine = useRef(null);
//   const entryLine = useRef(null);

//   const [initialTime, setInitialTime] = useState(Date.now() / 1000); // Just a placeholder time for the lines
//   const [linesAdded, setLinesAdded] = useState(false); // New state to track if lines are added

//   // Function to add or remove the horizontal lines
//   const toggleLines = () => {
//     if (linesAdded) {
//       // If lines are added, remove them
//       stopLossLine.current.setData([]);
//       takeProfitLine.current.setData([]);
//       entryLine.current.setData([]);
//     } else {
//       // If lines are not added, add them
//       stopLossLine.current.setData([
//         { time: initialTime, value: stopLossPrice },
//       ]);
//       takeProfitLine.current.setData([
//         { time: initialTime, value: takeProfit },
//       ]);
//       entryLine.current.setData([{ time: initialTime, value: entryPrice }]);
//     }

//     // Toggle the linesAdded state
//     setLinesAdded(!linesAdded);
//   };
 

//   useEffect(() => {
//     // Add event listeners for mouse actions (dragging)
//     const chartContainer = chartRef.current;

//     chartContainer.addEventListener("mousedown", singleClickHandler);
//     chartContainer.addEventListener("mousemove", mouseMoveHandler);
//     chartContainer.addEventListener("mouseup", mouseUpHandler);

//     // Cleanup event listeners on unmount
//     return () => {
//       chartContainer.removeEventListener("mousedown", singleClickHandler);
//       chartContainer.removeEventListener("mousemove", mouseMoveHandler);
//       chartContainer.removeEventListener("mouseup", mouseUpHandler);
//     };
//   }, [
//     isDragging,
//     draggedLine,
//     initialTime,
//     stopLossPrice,
//     takeProfit,
//     entryPrice,
//   ]);
//   return (
//     <div className="relative p-0.5 w-full h-screen bg-gray-50 flex flex-col">
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar
//           togglePriceBoxes={togglePriceBoxes}
//           toggleCalculator={toggleCalculator}
//         />

//         <div className="flex-1 p-0.5 flex overflow-hidden">
//           {/* Floating Price Settings Box */}
//           {arePricesVisible && (
//             <div className="absolute top-1/5 left-16 transform translate-x-2 w-[250px] pl-4 pr-4 py-3 bg-white border border-gray-100 rounded-lg shadow-lg z-10">
//               <h2 className="text-2xl font-semibold text-gray-800">
//                 Price Settings
//               </h2>

//               <div className="flex justify-between space-x-2">
//                 <button
//                   className={`flex-1 py-2 rounded-lg mr-1 ${
//                     isBuyActive ? "bg-green-600" : "bg-gray-200"
//                   } text-white font-bold transition duration-200 hover:bg-green-700`}
//                   onClick={toggleBuySell}
//                 >
//                   Buy
//                 </button>
//                 <button
//                   className={`flex-1 py-2 rounded-lg ${
//                     !isBuyActive ? "bg-red-600" : "bg-gray-200"
//                   } text-white font-bold transition duration-200 hover:bg-red-700`}
//                   onClick={toggleBuySell}
//                 >
//                   Sell
//                 </button>
//               </div>

//               <div className="flex space-x-4">
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     value="MKT"
//                     checked={orderType === "MKT"}
//                     onChange={() => setOrderType("MKT")}
//                     className="form-radio h-4 w-4 text-blue-600"
//                   />
//                   <span className="text-gray-700">Market</span>
//                 </label>
//                 <label className="flex items-center space-x-2">
//                   <input
//                     type="radio"
//                     value="LMT"
//                     checked={orderType === "LMT"}
//                     onChange={() => setOrderType("LMT")}
//                     className="form-radio h-4 w-4 text-blue-600"
//                   />
//                   <span className="text-gray-700">Limit</span>
//                 </label>
//               </div>
//               <div>
//                 <label className="block text-gray-700">Entry Price:</label>
//                 <input
//                   type="number"
//                   step="0.01" // Ensures input step is 0.01 for two decimal places
//                   value={entryPrice} // Formats the value to two decimals
//                   onChange={(e) =>
//                     setEntryPrice(parseFloat(Number(e.target.value).toFixed(2)))
//                   }
//                   className="mt-1 p-2 border rounded w-full"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700">Stop Loss Price:</label>
//                 <input
//                   type="number"
//                   step="0.01" // Ensures input step is 0.01 for two decimal places
//                   value={stopLossPrice} // Formats the value to two decimals
//                   onChange={(e) =>
//                     setStopLossPrice(
//                       parseFloat(Number(e.target.value).toFixed(2))
//                     )
//                   }
//                   className="mt-1 p-2 border rounded w-full"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700">Take Profit:</label>
//                 <input
//                   type="number"
//                   step="0.01" // Ensures input step is 0.01 for two decimal places
//                   value={takeProfit} // Formats the value to two decimals
//                   onChange={(e) =>
//                     setTakeProfit(parseFloat(Number(e.target.value).toFixed(2)))
//                   }
//                   className="mt-1 p-2 border rounded w-full"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700">Quantity:</label>
//                 <input
//                   type="number"
//                   value={quantity}
//                   onChange={(e) => setQuantity(e.target.value)}
//                   className="form-input w-full px-2 py-1 border rounded-lg focus:outline-none"
//                 />
//               </div>

//               <button
//                 onClick={handlePlaceOrder}
//                 className="bg-blue-600 text-white p-2 rounded-lg font-semibold mt-4 w-full"
//               >
//                 Place Order
//               </button>
//               <div>
//                 <button
//                   onClick={() => {
//                     toggleLines();
//                     console.log(linesAdded ? "Removing lines" : "Adding lines");
//                   }}
//                 >
//                   {linesAdded ? "Remove Lines" : "Add Lines"}
//                 </button>

//                 {/* Update Stop Loss Line Button */}
//                 <button
//                   onClick={() => {
//                     stopLossLine.current.setData([
//                       { time: initialTime, value: stopLossPrice },
//                     ]);
//                     console.log("Stop Loss Price:", stopLossPrice); // Log the Stop Loss price
//                   }}
//                 >
//                   Update Stop Loss Line
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Chart - Takes 80% of the width */}
//           <div
//             ref={chartRef}
//             className="flex-1"
//             style={{ height: "560px" }} // Example height for chart
//             onMouseDown={singleClickHandler}
//             onMouseMove={mouseMoveHandler}
//             onMouseUp={mouseUpHandler}
//           />
//         </div>
//       </div>

//       {showCalculator && <TradeCalculator />}
//     </div>
//   );
// }

// export default Dashboard;

 

 
 


// Dashboard Component to display the selected symbol
const Dashboard = ({ selectedSymbol }) => {
    return (
      <div className="dashboard">
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <p className="mt-4 text-xl">
          {selectedSymbol ? `The selected symbol is: ${selectedSymbol}` : "No symbol selected"}
        </p>
      </div>
    );
  };
  
  // Main Component to trigger the Modal
  const SearchTicker = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSymbol, setSelectedSymbol] = useState(null); // New state for the selected symbol
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    const handleSymbolSelect = (symbol) => {
      setSearchQuery(symbol);
      setSelectedSymbol(symbol); // Update selected symbol state
    };
  
    return (
      <>
        {/* Search Input */}
        <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 w-3/4 max-w-xs hover:shadow-sm transition-shadow">
          <FaSearch className="text-gray-500 mr-1" />
          <input
            type="text"
            placeholder="Search symbol"
            value={searchQuery}
            onClick={openModal}
            className="w-full outline-none bg-transparent text-sm text-gray-800"
            readOnly
          />
        </div>
  
        {/* Symbol Search Modal */}
        <SymbolSearchModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSelect={handleSymbolSelect}
        />
  
        {/* Pass the selected symbol to the Dashboard */}
        <Dashboard selectedSymbol={selectedSymbol} />
      </>
    );
  };