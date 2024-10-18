import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LightweightChartAutomation() {  // Use uppercase for component name
  const navigate = useNavigate();

  return (
    <div className='flex flex-col min-h-[100dvh]'>
      {/* Header with only the Sign Up button */}
      <header className='px-6 py-10 lg:px-8 h-28 md:h-14 flex items-center border-b-2'>
        <div className='flex items-start justify-between w-full flex-col space-y-3 sm:flex-row sm:items-center'>
          <div className='flex items-center justify-center gap-5'>
            <div className='flex justify-center items-center'>
              <img src='/logo.png' alt='logo' className='w-10 h-8' />
              <p className='text-gray-800 font-bold'>ChartAutomation</p>
            </div>
          </div>

          {/* Sign Up button */}
          <div className='flex gap-5'>
            <div
              onClick={() => navigate('/', { state: { toRegister: true } })}
              className='w-48 inline-flex h-9 items-center justify-center rounded-md bg-blue-700 px-4 py-2 text-sm 
                    font-medium text-gray-50 shadow transition-colors hover:bg-blue-700/90 focus-visible:outline-none focus-visible:ring-1
                     focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
            >
              Sign Up for Free
            </div>
          </div>
        </div>
      </header>
      {/* Additional content can go here */}
    </div>
  );
}
