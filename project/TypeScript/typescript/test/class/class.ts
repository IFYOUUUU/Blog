/**
 * Created by Administrator on 2017/8/21.
 */
class Shape{
    area:number;
    col:string;

    constructor(public name:string,width:number,height:number){
        this.area = width * height;
        this.col = "red";
    }

    shoutout():string{
        return "I'm " + this.col + " " + this.name + " with an area of " + this.area + "cm squared";
    }
}
var square = new Shape("square",20,20);

console.log(square.shoutout());
console.log('Area of Shape ' + square.area);
console.log('Name of Shape ' + square.name);
console.log('Color of Shape ' + square.col);
