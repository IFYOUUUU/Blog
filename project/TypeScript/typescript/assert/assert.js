/**
 * Created by Administrator on 2017/8/23.
 */
/*类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。
它没有运行时的影响，只是在编译阶段起作用。
一共有两种方式：*/
//其一是“尖括号”语法：
var str = "this is a string";
var strLength = str.length;
console.log(typeof (strLength));
//另一个为as语法：
var someValue = "this is a string";
var someValueLength = someValue.length;
console.log(someValueLength);
