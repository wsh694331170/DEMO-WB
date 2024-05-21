import { Button, InputNumber, Input, Card, Flex, Timeline } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useState, useRef, useCallback } from "react";
import { saveAs } from "file-saver";
import * as htmlToImage from "html-to-image";
import { nanoid } from "nanoid";
import { MyELine } from "./components/ELine.jsx";
import HexToDecimalConverter from "./components/HexToDecimalConverter.jsx";
import {
  calculateImpedance,
  createTimeNodes,
  mergeArraysToData,
} from "./utils/index.js";
import "./App.css";

const { TextArea } = Input;
const { Meta } = Card;
function App() {
  const [UR, setUR] = useState(60);
  const [RS, setRS] = useState(500);
  const [second, setSecond] = useState(2);
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
    setRS(parseFloat(value) || 500);
  }, []);
  const changeUR = useCallback((value) => {
    setUR(parseFloat(value) || 60);
  }, []);
  const changeSecond = useCallback((value) => {
    setSecond(value || 2);
  }, []);

  const successTranfer = useCallback((value) => {
    setUA(value);
  }, []);
  const handleCalculateImpedance = useCallback(async () => {
    const zx = UA.map((ua) => {
      return calculateImpedance(ua, UR, RS);
    });
    setZX(zx);
    console.log(zx);
    const timers = createTimeNodes(zx.length, second);
    const lines = mergeArraysToData(timers, zx);
    setLineData(lines); // 更新折线图数据
  }, [UA, second, UR, RS]);
  // 创建并下载文本文件的函数
  const downloadZXData = () => {
    // 将数组转换为字符串，使用英文逗号分隔
    const numberString = ZX.join(",");
    // 创建一个 Blob 对象
    const blob = new Blob([numberString], { type: "text/plain" });
    // 创建一个 URL 对象
    const url = URL.createObjectURL(blob);
    // 创建一个 a 标签
    const a = document.createElement("a");
    // 设置 a 标签的 href 属性为 URL 对象
    a.href = url;
    // 设置下载的文件名
    a.download = "numbers.txt";
    // 模拟点击 a 标签，触发下载
    a.click();
    // 释放 URL 对象
    URL.revokeObjectURL(url);
  };
  // 创建并下载文本文件的函数
  const downloadLineData = () => {
    // 将数组转换为字符串，格式为 [time,value]，[time,value]
    const formattedString = lineData
      .map((item) => `[${item.time},${item.zx}]`)
      .join(",");
    // 创建一个 Blob 对象
    const blob = new Blob([formattedString], { type: "text/plain" });
    // 创建一个 URL 对象
    const url = URL.createObjectURL(blob);
    // 创建一个 a 标签
    const a = document.createElement("a");
    // 设置 a 标签的 href 属性为 URL 对象
    a.href = url;
    // 设置下载的文件名
    a.download = "data.txt";
    // 模拟点击 a 标签，触发下载
    a.click();
    // 释放 URL 对象
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <Flex gap={24} horizontal wrap>
        <Card
          title="时间-阻抗变化趋势图"
          hoverable
          style={{ flex: "0 0 80%" }}
          ref={lineRef}
        >
          <Meta description={`UR：${UR} V`} />
          <Meta description={`RS：${RS} Ω`} />
          <Meta description={`数据时长：${second} S`} />
          <MyELine data={lineData} />
        </Card>
        <Card title="预填数据" hoverable style={{ flex: 1 }} ref={lineRef}>
          <Flex gap={24} vertical>
            <div>
              <span>UR：</span>
              <InputNumber
                addonAfter="V"
                step="0.000001"
                onChange={changeUR}
                stringMode
                value={UR}
              />
            </div>
            <div>
              <span>RS：</span>
              <InputNumber
                addonAfter="Ω"
                step="0.000001"
                onChange={changeRS}
                stringMode
                value={RS}
              />
            </div>
            <div>
              <span>数据时长：</span>
              <InputNumber
                addonAfter="S"
                step="1"
                min={1}
                onChange={changeSecond}
                value={second}
              />
            </div>
          </Flex>
        </Card>
        <Card
          title="UA串口值"
          style={{ flex: "0 0 60%" }}
          hoverable
          ref={lineRef}
        >
          <TextArea
            readOnly
            rows={3}
            value={UA}
            style={{ resize: "none" }}
            className="textarea-custom"
          />
        </Card>
        <Card style={{ flex: 1 }} hoverable ref={lineRef}>
          <Flex gap={24} horizontal wrap justify="flex-start">
            <div style={{flex: '0 0 100%', display: 'flex'}}>
            <Timeline
              mode="left"
              items={[
                {
                  label: "步骤一",
                  children: (
                    <HexToDecimalConverter successTranfer={successTranfer} />
                  ),
                },
                {
                  label: "步骤二",
                  children: (
                    <Button
                      type="primary"
                      onClick={handleCalculateImpedance}
                      className="downloadBtn"
                    >
                      计算阻抗
                    </Button>
                  ),
                },
              ]}
            />
            </div>
            <Button
              icon={<DownloadOutlined />}
              onClick={downloadZXData}
              className="downloadBtn"
            >
              保存阻抗数据
            </Button>
            <Button
              icon={<DownloadOutlined />}
              onClick={downloadLineData}
              className="downloadBtn"
            >
              保存图表数据
            </Button>
            <Button icon={<DownloadOutlined />} onClick={downloadDivAsImage}>
              保存图表为图片
            </Button>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
}

export default App;
