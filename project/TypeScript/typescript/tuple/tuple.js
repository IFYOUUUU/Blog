/**
 * Created by Administrator on 2017/8/21.
 */
var x;
x = ['hello', 10,];
console.log(x[0].substr(0)); //截取hello字符串，从下标0开始，输出hello
console.log(x[1]); //输出数组10
x[5] = "world";
console.log(x[5].toString()); //OK, 'string' 和 'number' 都有 toString
//x[6] = true; // Error, 布尔不是(string | number)类型 
