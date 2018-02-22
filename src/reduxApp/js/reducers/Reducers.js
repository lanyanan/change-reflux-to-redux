'use strict';
/**
 * 公共store，建议所有路由下reducer都在此文件进行注册合并
 * @type {store}
 */

import { combineReducers } from 'redux'
import { TimingReducer } from "./TimingReducer";
import { HomeReducer } from "./HomeReducer";
import { postsBySubreddit } from "./FetchReducer";
import { posts } from "./FetchReducer";
import { ListReducer } from "./ListReducer";

const Store = combineReducers({
  posts,               //请求数据的异常在这里处理
  postsBySubreddit,    //注册当前正在进行的异步数据请求
  TimingReducer,       //闹铃设置时间的路由页面数据
  HomeReducer ,        //星月等首页时间的路由页面数据
  ListReducer ,        //列表数据
  
})

export default Store
