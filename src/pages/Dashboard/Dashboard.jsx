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

// import { OrderTable } from "../OrderTable/OrderTable";

// function Dashboard() {
//   const [entryPrice, setEntryPrice] = useState();
//   const [stopLossPrice, setStopLossPrice] = useState();
//   const [takeProfit, setTakeProfit] = useState();
//   const [isBuyActive, setIsBuyActive] = useState(true);
//   const [orderType, setOrderType] = useState("MKT");
//   const chartRef = useRef(null);
//   const [arePricesVisible, setArePricesVisible] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [draggedLine, setDraggedLine] = useState(null);
//   const [showCalculator, setShowCalculator] = useState(false);
//   const [quantity, setQuantity] = useState('');

//   const navigate = useNavigate();

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

//   const handlePlaceOrder = async () => {
//     const orderData = {
//       symbol: "NQZ4",
//       side: isBuyActive ? "BUY" : "SELL", // Update side based on the buy/sell toggle
//       order_type: orderType,
//       price: entryPrice, // Assuming you want to use entryPrice as the price
//       quantity: Number(quantity), // Ensure quantity is a number
//       take_profit: takeProfit, // Include take profit in the order data
//       stop_loss_price: stopLossPrice, // Including stop loss in the order data
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
// };

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

//     candlestickSeries.setData([
//       {
//         time: "2018-12-22",
//         open: 75.16,
//         high: 82.84,
//         low: 36.16,
//         close: 45.72,
//       },
//       { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.09 },

//     ]);

//     const stopLossLine = chart.addLineSeries({ color: "red", lineWidth: 2 });
//     const takeProfitLine = chart.addLineSeries({
//       color: "green",
//       lineWidth: 2,
//     });
//     const entryLine = chart.addLineSeries({ color: "blue", lineWidth: 2 });

//     const initialTime = "2018-12-22";

//     if (arePricesVisible) {
//       stopLossLine.setData([{ time: initialTime, value: stopLossPrice }]);
//       takeProfitLine.setData([{ time: initialTime, value: takeProfit }]);
//       entryLine.setData([{ time: initialTime, value: entryPrice }]);
//     }

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

//     chartElement.addEventListener("click", singleClickHandler);
//     chartElement.addEventListener("mousemove", mouseMoveHandler);
//     chartElement.addEventListener("mouseup", mouseUpHandler);

//     return () => {
//       chartElement.removeEventListener("click", singleClickHandler);
//       chartElement.removeEventListener("mousemove", mouseMoveHandler);
//       chartElement.removeEventListener("mouseup", mouseUpHandler);
//       chart.remove();
//     };
//   }, [entryPrice, stopLossPrice, takeProfit, quantity, isDragging, arePricesVisible]);

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
//               <label className="block text-gray-700">Quantity:</label>
//               <input
//                 type="number"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 className="form-input w-full px-2 py-1 border rounded-lg focus:outline-none"
//               />
//             </div>

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
//             style={{ height: "590px" }} // Example height
//           />
//         </div>
//       </div>

//       {showCalculator && <TradeCalculator />}
//     </div>
//   );
// }

// export default Dashboard;

import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import Sidebar from "../../components/ui/Sidebar";
import SearchTicker from "../../components/SearchTicker/SearchTicker";
import { placeOrder } from "../../services/Order/Order";
import { useNavigate } from "react-router-dom";
import TradeCalculator from "../../components/TradeCalculator/TradeCalculator";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { modifyOrder } from "../../services/Order/Order";

