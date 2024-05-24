import ReactEcharts from "echarts-for-react";
import 'echarts-gl';

export const MyELine = (props) => {
  const data = props.data || []
  const options = {
    tooltip: {
      trigger: "axis",
      formatter: (params) => {
        const time = params[0].name
        const zx = params[0].data;
        return `阻抗: ${zx}<br/>时间: ${time}`;
      },
    },
    xAxis: {
      type: "category",
      data: data.map((item) => item.time),
      name: '时间/s',
      nameLocation: 'end', // 在轴的末端显示名称
      nameTextStyle: {
        fontSize: 12,
        padding: [0, 0, 10, 0], // 调整名称的间距
      },
    },
    yAxis: {
      type: "value",
      name: '阻抗/Ω',
      nameLocation: 'end', // 在轴的末端显示名称
      nameTextStyle: {
        fontSize: 12,
        padding: [0, 10, 0, 0], // 调整名称的间距
      },
    },
    dataZoom: [
      {
        type: 'slider', // 使用滑动条
        start: 0, // 默认视图的起始点
        end: 100, // 默认视图的结束点
        xAxisIndex: [0] // 控制第一个 x 轴
      },
      {
        type: 'inside', // 支持鼠标滚轮缩放
        start: 0,
        end: 100,
        xAxisIndex: [0] // 控制第一个 x 轴
      }
    ],
    series: [
      {
        name: "zx",
        type: "line",
        data: data.map((item) => item.zx),
        smooth: true,
        renderMode: 'gl' // 启用 WebGL 渲染
      },
    ],
  };
  return <ReactEcharts option={options}/>;
};
