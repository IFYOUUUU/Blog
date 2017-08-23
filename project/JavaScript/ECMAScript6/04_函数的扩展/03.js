/**
 * Created by Administrator on 2017/8/23.
 */
//扩展运算符（spread）是三个点（...）。将一个数组转为用逗号分隔的参数序列
console.log(...[1,2,3]);
//1 2 3

//由于扩展运算符可以展开数组，所有不再需要apply方法，将数组转为函数的参数了
//ES5的写法
function f(x,y,z){

}
var args = [0,1,2];
f.apply(null,args);

//ES6的写法
function f(x,y,z){

}
var args = [0,1,2];
f(...args);

//ES5的写法
Math.max.apply(null,[14,3,77]);
//ES6的写法
Math.max(...[14,3,77]);
//等同于
Math.max(14,3,77);