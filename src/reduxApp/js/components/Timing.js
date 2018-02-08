import React , {Component} from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeLightTiming } from '../Actions/TimingAction';
import { fetchPostsIfNeeded } from '../Actions/FetchAction';

import {PickerTime} from './PickerTime';

import {Router, Route, Link} from 'react-router-dom';

class Timing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    componentDidMount() {
        this.props.dispatch(fetchPostsIfNeeded(changeLightTiming, './timing.json'))
    }
    setTime(){
        this.setState({
            hours:parseInt(arguments[0]),
            minutes:parseInt(arguments[1])
        })
    }
    changeDay(e) { 
        e.preventDefault();
        e.stopPropagation();
        if(this.state.daySelect == "none") {
            this.setState({
                daySelect:"block"
            })  
        } else {
            this.setState({
                daySelect:"none"
            }) 
        }           
    }
    selectWork(e) {
        this.setState({
            work:"selected",
            week:"",
            repeat:"工作日",
        }) 
        console.log(this.state.work)    
    }
    selectWeek(e) {
        this.setState({
            work:"",
            week:"selected",
            repeat:"周末",
        })
    }
    setTiming() {
        if(this.state.music=="timing-setting-music-right-on"){
            this.setState({
                music:'timing-setting-music-right-off'
            })
        }else{
            this.setState({
                music:'timing-setting-music-right-on'
            })
        }
    }
    setLight() {
        if(this.state.light=="timing-setting-light-right-on"){
            this.setState({
                light:'timing-setting-light-right-off'
            })
        }else{
            this.setState({
                light:'timing-setting-light-right-on'
            })
        }
    }
    submitClock() {
        console.log(this.state)
        let id = this.props.location.query.id?0:1;
        if(id==1) {
            let repeat = this.state.repeat=="周末"?192:126;
            let light = this.state.light=="timing-setting-light-right-on"?1:0;
            let later = this.state.later=="timing-remind-right-on"?1:0;
            let hours = this.state.hours;
            let minutes = this.state.minutes;
            let dataJson = {
                id:1,
                alarmClock1Bell:later,
                alarmClock1Hour:hours,
                alarmClock1Light:this.state.alarmClock1Light,
                alarmClock1LightMode:light,
                alarmClock1Minute:minutes,
                alarmClock1Nap:later,
                alarmClock1Repeat:repeat,
                alarmClock1Ring:this.state.alarmClock1Ring,
                alarmClock1Switch:this.state.alarmClock1Switch,
                alarmClock2Bell:this.state.alarmClock2Bell,
                alarmClock2Hour:this.state.alarmClock2Hour,
                alarmClock2Light:this.state.alarmClock2Light,
                alarmClock2LightMode:this.state.alarmClock2LightMode,
                alarmClock2Minute:this.state.alarmClock2Minute,
                alarmClock2Nap:this.state.alarmClock2Nap,
                alarmClock2Repeat:this.state.alarmClock2Repeat,
                alarmClock2Ring:this.state.alarmClock2Ring,
                alarmClock2Switch:this.state.alarmClock2Switch,
                controlNumber:0x03
            }
            Actions.saveClock(dataJson)
            console.log(dataJson)
        }else {
            //console.log(0x40|0x80) 周末 192;
            //console.log(0x02|0x04|0x08|0x010|0x20) 工作日 62;
            let repeat = this.state.repeat=="周末"?192:62;
            let light = this.state.light=="timing-setting-light-right-on"?1:0;
            let later = this.state.later=="timing-remind-right-on"?1:0;
            let hours = this.state.hours;
            let minutes = this.state.minutes;
            let dataJson = {
                id:0,
                alarmClock1Bell:this.state.alarmClock1Bell,
                alarmClock1Hour:this.state.alarmClock1Hour,
                alarmClock1Light:100,
                alarmClock1LightMode:this.state.alarmClock1LightMode,
                alarmClock1Minute:this.state.alarmClock1Minute,
                alarmClock1Nap:this.state.alarmClock1Nap,
                alarmClock1Repeat:this.state.alarmClock1Repeat,
                alarmClock1Ring:this.state.alarmClock1Ring,
                alarmClock1Switch:this.state.alarmClock1Switch,
                alarmClock2Bell:later,
                alarmClock2Hour:hours,
                alarmClock2Light:100,
                alarmClock2LightMode:light,
                alarmClock2Minute:minutes,
                alarmClock2Nap:later,
                alarmClock2Repeat:repeat,
                alarmClock2Ring:this.state.alarmClock2Ring,
                alarmClock2Switch:this.state.alarmClock2Switch,
                controlNumber:0x03
            }
            Actions.saveClock(dataJson)
        }
    }
    render() {
        const { dispatch, visibleTodos} = this.props;
        return  <div className="timing" >
                    <div className="timing-select">
                        <div className="timing-space"></div>
                        <PickerTime submitClock={this.setTime.bind(this)} hoursIndex={10} minIndex={10} state={7}/>
                    </div>
                    <div className="timing-setting">
                        <div className="timing-setting-list timing-setting-day" onTouchStart={this.changeDay.bind(this)}>
                            <span>重复</span>
                            <i className="timing-setting-day-right">{visibleTodos.repeat}</i>
                        </div>
                        <div className="timing-setting-music timing-setting-list">
                                <span>铃声</span>
                                <i className="timing-setting-day-right">欢快跳跃</i>
                        </div>  
                        <div className="timing-light-remind timing-setting-list">
                            <span>灯光唤醒</span>
                            <i className={this.state.light} onTouchStart={this.setLight.bind(this)}></i>
                        </div>
                        <div className="timing-remind timing-setting-list">
                            <span>铃声唤醒</span>
                            <i ></i>
                        </div>
                    </div>
                    <div className="timing-submit" onTouchEnd={this.submitClock.bind(this)}><span >{this.state.btnCont}</span></div>
                    <div  className="select-day" style={{display:this.state.daySelect}} onTouchStart={this.changeDay.bind(this)}>
                        <div className="select-list">
                            <div id="workDays" onTouchStart={this.selectWork.bind(this)}>
                                <span>工作日</span>
                                <i className={this.state.work}></i>
                            </div>
                            <div id="week" onTouchStart={this.selectWeek.bind(this)}>
                                <span>周末</span>
                                <i className={this.state.week} ></i>
                            </div>
                        </div>    
                    </div>

                </div>;
    }
}

// 基于全局 state ，哪些是我们想注入的 props ?
// 注意：使用 https://github.com/reactjs/reselect 效果更佳。
function select(state) {
  console.log(state)
  return {
    visibleTodos: state.TimingReducer,
  };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(Timing);


