/**
 * Created by Administrator on 2017/8/23.
 */

//ES6规定，var命令和function命令声明的全局变量，属于全局对象的属性；
//let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。
var a = 1;
console.log(a);   //1
a = 3;
console.log(a);  //
const b = 1;
console.log(b);   //1
//b = 4;           //Assignment to constant variable. 无法修改b的值