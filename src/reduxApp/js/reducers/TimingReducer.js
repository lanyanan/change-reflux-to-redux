import { CHANGE_LIGHT_TIMING } from '../Actions/TimingAction';
import { RECEIVE_POSTS} from "../Actions/FetchAction";

export function TimingReducer(state = {}, action) {
  switch (action.type) {
    case CHANGE_LIGHT_TIMING:
      return action.obj
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