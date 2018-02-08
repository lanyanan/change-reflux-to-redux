import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeSwitchState, changeLightness, changeColor} from '../Actions/HomeAction';
import { fetchPostsIfNeeded } from '../Actions/FetchAction';
import {ColorPicker} from './colorPicker';


import {Router, Route, Link} from 'react-router-dom'

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            colorArray:['#ff7c7c', '#ffd376', '#a0e674', '#5be6bd', '#88a1fe'],
            colorPickerShow: false,
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchPostsIfNeeded(changeSwitchState, './data.json'))
    }
    close() {
        if(!this.props.visibleTodos.lightSwitchState) this.props.dispatch(changeSwitchState(true))
        if(this.props.visibleTodos.lightSwitchState) this.props.dispatch(changeSwitchState(false))
    }
    getCircle(){
        let btn = document.getElementById("btn");
        let xingyue = document.getElementById("xingyue");
        let top = document.getElementById("lampTop");
        let lampSpace = document.getElementById("lampSpace");
        let lampTop = top.clientHeight+lampSpace.clientHeight;
        let xingyueWidth = xingyue.clientHeight;
        let preLeft = xingyue.offsetLeft;
        let preTop = xingyue.offsetTop;
        //圆心坐标
        window.R = parseInt(xingyueWidth/2);
        window.x = preLeft + parseInt(xingyueWidth/2);
        window.y = preTop + lampTop + parseInt(xingyueWidth/2);

        console.log(R,x,y)
    }
    addBackground(e) {
        //document.getElementsByClassName('lamp-color').
        let pcolorArr = document.getElementsByClassName('lamp-color');
        let colorArr= [];
        colorArr.push(pcolorArr[0].getElementsByTagName('i'));
        let Dom = e.target
        let index = e.target.getAttribute('data-key');
        let DomPre = Dom.parentNode;
        let computedStyle = document.defaultView.getComputedStyle(DomPre, null);
        let rgbaString = computedStyle.backgroundColor;
        let rgbArr = (rgbaString.substring(4,rgbaString.length-1)).split(",");
        this.props.dispatch(changeColor(rgbArr[0],rgbArr[1],rgbArr[2],1,index,this.props.visibleTodos.lightingPatternNumber));
    }
    selectColor() {
        this.setState({
            colorPickerShow:true
        })
    }
    cancleColorPicker() {
        this.setState({
            colorPickerShow:false
        })
    }
    changeLightImg() {
        this.props.dispatch(changeColor(this.props.visibleTodos.R, this.props.visibleTodos.G, this.props.visibleTodos.B, 1, this.props.visibleTodos.i, 0))
    }
    changeSceneImg() {
        this.props.dispatch(changeColor(this.props.visibleTodos.R, this.props.visibleTodos.G, this.props.visibleTodos.B, 1, this.props.visibleTodos.i, 1))
    }
    changeLampColor(data) {
        this.props.dispatch(changeColor(data.r,data.g,data.b,1,0,this.props.lightingPatternNumber));
        let colorArr = this.state.colorArray;
        let item = 'rgb('+data.r+","+data.g+","+data.b+")";
        let color = '#' + pad0((data.r).toString(16)) + pad0((data.g).toString(16)) + pad0((data.b).toString(16));
        function pad0(hex) {
            return hex.replace(/^\b(?=.$)/, '0');
        }
        colorArr.unshift(color)
        this.setState({
            colorArray:colorArr,
        })
    }
    startMove(e) {
        this.getCircle();
        e.preventDefault();
        e.stopPropagation();
        this.clientX = e.touches[0].clientX;
        this.clientY = e.touches[0].clientY;
        console.log(this.clientX)
    }
    moveIng(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(2)
        let distance = Math.pow(e.touches[0].clientX - window.x, 2) + Math.pow(e.touches[0].clientY - window.y, 2);
        let radius = Math.pow(window.R, 2);
        // console.log(distance,radius);
        if ((distance - radius) < 6400 && (distance - radius) > -6400) {
            let sin = (e.touches[0].clientY - window.y) / Math.sqrt(distance);
            let rotuer = Math.asin(sin) * 180 / Math.PI;
            if (e.touches[0].clientX > window.x && e.touches[0].clientY < window.y) rotuer = 180 - Math.abs(rotuer);
            if (e.touches[0].clientX > window.x && e.touches[0].clientY >= window.y) rotuer = 180 + Math.abs(rotuer);
            if (e.touches[0].clientX <= window.x && e.touches[0].clientY < window.y) rotuer = Math.abs(rotuer);
            if (e.touches[0].clientX <= window.x && e.touches[0].clientY >= window.y) rotuer = -Math.abs(rotuer);
            let lightness = parseInt((rotuer+45)/2.27) < 0 ? 0 : (parseInt((rotuer+45)/2.27) > 120 ? 120 : parseInt((rotuer+45)/2.27))

            this.props.dispatch(changeLightness(lightness))
        }
    }
    endMove(e) {
        e.preventDefault();
        e.stopPropagation();    
    }
    startChange(e) {
        this.getCircle();
        e.preventDefault();
        e.stopPropagation();
        this.initX = e.touches[0].clientX;
        this.initY = e.touches[0].clientY;
        console.log(this.initY)
    }
    endChange(e) {
        e.preventDefault();
        e.stopPropagation();
        //console.log(this.initY)
        let distance = Math.pow(this.initX - window.x, 2) + Math.pow(this.initY - window.y, 2);
        let radius = Math.pow(window.R, 2);
        //console.log(distance,radius);
        if ((distance - radius) < 2500 && (distance - radius) > -2500) {
            console.log(9)
            let sin = (this.initY - window.y) / Math.sqrt(distance);
            let rotuer = Math.asin(sin) * 180 / Math.PI;
            if (this.initX > window.x && this.initY < window.y) rotuer = 180 - Math.abs(rotuer);
            if (this.initX > window.x && this.initY >= window.y) rotuer = 180 + Math.abs(rotuer);
            if (this.initX <= window.x && this.initY < window.y) rotuer = Math.abs(rotuer);
            if (this.initX <= window.x && this.initY >= window.y) rotuer = -Math.abs(rotuer);
            let lightness = parseInt((rotuer + 45) / 2.27) < 0 ? 0 : (parseInt((rotuer + 45) / 2.27) > 120 ? 120:(parseInt((rotuer + 45) / 2.27)));
            console.log(lightness)
            this.props.dispatch(changeLightness(lightness))
        }
    }
    render() {
    // 通过调用 connect() 注入:
        const { dispatch, visibleTodos} = this.props;
        let lightImg = visibleTodos.lightingPatternNumber == 0 ? require("../../img/pic-09xxhdpi.png"):require("../../img/pic-08xxhdpi.png");
        let sceneImg = visibleTodos.lightingPatternNumber == 0 ? require("../../img/pic-12xxhdpi.png"):require("../../img/pic-13xxhdpi.png");
        let lightColor = visibleTodos.lightingPatternNumber == 0 ? "#1bb1e4":"#919191";
        let sceneColor = visibleTodos.lightingPatternNumber == 0 ? "#919191":"#1bb1e4";
        let rotate = (visibleTodos.lightness*2.27) < 0 ? 0 : (visibleTodos.lightness*2.27);
        rotate = rotate > 273 ? 273 : rotate;
        let rotateZ = "rotateZ("+rotate+"deg)";
        let lightness = visibleTodos.lightness < 0 ? 0 :parseInt((visibleTodos.lightness > 120 ? 120 : visibleTodos.lightness)/1.2);
        console.log(rotateZ)
        let rgba =visibleTodos.lightingPatternNumber == 0 ? `rgba(210,210,225,1)`:`rgba(${visibleTodos.R}, ${visibleTodos.G}, ${visibleTodos.B}, ${visibleTodos.A})`;
        console.log(rgba)
        let lampColor = [{pName:"lamp-color-one"},{pName:"lamp-color-two"},{pName:"lamp-color-three"},{pName:"lamp-color-four"},{pName:"lamp-color-five"}]
    return (
      <div className="lamp">
        <div id="lampTop" className = "lamp-btn" style={{height:!this.props.visibleTodos.lightSwitchState?"30%":"9.9166666rem"}}>
            <div className = "home-btn-timing">
            <Link to="/timing">
                <img src = {require("../../img/pic-04xxhdpi.png")}/>
                <h3>闹铃</h3>
            </Link>    
            </div>
            <div className = "home-btn-title" style={{visibility:'visible'}}>
                <div className = "timing-title">
                {'09:55'}
                </div>
            </div>
            <div className = "home-btn-music">
                    <img src = {require("../../img/pic-05xxhdpi.png")}/>
                    <h3>音乐</h3> 
            </div>
        </div>
        <div id="lampSpace" style={{width:"100%",height:"2.666667rem"}}></div>
        <div id="lampChart" className="lamp-chart">
            <img className="lamp-pic-four" src={require("../../img/pic-2.png")}/>
            <img className="lamp-pic-one" style={{display:rotate<=135?"block":"none",transform:rotate<=135?rotateZ:"rotateZ("+ 0+"deg)"}} src={require("../../img/pic-4.png")}/>
            <img className="lamp-pic-two" style={{display:( rotate >=0 ) && ( rotate <= 225 ) ?"block":"none",transform:( rotate > 135 ) && ( rotate <= 225 )?("rotateZ("+(rotate-135)+"deg)"):("rotateZ("+ 0 +"deg)")}}  src={require("../../img/pic-5.png")}/>
            <img className="lamp-pic-three" style={{display:( rotate >=0 ) && ( rotate <= 270 ) ?"block":"none",transform:( rotate > 225 ) && ( rotate <= 270 )?("rotateZ("+(rotate-225)+"deg)"):("rotateZ("+ 0 +"deg)")}} src={require("../../img/pic-6.png")}/>
            <img style={{transform:rotateZ}} className="lamp-pic-five" src={require("../../img/pic-3.png")}/>
            <div id="xingyue" className="lamp-xingyue" >
                <div className="lamp-xingyue-pic" style={{background:rgba}}>
                    <img className="lamp-xingyue-bg" src={require("../../img/lamp.png")}/>
                    <img className="lamp-xingyue-opacity" src={require("../../img/lamp.png")}/>
                </div>
                <h3 className="lamp-xingyue-tips" style={{color:"#2ccaff"}}>{lightness==null?"--":lightness}</h3>
            </div>
            <div className="lamp-pic" style={{transform:rotateZ}} >
                <div className="lamp-pic-logo" onTouchStart={this.startChange.bind(this)} onTouchEnd={this.endChange.bind(this)}></div>
                <span id="btn" className="lamp-pic-btn" onTouchStart={this.startMove.bind(this)} onTouchMove={this.moveIng.bind(this)} onTouchEnd={this.endMove.bind(this)}  style={{display:"block",width:"2.5rem",height:"2.5rem",borderRadius:"2.5rem",position:"absolute",left:"50%",bottom:"1.6rem",marginLeft:"-7.0rem"}}>    
                </span>
            </div>
            
            <span className="lamp-hidden"></span>
            <span className="close-btn" onTouchStart={this.close.bind(this)}>
            </span>
            <span className="setting-btn">
            </span>                              
        </div>
        <div className="lamp-color" style={{visibility:visibleTodos.lightingPatternNumber==1?"visible":"hidden"}}>
            {lampColor.map((item,index)=>{
                if(index==visibleTodos.i){
                    return  <div key={index} className={item.pName} onTouchStart={this.addBackground.bind(this)} style={{background:(this.state.colorArray)[index]}}>
                                <i data-key={index} className="lamp-color-selected"></i>
                            </div>
                }else{
                    return  <div key={index} className={item.pName} onTouchStart={this.addBackground.bind(this)} style={{background:(this.state.colorArray)[index]}}>
                                <i data-key={index}></i>
                            </div>
                }  
            })}
            <span className="lamp-color-select" onTouchStart={this.selectColor.bind(this)}><img src={require("../../img/pic-25xxhdpi.png")}/></span>
        </div>
        <div className="lamp-scene" >
            <div className="lamp-scene-light lamp-scene-style" onTouchStart={this.changeLightImg.bind(this)}>
                <img src={lightImg}/>
                <h3 style={{color:lightColor}}>照明</h3>    
            </div>
            <div className="lamp-scene-space"></div>
            <div className="lamp-scene-air lamp-scene-style" onTouchStart={this.changeSceneImg.bind(this)}>
                <img src={sceneImg}/>
                <h3 style={{color:sceneColor}}>氛围</h3>        
            </div>
        </div>
        <div className ="home-on"  style={{bottom:this.props.visibleTodos.lightSwitchState?"-70%":"0"}}>
            <img src = {require("../../img/pic-03xxhdpi.png")} onTouchStart={this.close.bind(this)}/>
            <h3 onTouchStart={this.close.bind(this)}>开启智能灯</h3>      
        </div>
        <ColorPicker show={this.state.colorPickerShow} cancle={this.cancleColorPicker.bind(this)} close={this.changeLampColor.bind(this)}/>
        <div className="lamp-setting" style={{visibility:"hidden"}}>
            <div className="lamp-setting-space" ></div>
            <div className="lamp-setting-lists">
                <Link to="/reseting"><div className="lamp-setting-list">设备</div></Link>
                <div className="lamp-setting-list">设备详情</div>
            </div>
        </div>
    </div>
    )
  }
}

// 基于全局 state ，哪些是我们想注入的 props ?
// 注意：使用 https://github.com/reactjs/reselect 效果更佳。
function select(state) {
  console.log(state)
  return {
    visibleTodos: state.HomeReducer
  };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(Home);