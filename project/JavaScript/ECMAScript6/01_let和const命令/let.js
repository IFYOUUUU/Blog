/**
 * Created by Administrator on 2017/8/22.
 */
//let声明的变量只在它所在的代码块有效
'use strict'   //严格模式
{
    var a = 1;
    let b = 10;
}
console.log(a);
//console.log(b);   //b is not defined

//let不像var那样，会发生"变量提升"的现象
console.log(a);
//console.log(b);     //b is not defined

var a = 1;
let b = 10;

//在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”
var tmp = 123;

if(true){
    let tmp;
    console.log(tmp);    //undefined
}

