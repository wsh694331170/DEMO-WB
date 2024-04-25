import React, { useEffect, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { DatasetComponent, DataZoomComponent, GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent, VisualMapComponent } from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';
import './Echarts.css';
import { Button } from 'antd';

// 注册echarts的组件和功能
echarts.use([
  VisualMapComponent,
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  LineChart,
  BarChart,
  UniversalTransition,
  SVGRenderer,
]);

const MyChartInner = (
  { option, width, height = false, onClick },
  ref
) => {
  const cRef = useRef(null);
  const cInstance = useRef();
  // 初始化注册组件，监听 cRef 和 option 变化
  useEffect(() => {
    if (cRef.current) {
      // 校验 Dom 节点上是否已经挂载了 ECharts 实例，只有未挂载时才初始化
      cInstance.current = echarts.getInstanceByDom(cRef.current);
      if (!cInstance.current) {
        cInstance.current = echarts.init(cRef.current, undefined, {
          renderer: 'svg',
        });
        cInstance.current.on('click', (event) => {
          const ec = event;
          if (ec && onClick) onClick(ec);
        });
      }
      // 设置配置项
      if (option) cInstance.current?.setOption(option);
    }
  }, [cRef, option]);
  // 监听窗口大小变化重绘
  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [option]);
  // 监听高度变化
  useLayoutEffect(() => {
    resize();
  }, [width, height]);
  // 重新适配大小并开启过渡动画
  const resize = () => {
    cInstance.current?.resize({
      animation: { duration: 300 }
    });
  }
  // 获取实例
  const instance = () => {
    return cInstance.current;
  }
  // 对父组件暴露的方法
  useImperativeHandle(ref, () => ({
    instance
  }));
  return (
      <div ref={cRef} className='echarts' />
  );
};
const LineChartComp = React.forwardRef(MyChartInner);
export default LineChartComp;
