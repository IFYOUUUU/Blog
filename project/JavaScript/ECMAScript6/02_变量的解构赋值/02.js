/**
 * Created by Administrator on 2017/8/23.
 */
//解构的用途

//(1)交换变量的值
[x,y] = [y,x];

//(2)返回一个数组
function example(){
    return [1,2,3];
}
var [a,b,c] = example();

//(3)函数参数的定义  参数是一组有次序的值
function f([x,y,z]){

}
f([1,2,3]);

//(4)提取JSON数据
var jsonData = {
    id:1,
    status:"OK",
    data:[867,1234]
}
let { id, status, data:number} = jsonData;