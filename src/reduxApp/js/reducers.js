'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import { combineReducers } from 'redux'
import { ADD_TODO, COMPLETE_TODO,CHANGE_LIGHT_SWITCH,
  SET_VISIBILITY_FILTER, VisibilityFilters,CHANGE_LIGHT_LIGHTNESS, 
  CHANGE_LIGHT_COLOR, SELECT_SUBREDDIT, INVALIDATE_SUBREDDIT ,
  REQUEST_POSTS, RECEIVE_POSTS } from './actions'
const { SHOW_ALL } = VisibilityFilters

let dataTree = {
  lightSwitchState: false,
  lightness: 0,
  R:0,
  G:0,
  B:0,
  A:1,
  i:0,
  lightingPatternNumber:0
}

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}
function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}
function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT :
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsBySubreddit(state = { }, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT :
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}
function todos(state = dataTree, action) {
  switch (action.type) {
    // case ADD_TODO:
    //   return [
    //   	...state,
    //     {
    //       text: action.text,
    //       completed: false
    //     }
    //   ]
    // case COMPLETE_TODO:
    //   return [
    //     ...state.slice(0, action.index),
    //     Object.assign({}, state[action.index], {
    //       completed: true
    //     }),
    //     ...state.slice(action.index + 1)
    //   ]
    case CHANGE_LIGHT_SWITCH://改变智能灯的开关
      return Object.assign({}, state, {lightSwitchState: action.lightSwitch});

    case CHANGE_LIGHT_LIGHTNESS://改变圆弧轨迹调整灯的亮度
      return Object.assign({}, state, {lightness: action.lightness});

    case CHANGE_LIGHT_COLOR://改变灯灯颜色
      return Object.assign({}, state, {
        R: action.R,
        G: action.G,
        B: action.B,
        A: action.A,
        i: action.i,
        lightingPatternNumber: action.lightingPatternNumber
      });
    case RECEIVE_POSTS://请求数据
      return Object.assign({}, state, action.posts.msg);
    default:
      return state
  }
}

const todoApp = combineReducers({
  visibilityFilter,
  todos,
  selectedSubreddit,
  postsBySubreddit
})

export default todoApp