import { Button } from 'antd';
import { useState, useRef } from 'react';
import { saveAs } from 'file-saver';
import * as htmlToImage from 'html-to-image'
import { nanoid } from 'nanoid'
import LineChartComp from './components/Echarts.jsx';
import { mockData } from './utils/mock.js';
import './Line.css';

console.log(mockData)

function func(x) {
  x /= 10;
  return Math.sin(x) * Math.cos(x * 2 + 1) * Math.sin(x * 3 + 2) * 50 + Math.random() * 10;
}
function generateData() {
  let data = [];
  for (let i = -200; i <= 200; i += 0.1) {
    data.push([i, func(i)]);
  }
  return data;
}

function App() {

  const [data, setData] = useState([]);
  const echartsRef = useRef();

  const handleClick = () => {
    console.log('handleClick')
    const newData = generateData();
    setData(newData);
  }

  const downloadDivAsImage = async () => {
    // 获取<div>元素
    const divElement = echartsRef.current.instance()._dom

    if (!divElement) {
      console.error('未找到<div>元素！');
      return;
    }

    try {
      // 将<div>元素转换为图像数据URL
      const imgDataURL = await htmlToImage.toPng(divElement);
      // 将图像数据URL保存为文件
      saveAs(imgDataURL, `image${nanoid()}.png`);
    } catch (error) {
      console.error('转换<div>为图像时出错：', error);
    }
  };

  const downloadData = () => {
    const dataString = data.map(point => point.join(', ')).join('\n');

    const blob = new Blob([dataString], { type: 'text/plain' });

    saveAs(blob, `point_data${nanoid()}.txt`);
  };

  const option = {
    animation: false,
    grid: {
      top: 40,
      left: 50,
      right: 40,
      bottom: 50
    },
    xAxis: {
      name: 'x',
      minorTick: {
        show: true
      },
      minorSplitLine: {
        show: true
      }
    },
    yAxis: {
      name: 'y',
      min: -100,
      max: 100,
      minorTick: {
        show: true
      },
      minorSplitLine: {
        show: true
      }
    },
    dataZoom: [
      {
        show: true,
        type: 'inside',
        filterMode: 'none',
        xAxisIndex: [0],
        startValue: -20,
        endValue: 20
      },
      {
        show: true,
        type: 'inside',
        filterMode: 'none',
        yAxisIndex: [0],
        startValue: -20,
        endValue: 20
      }
    ],
    series: [
      {
        type: 'line',
        showSymbol: false,
        clip: true,
        data,
      }
    ]
  };

  return (
    <div className='container'>
      <div className='content'>
        <div className='echartsContainer'>
          <LineChartComp option={option} ref={echartsRef} />
        </div>
        <div className='downloadContent'>
          <Button type="primary" onClick={downloadDivAsImage} className='downloadBtn'>下载为图片</Button>
          <Button type="primary" onClick={downloadData} className='downloadBtn'>下载数据</Button>
        </div>
      </div>
      <div className='opearteContent'>
        <Button type="primary" onClick={handleClick} className='downloadBtn'>模拟随机生成数据</Button>
      </div>
    </div>
  );
}

export default App;