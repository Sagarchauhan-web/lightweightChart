import React, { useRef, useEffect, useState } from 'react';
import { createChart } from 'lightweight-charts';

const suc = () => {
  const chartRef = useRef();
  const [chart, setChart] = useState(null);
  const [candlestickSeries, setCandlestickSeries] = useState(null);
  const [entryPrice, setEntryPrice] = useState('');
  const [stopLoss, setStopLoss] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [arePricesVisible, setArePricesVisible] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [currentRisk, setCurrentRisk] = useState(0);
  const [currentProfit, setCurrentProfit] = useState(0);

  // Function to toggle price input boxes
  const togglePriceBoxes = () => {
    setArePricesVisible(!arePricesVisible);
  };

  // Function to place a market order
  const placeOrder = () => {
    setTradeOpen(true);
    // Calculate risk based on entry price and stop loss
    const risk = Math.abs(Number(entryPrice) - Number(stopLoss));
    setCurrentRisk(risk);
  };

  // Function to close the entire trade
  const closeTrade = () => {
    setTradeOpen(false);
    setEntryPrice('');
    setStopLoss('');
    setTakeProfit('');
    setCurrentRisk(0);
    setCurrentProfit(0);
  };

  // Function to move stop loss to break even
  const moveStopLossToBreakEven = () => {
    setStopLoss(entryPrice);
  };

  // Function to take partial profits
  const takePartialProfit = (percentage) => {
    const profit = (percentage / 100) * currentProfit;
    setCurrentProfit(currentProfit - profit);
  };

  // Function to validate and set candlestick data
  const validateAndSetCandlestickData = (data) => {
    const validatedData = data.map(item => ({
      time: item.time,
      open: Number(item.open),
      high: Number(item.high),
      low: Number(item.low),
      close: Number(item.close),
    }));

    // Set the data on the candlestick series
    candlestickSeries.setData(validatedData);
  };

  useEffect(() => {
    // Create chart only on initial render
    const chartInstance = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
    });

    const series = chartInstance.addCandlestickSeries({
      upColor: '#4FFF00',
      downColor: '#FF0000',
      borderUpColor: '#4FFF00',
      borderDownColor: '#FF0000',
      wickUpColor: '#4FFF00',
      wickDownColor: '#FF0000',
    });

    setChart(chartInstance);
    setCandlestickSeries(series);

    // Example candlestick data
    const initialData = [
      { time: "2018-12-22", open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
      { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
      { time: "2018-12-24", open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
      { time: "2018-12-25", open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
      { time: "2018-12-26", open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
      { time: "2018-12-27", open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
      { time: "2018-12-28", open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
      { time: "2018-12-29", open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
      { time: "2018-12-30", open: 106.33, high: 110.2, low: 90.39, close: 98.1 },
      { time: "2018-12-31", open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
    ];

    validateAndSetCandlestickData(initialData);

    // Cleanup on unmount
    return () => {
      chartInstance.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-white flex flex-row">
      {/* Left Section for Input and Chart Area */}
      <div className="flex-1 p-4 flex flex-col overflow-hidden">
        {/* Conditional rendering of price input boxes */}
        {arePricesVisible && (
          <div className="flex justify-around mb-6">
            <div className="flex flex-col items-center w-1/3">
              <label className="mb-2 text-lg font-semibold text-gray-700">Entry Price</label>
              <input
                type="number"
                value={entryPrice}
                onChange={(e) => setEntryPrice(Number(e.target.value))}
                className="border border-gray-300 p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="Set Entry Price"
              />
            </div>
            <div className="flex flex-col items-center w-1/3">
              <label className="mb-2 text-lg font-semibold text-gray-700">Stop Loss</label>
              <input
                type="number"
                value={stopLoss}
                onChange={(e) => setStopLoss(Number(e.target.value))}
                className="border border-gray-300 p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="Set Stop Loss"
              />
            </div>
            <div className="flex flex-col items-center w-1/3">
              <label className="mb-2 text-lg font-semibold text-gray-700">Take Profit</label>
              <input
                type="number"
                value={takeProfit}
                onChange={(e) => setTakeProfit(Number(e.target.value))}
                className="border border-gray-300 p-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 ease-in-out"
                placeholder="Set Take Profit"
              />
            </div>
          </div>
        )}

        {/* Chart Area */}
        <div id="thirdContainer" className="flex-1" ref={chartRef} />

        {/* Order and Trade Management Buttons */}
        <div className="flex justify-around mb-6">
          <button
            onClick={placeOrder}
            className="bg-green-500 text-white p-3 rounded-md shadow-md hover:bg-green-700 transition duration-200 ease-in-out"
          >
            Place Order
          </button>
          {tradeOpen && (
            <>
              <button
                onClick={moveStopLossToBreakEven}
                className="bg-blue-500 text-white p-3 rounded-md shadow-md hover:bg-blue-700 transition duration-200 ease-in-out"
              >
                Move Stop Loss to Break Even
              </button>
              <button
                onClick={() => takePartialProfit(80)}
                className="bg-yellow-500 text-white p-3 rounded-md shadow-md hover:bg-yellow-700 transition duration-200 ease-in-out"
              >
                Take 80% Profits
              </button>
              <button
                onClick={() => takePartialProfit(50)}
                className="bg-orange-500 text-white p-3 rounded-md shadow-md hover:bg-orange-700 transition duration-200 ease-in-out"
              >
                Close 50% of Trade
              </button>
              <button
                onClick={closeTrade}
                className="bg-red-500 text-white p-3 rounded-md shadow-md hover:bg-red-700 transition duration-200 ease-in-out"
              >
                Close Trade
              </button>
            </>
          )}
        </div>
      </div>

      {/* Right Sidebar Component */}
      <div className="w-15 bg-gray-900 text-white flex flex-col items-center py-1 space-y-1">
        <button
          onClick={togglePriceBoxes}
          className="bg-blue-700 p-2 rounded hover:bg-blue-800 transition duration-200 ease-in-out"
        >
          {arePricesVisible ? 'Hide Prices' : 'Show Prices'}
        </button>
        {/* Additional Sidebar Content */}
      </div>
    </div>
  );
};

export default suc;
