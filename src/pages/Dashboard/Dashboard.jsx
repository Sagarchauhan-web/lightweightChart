// import React, { useEffect, useRef, useState } from "react"
// import { createChart } from "lightweight-charts"
// import Sidebar from "../../components/ui/Sidebar"
// import TradeCalculator from "../../components/TradeCalculator/TradeCalculator"

// function Dashboard() {
//   const [entryPrice, setEntryPrice] = useState(100)
//   const [stopLossPrice, setStopLossPrice] = useState(500)
//   const [takeProfit, setTakeProfit] = useState(40)
//   const [isBuyActive, setIsBuyActive] = useState(true)
//   const chartRef = useRef(null)
//   const [arePricesVisible, setArePricesVisible] = useState(false)
//   const [isDragging, setIsDragging] = useState(false)
//   const [draggedLine, setDraggedLine] = useState(null)
//   const [showCalculator, setShowCalculator] = useState(false)

//   const togglePriceBoxes = () => {
//     setArePricesVisible((prev) => !prev)
//   }

//   const toggleBuySell = () => {
//     setIsBuyActive((prev) => !prev)
//   }

//   const toggleCalculator = () => {
//     setShowCalculator((prev) => !prev) // Toggle the calculator visibility
//   }

//   const placeOrder = (type) => {
//     alert(
//       `Order placed: ${type} - Entry: ${entryPrice}, Stop Loss: ${stopLossPrice}, Take Profit: ${takeProfit}`
//     )
//   }

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
//       {
//         time: "2018-12-24",
//         open: 60.71,
//         high: 60.71,
//         low: 53.39,
//         close: 59.29,
//       },
//       { time: "2018-12-25", open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
//       {
//         time: "2018-12-26",
//         open: 67.71,
//         high: 105.85,
//         low: 66.67,
//         close: 91.04,
//       },
//       { time: "2018-12-27", open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
//       {
//         time: "2018-12-28",
//         open: 111.51,
//         high: 142.83,
//         low: 103.34,
//         close: 131.25,
//       },
//       {
//         time: "2018-12-29",
//         open: 131.33,
//         high: 151.17,
//         low: 77.68,
//         close: 96.43,
//       },
//       {
//         time: "2018-12-30",
//         open: 106.33,
//         high: 110.2,
//         low: 90.39,
//         close: 98.1,
//       },
//       {
//         time: "2018-12-31",
//         open: 109.87,
//         high: 114.69,
//         low: 85.66,
//         close: 111.26,
//       },
//     ]);

//     // Conditional price lines
//     const stopLossLine = chart.addLineSeries({ color: "red", lineWidth: 2 });
//     const takeProfitLine = chart.addLineSeries({ color: "green", lineWidth: 2 });
//     const entryLine = chart.addLineSeries({ color: "blue", lineWidth: 2 });

//     const initialTime = "2018-12-22";

//     if (arePricesVisible) {
//       stopLossLine.setData([{ time: initialTime, value: stopLossPrice }]);
//       takeProfitLine.setData([{ time: initialTime, value: takeProfit }]);
//       entryLine.setData([{ time: initialTime, value: entryPrice }]);
//     }

//     // Dragging logic remains unchanged
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

//     chartRef.current.addEventListener("click", singleClickHandler);
//     chartRef.current.addEventListener("mousemove", mouseMoveHandler);
//     chartRef.current.addEventListener("mouseup", mouseUpHandler);

//     return () => {
//       chartRef.current.removeEventListener("click", singleClickHandler);
//       chartRef.current.removeEventListener("mousemove", mouseMoveHandler);
//       chartRef.current.removeEventListener("mouseup", mouseUpHandler);
//       chart.remove();
//     };
//   }, [entryPrice, stopLossPrice, takeProfit, isDragging, arePricesVisible]); // Include arePricesVisible in dependency array

//   return (
//     <div className="relative w-full h-screen bg-black-900 flex">
//       <Sidebar togglePriceBoxes={togglePriceBoxes} toggleCalculator={toggleCalculator} />
//       {/* Rest of your dashboard content */}
//       <div className="flex-1 p-4 flex flex-row overflow-hidden">
//         {/* Input Section */}
//         {arePricesVisible && (
//           <div className="flex flex-col space-y-2 p-4 border border-gray-300 bg-white shadow-lg rounded-lg min-w-[250px] max-w-[300px]">
//             <h2 className="text-xl font-bold text-gray-800">Price Settings</h2>

