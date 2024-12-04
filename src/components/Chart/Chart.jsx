import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";
import { getTickerData } from "../../services/auth";

const Chart = ({
  entryPrice,
  stopLossPrice,
  takeProfit,
  mstopLoss,
  mtakeProfit,
  arePricesVisible,
  arePricesVisibleModifiy,
}) => {
  const chartRef = useRef(null);

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

    const mtakeProfitLine = chart.addLineSeries({
      color: "green",
      lineWidth: 2,
    });
    const mstopLossLine = chart.addLineSeries({
      color: "red",
      lineWidth: 2,
    });

    const stopLossLine = chart.addLineSeries({ color: "red", lineWidth: 2 });
    const takeProfitLine = chart.addLineSeries({
      color: "green",
      lineWidth: 2,
    });
    const entryLine = chart.addLineSeries({ color: "blue", lineWidth: 2 });

    const initialTime = "2018-12-22";
    const fetchData = async () => {
      try {
        const apiData = await getTickerData("TCS", initialTime, "2023-12-31");

        const chartData = apiData
          .map((item) => ({
            time: item.date,
            open: item.open,
            high: item.high,
            low: item.low,
            close: item.close,
          }))
          .filter((data) => data.time && data.open && data.high && data.low && data.close)
          .sort((a, b) => new Date(a.time) - new Date(b.time));

        candlestickSeries.setData(chartData);
      } catch (error) {
        console.error("Error fetching ticker data:", error);
      }
    };

    if (arePricesVisibleModifiy) {
      mstopLossLine.setData([{ time: initialTime, value: mstopLoss }]);
      mtakeProfitLine.setData([{ time: initialTime, value: mtakeProfit }]);
    }

    if (arePricesVisible) {
      stopLossLine.setData([{ time: initialTime, value: stopLossPrice }]);
      takeProfitLine.setData([{ time: initialTime, value: takeProfit }]);
      entryLine.setData([{ time: initialTime, value: entryPrice }]);
    }

    fetchData();

    return () => {
      chart.remove();
    };
  }, [
    entryPrice,
    stopLossPrice,
    takeProfit,
    mstopLoss,
    mtakeProfit,
    arePricesVisible,
    arePricesVisibleModifiy,
  ]);

  return <div ref={chartRef} className="flex-1" style={{ height: "560px" }} />;
};

export default Chart;
