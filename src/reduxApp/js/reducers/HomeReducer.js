import { CHANGE_LIGHT_SWITCH, CHANGE_LIGHT_LIGHTNESS, CHANGE_LIGHT_COLOR} from '../Actions/HomeAction';
import { RECEIVE_POSTS} from "../Actions/FetchAction";

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

export function HomeReducer(state = dataTree, action) {
  switch (action.type) {
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
    case RECEIVE_POSTS:
      return Object.assign({}, state, action.posts.msg, {
        isFetching: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}