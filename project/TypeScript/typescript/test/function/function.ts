/**
 * Created by Administrator on 2017/8/21.
 */
/*
箭头函数表达式写法 =>  参数=>函数
左边是参数部分，如果没有参数或需要多个参数，用()表示
右边是函数部分，格式为{代码块}
如果返回的是一个对象，必须在对象外面加括号*/

//没有参数
var f=()=>5;
//等同于
var f = function(){
    return 5;
}

//一个参数
var s=v=>v;
//等同于
var s = function (v) {
    return v;
}
//多个参数
var sum = (num1,num2) =>{
    return num1 + num2;
}
//等同于
var sum1 = function (num1,num2) {
    return num1 + num2;
}

//返回值为对象
var getTempTtem = id=>({id:1,name:"Temp"});
//等同于
var getTempTtem = function (id) {
    return ({ id: 1, name: "Temp" });
};