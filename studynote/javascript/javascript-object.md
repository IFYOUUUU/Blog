# JavaScript对象 和原型对象及原型链 

## JavaScript对象的简介  
javascript对象其实就是属性的无序集合，一般来说，我们都是声明一个空的对象，然后根据自己的需求不断的添加属性，最终形成一个完整的对象。对象具备以下几个特性：  
1、确定性：我们可以明确的知道某些属性是否属于这个对象的。  
2、无序性：声明对象属性是没有顺序的。  
3、互异性：对象中的每个属性都是互不相同的（如果出现同名的，后声明的会覆盖先声明的）。  
### javascript对象的属性  
属性是有键值对（key-value）组成的，即属性的名字和值，名字是一个字符串，而值可以为任意的javascript对象，比如：  
```js
//声明一个对象student
var student = new Object();
student.name = "tom";
student.age = 20;

//声明另一个对象teacher
var teacher = new Object();
teacher.name = "jack";
teacher.sex = "men";
teacher.stu = student;    //将另一个对象当做属性存在这个对象中
```  
对象的读取也是有两种方式：一种是通过操作符（.）和通过操作符（[]），例如：  
```js
var stu = teacher.stu;
stu = teacher["stu"];
```  
在js中，对象属性的名称为（foo.bar）这种形式是合理的，那么采用第一种读取方式就会带来问题：当使用teacher.foo.bar时,解释器会误以为foo属性下有一个bar属性，因此会带来一些问题，所有用teacher["foo.bar"]来读取是最准确的。  
### 属性和变量  
在javascript引擎初始化的时候，会构建一个全局对象，即window对象，我们在全局作用域中声明的变量可以看作就是全局对象的属性而被保存，从这点看来，变量其实就是属性。例如：  
```js
var v = "global";
var arr = ['hello','world'];
function func(id){
    var ele = doucment.getElementById(id);
    ...
}
//实际上这段代码等同于
window.v = "global";
window.arr = ['hello','world'];
window.func = function(id){
    var ele = doucment.getElementById(id);
    ...
}
```  
## 原型对象及原型链  
原型（prototype），是javascript中特有的一个概念，通过使用原型，javascript可以建立其传统OO语言中的继承，从而实现对象的层次关系。javascript本身是基于原型的，每个函数都有一个prototype属性，这个prototype本身也是一个对象，因此它本身也可以用到自己的原型，这样就形成了原型链。  
访问一个属性的时候，解析器需要从下向上的遍历这个链结构，直到遇到该属性，则返回属性对应的值，或者遇到原型为null的对象（javascript的基对象Object构造器的默认prototype有一个null原型），如果遍历完整个链结构，此对象还是没有该属性，则返回undefined。  
下面我们具体来看一个例子：  
```js
//声明一个对象base
function Base(name){
    this.name = name;
    this.getName = function(){
        return this.name;
    }
}

//声明一个对象child
function Child(id){
    this.id = id;
    this.getId = function(){
        return this.id;
    }
}
//将child的原型指向一个新的base对象,child添加原型必须在实例化之前，否则原型的属性不会添加成功。
Child.prototype = new Base("base");
//实例化一个child对象
var c = new Child("child");
//c本身具有getId()方法
print(c.getId());
//由于c从原型链上“继承”到了getName方法，因此可以访问
print(c.getName);

//输出结果为：
// child
// base
```  
由于遍历原型链的时候是从下向上的，所以最先遇到的属性最先返回，通过这种机制可以完成继承及重载等传统的OO机制。  
```js
function Person(name,age){
    this.name = name;
    this.age = age;
    this.getName = function(){
        return this.name;
    }
    this.getAge = function(){
        return this.age;
    }
}

var tom = new Person("Tom",23);
var jerry = new Person("Jerry",20);
```  
![prototype](https://github.com/IFYOUUUU/Blog/blob/master/images/prototype.png)  
首先我们实例化了tom和jerry两个对象，第1、2步这两个对象都是有__proto__属性的，它们会跟Person的原型对象进行连接，而第3步则是Person本身也是有prototype属性的，因此它也可以连接自己的原型对象。第4步则是每个原型函数都有一个构造函数，会指向原来的对象，同理可知，Person的__proto__会与Function的原型对象连接，最后的6、7步则最终会连接到Object这个全局对象的原型对象上去，知道__proto__为null就停止。
## this指针  
在javascript中，this表示当前上下文，即调用者的引用。在语言规范里规定它指向函数执行的那个对象。它代表函数运行时，自动生成的一个内部对象，只能在函数的内部使用，因此它指向在函数定义的时候是不确定的，只有在函数执行的时候才能确定this到底指向谁。实际上this最终指向调用方法的那个对象。  
如果一个函数中有this，那么这个函数包含多个对象，尽管这个函数是被外层的对象所调用，this指向的也只是它的上一级对象，例如：  
```js
var o = {
    a:10,
    b:{
        fun:function(){
            console.log(this.a);
        }
    },
    fun:function(){
        console.log(this.a);
    }
}
o.b.fun();
o.fun()

//输出结果：
// undefined
// 10
```  
我们来看一个简单的例子：  
```js
//定义一个人 名字叫小明
var peopleA = {
    name : "小明",
    age : 24
}
//定义另外一个人 名字叫小花
var peopleB = {
    name : "小花",
    age : 20
}
//定义一个全局的函数对象
function sayName(){
    return this.name;
}

//设置sayName的上下文为peopleA,此时的this为peopleA
print(sayName.call(peopleA));
//设置sayName的上下文为peopleB,此时的this为peopleB
print(sayName.call(peopleB));

//输出结果为:
//小明
//小花
```  
注意的是：this的值并不是函数如何被声明而确定，而是被函数如何被调用而确定的。  
**apply、call、bind的异同点:**  
1、相同点：都是为了改变函数执行的时候的上下文(this)指向  
2、call：语法 call(obj[,obj][,obj]),第一个参数为强制改变需要指向的对象，后面可选的为该函数的参数，如果不传值默认为window。  
3、apply：语法 apply(obj[,arr]),第一个参数为强制改变需要指向的对象，后面可选的是该参数集合的数组形式，如果不传值默认为window。  
4、apply和call的作用和调用的形式基本一样，不同的是call后面的参数与方法一一对应，而apply的第二个参数为一个数组，数组中的元素是和方法中的一一对应的。两者都可以不传入参数，此时默认改变指向的对象为全局对象。  
```js
var jack = {
    name : "jack",
    age : 24
}
function printName(){
    return this.name;
}
console.log(printName.call(jack));  //jack
```   
5、bind：bind的调用形式和call相同，但是它返回的是一个改变this的新函数。  
```js
var jack = {
    name : "jack",
    age : 24
}
function printName(){
    return this.name;
}
var new_printName = printName.bind(jack);
console.log(new_printName());  //jack
```
