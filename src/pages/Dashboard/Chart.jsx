<div className="relative p-0.5 w-full h-screen bg-gray-50 flex flex-col">
<div className="flex flex-1 overflow-hidden">
  <Sidebar
    togglePriceBoxes={() => setArePricesVisible((prev) => !prev)}
    toggleCalculator={() => setShowCalculator((prev) => !prev)}
  />

  <div className="flex-1 p-0.5 flex flex-col overflow-hidden space-x-1">
    {/* Order Modification Popup */}
    {isOrderModification && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Modifying Order ID: {orderId}
          </h2>
          <label className="block text-gray-700">Take Profit:</label>
          <input
            type="number"
            value={takeProfit}
            onChange={(e) => setTakeProfit(Number(e.target.value))}
            className="mt-1 p-2 border rounded w-full"
          />
          <label className="block text-gray-700 mt-4">Stop Loss Price:</label>
          <input
            type="number"
            value={stopLossPrice}
            onChange={(e) => setStopLossPrice(Number(e.target.value))}
            className="mt-1 p-2 border rounded w-full"
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={() => setIsOrderModification(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateTakeProfit}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Order
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Main Dashboard */}
    {arePricesVisible && (
      <div className="flex flex-col space-y-4 p-1 bg-white border border-gray-100 rounded-lg shadow-md min-w-[180px] max-w-[200px]">
        <h2 className="text-2xl font-semibold text-gray-800">Price Settings</h2>
        <div className="flex justify-between">
          <button
            className={`flex-1 py-2 rounded-lg mr-1 ${
              isBuyActive ? 'bg-green-600' : 'bg-gray-200'
            } text-white font-bold transition duration-200 hover:bg-green-700`}
            onClick={toggleBuySell}
          >
            Buy
          </button>
          <button
            className={`flex-1 py-2 rounded-lg ${
              !isBuyActive ? 'bg-red-600' : 'bg-gray-200'
            } text-white font-bold transition duration-200 hover:bg-red-700`}
            onClick={toggleBuySell}
          >
            Sell
          </button>
        </div>

        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="MKT"
              checked={orderType === 'MKT'}
              onChange={() => setOrderType('MKT')}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="text-gray-700">Market</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="LMT"
              checked={orderType === 'LMT'}
              onChange={() => setOrderType('LMT')}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="text-gray-700">Limit</span>
          </label>
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

        <div>
          <label className="block text-gray-700">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="form-input w-full px-2 py-1 border rounded-lg focus:outline-none"
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

    <div ref={chartRef} className="flex-1" style={{ height: '590px' }} />
  </div>
</div>

{showCalculator && <TradeCalculator />}
</div>
);
};

export default Dashboard;