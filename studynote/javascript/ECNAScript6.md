# ECMAScript6  [项目实例](https://github.com/IFYOUUUU/Blog/tree/master/project/JavaScript/ECMAScript6)

## let和const命令  
### let命令  
let声明的变量只在它所在的代码块有效  
```js
'use strict'   //严格模式
{
    var a = 1;
    let b = 10;
}
console.log(a);
console.log(b);
```  
let不像var那样，会发生"变量提升"的现象  
```js
'use strict'
console.log(a);
console.log(b);

var a = 1;
let b = 10;
```  
在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”  
```js
'use strict'
var tmp = 123;

if(true){
    let tmp;
    console.log(tmp);
}
```  
### 为什么需要块级作用域？  
ES5只有全局作用域和函数作用域，没有块级作用域，这带来很多不合理的场景。  
第一种：内层变量可能会覆盖外层变量  
```js
var tmp = "hello";
(function(){
    console.log(tmp);
    var tmp = "world";
})();
```  
第二种：用来计数的循环变量泄漏为全局变量  
```js
var s = 'hello';
for(let i=0;i<s.length;i++){

}
console.log(i);
```  
### const命令  
const也用来声明变量，但是声明的是常量，一旦声明，该变量的值就无法修改了。  
const的作用域与let命令相同：只在声明所在的块级作用域内有效。  
const命令声明的常量也是不提升的，同样存在暂时性死区里，只能在声明的位置后面使用。  
### 全局对象的属性  
ES6规定，var命令和function命令声明的全局变量，属于全局对象的属性；let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。  
```js
var a = 1;
console.log(a);   //1
a = 3;
console.log(a);  //
const b = 1;
console.log(b);   //1
//b = 4;           //Assignment to constant variable. 无法修改b的值
```  

## 变量的解构赋值  
自动解析数组或对象中的值。比如若一个函数要返回多个值，常规的做法是返回一个对象，将每个值做为这个对象的属性返回。但在ES6中，利用解构这一特性，可以直接返回一个数组，然后数组中的值会自动被解析到对应接收该值的变量中。  
```js
var [x,y]=getVal(),//函数返回值的解构
    [name,,age]=['wayou','male','secrect'];//数组解构

function getVal() {
    return [ 1, 2 ];
}

console.log('x:'+x+', y:'+y);//输出：x:1, y:2 
console.log('name:'+name+', age:'+age);//输出： name:wayou, age:secrect 
```
### 数组的解构赋值  
```js
'use strict'
let [x,y] = [1,2,3];
console.log([x,y]);

let [a,[b],d] = [1,[2,3],4];
console.log([a,[b],d]);
```  
### 对象的解构赋值  
```js
'use strict'
var {foo,bar} = {foo:"a",bar:"b"};
foo   //"a"
bar   //"b"

var {bar,foo} = {foo:"a",bar:"b"}
foo   //"a"
bar   //"b"

var {baz} = {foo:"a",bar:"b"}
baz   //undefined
```  

### 字符串得解构赋值  
```js
const [a,b,c,d,e] = "hello";
a  //"h"
b  //"e"
c  //"l"
d  //"l"
e  //"o"
```  

### 函数参数的解构赋值  
```js
function add([x,y]){
    return x+y;
}

add([1,2]);   //3
```  

### 用途  
```js
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
f([x:1,y:2,z:3]);

//(4)提取JSON数据  
var jsonData = {
    id:1,
    status:"OK",
    data:[867,1234]
}
let { id, status, data:number} = jsonData;
```  

## 字符串得扩展  
### 模板字符串  
```js
//普通字符串
console.log(`In JavaScript '\n' is a line-feed.`);

//多行字符串  
console.log(`In JavaScript this is
    
            not legal.`);

//字符串中嵌入变量  
var name = "Bob",time = "today";
`Hello  ${name},how are you ${time} ?`

//模板字符串之中还能调用函数  
function fn(){
    return "Hello World";
}
console.log(`foo ${fn()} bar`);
```  
### for of值遍历  
我们都知道for in 循环用于遍历数组，类数组或对象，ES6中新引入的for of循环功能相似，不同的是每次循环它提供的不是序号而是值。  
```js
var someArray = [ "a", "b", "c" ];
 
for (v of someArray) {
    console.log(v);//输出 a,b,c
}
```  

### 标签模板  
模板字符串得功能，不仅仅是上面这些，它可以紧跟在一个函数名后面，该函数将调用来处理这个模板字符串。这个称为“标签模板”功能。  
用途：  
* 过滤HTML字符串，防止用户输入恶意内容。  
* 多语言转换（国际化处理）。  
```js
/*tag函数的第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分，也就是说，
变量替换只发生在数组的第一个成员与第二个成员之间、第二个成员与第三个成员之间，以此类推*/
var a = 5;
var b =10;
function tag(s,v1,v2){
    console.log(s[0]);
    console.log(s[1]);
    console.log(s[2]);
    console.log(v1);
    console.log(v2);
    return "OK";
}
tag`Hello ${ a + b } world ${ a * b }`;
```  

## 函数的扩展  

### 默认参数  
```js
'use strict'
//ES5
function log(x,y){
    var y = arguments.length <= 1 ||
    arguments[1] === undefined ? 'World' : arguments[1];
    console.log(x,y);
}
log('Hello');  //Hello World
log('Hello','China')  //Hello China
log('Hello','')    //Hello World

//ES6
//1.定义了默认值的参数，必须是函数的尾函数，其后不能再其他无默认值的参数
function log(x,y = 'World'){
    console.log(x,y);
}
log('Hello');  //Hello World
log('Hello','China')  //Hello China
log('Hello','')    //Hello
```  

