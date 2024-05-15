// 计算相位角 θ
function calculatePhaseAngle(UZ, UR) {
  // 根据公式 θ = arccos((|Ui|^2 - |UR|^2 - |UZ|^2) / (2 * |UR| * |UZ|)) 计算相位角
  const UiSquared = Math.pow((UZ+UR), 2);
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
    console.error('无法计算相位角，因为acos的参数超出了定义域');
  }
}

// 阻抗计算ZX
export function calculateImpedance(UZ, UR, RS) {
  // 根据公式 Zx = RS * UZ/UR * θ 计算阻抗
  return RS * UZ / UR * calculatePhaseAngle(UR, UZ)
}

export function createTimeNodes(length, totalSeconds) {
  // 创建一个空数组来存储时间节点
  let timeNodes = new Array(length);

  // 计算每个时间节点的时间增量
  let increment = totalSeconds / (length - 1);

  // 填充数组，每个元素都是时间节点
  for (let i = 0; i < length; i++) {
      timeNodes[i] = increment * i;
  }

  return timeNodes;
}

export function mergeArraysToData(timeArray, zxArray) {
  // 检查数组长度是否匹配
  if (timeArray.length !== zxArray.length) {
      throw new Error('数组长度必须匹配');
  }

  // 创建一个空数组来存储结果
  let data = [];

  // 遍历数组，合并时间和zx到对象中
  for (let i = 0; i < timeArray.length; i++) {
      data.push({
          time: timeArray[i].toString(), // 将时间转换为字符串
          zx: zxArray[i]
      });
  }

  return data;
}