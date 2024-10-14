import { useEffect } from 'react';
import { createChart } from 'lightweight-charts';
import './App.css';

function App() {
  const createChartOnce = () => {
    const chartOptions = {
      layout: {
        textColor: 'black',
        background: { type: 'solid', color: 'white' },
      },
    };

    const chart = createChart(
      document.getElementById('thirdContainer'),
      chartOptions,
    );

    const areaSeries = chart.addAreaSeries({
      lineColor: '#2962FF',
      topColor: '#2962FF',
      bottomColor: 'rgba(41, 98, 255, 0.28)',
    });
    areaSeries.setData([
      { time: '2018-12-22', value: 32.51 },
      { time: '2018-12-23', value: 31.11 },
      { time: '2018-12-24', value: 27.02 },
      { time: '2018-12-25', value: 27.32 },
      { time: '2018-12-26', value: 25.17 },
      { time: '2018-12-27', value: 28.89 },
      { time: '2018-12-28', value: 25.46 },
      { time: '2018-12-29', value: 23.92 },
      { time: '2018-12-30', value: 22.68 },
      { time: '2018-12-31', value: 22.67 },
    ]);

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a',
      downColor: '#ef5350',
      borderVisible: false,
      wickUpColor: '#26a69a',
      wickDownColor: '#ef5350',
    });
    candlestickSeries.setData([
      {
        time: '2018-12-22',
        open: 75.16,
        high: 82.84,
        low: 36.16,
        close: 45.72,
      },
      { time: '2018-12-23', open: 45.12, high: 53.9, low: 45.12, close: 48.09 },
      {
        time: '2018-12-24',
        open: 60.71,
        high: 60.71,
        low: 53.39,
        close: 59.29,
      },
      { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.5 },
      {
        time: '2018-12-26',
        open: 67.71,
        high: 105.85,
        low: 66.67,
        close: 91.04,
      },
      { time: '2018-12-27', open: 91.04, high: 121.4, low: 82.7, close: 111.4 },
      {
        time: '2018-12-28',
        open: 111.51,
        high: 142.83,
        low: 103.34,
        close: 131.25,
      },
      {
        time: '2018-12-29',
        open: 131.33,
        high: 151.17,
        low: 77.68,
        close: 96.43,
      },
      {
        time: '2018-12-30',
        open: 106.33,
        high: 110.2,
        low: 90.39,
        close: 98.1,
      },
      {
        time: '2018-12-31',
        open: 109.87,
        high: 114.69,
        low: 85.66,
        close: 111.26,
      },
    ]);

    const horizontalLine1 = chart.addLineSeries({
      price: 97, // Adjust the price level as needed
      color: 'red',
      lineWidth: 2,
      lineStyle: 0,
      lineType: 0,
      axisLabelVisible: true,
      label: 'Support Level',
    });

    const horizontalLine2 = chart.addLineSeries({
      price: 140, // Adjust the price level as needed
      color: 'green',
      lineWidth: 2,
      lineStyle: 0,
      lineType: 0,
      axisLabelVisible: true,
      label: 'Resistance Level',
    });

    // Set the data for the horizontal lines (optional)
    horizontalLine1.setData([{ time: '2018-12-22', value: 95 }]);

    horizontalLine2.setData([{ time: '2018-12-22', value: 140 }]);
    horizontalLine1.update({ time: '2018-12-22', value: 97 });

    let dragging = false;
    let dragIndex = null;
    let priceLines = [horizontalLine1, horizontalLine2];

    function handleMouseMove(event) {
      if (!dragging || dragIndex === null) return;

      const rect = document
        .getElementById('thirdContainer')
        .getBoundingClientRect();
      const price = candlestickSeries.coordinateToPrice(
        event.clientY - rect.top,
      );

      priceLines[dragIndex].update({ time: '2018-12-22', value: price });

      priceLines[dragIndex].applyOptions({
        price: price,
      });
    }

    function handleMouseDown(event) {
      const rect = document
        .getElementById('thirdContainer')
        .getBoundingClientRect();
      const price = candlestickSeries.coordinateToPrice(
        event.clientY - rect.top,
      );

      priceLines.forEach((priceLine, index) => {
        // console.log(priceLine.options());
        const priceLinePrice = parseFloat(priceLine.options().price.toFixed(5));
        const roundedPrice = parseFloat(price.toFixed(5));

        // Change 0.01 to the value that fits best. It is used to select the closest priceLine to the cursor
        if (Math.abs(roundedPrice - priceLinePrice) < 0.01 * priceLinePrice) {
          dragging = true;
          dragIndex = index;
          chart.applyOptions({
            handleScroll: false,
            handleScale: false,
          });
        }
      });
    }

    function handleMouseUp() {
      if (dragIndex !== null) {
        alert(
          `Price line ${dragIndex + 1} moved to: ` +
            priceLines[dragIndex].options().price.toFixed(5),
        );
      }

      dragging = false;
      dragIndex = null;
      chart.applyOptions({
        handleScroll: true,
        handleScale: true,
      });
    }

    document
      .getElementById('thirdContainer')
      .addEventListener('mousemove', handleMouseMove);
    document
      .getElementById('thirdContainer')
      .addEventListener('mousedown', handleMouseDown);
    document
      .getElementById('thirdContainer')
      .addEventListener('mouseup', handleMouseUp);

    // setTimeout(() => {
    //   areaSeries.update({ time: '2019-01-01', value: 20 });
    //   candlestickSeries.update({
    //     time: '2019-01-01',
    //     open: 112,
    //     high: 112,
    //     low: 100,
    //     close: 101,
    //   });
    // }, 3000);

    chart.timeScale().fitContent();
  };

  useEffect(() => {
    createChartOnce();
  }, []);

  return (
    <div>
      <div className='h-[80vh] w-full' id='thirdContainer' />
    </div>
  );
}

export default App;
