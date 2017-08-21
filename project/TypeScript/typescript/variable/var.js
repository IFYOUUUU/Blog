/**
 * Created by Administrator on 2017/8/21.
 */
var b = 1;
var c; //不会报错
console.log('函数外var定义b ' + b); //1
function change() {
    c = 4;
    console.log('函数外var定义b ' + c); //  c= 4
}
change();
console.log('函数调用var定义c为函数内部修改的值 ' + c); //c = 4
