/**
 * Created by Administrator on 2017/8/23.
 */
/*类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。
它没有运行时的影响，只是在编译阶段起作用。
一共有两种方式：*/
//其一是“尖括号”语法：
let str: any = "this is a string";
let strLength: number = (<string>str).length;
console.log(typeof(strLength));
//另一个为as语法：
let someValue: any = "this is a string";
let someValueLength: number = (someValue as string).length;
console.log(someValueLength);
