import React, { useState } from 'react';

const MenuButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(''); // Track active menu

  // Separate states for price line inputs
  const [entryPrice, setEntryPrice] = useState(''); // Entry Price
  const [stopLoss, setStopLoss] = useState(''); // Stop Loss
  const [takeProfit, setTakeProfit] = useState(''); // Take Profit

  // Separate states for risk parameters
  const [riskPercentage, setRiskPercentage] = useState(''); // Percentage Account Balance
  const [flatAmount, setFlatAmount] = useState(''); // Flat Dollar Amount
  const [isPercentage, setIsPercentage] = useState(true); // Toggle state for percentage or flat amount

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setActiveMenu(''); // Reset active menu when reopening
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset input values when closing
    setEntryPrice('');
    setStopLoss('');
    setTakeProfit('');
    setRiskPercentage(''); // Reset risk parameters
    setFlatAmount('');
    setActiveMenu('');
  };

  const handleRiskSubmit = () => {
    // Console logging for testing each risk input value
    console.log('Risk Parameters:');
    console.log('Percentage Account Balance:', riskPercentage);
    console.log('Flat Dollar Amount:', flatAmount);

    console.log('Price Inputs:');
    console.log('Entry Price:', entryPrice);
    console.log('Stop Loss:', stopLoss);
    console.log('Take Profit:', takeProfit);
    closeModal();
  };

  const handleMenuSelect = (menu) => {
    setActiveMenu(menu); // Set active menu to the selected option

    // Reset relevant state variables based on the selected menu
    if (menu === 'priceLine') {
      setEntryPrice(''); // Reset Entry Price for price line
      setStopLoss(''); // Reset Stop Loss for price line
      setTakeProfit(''); // Reset Take Profit for price line
    } else if (menu === 'riskParameter') {
      setRiskPercentage(''); // Reset risk percentage input
      setFlatAmount(''); // Reset flat amount input
    }
  };

  return (
    <div>
      <button 
        className="fixed top-4 left-4 text-2xl text-gray-900 hover:text-gray-600 transition-colors duration-200 focus:outline-none"
        onClick={toggleModal}
      >
        &#9776;  {/* Menu Icon */}
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg transform transition-transform duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                {activeMenu === '' ? 'Menu' : activeMenu === 'priceLine' ? 'Add Price Line' : 'Risk Parameters'}
              </h2>
              <button 
                onClick={closeModal} 
                className="text-2xl text-gray-500 hover:text-gray-700 transition duration-200"
              >
                &times;
              </button>
            </div>

            {/* Menu Selection */}
            {activeMenu === '' && (
              <div className="flex flex-col space-y-4">
                <button
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 shadow-md"
                  onClick={() => handleMenuSelect('priceLine')}
                >
                  Add Price Line
                </button>
                <button
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-md"
                  onClick={() => handleMenuSelect('riskParameter')}
                >
                  Risk Parameters
                </button>
              </div>
            )}

            {/* Add Price Line Form */}
            {activeMenu === 'priceLine' && (
              <div className="mt-4">
                <div className="flex justify-between space-x-4">
                  <div className="flex-1">
                    <label className="block text-gray-700 font-bold mb-2">EP</label>
                    <input
                      type="number"
                      className="border rounded-lg p-2 w-full"
                      placeholder="Entry Price"
                      value={entryPrice}
                      onChange={(e) => setEntryPrice(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 font-bold mb-2">SL</label>
                    <input
                      type="number"
                      className="border rounded-lg p-2 w-full"
                      placeholder="Stop Loss"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 font-bold mb-2">TP</label>
                    <input
                      type="number"
                      className="border rounded-lg p-2 w-full"
                      placeholder="Take Profit"
                      value={takeProfit}
                      onChange={(e) => setTakeProfit(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md mt-4"
                  onClick={closeModal} // Replace this with your actual function to handle price line drawing
                >
                  Draw Lines
                </button>
              </div>
            )}

            {/* Risk Parameters Form */}
            {activeMenu === 'riskParameter' && (
              <div className="mt-4">
                {/* Toggle Switch */}
                <div className="flex items-center mb-6">
                  <span className={`text-lg font-medium ${isPercentage ? 'text-blue-500' : 'text-gray-700'} mr-2`}>
                    Percentage
                  </span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!isPercentage}
                      onChange={() => setIsPercentage(!isPercentage)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                  <span className={`text-lg font-medium ${!isPercentage ? 'text-blue-500' : 'text-gray-700'} ml-2`}>
                    Flat Amount
                  </span>
                </div>

                {/* Risk Parameters Form */}
                <div className="mt-4">
                  {isPercentage ? (
                    <input
                      id="percentageInput"
                      type="text"
                      placeholder="Percentage Account Balance"
                      value={riskPercentage} // Use separate state for percentage input
                      onChange={(e) => setRiskPercentage(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg mb-4 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none transition duration-200"
                    />
                  ) : (
                    <input
                      id="flatAmountInput"
                      type="text"
                      placeholder="Flat Dollar Amount"
                      value={flatAmount} // Use separate state for flat amount input
                      onChange={(e) => setFlatAmount(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg mb-4 shadow-sm focus:ring focus:ring-blue-200 focus:outline-none transition duration-200"
                    />
                  )}

                  <button
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    onClick={handleRiskSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuButton;
