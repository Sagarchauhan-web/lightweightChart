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
//   const [entryPrice, setEntryPrice] = useState(80);
//   const [stopLossPrice, setStopLossPrice] = useState(70);
//   const [takeProfit, setTakeProfit] = useState(60);
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

//   // Extract `orderData` from the navigation state

//   const {
//     orderId,
//     initialOrderType,
//     orderQty,
//     stopLossId,
//     stopLossPricez,
//     takeProfitId,
//     takeProfitPricex,
//     isfromModify,
//   } = state || {}; // Fallback to an empty object if state is undefined

//   // Log the values to ensure they are passed correctly
//   console.log("Received state:", {
//     orderId,
//     initialOrderType,
//     orderQty,
//     stopLossId,
//     stopLossPricez,
//     takeProfitId,
//     takeProfitPricex,
//     isfromModify,
//   });

//   // States for mtakeProfit and mstopLoss
//   const [mtakeProfit, setmtakeProfit] = useState(takeProfitPricex); // Default value
//   const [mstopLoss, setmstopLoss] = useState(stopLossPricez); // Default value

//   const handleModifyOrder = async () => {
//     // Construct the payload using exact state values
//     const payload = {
//       orderId, // Use orderId from orderData
//       orderQty: orderQty, // Use passed quantity
//       orderType: initialOrderType, // Use passed order type
//       takeProfitOrderId: takeProfitId, // Use passed take profit order ID
//       takeProfitPrice: mtakeProfit, // Use exact state value for take profit
//       stopLossOrderId: stopLossId, // Use passed stop loss order ID
//       stopLossPrice: mstopLoss, // Use exact state value for stop loss
//     };

//     // Log payload for debugging
//     console.log("Payload for modify order:", JSON.stringify(payload, null, 2));

//     try {
//       // Call the modifyOrder API function and await the response
//       const response = await modifyOrder(payload);

//       // Handle success
//       // toast.success("Order modified successfully");
//       console.log("Order Modified:", response);
//     } catch (error) {
//       // Handle error
//       toast.error("Error modifying order");
//       console.error("Error modifying order:", error);
//     }
//   };

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

//   const initialTime = "2018-12-22";
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

//     const candlestickSeries = chart.addCandlestickSeries({
//       upColor: "#26a69a",
//       downColor: "#ef5350",
//       borderVisible: false,
//       wickUpColor: "#26a69a",
//       wickDownColor: "#ef5350",
//     });
//     const initialTime = "2020-01-01";
//     const fetchData = async () => {
//       try {
//         // Fetch API data
//         const apiData = await getTickerData("TCS", initialTime, "2023-12-31");

//         // Process the API data
//         const chartData = apiData
//           .map((item, index) => {
//             // Handle missing date
//             if (!item.date) {
//               console.warn("Missing date in item:", item);

//               // Generate a default date based on the index if missing
//               const fallbackDate = new Date();
//               fallbackDate.setDate(
//                 fallbackDate.getDate() - (apiData.length - index)
//               );
//               item.date = fallbackDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD
//             }

//             // Return the formatted item
//             return {
//               time: item.date, // ISO format YYYY-MM-DD
//               open: item.open,
//               high: item.high,
//               low: item.low,
//               close: item.close,
//             };
//           })
//           .filter(
//             (data) =>
//               data.time && data.open && data.high && data.low && data.close
//           ) // Filter out incomplete entries
//           .sort((a, b) => new Date(a.time) - new Date(b.time)); // Ensure ascending order

//         // Log the processed data for debugging
//         console.log("Processed Chart Data:", chartData);

//         // Set the data to the candlestick series
//         candlestickSeries.setData(chartData);
//       } catch (error) {
//         console.error("Error fetching ticker data:", error);
//       }
//     };

    

//     // for modifiy order for tp and sl line
//     const mtakeProfitLine = chart.addLineSeries({
//       color: "green",
//       lineWidth: 2,
//     });
//     const mstopLossLine = chart.addLineSeries({
//       color: "red",
//       lineWidth: 2,
//     });

//     const stopLossLine = chart.addLineSeries({ color: "red", lineWidth: 2 });
//     const takeProfitLine = chart.addLineSeries({
//       color: "green",
//       lineWidth: 2,
//     });
//     const entryLine = chart.addLineSeries({ color: "blue", lineWidth: 2 });

     
//     // Initialize lines on chart
//     if (arePricesVisibleModifiy && isfromModify === true) {
//       console.log("Setting mstopLossLine data:", {
//         time: initialTime,
//         value: mstopLoss,
//       });
//       mstopLossLine.setData([{ time: initialTime, value: mstopLoss }]);
//       handleModifyOrder();
//       mtakeProfitLine.setData([{ time: initialTime, value: mtakeProfit }]);
//     }

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
//       } else if (Math.abs(priceAtPoint - mstopLoss) < tolerance) {
//         setDraggedLine("modify_sl");
//         setIsDragging(true);
//       } else if (Math.abs(priceAtPoint - mtakeProfit) < tolerance) {
//         setDraggedLine("modify_tp");
//         setIsDragging(true);
//       }
//     };

