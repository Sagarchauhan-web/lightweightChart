import React from "react";

const PriceSettings = ({
  entryPrice,
  stopLossPrice,
  takeProfit,
  setEntryPrice,
  setStopLossPrice,
  setTakeProfit,
  orderType,
  setOrderType,
  isBuyActive,
  toggleBuySell,
}) => (
  <div className="flex flex-col space-y-4 p-1 bg-white border border-gray-100 rounded-lg shadow-md min-w-[180px] max-w-[200px]">
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
            value="MKT"
            checked={orderType === "MKT"}
            onChange={() => setOrderType("MKT")}
            className="form-radio h-4 w-4 text-blue-600"
          />
          <span className="text-gray-700">Market</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="radio"
            value="LMT"
            checked={orderType === "LMT"}
            onChange={() => setOrderType("LMT")}
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
  </div>
);

export default PriceSettings;
