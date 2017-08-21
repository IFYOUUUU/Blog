/**
 * Created by Administrator on 2017/8/21.
 */
interface Shape{
    name : string;
    width :number;
    height : number;
    color ?: string;  //?意思是可选属性
}

//作为一个类型注解
function area(shape:Shape){
    var area = shape.width * shape.height;
    return "I'm " + shape.color + " " + shape.name + " with area " + area + " cm squared";
}

//不需要使用implements语句，只需要结果相同即可
console.log(area({name:'rectangle',width:30,height:10}));
console.log(area({name:'square',width:30,height:10,color:"blue"}));