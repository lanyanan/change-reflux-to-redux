import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import '../css/style.css';
import todoApp from './reducers';
import Home from './Home';
// import {Lamp} from './Lamp';
// import {Reseting} from './Reseting';
// import {Music} from './Music';
// import {List} from './list';
// import {Timing} from './Timing';
// import {Toast} from './toast';
// import {Switch} from './Switch';
import {Router, Route, BrowserRouter, HashRouter} from 'react-router-dom'

let store = createStore(todoApp);

//等DOM加载完成
document.addEventListener('DOMContentLoaded', ()=>{
	render((   
		<Provider store={store}>
	        <div className="app" >
	        		<HashRouter>
		        		<div style={{width:'100%',height:'100%'}}>
		        		<Route exact path="/home" component={Home} />
		        		</div>
	        		</HashRouter>
		        </div>
	  	</Provider>		
	), document.getElementById('ROOT'))
});
