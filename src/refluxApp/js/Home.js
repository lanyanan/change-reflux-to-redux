import {BaseComponent} from '../../../public/static/BaseComponent.js';
import {Actions} from './Actions.js';
import {Store} from './Store.js';

export default class Home extends BaseComponent {
	constructor(props) {
        super(props);
        this.state = {
        	index:0,
        	num:2
        };
        this.listenStore(Store)
    }
    close() {
    	Actions.close(this.state.index);
    	this.props.callback(10)
    }
	render() {
		return <div onClick={this.close.bind(this)}>{this.state.num}</div>
	}
}