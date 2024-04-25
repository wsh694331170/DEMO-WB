function generateWaveData(Umax, Imax, phi, steps) {
  const dataPoints = [];
  const omega = 2 * Math.PI; // 假设频率为 1 Hz，即周期为 1 秒

  for (let step = 0; step <= steps; step++) {
    const t = (step / steps) * 2 * Math.PI; // 从 0 到 2π
    const Ut = Umax * Math.sin(omega * t + phi); // 计算时间 t 时的电压值
    const It = Imax * Math.sin(omega * t); // 计算时间 t 时的电流值
    dataPoints.push({ t, Ut, It });
  }

  return dataPoints;
}

function calculateImpedanceFromPeakValues(Umax, Imax) {
  return Umax / Imax;
}

function calculatePhaseAngleFromPeakValues(Umax, Imax, phi) {
  // 直接返回传入的相位差 phi，因为我们假定电流没有相位差（参考）
  return phi;
}

// 定义最大电压和电流以及相位差
const Umax = 10; // 电压峰值
const Imax = 2;  // 电流峰值
const phi = Math.PI / 4; // 相位差，比如 45 度（π/4 弧度）

// 生成波形数据
const steps = 100; // 数据点的数量
const waveData = generateWaveData(Umax, Imax, phi, steps);

// 计算阻抗和相位角
const Zx = calculateImpedanceFromPeakValues(Umax, Imax);
const theta = calculatePhaseAngleFromPeakValues(Umax, Imax, phi);

console.log('阻抗 Zx:', Zx, '欧姆');
console.log('相位角 θ:', theta, '弧度');

// 打印波形数据点
console.log('波形数据点:', waveData);

export const mockData = waveData;