function Dashboard() {
  const [entryPrice, setEntryPrice] = useState();
  const [stopLossPrice, setStopLossPrice] = useState();
  const [takeProfit, setTakeProfit] = useState();
  const [isBuyActive, setIsBuyActive] = useState(true);
  const [orderType, setOrderType] = useState("MKT");
  const chartRef = useRef(null);
  const [arePricesVisible, setArePricesVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedLine, setDraggedLine] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [isOrderModification, setIsOrderModification] = useState(false);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const location = useLocation();

  const {
    orderId,
    takeProfit: initialTakeProfit,
    stopPrice: initialStopPrice,
  } = location.state || {};

  useEffect(() => {
    if (orderId) {
      setIsOrderModification(true); // Indicate that this is a modification
      setTakeProfit(initialTakeProfit || ""); // Set initial value for Take Profit
      setStopLossPrice(initialStopPrice || ""); // Set initial value for Stop Loss
      setArePricesVisible(false); // Hide price fields initially
    }
  }, [orderId, initialTakeProfit, initialStopPrice]);

  // const handleUpdateTakeProfit = () => {

  //   console.log(
  //     "Updating:",
  //     "takeProfit",
  //      takeProfit,
  //     "stopLossPrice",
  //     stopLossPrice
  //   );
  //   setArePricesVisible(true);
  //   setIsOrderModification(false); // Hide input fields after modification
  //   navigate("/order-table");
  // };

  // api integration of modify order
  const handleUpdateTakeProfit = async () => {
    console.log("Updating take profit and stop loss:", {
      takeProfit,
      stopLossPrice,
    });

    // Prepare the payload for the modifyOrder API call
    const orderData = {
      
        "orderId": 140224841386,
        "orderQty": 1,
        "orderType": "Limit",
        "takeProfitOrderId": 140224841389,
        "takeProfitPrice": 60,
        "stopLossOrderId":  140224841398,
        "stopLossPrice": 80
       
    };

    try {
      // Send the request to modify the order
      const response = await modifyOrder(orderData);
      alert("Order modified successfully:", response);

      // Update UI state upon successful order modification
      setArePricesVisible(true);
      setIsOrderModification(false); // Hide input fields after modification
      navigate("/order-table"); // Navigate to the order table
    } catch (error) {
      console.error("Failed to modify order:", error);
      // Handle error feedback for the user, e.g., display a message or error state
    }
  };

  const togglePriceBoxes = () => {
    setArePricesVisible((prev) => !prev);
    setShowCalculator(false);
  };

  const toggleBuySell = () => {
    setIsBuyActive((prev) => !prev);
  };

  const toggleCalculator = () => {
    setShowCalculator((prev) => !prev);
    setArePricesVisible(false);
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      symbol: "NQZ4",
      side: isBuyActive ? "Buy" : "Sell",  
      order_type: orderType,
      price: entryPrice, //  
      quantity: Number(quantity), // Ensure quantity is a number
      take_profit: takeProfit, // Include take profit in the order data
      stop_loss: stopLossPrice, // Including stop loss in the order data
    };

    // setOrders((prevOrders) => [...prevOrders, orderData]);

    console.log("Order Data Payload:", JSON.stringify(orderData, null, 2));

    try {
      const result = await placeOrder(orderData);

      if (!result) {
        toast({
          className: cn(
            "fixed top-0 right-0 flex md:max-w-[420px] md:top-4 md:right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg"
          ),
          duration: 3000,
          position: "top-center",
          title: "No Response",
          description:
            "No response received from the server. Please try again later.",
        });
        return; // Stop execution if no result
      }

      if (result.error) {
        const toastOptions = {
          className: cn(
            "fixed top-0 right-0 flex md:max-w-[200px] md:top-4 md:right-4 p-3 rounded-lg"
          ),
          duration: 3000,
          position: "top-center",
          title: "Something went wrong",
          description: result.error.message || "An error occurred.",
        };

        // Custom styling and messages based on error type
        switch (result.error.type) {
          case "validation":
            toastOptions.title = "Validation Error";
            toastOptions.className += " bg-red-500 text-white";
            break;
          case "network":
            toastOptions.title = "Network Error";
            toastOptions.className += " bg-yellow-500 text-white";
            break;
          case "server":
            toastOptions.title = "Server Error";
            toastOptions.className += " bg-orange-500 text-white";
            break;
          default:
            toastOptions.title = "Error";
            toastOptions.className += " bg-red-400 text-white";
            break;
        }

        toast(toastOptions);
      } else {
        // Show success toast if no error
        toast({
          className: cn(
            "fixed top-0 right-0 flex md:max-w-[200px] md:top-4 md:right-4 bg-green-500 text-white p-4"
          ),
          duration: 3000,
          position: "top-center",
          title: (
            <div className="flex items-center">
              <IoIosCheckmarkCircle className="mr-2 text-white" />
              <span>Success</span>
            </div>
          ),
          description: `Order placed successfully.`,
        });

        navigate("/");
      }
    } catch (error) {
      // Handle unexpected errors
      toast({
        className: cn(
          "fixed top-0 right-0 flex md:max-w-[420px] md:top-3 md:right-2 bg-red-600 text-white p-4 rounded-lg shadow-lg"
        ),
        duration: 3000,
        position: "top-center",
        title: "Failed ❌",
        description:
          error.message ||
          "Something went wrong while processing your order. Please try again in a moment.",
      });
    }
  };

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      layout: {
        textColor: "#333",
        background: { type: "solid", color: "#ffffff" },
      },
      grid: {
        horzLines: { color: "#efefef" },
        vertLines: { color: "#efefef" },
      },
      crossHair: { mode: 0 },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    const data = [
      {
        time: "2018-12-22",
        open: 75.16,
        high: 82.84,
        low: 36.16,
        close: 45.72,
      },
      {
        time: "2018-12-23",
        open: "45.12", // <-- Ensure this is a number, not a string
        high: 53.9,
        low: "45.12", // <-- Ensure this is a number, not a string
        close: "48.09", // <-- Ensure this is a number, not a string
      },
    ];

    console.log(data); // Log data to check types of values

    // Ensure that all values are numbers
    candlestickSeries.setData(
      data.map((item) => ({
        ...item,
        open: Number(item.open),
        high: Number(item.high),
        low: Number(item.low),
        close: Number(item.close),
      }))
    );

    const stopLossLine = chart.addLineSeries({ color: "red", lineWidth: 2 });
    const takeProfitLine = chart.addLineSeries({
      color: "green",
      lineWidth: 2,
    });
    const entryLine = chart.addLineSeries({ color: "blue", lineWidth: 2 });

    const initialTime = "2018-12-22";

    if (arePricesVisible) {
      // Ensure values are numbers before passing them to the chart
      stopLossLine.setData([
        { time: initialTime, value: Number(stopLossPrice) },
      ]);
      takeProfitLine.setData([
        { time: initialTime, value: Number(takeProfit) },
      ]);
      entryLine.setData([{ time: initialTime, value: Number(entryPrice) }]);
    }

    const singleClickHandler = (e) => {
      const { offsetY } = e;
      const priceAtPoint = candlestickSeries.coordinateToPrice(offsetY);
      const tolerance = 3;

      if (Math.abs(priceAtPoint - stopLossPrice) < tolerance) {
        setDraggedLine("stop_loss");
        setIsDragging(true);
      } else if (Math.abs(priceAtPoint - takeProfit) < tolerance) {
        setDraggedLine("take_profit");
        setIsDragging(true);
      } else if (Math.abs(priceAtPoint - entryPrice) < tolerance) {
        setDraggedLine("entry");
        setIsDragging(true);
      }
    };

    const mouseMoveHandler = (e) => {
      if (isDragging) {
        const { offsetY } = e;
        const newPrice = candlestickSeries.coordinateToPrice(offsetY);
        switch (draggedLine) {
          case "stop_loss":
            setStopLossPrice(newPrice);
            stopLossLine.setData([{ time: initialTime, value: newPrice }]);
            break;
          case "take_profit":
            setTakeProfit(newPrice);
            takeProfitLine.setData([{ time: initialTime, value: newPrice }]);
            break;
          case "entry":
            setEntryPrice(newPrice);
            entryLine.setData([{ time: initialTime, value: newPrice }]);
            break;
          default:
            break;
        }
      }
    };

    const mouseUpHandler = () => {
      setIsDragging(false);
      setDraggedLine(null);
    };

    const chartElement = chartRef.current;

    chartElement.addEventListener("click", singleClickHandler);
    chartElement.addEventListener("mousemove", mouseMoveHandler);
    chartElement.addEventListener("mouseup", mouseUpHandler);

    return () => {
      chartElement.removeEventListener("click", singleClickHandler);
      chartElement.removeEventListener("mousemove", mouseMoveHandler);
      chartElement.removeEventListener("mouseup", mouseUpHandler);
      chart.remove();
    };
  }, [
    entryPrice,
    stopLossPrice,
    takeProfit,
    quantity,
    isDragging,
    arePricesVisible,
  ]);

  return (
    <div className="relative p-0.5 w-full h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          togglePriceBoxes={togglePriceBoxes}
          toggleCalculator={toggleCalculator}
        />

        {/* Order Modification Popup */}
        {isOrderModification && (
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2 p-6 bg-white rounded-xl shadow-lg max-w-sm w-full z-10">
            <h2 className="text-lg font-semibold text-gray-900 text-center mb-4">
              Modifying Order ID: {orderId}
            </h2>

            {/* Flex container for two input boxes in one row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Take Profit */}
              <div className="flex flex-col">
                <label className="text-gray-700 text-xs font-medium mb-2">
                  Take Profit
                </label>
                <input
                  type="number"
                  value={40}
                  onChange={(e) => setTakeProfit(Number(e.target.value))}
                  className="p-3 border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50 transition-all"
                />
              </div>

              {/* Stop Loss Price */}
              <div className="flex flex-col">
                <label className="text-gray-700 text-xs font-medium mb-2">
                  Stop Loss Price
                </label>
                <input
                  type="number"
                  value={40}
                  onChange={(e) => setStopLossPrice(Number(e.target.value))}
                  className="p-3 border border-gray-300 rounded-md text-sm w-full focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 transition-all"
                />
              </div>
            </div>

            {/* Buttons in the flex container for Cancel and Update Order buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setIsOrderModification(false)}
                className="bg-gray-100 text-gray-700 px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateTakeProfit}
                className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Update Order
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 p-0.5 flex flex-row overflow-hidden space-x-1">
          {arePricesVisible && (
            <div className="flex flex-col space-y-4 p-4 bg-white border border-gray-100 rounded-lg shadow-md min-w-[200px] max-w-[250px]">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Price Settings
              </h2>

              <div className="flex justify-between mb-3">
                <button
                  className={`flex-1 py-2 rounded-lg mr-1 ${
                    isBuyActive ? "bg-green-600" : "bg-gray-200"
                  } text-white font-bold transition duration-200 hover:bg-green-700`}
                  onClick={toggleBuySell}
                >
                  Buy
                </button>
                <button
                  className={`flex-1 py-2 rounded-lg ${
                    !isBuyActive ? "bg-red-600" : "bg-gray-200"
                  } text-white font-bold transition duration-200 hover:bg-red-700`}
                  onClick={toggleBuySell}
                >
                  Sell
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Order Type:</label>
                <div className="flex space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Market"
                      checked={orderType === "Market"}
                      onChange={() => setOrderType("Market")}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">Market</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="Limit"
                      checked={orderType === "Limit"}
                      onChange={() => setOrderType("Limit")}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-700">Limit</span>
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Entry Price:</label>
                <input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(Number(e.target.value))}
                  className="p-2 border rounded w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">
                  Stop Loss Price:
                </label>
                <input
                  type="number"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(Number(e.target.value))}
                  className="p-2 border rounded w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Take Profit:</label>
                <input
                  type="number"
                  value={takeProfit}
                  onChange={(e) => setTakeProfit(Number(e.target.value))}
                  className="p-2 border rounded w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-1">Quantity:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="p-2 border rounded w-full"
                />
              </div>

              <button
                onClick={handlePlaceOrder}
                className="bg-blue-600 text-white p-2 rounded-lg font-semibold mt-4 w-full"
              >
                Place Order
              </button>
            </div>
          )}

          <div ref={chartRef} className="flex-1" style={{ height: "590px" }} />
        </div>
      </div>

      {showCalculator && <TradeCalculator />}
    </div>
  );
}

export default Dashboard;
