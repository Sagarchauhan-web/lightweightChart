import React, { useState, useRef } from 'react'
import Draggable from 'react-draggable'
import { Button } from '../ui/button'

const TradeCalculator = () => {
  const [accountBalance, setAccountBalance] = useState('')
  const [riskAmount, setRiskAmount] = useState('')
  const [riskType, setRiskType] = useState('flat') // 'flat' or 'percentage'
  const draggableRef = useRef(null)

  const handleRiskCalculation = () => {
    const parsedAccountBalance = parseFloat(accountBalance)
    const parsedRiskAmount = parseFloat(riskAmount)
    
    if (isNaN(parsedAccountBalance) || isNaN(parsedRiskAmount)) {
      alert('Please enter valid numbers for account balance and risk amount')
      return
    }

    let calculatedRisk = riskType === 'flat'
      ? parsedRiskAmount
      : (parsedAccountBalance * (parsedRiskAmount / 100)).toFixed(2)
    
    alert(`Risk Amount: $${calculatedRisk} ${riskType === 'percentage' ? `(based on ${parsedRiskAmount}% of your account balance)` : ''}`)
  }

  const clearInputs = () => {
    setAccountBalance('')
    setRiskAmount('')
    setRiskType('flat')
  }

  const handleToggleRiskType = () => {
    setRiskType(prev => (prev === 'flat' ? 'percentage' : 'flat'))
    setRiskAmount('') // Clear riskAmount when switching types
  }

  return (
    <Draggable nodeRef={draggableRef}>
      <div
        ref={draggableRef}
        className="floating-calculator bg-gray-900 text-white p-4 rounded-lg shadow-lg fixed top-5 left-5 z-50 cursor-move border border-gray-700"
        style={{ width: '280px' }} // Adjusted size
      >
        <h4 className="font-bold text-lg mb-4 text-center">Risk Parameters</h4>
        <div className="mb-3">
          <label className="block mb-1">Account Balance ($):</label>
          <input
            type="number"
            value={accountBalance}
            onChange={(e) => setAccountBalance(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          />
        </div>
        <div className="flex items-center mb-3">
          <label className="mr-2">Risk Type:</label>
          <label className='flex cursor-pointer select-none items-center'>
            <div className='relative'>
              <input
                type='checkbox'
                checked={riskType === 'percentage'}
                onChange={handleToggleRiskType}
                className='sr-only'
              />
              <div className='block h-8 w-14 rounded-full bg-gray-700'></div>
              <div
                className='dot absolute left-1 top-1 h-6 w-6 rounded-full bg-yellow-400 transition'
                style={{ transform: riskType === 'percentage' ? 'translateX(100%)' : 'translateX(0)' }}
              ></div>
            </div>
          </label>
          <span className="ml-2">{riskType === 'flat' ? 'Flat' : 'Percentage'}</span>
        </div>
        <div className="mb-4">
          <label className="block mb-1">{riskType === 'flat' ? 'Flat Dollar Amount ($):' : 'Risk Percentage (%):'}</label>
          <input
            type="number"
            value={riskAmount}
            onChange={(e) => setRiskAmount(e.target.value)}
            className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={handleRiskCalculation}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded text-xs"
            aria-label="Input Risk"
            style={{ minHeight: '40px' }}
          >
            INPUT RISK
          </Button>
          <Button
            onClick={() => alert('Opening trade')}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded text-xs"
            aria-label="Open Trade"
            style={{ minHeight: '40px' }}
          >
            OPEN TRADE
          </Button>
          <Button
            onClick={() => alert('Closing full position')}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded text-xs"
            aria-label="Close Full Position"
            style={{ minHeight: '40px' }}
          >
            CLOSE FULL
          </Button>
          <Button
            onClick={() => alert('Closing half position')}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded text-xs"
            aria-label="Close Half Position"
            style={{ minHeight: '40px' }}
          >
            CLOSE HALF
          </Button>
        </div>
        <Button
          onClick={clearInputs}
          className="mt-4 w-full bg-gray-700 text-white p-2 rounded hover:bg-gray-600 transition"
        >
          Clear
        </Button>
      </div>
    </Draggable>
  )
}

export default TradeCalculator
