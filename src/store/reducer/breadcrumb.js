// 常量
import { ADD_BREADCRUMB, CHANGE_BREADCRUMB } from '../constance';
import { initialState } from "../state";
// 定义reducer函数：纯函数
function breadcrumbReducer(state = initialState, action) {
  if (JSON.stringify(initialState) == JSON.stringify(action.data)) return state
  switch (action.type) {
    case ADD_BREADCRUMB:
      return action.data;
    case CHANGE_BREADCRUMB:
      return { ...state };
    default:
      return state;
  }
}
export default breadcrumbReducer
