/**
 * Created by Administrator on 2017/8/23.
 */
/*
 这些是新加的集合类型，提供了更加方便的获取属性值的方法，不用像以前一样用hasOwnProperty来检查某个属性
 是属于原型链上的呢还是当前对象的。同时，在进行属性值添加与获取时有专门的get，set 方法。  */
// Set本身是一个构造函数，用来生成Set数据结构，它类似于数组，但是成员的值是唯一的，重复的会覆盖
var s = new Set();
s.add("hello").add("goodbye").add("hello");
s.size === 2;       //之所以长度为2，是因为Set里面的成员的值都是唯一的，没有重复的值
s.has("hello") === true;

// Map，它类似于对象，也是键值对的集合，但是“键”的范围不只是字符串，可以是各种类型的值（包括对象）
var m = new Map();
m.set("hello", 42); //键是字符串
m.set(2, 34);       //键是数值
m.set(undefined,21);  //键是undefined
m.get(2) == 34;   //true
var hello = function(){
    console.log("hello");
}
m.set(hello,"Hello ES6");    //将对象作为键进行存储
console.log(m.get(hello));