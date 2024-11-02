// src/pages/ChartPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import Sidebar from "../../components/ui/Sidebar";
import { useNavigate } from "react-router-dom";
 
function ChartPage() {
  const [entryPrice, setEntryPrice] = useState(100);
  const [stopLossPrice, setStopLossPrice] = useState(500);
  const [takeProfit, setTakeProfit] = useState(40);
  const [isBuyActive, setIsBuyActive] = useState(true);
  const [orderType, setOrderType] = useState("market");
  const chartRef = useRef(null);
  const [arePricesVisible, setArePricesVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedLine, setDraggedLine] = useState(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const initialTime = "2018-12-22";

  const navigate = useNavigate();

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
      entry_price: entryPrice,
      stop_loss_price: stopLossPrice,
      take_profit: takeProfit,
      order_type: orderType,
    };

    console.log("Order Data Payload:", JSON.stringify(orderData, null, 2));
  }


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
      { time: initialTime, open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
      { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
    ]);

    const stopLossLine = chart.addLineSeries({ color: "red", lineWidth: 2 });
    const takeProfitLine = chart.addLineSeries({
      color: "green",
      lineWidth: 2,
    });
    const entryLine = chart.addLineSeries({ color: "blue", lineWidth: 2 });

    stopLossLine.setData([{ time: initialTime, value: stopLossPrice }]);
    takeProfitLine.setData([{ time: initialTime, value: takeProfit }]);
    entryLine.setData([{ time: initialTime, value: entryPrice }]);

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
        updateLinePrice(newPrice);
      }
    };

    const updateLinePrice = (newPrice) => {
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
    };

    const mouseUpHandler = () => {
      setIsDragging(false);
      setDraggedLine(null);
    };

    const chartElement = chartRef.current;
    chartElement.addEventListener("click", singleClickHandler);
    chartElement.addEventListener("mousemove", mouseMoveHandler);
    chartElement.addEventListener("mouseup", mouseUpHandler);

    // Resize chart on window resize
    const handleResize = () => {
      chart.resize(chartElement.clientWidth, chartElement.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      chartElement.removeEventListener("click", singleClickHandler);
      chartElement.removeEventListener("mousemove", mouseMoveHandler);
      chartElement.removeEventListener("mouseup", mouseUpHandler);
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [entryPrice, stopLossPrice, takeProfit, isDragging]);

  return (
    <div className="relative w-full h-screen bg-gray-50 flex flex-col">
    <div className="flex flex-1 overflow-hidden">
        <Sidebar
            togglePriceBoxes={togglePriceBoxes}
            toggleCalculator={toggleCalculator}
        />

        <div className="flex-1 p-2 flex flex-row overflow-hidden space-x-1">
            {arePricesVisible && (
                <div className="flex flex-col space-y-6 p-3 bg-white border border-gray-100 rounded-lg shadow-md min-w-[180px] max-w-[300px]">
                    <h2 className="text-2xl font-semibold text-gray-800">Price Settings</h2>
                    <div className="flex justify-between">
                        <button
                            className={`flex-1 py-2 rounded-lg mr-1 ${isBuyActive ? "bg-green-600" : "bg-gray-200"} text-white font-bold transition duration-200 hover:bg-green-700`}
                            onClick={toggleBuySell}
                        >
                            Buy
                        </button>
                        <button
                            className={`flex-1 py-2 rounded-lg ${!isBuyActive ? "bg-red-600" : "bg-gray-200"} text-white font-bold transition duration-200 hover:bg-red-700`}
                            onClick={toggleBuySell}
                        >
                            Sell
                        </button>
                    </div>
                    <div>
                        <div className="flex space-x-4">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    value="market"
                                    checked={orderType === "market"}
                                    onChange={() => setOrderType("market")}
                                    className="form-radio h-4 w-4 text-blue-600"
                                />
                                <span className="text-gray-700">Market</span>
                            </label>

                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    value="limit"
                                    checked={orderType === "limit"}
                                    onChange={() => setOrderType("limit")}
                                    className="form-radio h-4 w-4 text-blue-600"
                                />
                                <span className="text-gray-700">Limit</span>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700">Entry Price:</label>
                        <input
                            type="number"
                            value={entryPrice}
                            onChange={(e) => setEntryPrice(Number(e.target.value))}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Stop Loss Price:</label>
                        <input
                            type="number"
                            value={stopLossPrice}
                            onChange={(e) => setStopLossPrice(Number(e.target.value))}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Take Profit:</label>
                        <input
                            type="number"
                            value={takeProfit}
                            onChange={(e) => setTakeProfit(Number(e.target.value))}
                            className="mt-1 p-2 border rounded w-full"
                        />
                    </div>

                    <button
                        onClick={handlePlaceOrder}
                        className="bg-blue-600 text-white p-2 rounded-lg font-semibold mt-4"
                    >
                        Place Order
                    </button>
                </div>
            )}

            <div
                ref={chartRef}
                className={`flex-1 h-full border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ${arePricesVisible ? 'ml-4' : ''}`}
            />
        </div>
    </div>

    {showCalculator && <TradeCalculator />}
</div>
);
};

 
export default ChartPage;
