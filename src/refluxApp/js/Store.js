'use strict';
/**
 * 公共store，建议所有store事件都在此文件定义
 * ! 注意，Store方法不能使用箭头函数，否则将报this未定义
 * @type {store}
 */
import {Actions} from './Actions.js';

let AppData = {
    num : 1
}
export const Store = Reflux.createStore({
    listenables: [Actions],
    onClose(indexNum) {
        console.log(indexNum)
        AppData.num = indexNum
        this.trigger(AppData)
    },
});