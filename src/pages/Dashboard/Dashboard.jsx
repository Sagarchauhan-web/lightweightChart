import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import ResizablePanels from "../../components/ui/ResizablePanels";
import { FaListAlt } from "react-icons/fa";

const Dashboard = () => {
  const [entryPrice, setEntryPrice] = useState(120);
  const [supportPrice, setSupportPrice] = useState(97);
  const [resistancePrice, setResistancePrice] = useState(140);
  const chartRef = useRef(null); // Reference to the chart
  const [showPanels, setShowPanels] = useState(true);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      layout: {
        textColor: "black",
        background: { type: "solid", color: "white" },
      },
    });

    const areaSeries = chart.addAreaSeries({
      lineColor: "#2962FF",
      topColor: "#2962FF",
      bottomColor: "rgba(41, 98, 255, 0.28)",
    });

    areaSeries.setData([
      { time: "2018-12-22", value: 32.51 },
      { time: "2018-12-23", value: 31.11 },
      { time: "2018-12-24", value: 27.02 },
      { time: "2018-12-25", value: 27.32 },
      { time: "2018-12-26", value: 25.17 },
      { time: "2018-12-27", value: 28.89 },
      { time: "2018-12-28", value: 25.46 },
      { time: "2018-12-29", value: 23.92 },
      { time: "2018-12-30", value: 22.68 },
      { time: "2018-12-31", value: 22.67 },
    ]);

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    candlestickSeries.setData([
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
    ]);

    // Create price lines
    const supportLine = chart.addLineSeries({ color: "red", lineWidth: 2 });
    const resistanceLine = chart.addLineSeries({ color: "green", lineWidth: 2 });
    const entryLine = chart.addLineSeries({ color: "blue", lineWidth: 2 });

    // Set initial data for price lines
    const initialPriceData = { time: "2018-12-22", value: 0 };
    supportLine.setData([{ ...initialPriceData, value: supportPrice }]);
    resistanceLine.setData([{ ...initialPriceData, value: resistancePrice }]);
    entryLine.setData([{ ...initialPriceData, value: entryPrice }]);

    // Event handlers
    let isDragging = false;
    let draggedLine = null; // Track which line is being dragged

    const mouseDownHandler = (e) => {
      const { offsetY } = e;
      const priceAtPoint = candlestickSeries.coordinateToPrice(offsetY);
      
      // Check if clicking on a price line
      if (Math.abs(priceAtPoint - supportPrice) < 0.5) {
        draggedLine = "support";
        isDragging = true;
      } else if (Math.abs(priceAtPoint - resistancePrice) < 0.5) {
        draggedLine = "resistance";
        isDragging = true;
      } else if (Math.abs(priceAtPoint - entryPrice) < 0.5) {
        draggedLine = "entry";
        isDragging = true;
      }
    };

    const mouseMoveHandler = (e) => {
      if (isDragging) {
        const { offsetY } = e;
        const newPrice = candlestickSeries.coordinateToPrice(offsetY);
        
        // Update price lines and corresponding input values
        if (draggedLine === "support") {
          supportLine.update({ time: "2018-12-22", value: newPrice });
          setSupportPrice(newPrice);
        } else if (draggedLine === "resistance") {
          resistanceLine.update({ time: "2018-12-22", value: newPrice });
          setResistancePrice(newPrice);
        } else if (draggedLine === "entry") {
          entryLine.update({ time: "2018-12-22", value: newPrice });
          setEntryPrice(newPrice);
        }
      }
    };

    const mouseUpHandler = () => {
      isDragging = false;
      draggedLine = null; // Reset dragging
    };

    chartRef.current.addEventListener("mousedown", mouseDownHandler);
    chartRef.current.addEventListener("mousemove", mouseMoveHandler);
    chartRef.current.addEventListener("mouseup", mouseUpHandler);

    // Cleanup function
    return () => {
      chartRef.current.removeEventListener("mousedown", mouseDownHandler);
      chartRef.current.removeEventListener("mousemove", mouseMoveHandler);
      chartRef.current.removeEventListener("mouseup", mouseUpHandler);
      chart.remove(); // Cleanup chart on component unmount
    };
  }, [entryPrice, supportPrice, resistancePrice]);

  return (
    <div className="relative w-full h-screen bg-gray-50 flex flex-col">
      {/* Panel List Icon in the top-left corner */}
      <div className="absolute top-4 left-4 z-20 flex flex-col">
        <div
          className="flex items-center mb-2 cursor-pointer"
          onClick={() => setShowPanels(!showPanels)}
        >
          <FaListAlt className="text-3xl text-blue-700 mr-2" />
          <span className="text-lg font-semibold">Price Input Panels</span>
        </div>

        {/* Conditionally render the ResizablePanels if showPanels is true */}
        {showPanels && (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <ResizablePanels
              leftPanelContent={
                <div className="flex flex-col items-center">
                  <label className="mb-1">Entry Price</label>
                  <input
                    type="number"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="border p-2 rounded"
                    placeholder="Set Entry Price"
                  />
                </div>
              }
              centerPanelContent={
                <div className="flex flex-col items-center">
                  <label className="mb-1">Support Price</label>
                  <input
                    type="number"
                    value={supportPrice}
                    onChange={(e) => setSupportPrice(Number(e.target.value))}
                    className="border p-2 rounded"
                    placeholder="Set Support Price"
                  />
                </div>
              }
              rightPanelContent={
                <div className="flex flex-col items-center">
                  <label className="mb-1">Resistance Price</label>
                  <input
                    type="number"
                    value={resistancePrice}
                    onChange={(e) => setResistancePrice(Number(e.target.value))}
                    className="border p-2 rounded"
                    placeholder="Set Resistance Price"
                  />
                </div>
              }
            />
          </div>
        )}
      </div>

      <div
        ref={chartRef}
        className="w-full h-full mt-16"
      />
    </div>
  );
};

export default Dashboard;
