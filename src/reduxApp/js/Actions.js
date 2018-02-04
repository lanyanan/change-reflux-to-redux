'use strict';
/**
 * 公共Actions，所有action均需统一在此文件登记，以防重名造成store冲突
 * @type {actions}
 */


export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

//改变开关只能灯
export const CHANGE_LIGHT_SWITCH = 'CHANGE_LIGHT_SWITCH';

//点击圆弧改变轨迹
export const CHANGE_LIGHT_LIGHTNESS = 'CHANGE_LIGHT_LIGHTNESS';

//改变灯灯颜色
export const CHANGE_LIGHT_COLOR = 'CHANGE_LIGHT_COLOR';


/*
 * 其它的常量
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};

/*
 * action 创建函数
 */

export function addTodo(text) {
  return { type: ADD_TODO, text }
}

export function completeTodo(index) {
  return { type: COMPLETE_TODO, index }
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

export function changeSwitchState(lightSwitch) {
  return { type: CHANGE_LIGHT_SWITCH, lightSwitch }
}

export function changeLightness(lightness) {
  return { type: CHANGE_LIGHT_LIGHTNESS, lightness }
}

export function changeColor(R, G, B, A, i) {
  return { type: CHANGE_LIGHT_COLOR, R, G, B, A, i}
}





