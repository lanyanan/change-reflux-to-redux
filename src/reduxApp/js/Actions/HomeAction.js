//改变开关只能灯
export const CHANGE_LIGHT_SWITCH = 'CHANGE_LIGHT_SWITCH';

//点击圆弧改变轨迹
export const CHANGE_LIGHT_LIGHTNESS = 'CHANGE_LIGHT_LIGHTNESS';

//改变灯灯颜色
export const CHANGE_LIGHT_COLOR = 'CHANGE_LIGHT_COLOR';




export function changeSwitchState(lightSwitch) {
  return { type: CHANGE_LIGHT_SWITCH, lightSwitch }
}

export function changeLightness(lightness) {
  return { type: CHANGE_LIGHT_LIGHTNESS, lightness }
}

export function changeColor(R, G, B, A, i, lightingPatternNumber) {
  return { type: CHANGE_LIGHT_COLOR, R, G, B, A, i, lightingPatternNumber}
}