//     const mouseMoveHandler = (e) => {
//       if (isDragging) {
//         const { offsetY } = e;
//         const newPrice = candlestickSeries.coordinateToPrice(offsetY);
//         switch (draggedLine) {
//           case "stop_loss":
//             stopLossLine.setData([{ time: initialTime, value: newPrice }]);
//             break;
//           case "take_profit":
//             takeProfitLine.setData([{ time: initialTime, value: newPrice }]);
//             break;
//           case "entry":
//             entryLine.setData([{ time: initialTime, value: newPrice }]);
//             break;
//           case "modify_sl":
//             mstopLossLine.setData([{ time: initialTime, value: newPrice }]);
//             break;
//           case "modify_tp":
//             mtakeProfitLine.setData([{ time: initialTime, value: newPrice }]);
//             break;
//           default:
//             break;
//         }
//       }
//     };

//     const mouseUpHandler = (e) => {
//       if (isDragging) {
//         const { offsetY } = e;
//         const finalPrice = candlestickSeries.coordinateToPrice(offsetY);
//         switch (draggedLine) {
//           case "stop_loss":
//             setStopLossPrice(finalPrice);
//             stopLossLine.setData([{ time: initialTime, value: finalPrice }]);
//             break;
//           case "take_profit":
//             setTakeProfit(finalPrice);
//             takeProfitLine.setData([{ time: initialTime, value: finalPrice }]);
//             break;
//           case "entry":
//             setEntryPrice(finalPrice);
//             entryLine.setData([{ time: initialTime, value: finalPrice }]);
//             break;
//           case "modify_sl":
//             setmstopLoss(finalPrice);
//             mstopLossLine.setData([{ time: initialTime, value: finalPrice }]);
//             break;
//           case "modify_tp":
//             setmtakeProfit(finalPrice);
//             mtakeProfitLine.setData([{ time: initialTime, value: finalPrice }]);
//             break;
//           default:
//             break;
//         }
//         console.log(`Updated ${draggedLine} to price:`, finalPrice);
//       }
//       setIsDragging(false);
//       setDraggedLine(null);
//     };

     
//     const chartElement = chartRef.current;

//     chartElement.addEventListener("click", singleClickHandler);
//     chartElement.addEventListener("mousemove", mouseMoveHandler);
//     chartElement.addEventListener("mouseup", mouseUpHandler);
//     fetchData();

//     return () => {
//       chartElement.removeEventListener("click", singleClickHandler);
//       chartElement.removeEventListener("mousemove", mouseMoveHandler);
//       chartElement.removeEventListener("mouseup", mouseUpHandler);
//       chart.remove();
      
       
//     };
//   }, [
//     stopLossPrice,
//     takeProfit,
//     mstopLoss,
//     mtakeProfit,
//     entryPrice,
//     isDragging,
//     draggedLine,
//     arePricesVisible,
//     arePricesVisibleModifiy,
//   ]);

//   return (
//     <div className="relative p-0.5 w-full h-screen bg-gray-50 flex flex-col">
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar
//           togglePriceBoxes={togglePriceBoxes}
//           toggleCalculator={toggleCalculator}
//         />

//         <div className="flex-1 p-0.5 flex flex-row overflow-hidden space-x-1">
//           {arePricesVisible && (
//             <div className="flex flex-col space-y-4 p-1 bg-white border border-gray-100 rounded-lg shadow-md min-w-[180px] max-w-[200px]">
//               <h2 className="text-2xl font-semibold text-gray-800">
//                 Price Settings
//               </h2>
//               <div className="flex justify-between">
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
//               <div>
//                 <div className="flex space-x-4">
//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       value="MKT"
//                       checked={orderType === "MKT"}
//                       onChange={() => setOrderType("MKT")}
//                       className="form-radio h-4 w-4 text-blue-600"
//                     />
//                     <span className="text-gray-700">Market</span>
//                   </label>

//                   <label className="flex items-center space-x-2">
//                     <input
//                       type="radio"
//                       value="LMT"
//                       checked={orderType === "LMT"}
//                       onChange={() => setOrderType("LMT")}
//                       className="form-radio h-4 w-4 text-blue-600"
//                     />
//                     <span className="text-gray-700">Limit</span>
//                   </label>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-gray-700">Entry Price:</label>
//                 <input
//                   type="number"
//                   value={entryPrice}
//                   onChange={(e) => setEntryPrice(Number(e.target.value))}
//                   className="mt-1 p-2 border rounded w-full"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700">Stop Loss Price:</label>
//                 <input
//                   type="number"
//                   value={stopLossPrice}
//                   onChange={(e) => setStopLossPrice(Number(e.target.value))}
//                   className="mt-1 p-2 border rounded w-full"
//                 />
//               </div>

//               <div>
//                 <label className="block text-gray-700">Take Profit:</label>
//                 <input
//                   type="number"
//                   value={takeProfit}
//                   onChange={(e) => setTakeProfit(Number(e.target.value))}
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
//                 className="bg-blue-600 text-white p-2 rounded-lg font-semibold mt-4"
//               >
//                 Place Order
//               </button>
//             </div>
//           )}

//           <div
//             ref={chartRef}
//             className="flex-1"
//             style={{ height: "560px" }} // Example height
//           />
//         </div>
//       </div>

//       {showCalculator && <TradeCalculator />}
//     </div>
//   );
// }

// export default Dashboard;