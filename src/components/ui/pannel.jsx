import React, { useState } from 'react';
import { PanelGroup, Panel } from 'react-resizable-panels';

const Panels = ({
  leftPanelContent,
  centerPanelContent,
  rightPanelContent,
  leftPanelStyle,
  centerPanelStyle,
  rightPanelStyle,
  height = 'auto',
}) => {
  // State to track panel expansion
  const [showLeftInput, setShowLeftInput] = useState(false);
  const [showCenterInput, setShowCenterInput] = useState(false);
  const [showRightInput, setShowRightInput] = useState(false);

  return (
    <div style={{ height }}>
      <PanelGroup direction="horizontal">
        {/* Left Panel */}
        <Panel onClick={() => setShowLeftInput(!showLeftInput)}>
          <div
            style={{ ...leftPanelStyle }}
            className="flex justify-center items-center h-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div
              className={`p-4 text-center text-lg font-semibold cursor-pointer rounded-md border ${
                showLeftInput ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-50 hover:bg-blue-50'
              }`}
            >
              {showLeftInput ? leftPanelContent : 'Click to Enter Entry Price'}
            </div>
          </div>
        </Panel>

        {/* Center Panel */}
        <Panel resize="dynamic" onClick={() => setShowCenterInput(!showCenterInput)}>
          <div
            style={{ ...centerPanelStyle }}
            className="flex justify-center items-center h-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div
              className={`p-4 text-center text-lg font-semibold cursor-pointer rounded-md border ${
                showCenterInput ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-50 hover:bg-blue-50'
              }`}
            >
              {showCenterInput ? centerPanelContent : 'Click to Enter Support Price'}
            </div>
          </div>
        </Panel>

        {/* Right Panel */}
        <Panel onClick={() => setShowRightInput(!showRightInput)}>
          <div
            style={{ ...rightPanelStyle }}
            className="flex justify-center items-center h-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            <div
              className={`p-4 text-center text-lg font-semibold cursor-pointer rounded-md border ${
                showRightInput ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-50 hover:bg-blue-50'
              }`}
            >
              {showRightInput ? rightPanelContent : 'Click to Enter Resistance Price'}
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Panels;
