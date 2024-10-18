import React from 'react';

const PriceInputs = ({
  isBuyMode,
  entryPrice,
  supportPrice,
  resistancePrice,
  setEntryPrice,
  setSupportPrice,
  setResistancePrice,
}) => {
  return (
    <div className="absolute top-20 right-4 p-4 bg-white border rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">{isBuyMode ? 'Buy Prices' : 'Sell Prices'}</h2>

      {/* Entry Price Input */}
      <div className="mb-4">
        <label className="block mb-1">Entry Price</label>
        <input
          type="number"
          value={entryPrice}
          onChange={(e) => setEntryPrice(Number(e.target.value))}
          className="w-full border p-2 rounded"
          placeholder="Set Entry Price"
        />
      </div>

      {/* Support Price Input */}
      <div className="mb-4">
        <label className="block mb-1">Support Price</label>
        <input
          type="number"
          value={supportPrice}
          onChange={(e) => setSupportPrice(Number(e.target.value))}
          className="w-full border p-2 rounded"
          placeholder="Set Support Price"
        />
      </div>

      {/* Resistance Price Input */}
      <div>
        <label className="block mb-1">Resistance Price</label>
        <input
          type="number"
          value={resistancePrice}
          onChange={(e) => setResistancePrice(Number(e.target.value))}
          className="w-full border p-2 rounded"
          placeholder="Set Resistance Price"
        />
      </div>
    </div>
  );
};

export default PriceInputs;
