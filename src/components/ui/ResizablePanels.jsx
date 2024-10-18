import React, { useState } from 'react';
import PanelToggle from './PanelToggle';  // Import PanelToggle component
import PriceInputs from './PriceInputs';  // Import PriceInputs component

const ResizablePanels = () => {
  const [isBuyMode, setIsBuyMode] = useState(true);
  const [entryPrice, setEntryPrice] = useState(0);
  const [supportPrice, setSupportPrice] = useState(0);
  const [resistancePrice, setResistancePrice] = useState(0);
  const [showPriceInputs, setShowPriceInputs] = useState(false);

  // Toggle between Buy and Sell
  const handleToggleBuySell = () => {
    setIsBuyMode(!isBuyMode);
    setShowPriceInputs(true); // Show the input boxes after selecting Buy/Sell
  };

  return (
    <div className="relative w-full h-screen bg-gray-50 flex flex-col">
      {/* Top-right corner toggle button for Buy/Sell */}
      <PanelToggle isBuyMode={isBuyMode} handleToggleBuySell={handleToggleBuySell} />

      {/* Show Price Inputs when Buy or Sell is selected */}
      {showPriceInputs && (
        <PriceInputs
          isBuyMode={isBuyMode}
          entryPrice={entryPrice}
          supportPrice={supportPrice}
          resistancePrice={resistancePrice}
          setEntryPrice={setEntryPrice}
          setSupportPrice={setSupportPrice}
          setResistancePrice={setResistancePrice}
        />
      )}
    </div>
  );
};

export default ResizablePanels;
