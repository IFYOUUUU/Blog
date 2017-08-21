/**
 * Created by Administrator on 2017/8/21.
 */
var Shape = (function () {
    function Shape(name, width, height) {
        this.name = name;
        this.area = width * height;
        this.col = "red";
    }
    Shape.prototype.shoutout = function () {
        return "I'm " + this.col + " " + this.name + " with an area of " + this.area + "cm squared";
    };
    return Shape;
}());
var square = new Shape("square", 20, 20);
console.log(square.shoutout());
console.log('Area of Shape ' + square.area);
console.log('Name of Shape ' + square.name);
console.log('Color of Shape ' + square.col);
