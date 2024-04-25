function calculateImpedance(Uz, Is) {
  // 根据公式 Zx = Uz / Is 计算阻抗
  return Uz / Is;
}

function calculatePhaseAngle(Ui, UR, UZ) {
  // 根据公式 θ = arccos((|Ui|^2 - |UR|^2 - |UZ|^2) / (2 * |UR| * |UZ|)) 计算相位角
  const UiSquared = Math.pow(Ui, 2);
  const URSquared = Math.pow(UR, 2);
  const UZSquared = Math.pow(UZ, 2);

  // 计算分子
  const numerator = UiSquared - URSquared - UZSquared;
  // 计算分母
  const denominator = 2 * UR * UZ;
  // 计算arccos的参数
  const acosParameter = numerator / denominator;

  // 使用Math.acos计算反余弦，并确保参数在-1到1的范围内
  if (acosParameter <= 1 && acosParameter >= -1) {
    return Math.acos(acosParameter);
  } else {
    throw new Error('无法计算相位角，因为acos的参数超出了定义域');
  }
}

// 示例用法：
const Zx = calculateImpedance(10, 2); // 假设Uz = 10V, Is = 2A
const theta = calculatePhaseAngle(5, 3, 4); // 假设Ui = 5V, UR = 3V, UZ = 4V

console.log('阻抗 Zx:', Zx);
console.log('相位角 θ:', theta);