//             <div className="flex justify-around mb-4">
//               <button
//                 onClick={toggleBuySell}
//                 className={`flex-1 text-lg font-bold p-1 rounded mr-2 ${
//                   isBuyActive ? "bg-green-500 text-white" : "bg-gray-300"
//                 }`}
//               >
//                 BUY
//               </button>
//               <button
//                 onClick={toggleBuySell}
//                 className={`flex-1 text-lg font-bold p-1 rounded ${
//                   !isBuyActive ? "bg-red-500 text-white" : "bg-gray-300"
//                 }`}
//               >
//                 SELL
//               </button>
//             </div>

//             {/* Input Fields */}
//             <div className="flex flex-col space-y-2 p-1 rounded">
//               <InputField
//                 label="Entry Price"
//                 value={entryPrice}
//                 onChange={(e) => setEntryPrice(Number(e.target.value))}
//               />
//               {isBuyActive && (
//                 <InputField
//                   label="Stop Loss Price"
//                   value={stopLossPrice}
//                   onChange={(e) => setStopLossPrice(Number(e.target.value))}
//                 />
//               )}
//               <InputField
//                 label="Take Profit"
//                 value={takeProfit}
//                 onChange={(e) => setTakeProfit(Number(e.target.value))}
//               />
//             </div>

//             {/* Order Buttons */}
//             <div className="mt-4 flex justify-around">
//               <OrderButton
//                 onClick={() => placeOrder(isBuyActive ? "Buy Market" : "Sell Market")}
//                 label={isBuyActive ? "Buy Market" : "Sell Market"}
//                 bgColor={isBuyActive ? "green" : "red"}
//               />
//               <OrderButton
//                 onClick={() => placeOrder(isBuyActive ? "Buy Stop" : "Sell Stop")}
//                 label={isBuyActive ? "Buy Stop" : "Sell Stop"}
//                 bgColor={isBuyActive ? "green" : "red"}
//               />
//             </div>
//           </div>
//         )}

//         {/* Chart Section */}
//         <div className="flex-1 h-[500px] bg-white shadow-lg rounded-lg p-4 ml-4">
//           <div className="h-full w-full" ref={chartRef}></div>
//         </div>

//         {/* Trade Calculator Section */}
//         {showCalculator && <TradeCalculator />}
//       </div>
//     </div>
//   )
// }

// const InputField = ({ label, value, onChange }) => (
//   <div className="flex flex-col">
//     <label className="text-sm font-semibold text-gray-700">{label}</label>
//     <input
//       type="number"
//       value={value}
//       onChange={onChange}
//       className="p-2 border border-gray-300 rounded-lg"
//     />
//   </div>
// )

// const OrderButton = ({ label, onClick, bgColor }) => (
//   <button
//     onClick={onClick}
//     className={`w-15 p-2 font-semibold text-white rounded-full ${
//       bgColor === "green" ? "bg-green-500" : "bg-red-500"
//     }`}
//   >
//     {label}
//   </button>
// )

// export default Dashboard
import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import Sidebar from "../../components/ui/Sidebar";
import TradeCalculator from "../../components/TradeCalculator/TradeCalculator";
import SearchTicker from "../../components/SearchTicker/SearchTicker"; // Import the SearchTicker component

