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
  return <ReactEcharts option={options} style={{ height: '70vh', width: "80vw" }} />;
};
