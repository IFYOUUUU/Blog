# JavaScript基础和语法规范

## 一、语法规则  
1、变量必须使用字母、下划线(_)或者美元符号($)开头
2、可以使用任意多个英文字母、数字、下划线和美元符号组成
3、不能使用js关键字和保留字来定义变量  
注意：
* js区分大小写，如：变量Score和score是不一样的，是两个变量
* 变量可以不声明，直接使用，但是不规范，会涉及变量名提升等问题  

```js
var score = 10 ;
var Score = 100;
console.log(score===Score);  //false
```  

## 二、变量的类型  
在javascript中，包含六种基本的数据类型：
1、字符串（string）
2、数值（number）
3、布尔值（boolean）
4、undefined
5、null
6、对象（object）  
```js
var str = "hello world"; //字符串
var i = 10,j=2.3;   //数值
var b = true;     //布尔型
var u ;  //undefined
var n = null  //null
var obj = {name:jack,age:20};
var object = obj;  //对象
```  

## 三、变量的声明  
javascript变量声明分为显示声明和隐式声明。  
```js
var i = 100;   //显示声明
j = 100;    //隐式声明
```  
在函数中，使用var关键字进行显示声明的变量叫做局部变量，没有用var关键字，直接用赋值方式声明的是全局变量
1、使用var多次声明同一个变量是合法，不会出现语法错误，相当于只是普通的赋值语句
2、读取一个未声明的变量值，js会产生一个错误
3、尝试给一个未经var声明的变量赋值，js会隐式声明该变量，隐式声明的变量会被创建为全局变量
4、无论是全局变量还是局部变量，最后都用var进行声明  
## 四、变量的作用域  
作用域永远是任何一门编程语句中的重点，因为它控制着变量与参数的可见性与生命周期。首先理解两个概念：块级作用域和函数作用域。  
块级作用域：任何一对花括号（{}）中的语句集都是属于一个块，在这之中定义的代码块都是不可见的，我们称之为块级代码块。（js是没有块级作用域的）  
函数作用域：定义在函数中的参数、变量在函数外部是不可见的。   
全局（global）变量的作用域是全局的，即在js代码中处处都有定义的  
局部（local）变量的作用域是局部的，只在特定的范围内，比如函数内部定义的变量、函数的参数变量，这些变量作用域只是局限在该函数的内部  
**关于变量提升问题的例子**  
```js
var v = "out";

function tt(){
    var v = "int";
    console.log(v);
}
tt();   //int
print(v)   //out

var s = "hello world";
(function(){
    console.log(s);  //先使用后声明
    var s = 'yoyoyoyo';
    console.log(s);
})();
//输出结果为：
//undefined
//yoyoyoyo
//因为在函数里面先使用了一个变量，所以说这个变量会提升到第一句进行声明。实际代码如下：
var s = "hello world";
(function(){
    var s;    //会在内部执行时自动声明一个变量s。 是一个undefined的类型。
    console.log(s);  //先使用后声明
    var s = 'yoyoyoyo';
    console.log(s);
})();
//正是由于js不支持块级作用域，这就意味着整个函数体中都隐藏了同名的全局变量，这就是无法向上搜索变量 s 的原因。
```