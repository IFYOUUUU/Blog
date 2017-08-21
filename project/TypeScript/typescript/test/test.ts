/**
 * Created by Administrator on 2017/8/21.
 */
function area(shape:string,width:number,height:number){
    var area = width * height;
    return "I'm a " + shape + "with an area of "+ area + "cm squared";
}
console.log(area("rectangle",30,15));