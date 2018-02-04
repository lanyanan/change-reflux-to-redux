import {Actions} from './Actions.js';
import {Store} from './Store.js';
import {BaseComponent} from '../../../public/static/BaseComponent.js';
import Home from './Home.js';
import Papa from './App.js';
import style from '../css/style.css';

import {Router, Route, BrowserRouter, HashRouter} from 'react-router-dom'

class App extends BaseComponent {
	open (index){
		console.log("hello"+index)
	}
	componentDidMount(){
		async function tell() {
			return "jsjjdk"
		};
		tell().then(
			r=>console.log(r),
			e=>console.log(e)
			)
		
	}
    render() {
        return  <div className="app" >
	        		<HashRouter>
		        		<div>
		        			<Route exact path="/" callback="this.open.bind(this)" component={Home}/>
		        			<Route exact path="/app" component={Papa}/>
		        		</div>
	        		</HashRouter>
		        </div>
    }
}


document.addEventListener('DOMContentLoaded', ()=>{
	ReactDOM.render((   
	<App/>		
	), document.getElementById('ROOT'))
});
