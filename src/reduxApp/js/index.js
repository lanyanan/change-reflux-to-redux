import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux';
import Loadable from 'react-loadable';
import { Provider } from 'react-redux'
import '../css/style.css';
import Store from './reducers/reducers';
import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger'
//import Home from './Home';
import Loading from './components/loading';

const AsyncHome = Loadable({
  loader: () => import("./components/Home"),
  loading: Loading
});
// import {Lamp} from './Lamp';
// import {Reseting} from './Reseting';
// import {Music} from './Music';
// import {List} from './list';
// import {Timing} from './Timing';
// import {Toast} from './toast';
// import {Switch} from './Switch';
import {Router, Route, Switch, BrowserRouter, HashRouter} from 'react-router-dom'

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loggerMiddleware
)(createStore)

let store = createStoreWithMiddleware(Store)

//等DOM加载完成
//这种是hash值改变的
document.addEventListener('DOMContentLoaded', ()=>{
	render((   
		<Provider store={store}>
	        <HashRouter>
	        	<Switch>
		        	<Route exzact path="/home" component={AsyncHome} />
		        </Switch>
	        </HashRouter>
	  	</Provider>		
	), document.getElementById('ROOT'))
});


// 下面不需要加#的导航路由但是服务器需要改造 用的h5的api
// 当二级导航当刷新的时候会出现404
// 
// document.addEventListener('DOMContentLoaded', ()=>{
// 	render((   
// 		<Provider store={store}>
// 	        <BrowserRouter>
// 				<Switch>
// 					<Route path='/' component={Home} />
// 					<Route path='/app' component={App} />
// 				</Switch>
// 			<BrowserRouter>
// 	  	</Provider>		
// 	), document.getElementById('ROOT'))
// });
