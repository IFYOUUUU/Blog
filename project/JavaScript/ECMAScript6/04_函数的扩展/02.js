/**
 * Created by Administrator on 2017/8/23.
 */
//Rest参数接收函数的多余参数，组成一个数组，放在形参的最后.
// 注意，rest参数之后不能再有其它参数（即，只能是最后一个参数），否则会报错。

//ES5
function add(){
    let sum = 0;
    for(let i = 0; i < arguments.length; i++){
        sum += arguments[i];
    }
    console.log(sum);
}

//ES6
function add(...values){
    let sum = 0;
    for(var val of values){
        sum += val;
    }
    console.log(sum);
}
add(2,5,3);   //sum = 10;