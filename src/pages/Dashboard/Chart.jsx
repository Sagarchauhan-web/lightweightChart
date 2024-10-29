import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

const Chart = ({ entryPrice, stopLossPrice, takeProfit, arePricesVisible }) => {
  const chartRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedLine, setDraggedLine] = useState(null);

  // Chart Setup and Event Listeners
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

    // Add Candlestick Series to the Chart
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderVisible: false,
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    // Sample Data for the Chart
    candlestickSeries.setData([
      { time: "2018-12-22", open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
      { time: "2018-12-23", open: 45.12, high: 53.9, low: 45.12, close: 48.91 },
      { time: "2018-12-24", open: 55.41, high: 56.45, low: 40.12, close: 42.91 },
    ]);

    // Drawing Entry, Stop Loss, and Take Profit lines
    const drawLines = () => {
      if (!arePricesVisible) return;

      const entryLine = chart.addLineSeries({ color: "green", lineWidth: 2 });
      entryLine.setData([{ time: "2018-12-22", value: entryPrice }]);

      const stopLossLine = chart.addLineSeries({ color: "red", lineWidth: 2 });
      stopLossLine.setData([{ time: "2018-12-22", value: stopLossPrice }]);

      const takeProfitLine = chart.addLineSeries({ color: "blue", lineWidth: 2 });
      takeProfitLine.setData([{ time: "2018-12-22", value: takeProfit }]);
    };

    drawLines(); // Draw lines initially

    return () => chart.remove();
  }, [entryPrice, stopLossPrice, takeProfit, arePricesVisible]);

  return <div ref={chartRef} className="flex-1 h-full bg-white border border-gray-300 rounded-lg shadow-md" />;
};

export default Chart;
