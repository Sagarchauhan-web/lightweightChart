
import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import Sidebar from "../../components/ui/Sidebar";
import SearchTicker from "../../components/SearchTicker/SearchTicker";
import TradeCalculator from "../../components/TradeCalculator/TradeCalculator";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import { placeOrder, modifyOrder } from "../../services/Order/Order";
import { getTickerData } from "../../services/auth";

const Dashboard = () => {
  // State variables
  const [entryPrice, setEntryPrice] = useState(50);
  const [stopLossPrice, setStopLossPrice] = useState(40);
  const [takeProfit, setTakeProfit] = useState(92);
  const [isBuyActive, setIsBuyActive] = useState(true);  // Tracks Buy/Sell state
  const [orderType, setOrderType] = useState("Market");
  const [quantity, setQuantity] = useState("");
  const [showCalculator, setShowCalculator] = useState(false);

  // Chart-related references
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const candlestickSeries = useRef(null);
  const stopLossLine = useRef(null);
  const takeProfitLine = useRef(null);
  const entryLine = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Fetch and populate chart data
  useEffect(() => {
    const initializeChart = async () => {
      chartInstance.current = createChart(chartRef.current, {
        layout: { textColor: "#333", background: { color: "#ffffff" } },
        grid: {
          horzLines: { color: "#efefef" },
          vertLines: { color: "#efefef" },
        },
      });

      candlestickSeries.current = chartInstance.current.addCandlestickSeries();

      stopLossLine.current = chartInstance.current.addLineSeries({ color: "red" });
      takeProfitLine.current = chartInstance.current.addLineSeries({ color: "green" });
      entryLine.current = chartInstance.current.addLineSeries({ color: "blue" });

      try {
        const apiData = await getTickerData("TCS", "2020-01-01", "2023-12-31");
        const chartData = apiData.map(item => ({
          time: new Date(item.index).getTime() / 1000,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }));
        candlestickSeries.current.setData(chartData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    initializeChart();

    return () => {
      if (chartInstance.current) chartInstance.current.remove();
    };
  }, []);

  
 
  // Render lines on the chart
  const updateChartLines = (stopLoss, takeProfit) => {
    const currentTime = Math.floor(Date.now() / 1000);
    stopLossLine.current?.setData([{ time: currentTime, value: stopLoss }]);
    takeProfitLine.current?.setData([{ time: currentTime, value: takeProfit }]);
  };

  useEffect(() => {
    if (location.state) {
      const { stopLossPricez, takeProfitPricex } = location.state;
      updateChartLines(stopLossPricez, takeProfitPricex);
    }
  }, [location.state]);

  // Toggle between Buy and Sell
  const toggleBuySell = () => {
    setIsBuyActive(prev => !prev);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <SearchTicker />
        <div className="mb-4">
          <div ref={chartRef} className="w-full h-96"></div>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handlePlaceOrder} className="btn-primary">
            Place Order
          </button>
          <button onClick={toggleBuySell} className={`btn ${isBuyActive ? "bg-green-500" : "bg-red-500"}`}>
            {isBuyActive ? "Buy" : "Sell"}
          </button>
          <button onClick={handleModifyOrder} className="btn-secondary">
            Modify Order
          </button>
        </div>
        <TradeCalculator
          entryPrice={entryPrice}
          stopLossPrice={stopLossPrice}
          takeProfit={takeProfit}
          quantity={quantity}
          onCalculate={(data) => console.log(data)}
          isVisible={showCalculator}
        />
      </div>
    </div>
  );
};

export default Dashboard;