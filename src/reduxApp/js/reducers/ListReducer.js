import { GET_DATA_LIST } from '../Actions/ListAction';
import { RECEIVE_POSTS} from "../Actions/FetchAction";

export function ListReducer(state = {}, action) {
  switch (action.type) {
    case GET_DATA_LIST:
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