### Rest参数  
Rest参数接收函数的多余参数，组成一个数组，放在形参的最后.注意，rest参数之后不能再有其它参数（即，只能是最后一个参数），否则会报错。  
```js
'use strict'
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
```  
### 扩展运算符  
```js
//扩展运算符（spread）是三个点（...）。将一个数组转为用逗号分隔的参数序列 
console.log(...[1,2,3]);
//1 2 3

//由于扩展运算符可以展开数组，所有不再需要apply方法，将数组转为函数的参数了  
//ES5的写法
function f(x,y,z){

}
var args = [0,1,2];
f.apply(null,args);

//ES6的写法
function f(x,y,z){

}
var args = [0,1,2];
f(...args);

//ES5的写法  
Math.max.apply(null,[14,3,77]);
//ES6的写法
Math.max(...[14,3,77]);
//等同于
Math.max(14,3,77);
```  

### 箭头函数  
ES6中新增的箭头操作符=>便有异曲同工之妙。它简化了函数的书写。操作符左边为输入的参数，而右边则是进行的操作以及返回的值Inputs=>outputs。

我们知道在JS中回调是经常的事，而一般回调又以匿名函数的形式出现，每次都需要写一个function，甚是繁琐。当引入箭头操作符后可以方便地写回调了。请看下面的例子。  
```js
var array = [1, 2, 3];
//传统写法
array.forEach(function(v, i, a) {
    console.log(v);
});
//ES6
array.forEach(v = > console.log(v));
```  

```js
var f = () => 5;
//等同于
var f =function(){
    return 5;
};

var sum = (sum1,sum2) => {
    return num1 + num2;
};
//等同于
var sum = function(num1,num2){
    return num1 + num2;
}
```  

## Symbol  
ES6引入了一种新的原始数据类型Symbol，表示独一无二的值，从根本上防止属性名的冲突。  
我们知道对象其实是键值对的集合，而键通常来说是字符串。而现在除了字符串外，我们还可以用symbol这种值来做为对象的键。Symbol是一种基本类型，像数字，字符串还有布尔一样，它不是一个对象。Symbol 通过调用symbol函数产生，它接收一个可选的名字参数，该函数返回的symbol是唯一的。之后就可以用这个返回值做为对象的键了。Symbol还可以用来创建私有属性，外部无法直接访问由symbol做为键的属性值。  
```js
'use srtict'
/*symbol函数的参数只是表示对当前symbol值的描述，因此相同参数的symbol函数的返回值是不相等的*/
//没有参数的情况
let s1 = Symbol();
let s2 = Symbol();
console.log(s1 == s2);  //false
//有参数的情况
let s3 = Symbol("foo");
let s4 = Symbol("foo");
console.log(s3 == s4);  //false

//
(function() {
  // 创建symbol
  var key = Symbol("key");

  function MyClass(privateData) {
    this[key] = privateData;
  }

  MyClass.prototype = {
    doStuff: function() {
      ... this[key] ...
    }
  };

})();

var c = new MyClass("hello")
c["key"] === undefined//无法访问该属性，因为是私有的
```  

## Map、Set、WeakMap和WeakSet  
这些是新加的集合类型，提供了更加方便的获取属性值的方法，不用像以前一样用hasOwnProperty来检查某个属性是属于原型链上的呢还是当前对象的。同时，在进行属性值添加与获取时有专门的get，set 方法。  
```js
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
```  
有时候我们会把对象作为一个对象的键用来存放属性值，普通集合类型比如简单对象会阻止垃圾回收器对这些作为属性键存在的对象的回收，有造成内存泄漏的危险。而WeakMap,WeakSet则更加安全些，这些作为属性键的对象如果没有别的变量在引用它们，则会被回收释放掉，具体还看下面的例子。  
```js
// Weak Maps
var wm = new WeakMap();
wm.set(s, { extra: 42 });
wm.size === undefined

// Weak Sets
var ws = new WeakSet();
ws.add({ data: 42 });//因为添加到ws的这个临时对象没有其他变量引用它，所以ws不会保存它的值，也就是说这次添加其实没有意义的。
```  
## Class 类的支持  
ES6中添加了对类的支持，引入了class关键字（其实class在JavaScript中一直是保留字，目的就是考虑到可能在以后的新版本中会用到，现在终于派上用场了）。JS本身就是面向对象的，ES6中提供的类实际上只是JS原型模式的包装。现在提供原生的class支持后，对象的创建，继承更加直观了，并且父类方法的调用，实例化，静态方法和构造函数等概念都更加形象化。  
```js
//类的定义
class Animal {
	//ES6中新型构造器
    constructor(name) {
        this.name = name;
    }
    //实例方法
    sayName() {
        console.log('My name is '+this.name);
    }
}
//类的继承
class Dog extends Animal {
    constructor(name) {
    	//直接调用父类构造器进行初始化
        super(name);
    }
    program() {
        console.log("I'm coding...");
    }
}
//测试我们的类
var animal=new Animal('animal'),
dog=newDog('dog');
animal.sayName();//输出 ‘My name is animal’
dog.sayName();//输出 ‘My name is dog’
dog.program();//输出 ‘I'm coding...’
```  

## Module [参考]()  
ES6模块的设计思想是：尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出变量。CommonJS和AMD模块，都只能在运行时确定这些东西  
index.js  
```js
import customName ,{firstName,lastName,year,V1} from './01';
```  
01.js  
```js
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
```