function Dashboard() {
  const [entryPrice, setEntryPrice] = useState(100);
  const [stopLossPrice, setStopLossPrice] = useState(500);
  const [takeProfit, setTakeProfit] = useState(40);
  const [isBuyActive, setIsBuyActive] = useState(true);
  const chartRef = useRef(null);
  const [arePricesVisible, setArePricesVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedLine, setDraggedLine] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);

  const togglePriceBoxes = () => {

    setArePricesVisible((prev) => !prev);
    setShowCalculator(false)
  };

  const toggleBuySell = () => {
    setIsBuyActive((prev) => !prev);
  };

  const toggleCalculator = () => {
    setShowCalculator((prev) => !prev);
    setArePricesVisible(false)
  };

  const placeOrder = (type) => {
    alert(
      `Order placed: ${type} - Entry: ${entryPrice}, Stop Loss: ${stopLossPrice}, Take Profit: ${takeProfit}`
    );
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

    candlestickSeries.setData([
      {
        time: "2018-12-22",
        open: 75.16,
        high: 82.84,
        low: 36.16,
        close: 45.72,
      },
      { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
      {
        time: "2018-12-24",
        open: 60.71,
        high: 60.71,
        low: 53.39,
        close: 59.29,
      },
      { time: "2018-12-25", open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
      {
        time: "2018-12-26",
        open: 67.71,
        high: 105.85,
        low: 66.67,
        close: 91.04,
      },
      { time: "2018-12-27", open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
      {
        time: "2018-12-28",
        open: 111.51,
        high: 142.83,
        low: 103.34,
        close: 131.25,
      },
      {
        time: "2018-12-29",
        open: 131.33,
        high: 151.17,
        low: 77.68,
        close: 96.43,
      },
      {
        time: "2018-12-30",
        open: 106.33,
        high: 110.2,
        low: 90.39,
        close: 98.1,
      },
      {
        time: "2018-12-31",
        open: 109.87,
        high: 114.69,
        low: 85.66,
        close: 111.26,
      },
    ]);

    const stopLossLine = chart.addLineSeries({ color: "red", lineWidth: 2 });
    const takeProfitLine = chart.addLineSeries({
      color: "green",
      lineWidth: 2,
    });
    const entryLine = chart.addLineSeries({ color: "blue", lineWidth: 2 });

    const initialTime = "2018-12-22";

    if (arePricesVisible) {
      stopLossLine.setData([{ time: initialTime, value: stopLossPrice }]);
      takeProfitLine.setData([{ time: initialTime, value: takeProfit }]);
      entryLine.setData([{ time: initialTime, value: entryPrice }]);
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
  }, [entryPrice, stopLossPrice, takeProfit, isDragging, arePricesVisible]);

  return (
<div className="relative w-full h-screen bg-gray-100 flex flex-col">
  {/* Sticky Header */}
  <header className="sticky top-0 z-10 bg-white shadow">
    <SearchTicker />
  </header>

  <div className="flex flex-1 overflow-hidden">
    <Sidebar
      togglePriceBoxes={togglePriceBoxes}
      toggleCalculator={toggleCalculator}
    />
    <div className="flex-1 p-6 flex flex-row overflow-hidden">
      {arePricesVisible && (
        <div className="flex flex-col space-y-4 p-6 border border-gray-200 bg-white shadow-sm rounded-lg min-w-[300px] max-w-[350px]">
          <h2 className="text-2xl font-semibold text-gray-800">Price Settings</h2>
          <div className="flex space-x-2">
            <button
              onClick={toggleBuySell}
              className={`flex-1 text-lg font-medium p-2 rounded-lg transition duration-150 ${
                isBuyActive ? "bg-green-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              BUY
            </button>
            <button
              onClick={toggleBuySell}
              className={`flex-1 text-lg font-medium p-2 rounded-lg transition duration-150 ${
                !isBuyActive ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              SELL
            </button>
          </div>
          <label className="flex flex-col mb-2">
            <span className="text-gray-600 text-sm mb-1">Entry Price</span>
            <input
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(parseFloat(e.target.value))}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter price"
            />
          </label>
          <label className="flex flex-col mb-2">
            <span className="text-gray-600 text-sm mb-1">Stop Loss</span>
            <input
              type="number"
              value={stopLossPrice}
              onChange={(e) => setStopLossPrice(parseFloat(e.target.value))}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Set stop loss"
            />
          </label>
          <label className="flex flex-col mb-2">
            <span className="text-gray-600 text-sm mb-1">Take Profit</span>
            <input
              type="number"
              value={takeProfit}
              onChange={(e) => setTakeProfit(parseFloat(e.target.value))}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Set take profit"
            />
          </label>
          <button
            onClick={() => placeOrder(isBuyActive ? "Buy" : "Sell")}
            className="bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-500 transition duration-150"
          >
            Place Order
          </button>
        </div>
      )}
      <div
        ref={chartRef}
        className="flex-1 h-full p-6 bg-white rounded-lg shadow transition-all duration-300 flex flex-col justify-between"
      >
        {/* Chart Area */}
        <div className="flex-1 h-0 pb-4">
          {/* Insert Chart Component Here */}
        </div>
      </div>
    </div>
    {showCalculator && <TradeCalculator />}
  </div>
</div>


    )
  };

  export default Dashboard;