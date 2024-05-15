import { Button, InputNumber, Input } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useState, useRef, useCallback } from "react";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";
import { nanoid } from "nanoid";
// import { MyLine } from "./components/Line.jsx";
import { MyELine } from "./components/ELine.jsx";
import HexToDecimalConverter from "./components/HexToDecimalConverter.jsx";
import {
  calculateImpedance,
  createTimeNodes,
  mergeArraysToData,
} from "./utils/index.js";
import "./App.css";

const { TextArea } = Input;
function App() {
  const [UR, setUR] = useState(60);
  const [RS, setRS] = useState(500);
  const [UA, setUA] = useState([]);
  const [ZX, setZX] = useState([]);
  const [lineData, setLineData] = useState([]);
  const lineRef = useRef();

  const downloadDivAsImage = useCallback(async () => {
    // 获取<div>元素
    const divElement = lineRef.current;

    if (!divElement) {
      console.error("未找到<div>元素！");
      return;
    }

    try {
      // 将<div>元素转换为图像数据URL
      const imgDataURL = await htmlToImage.toPng(divElement);
      // 将图像数据URL保存为文件
      saveAs(imgDataURL, `image${nanoid()}.png`);
    } catch (error) {
      console.error("转换<div>为图像时出错：", error);
    }
  }, []);

  const changeRS = useCallback((value) => {
    setRS(parseFloat(value));
  }, []);
  const changeUR = useCallback((value) => {
    setUR(parseFloat(value));
  }, []);
  const successTranfer = useCallback((value) => {
    setUA(value);
  }, []);
  const handleCalculateImpedance = useCallback(async () => {
    const zx = UA.map((ua) => {
      return calculateImpedance(ua, UR, RS);
    });
    setZX(zx)
    console.log(zx)
    const timers = createTimeNodes(zx.length, 2);
    const lines = mergeArraysToData(timers, zx);
    setLineData(lines); // 更新折线图数据
    // let index = 0;
    // const batchSize = 100; // 每批处理 100 项
    // const totalItems = UA.length;
    // let localZX = []; // 本地存储 ZX 数据，用于逐步更新

    // const processBatch = () => {
    //   // 本批次的 ZX 计算
    //   const nextBatchZX = UA.slice(index, index + batchSize).map((ua) =>
    //     calculateImpedance(ua, UR, RS)
    //   );
    //   localZX = [...localZX, ...nextBatchZX];
    //   setZX(localZX); // 更新 ZX 状态

    //   // 更新进度
    //   index += batchSize;

    //   // 创建折线图数据
    //   const timers = createTimeNodes(localZX.length, 2);
    //   const lines = mergeArraysToData(timers, localZX);
    //   setLineData(lines); // 更新折线图数据

    //   if (index < totalItems) {
    //     requestAnimationFrame(processBatch);
    //   } else {
    //     console.log("处理完成");
    //   }
    // };

    // setZX([]); // 清空 ZX 数据
    // setLineData([]); // 清空折线图数据
    // processBatch(); // 开始处理
  }, [UA, UR, RS]);
  // 创建并下载文本文件的函数
  const downloadZXData = () => {
    // 将数组转换为字符串，使用英文逗号分隔
    const numberString = ZX.join(',');
    // 创建一个 Blob 对象
    const blob = new Blob([numberString], { type: 'text/plain' });
    // 创建一个 URL 对象
    const url = URL.createObjectURL(blob);
    // 创建一个 a 标签
    const a = document.createElement('a');
    // 设置 a 标签的 href 属性为 URL 对象
    a.href = url;
    // 设置下载的文件名
    a.download = 'numbers.txt';
    // 模拟点击 a 标签，触发下载
    a.click();
    // 释放 URL 对象
    URL.revokeObjectURL(url);
};
// 创建并下载文本文件的函数
const downloadLineData = () => {
  // 将数组转换为字符串，格式为 [time,value]，[time,value]
  const formattedString = lineData.map(item => `[${item.time},${item.zx}]`).join(',');
  // 创建一个 Blob 对象
  const blob = new Blob([formattedString], { type: 'text/plain' });
  // 创建一个 URL 对象
  const url = URL.createObjectURL(blob);
  // 创建一个 a 标签
  const a = document.createElement('a');
  // 设置 a 标签的 href 属性为 URL 对象
  a.href = url;
  // 设置下载的文件名
  a.download = 'data.txt';
  // 模拟点击 a 标签，触发下载
  a.click();
  // 释放 URL 对象
  URL.revokeObjectURL(url);
};

  return (
    <div className="container">
      <div className="leftContainer">
        <div className="LineContainer" ref={lineRef}>
          {/* <MyLine data={lineData} /> */}
          <MyELine data={lineData} />
        </div>
        <div className="dataContent">
          <div className="UAContent">
            <span style={{ width: 100 }}>UA串口值：</span>
            <TextArea readOnly rows={5} value={UA} />
          </div>
        </div>
      </div>
      <div className="rightContent">
        <div className="downloadBtn">
          <span>UR：</span>
          <InputNumber
            style={{ width: 200 }}
            step="0.000001"
            onChange={changeUR}
            stringMode
            value={UR}
          />
        </div>
        <div className="downloadBtn">
          <span>RS：</span>
          <InputNumber
            style={{ width: 200 }}
            step="0.000001"
            onChange={changeRS}
            stringMode
            value={RS}
          />
        </div>
        <div className="downloadBtn">
          <HexToDecimalConverter successTranfer={successTranfer} />
        </div>
        <Button
          type="primary"
          onClick={handleCalculateImpedance}
          className="downloadBtn"
        >
          计算阻抗
        </Button>
        <Button icon={<DownloadOutlined />} onClick={downloadZXData} className="downloadBtn">
          保存阻抗数据
        </Button>
        <Button icon={<DownloadOutlined />} onClick={downloadLineData} className="downloadBtn">
          保存图表数据
        </Button>
        <Button icon={<DownloadOutlined />} onClick={downloadDivAsImage}>
          保存图表为图片
        </Button>
      </div>
    </div>
  );
}

export default App;
