/**
 * Created by Administrator on 2017/8/23.
 */
'use strict'
//ES5
function log(x,y){
    var y = arguments.length <= 1 ||
    arguments[1] === undefined ? 'World' : arguments[1];
    console.log(x,y);
}
log('Hello');  //Hello World
log('Hello','China')  //Hello China
log('Hello','')    //Hello World

//ES6
//1.定义了默认值的参数，必须是函数的尾函数，其后不能再其他无默认值的参数
function log(x,y = 'World'){
    console.log(x,y);
}
log('Hello');  //Hello World
log('Hello','China')  //Hello China
log('Hello','')    //Hello