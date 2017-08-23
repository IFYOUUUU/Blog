/**
 * Created by Administrator on 2017/8/23.
 */
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1983;
function v1(){
    console.log("v1");
}
function v2(){
    console.log("v2");
}

//默认方法
export default function(){
    console.log('foo');
}

export {
    v1 as V1,
    v2 as V2,
    firstName,
    lastName,
    year
};