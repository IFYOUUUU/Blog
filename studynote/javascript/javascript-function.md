# javascript-函数  
在javascript中，函数本身与其他任何的内置对象在地位上是没有任何区别的，也就是说，**函数本身也是对象**。总体来说，函数在javascript中可以作为以下几种形式存在：  
* 被赋值给一个变量  
* 被赋值为某个对象的属性  
* 作为参数被传入其他的函数  
* 作为函数的结果返回  
* 用字面量来创建  

## 一、函数的对象  

### 函数的创建  
javascript中创建函数有三种方式：  
* 第一种：（函数对象方式）  
```js
var fun = new Function("x","y","return x+y");
print(fun(2,4));  //6
```  
这种方式通过new操作符来作用于Function的构造器，如果函数体很大，那么这种方式显得笨重。  
* 第二种：（函数声明）  
```js
function fun(x,y){
    return x + y;
}
```  
* 第三种：(函数表达式)  
```js
var fun = function(x,y){
    return x + y;
}
```  
事实上，第二种和第三种这样的语法是通过function关键字来调用Function来new一个对象，并将参数和函数体准确的传递给Function构造器。通常来说，在全局作用域内声明一个对象，只不过是对一个window对象属性赋值而已，比如上面的fun函数，事实上只是为了全局对象window添加了一个属性，而这个属性的值刚好是一个对象fun而已。  

### 函数的参数  
函数的参数分为显式参数（Parameters）和隐式参数（Arguments）  
```js
functionName(parameter1,parameter2){
    //需要执行的代码
}
```  
函数的（Parameters）显式参数在函数定义的时候就已经列出，参数默认设置为undefined  
```js
function fun(x,y){
    console.log(y=y||0);
}(fun(2));

//如果y已经定义，y会返回y，因为y=true，否则返回0，因为undefined为false
```  
如果函数调用时设置了过多的参数，参数将无法被引用，因为无法找到对应的参数名，只能使用隐式对象来调用  

函数的（Arguments）隐式参数在函数调用时传递给函数真正的值  
* arguments对象是javascript函数的内置对象  
* 包含了函数调用的参数数组  
我们通过一个例子来讨论这个arguments：  
```js
function sumAll(){
    var i ,sum = 0;
    for(i=0;i<arguments.length;i++){
        sum +=arguments[i];
    }
    console.log(sum);
}

sumAll(1,2,3,4,5,6,7,8,9);   //45
```  
函数sumAll没有显式的形参，而我们又可以动态的传递给其任意多的参数，那么，如何在sumAll函数中引用这些参数呢，其实就是用到了arguments对象。  

## 二、函数的种类  
主要介绍普通函数、匿名函数、闭包函数各自特性。  

### 1、普通函数  
普通函数特性：同名覆盖、arguments对象、默认返回值。  
**示例：**  
```js
function showName(name){
    console.log(name);
}
```  
**javascript中同名函数的覆盖**  
在javascript中函数没有重载，定义相同函数名、不同参数名的函数，后面的函数会覆盖前面定义的函数。调用时，只会调用后定义的函数  
```js
var n =9;
function add(x){
    console.log(n+1);
}

function add(x,y){
    console.log(n+2);
}
add(n);  //11
```  

**arguments对象**  
arguments对象操作可变参数：传入的参数数量大于定义时的参数数量  
```js
function showName(s){
    console.log(s);
    for(var i =0 ;i < arguments.length; i++){
        console.log(arguments[i]);
    }
}

showName("1","2","3");
```  
**函数的默认返回值**  
若函数没有指明返回值，默认返回的是undefined  
```js
function showMsg(){

}
alert(showMsg());   //undefined
```  

### 2、匿名函数  

#### 变量匿名函数  
可以把函数赋值给变量、事件  
```js
//变量匿名函数，左侧可以为变量、事件等
var anonymousNormal = function(x,y){
    console.log(x+y);
}
anonymousNormal(3,6);  //9
```  
适用场景：避免函数名污染；若先声明个带名称的函数，再赋值给变量或事件，就造成了函数名的滥用  

#### 无名称匿名函数  

即在函数声明时，在后面紧跟参数。  
```js
(function(x){
    console.log(x);
})(1);
```  
适用场景：只需要执行一次；如浏览器加载完，只需要执行一次且后面不执行的功能  

### 3、闭包函数  
假设：函数A内部声明了函数B，函数B引用了函数B之外的变量，并且函数A的返回值为函数B的引用。那么函数B就是闭包函数  

**全局引用和局部引用**  
```js
function funA(){
    var i =0;
    function funB(){   //闭包函数funB
        i++;
        console.log(i);
    }
    return funB;
}

var allShowA = funA();    //全局变量引用：累加输出1、2、 3、 4....

function partShowA(){
    var showA = funA();   //局部变量引用 只输出1
    showA();
}
```  
allShowA是一个全局变量，引用了函数funA。重复运行allShowA（），会输出1,2,3,4等累加的值  
执行函数partShowA（），因为内部声明了局部变量showA来引用funA，执行完毕后，因作用域的关系，释放了showA占用的资源  
**闭包的关键就在于作用域**：全局变量占有的资源只有当页面变换或者浏览器释放才会释放。var allShowA = funA();相当于allShowA引用了funB（），从而funB（）里的资源不被GC回收，因此funA（）里的资源也不会。  

**有参闭包函数**  
```js
function funA(x,y){
    var i = 0;
    function funB(z){
        i = i + z;
        console.log(i);
    }
    return funB;
}
var allShowA = funA(2,3);
allShowA(1);    //1
```  
适用场景：保证函数funA内的变量安全，因为外部不能直接访问funA变量  

## 函数的使用  
函数在javascript中可以作为以下几种形式存在：  
* 被赋值给一个变量  
* 被赋值为某个对象的属性  
* 作为参数被传入其他的函数  
* 作为函数的结果返回   

### 被赋值给一个变量  
```js
//声明一个函数，接收两个参数，返回其和
function add(x,y){
    return x+y;
}
var a = 0;
a = add;  //将函数赋值给一个变量
```  

### 被赋值为某个对象的属性  
```js
var obj = {
    id : 1
}
obj.fun = add;   //赋值给obj这个对象的fun属性
```  

### 作为参数传入其他的函数  
```js
//自定义打印字符串
function adPrint(str,handler){
    print(handler(str));
}
//将字符串转换成大写形式，并且返回
function up(str){
    return str.toUpperCase();
}
//将字符串转换成小写形式，并且返回
function low(str){
    return str.toLowerCase();
}
adPrint("Hello",up);   //作为参数传递给另外一个函数
adPrint("Hello",low);
```  

### 作为函数的返回值  
```js
function currying(){
    return function(){   //作为函数的返回值
        print("currying");
    }
}
```

