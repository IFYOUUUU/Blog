/**
 * Created by Administrator on 2017/8/21.
 */
{
    var b = 1;
    let a = 10;
}
console.log(b);  // b = 1
//console.log(a);  //报错  a is not defined

//let不像var那样，会出现变量提升的现象

c =1;
console.log(c);
//d = 10;
//console.log(d);
var c;
//let d;  //错误:(16, 13) TS2448:Block-scoped variable 'd' used before its declaration.

//不能像var在一个作用域里面声明多次相同的bianl

let x:number = 10;
//let x:number = 20;  //错误:(22, 5) TS2451:Cannot redeclare block-scoped variable 'x'.

for (var i=0;i<10;i++){
    setTimeout(function () {
        console.log(i)
    },1000);
}