import React, {Component} from 'react';
import {connect} from 'react-redux';

import { getDataList } from '../Actions/ListAction';
import { fetchPostsIfNeeded } from '../Actions/FetchAction';

class List extends Component {
	componentDidMount() {
		this.props.dispatch(fetchPostsIfNeeded(getDataList, './mock/datalist.json'))
	}
	render() {
		const { dispatch, listReducer} = this.props;
		let arr = listReducer.arr || [1, 2, 3, 4, 5];
		console.log(listReducer)
		return  <div>
					{
						arr.map((item, index)=>{
							return <p key={index}>{item}</p>
						})
					}
				</div>
	}
}

// 基于全局 state ，哪些是我们想注入的 props ?
// 注意：使用 https://github.com/reactjs/reselect 效果更佳。
function select(state) {
  console.log(state)
  return {
    listReducer: state.ListReducer,
  };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(List);