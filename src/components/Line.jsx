import { Line } from '@ant-design/plots';
import React from 'react';

export const MyLine = (props) => {
  const config = {
    data: props.data,
    xField: 'time',
    yField: 'zx',
    point: {
      shapeField: 'square',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
  };
  return <Line {...config} />;
};
