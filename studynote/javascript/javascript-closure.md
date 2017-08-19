# JavaScript  
闭包（closure）是javascript语言的一个特点，也是一个难点，很多高级的应用都会依靠闭包来实现  

## 一、变量的作用域  
要理解闭包，首先必须理解javascript特殊的变量作用域。  
变量的作用域无非分为两种：全局变量和局部变量。  
javascript语言的特殊之处在于函数内部可以直接读取全局变量  
```js
var  n = 99;

function f1(){
    console.log(n);
}
f1();  //99
```  
另一方面，在函数外部自然无法读取函数内部的局部变量  
```js
function f1(){
    var n = 99;
    console.log(n);
}
f1();  //99
console.log(n)   //error
```  
这里需要注意的是，在函数内部声明变量时，一定要用**var**命令，如果不用的话，默认声明的是一个**全局变量**。  
```js
function f1(){
    n = 88;
}
console.log(n);   //88
```  

## 二、如何从外部读取局部变量  
由于种种原因，我们需要得到函数内部的局部变量。在正常情况下，这是办不到的，只有通过变通才能实现  
那就是在函数的内部再定义一个函数。  
```js
function f1(){
    var n = 88;
    function f2(){
        console.log(n);  //88
    }
}
```  
在上面的代码中，函数f2被包括在函数f1的内部，这是f1函数的所有成员变量对f2都是可见的，但是f2的对f1却是不可见的。这是javascript语言特有的“链式作用域”的特点，子对象会一级一级向上寻找所有父对象的变量。所以，父对象的所有变量对子对象都是可见的，反之则不成立。  
既然f2可以读取f1的局部变量，那么只要把f2作为返回值，我们不就可以在f1外部读取f2的内部变量了吗  
```js
function f1(){
    var n = 88;
    function f2(){
        console.log(n);  //88
    }
    return f2();
}
var result = f1();
result;  //88
```  

## 三、闭包的概念  
上一段代码中，f2就是闭包。  
我的理解是：闭包就是能够读取其他函数内部变量的函数。  
由于javascript语言中，只要函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成“定义在一个函数内部的函数”。  
所以，在本质上，闭包就是将函数内部和函数外部连接起来的桥梁。  

## 四、闭包的用途  
闭包可以用在许多方面，他最常用的地方有两个：  
* 就是前面提到的读取函数内部的变量  
* 另一个就是让这些变量的值始终保存在内存中  

```js
function f1(){
    var n = 99;
    add = function(){
        n += 1;
    };
    function f2(){
       console.log(n);
    };
    return f2();
}
var result = f1();
result;

add();
result;
```  
在这段代码中，result实际上就是闭包函数f2，它一共运行了两次，这说明函数f1的局部变量n一直保存在内存中，并没有在f1调用后被清除。原因在于f1是f2的父函数，而f2被赋值给了一个全局变量，这导致f2始终存在内存中，因此f1也始终存在内存中，不会在调用后被垃圾回收机制回收了。  

## 五、使用闭包的注意点  
1、由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能随便使用闭包，这样会造成网页性能问题，在IE中可能导致内存泄漏。解决方法是，在退出函数之前，把不使用的局部变量全部删除  
2、闭包会在父函数外部改变父函数内部变量的值。所以，如果把父函数当做对象使用，把闭包当做它的公用方法，把内部变量当做它的私有属性。这是我们需要注意的是，不要随便改变父函数的内部变量的值。  
