<!--TOC-->
- [TypeScript入门教程](#typescript入门教程)
    - [什么是javascript](#什么是typescript)
        - [语法的特性](#语法的特性)
        - [ES5、ES6、JavaScript和TypeScript的概念与关系](#es5es6javascript和typescript的概念与关系)
        - [TypeScript与JavaScript的区别](#typescript与javascript的区别)
    - [TypeScript的优势](#typescript的优势)
        - [增加了代码的可读性和可维护性](#增加了代码的可读性和可维护性)
        - [包容性](#包容性)
    - [TypeScript的安装](#typescript的安装)
        - [通过npm安装步骤](#通过npm安装步骤)
    - [入门程序:Hello World](#入门程序hello-world)
    - [基础知识](#基础知识)
        - [TypeScript基础类型](#typescript基础类型)
        - [TypeScript变量的声明](#typescript变量的声明)
        - [TypeScript类型推论](#typescript类型推论)
    - [语法新特性详解](#语法新特性详解)
        - [类型注解](#类型注解)
        - [接口](#接口)
        - [类](#类)
        - [箭头函数表达式](#箭头函数表达式)
        - [装饰器](#装饰器)
    - [项目配置](#项目配置)
<!--/TOC-->

# TypeScript入门教程 [项目实例](https://github.com/IFYOUUUU/Blog/tree/master/project/TypeScript/typescript)  

## 什么是TypeScript  
简介：TypeScript是一种由微软开发的自由和开源的编程语言。它是JavaScript的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。  

### 语法的特性  
* 类 Classes  
* 接口 Interface  
* 模块 Modules  
* 类型注解 Type annotations  
* 编译时类型检查 Complie time type checking  
* Arrow 函数  (类似于C#的Labmda表达式)   

### ES5、ES6、JavaScript和TypeScript的概念与关系  
* ES是客户端脚本语言的规范，而ES5、ES6是规范的不同版本  
* JavaScript、TypeScript是两种客户端脚本语言  
* 关系：JavaScript实现了ES5的规范，而TypeScript则是实现ES6的规范  

### TypeScript与JavaScript的区别  
* TypeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。  
* TypeScript 可以处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。  

## TypeScript的优势  

### 增加了代码的可读性和可维护性  
* 类型注解实际上是最好的文档，大部分的函数看着类型的定义就可以知道如何使用  
![1.png](https://github.com/IFYOUUUU/Blog/blob/master/images/typescript/1.png)  

* 可以在编译阶段就可以发现大部分错误  
![2.png](https://github.com/IFYOUUUU/Blog/blob/master/images/typescript/2.png)  
**TypeScript只会进行静态检查，如果发现有错误，编译的时候就会提示报错。**  
![3.png](https://github.com/IFYOUUUU/Blog/blob/master/images/typescript/3.png)  
**TypeScript编译的时候即使报错了，还是可以生成编译结果，我们仍然可以使用这个编译后的文件**  

### 包容性  
* TypeScript是JavaScript的超集，.js文件可以直接重命名为.ts  
* 即使不显示的定义类型，typescript也能够自动作出类型推论  
* 即使TypeScript编译报错，也是会生成JavaScript文件的  
* 兼容第三方库，即使第三方库不是用TypeScript写的，也可以编写单独的类型文件供TypeScript读取  

## TypeScript的安装  
### 通过npm安装步骤  
**1、安装nodeJS** : 安装文件下载地址：[Node.JS Downloads](https://nodejs.org/en/download/)。TypeScripty源码需要进行编译后才能运行，nodeJS提供了编译环境。  
**2、修改镜像路径**：由于外网的关系，安装可能会很慢，甚至失败，建议修改镜像地址之后再进行安装。命令行修改方式：  
```
npm更改默认全局路径和cache路径  
npm config set prefix 新路径
npm config set cache 新路径
npm config set registry https://registry.npm.taobao.org
```  
查看更改结果  
```
npm config ls -l或npm config list
```  

**3、安装 TypeScript**：安装好Node.js后，打开cmd窗口，输入以下命令
```
npm install -g typescript
```  
安装完成后，查看版本信息：  
```
 tsc -v 
```  

## 入门程序:Hello World  
创建一个hello.ts文件，添加以下代码：
```typescript
function sayHello(str:string){
    return 'Hello ' + str;
}
let s = 'World';
console.log(sayHello(s));
```  
通过命令 tsc hello.td 将上面这段代码进行编译，会生成一个hello.js文件,运行这段js文件会得到结果“Hello World”。  

## 基础知识  

### TypeScript基础类型  
JavaScript的类型分为两种：原始数据类型和对象类型  
原始数据类型包括：布尔值、数值、字符串、null、undefined、数组  
TypeScript支持与JavaScript几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用  

**字符串**  
和javascript一样，可以使用双引号（""）和单引号（''）来表示字符串  
也可以使用**模板字符串**，它可以定义多行文本和内嵌表达式。这种字符串是被反引号（``）包围，并且以${expr}这种形式嵌入表达式。  
```typescript
let myName:string = "Clown";
let myAge:number = 23;
let sentence:string = `Hello,my name is ${myName},
    I'll be ${myAge + 1} years old next month.`;

console.log(sentence);
```  
生成的js代码如下：  
```javascript
var myName = "Clown";
var myAge = 23;
var sentence = "Hello,my name is " + myName + ",\n    I'll be " + (myAge + 1) + " years old next month.";
console.log(sentence);
```  

**数组**
TypeScript像JavaScript一样，可以操作数组元素，有两种声明数组的方式。  
第一种：可以在元素类型后面街上（[]），表示此类型元素是一个数组：  
```typescript
let list:number[] = [1,2,3,4];
```  
第二种：使用数组的泛型，Array<元素类型>：  
```typescript
let list:Array<number> = [1,2,3,4];
```  

**元组 Tuple**  
数组合并了相同类型的对象，而元组合并了不同类型的对象  
```typescript
let x : [string,number,boolean,number];
x = ['hello',10,true,20];

console.log(x[0].substr(0));  //截取hello字符串，从下标0开始，输出hello
console.log(x[1]);     //输出数组10
```  
**枚举 Enum**  
enum类型是对javascript标准数据类型的一个补充，像java等其他语言一样，使用枚举类型可以为一组数值赋予友好的名字  
```typescript
enum Color{Red,Green,Blue};
let c:Color = Color.Red;

/*枚举类型提供了一个便利就是可以由枚举的值得到它的名字。
例如：我们知道数值为2，但是不确定它映射到Color里是那个名字，我们可以查找相应的名字*/
let colorName : string = Color[2];
console.log(colorName);
```  
对应的js文件代码为：  
```javascript
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Red;
/*枚举类型提供了一个便利就是可以由枚举的值得到它的名字。
例如：我们知道数值为2，但是不确定它映射到Color里是那个名字，我们可以查找相应的名字*/
var colorName = Color[2];
console.log(colorName);
```  

**任意值 Any**  
任意值用来表示允许赋值为任意类型  
如果是一个普通类型，在赋值的过程中改变类型是不允许的  
```typescript
let s:string = 'seven';
a:7;   //这里会报错
```  
如果是any类型，则允许被赋值为任意类型  
```typescript
let a:any = 'seven';
a = 7;   
a = true;       //这三种类型都是可以的
```  
任意值的应用场景：变量值来自用户输入或者第三方代码库  
注意：如果变量在声明时未指定其类型，那么它会被识别为任意类型。  

**联合类型**  
联合类型表示取值可以为多种类型的一种  
```typescript
//联合类型表示取值可以为多种类型的一种
let unite:string|number;
unite = 1;
unite = 'one';
//unite = true;    error  并没有声明boolean类型
```  

### TypeScript变量的声明  
javascript中有三种定义变量的方式var，let，const（let、const是ES6新增的关键字），并不是TypeScript特有的。  
下面简要说说三者的区别：  
1、const定义的变量不可修改，而且必须初始化  
```typescript
const a = 2;
const b ;  //错误，必须初始化
console.log('函数外const定义的a：'+ a);  //2
a =3;       //无法修改变量a的值
```  
2、var定义的变量可以修改，如果不初始化会输出undefined，不会报错，且存在变量提升现象（先使用再定义）  
```typescript
var b = 1;
var c;   //不会报错
console.log('函数外var定义b ' + b);   //1
function change(){
    c = 4;
    console.log('函数外var定义b ' + c);   //  c= 4
}
change();
console.log('函数调用var定义c为函数内部修改的值 ' + c);   //c = 4
```  
3、let是块级作用域，声明的变量只在它所在的代码块内生效，不会出现变量提升的现象  
```typescript
{
    var b = 1;
    let a = 10;
}
console.log(b);  // b = 1
console.log(a);  //报错  a is not defined

//let不像var那样，会出现变量提升的现象
c =1;
console.log(c);
d = 10;
console.log(d);
var c;
let d;  //错误:(16, 13) TS2448:Block-scoped variable 'd' used before its declaration.

//不能像var在一个作用域里面声明多次相同的变量
let x:number = 10;
let x:number = 20;  //错误:(22, 5) TS2451:Cannot redeclare block-scoped variable 'x'.
```  
块级作用域的应用场景：用来计数的循环变量泄漏为全局变量  
```typescript
for (var i=0;i<10;i++){
    setTimeout(function () {
        console.log(i)
    },1000);
```  
注意：尽可能的使用let来替换var  

### TypeScript类型推论  
以下代码虽然没有指定类型，但是在编译的时候会报错：  
```typescript
let a = 'one';
a = 7;
```  
事实上，它等价于：  
```typescript
let a : string = 'one';
a = 7;   
```  
typescript会在没有明确的指定类型的时候推测出一个类型，这就是类型推论。  

## 语法新特性详解  
### 类型注解  
TypeScript通过类型注解提供静态类型以在编译时启动类型检查。这是可选的，而且可以被忽略而使用Javascript常规的动态类型  
```typescript
function Add(left:number,right:number){
    return left + right;
}
```  
对于基本类型de注解是number、boolean和string，而弱或者动态类型的结构则是any类型  
当类型没有给出是，TypeScript编译器利用类型推论来推论类型，如果由于缺乏声明，没有类型可以被推断出，那么默认认为是any类型  
```typescript
function area(shape:string,width:number,height:number){
    var area = width * height;
    return "I'm a " + shape + " with an area of "+ area + "cm squared";
}
console.log(area("rectangle",30,15));
```  

### 接口  
1、在TypeScript中，接口的作用就是为类型命名和为代码或第三方代码定义契约  
2、只要在两个类型内部的结构兼容，那么这两个类型就是兼容的，这就允许我们在实现接口的时候只要保证包含了接口要求的结构就可以，而不必明确使用implements语句  
3、接口也可以作为一个类型注解  
```typescript
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
```  
需要注意的是，我们这里并不能像在其他语言里一样，说传给area对象实现这个接口，我们只会去关注值的外形，只要传入的对象满足接口定义的条件，那么它就是被允许的。还有一点值得提的是，类型检查器不会去检查属性的顺序，只要对应的属性存在并且类型正确就可以。  

### 类  

传统的JavaScript程序使用函授和原型的继承来创建可重用的组建，但是对于熟悉面向对象的程序员来说还是有点棘手，因为他们用的是基于类的继承并且对象是有类构建出来的。而在ES6中，我们终于迎来了class  
下面看一个例子：  
```typescript
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
```  

### 箭头函数表达式  
ES6允许使用箭头（=>）定义函数  
如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分  
```typescript
/*
箭头函数表达式写法 =>  参数=>函数
左边是参数部分，如果没有参数或需要多个参数，用()表示
右边是函数部分，格式为{代码块}
如果返回的是一个对象，必须在对象外面加括号*/

//没有参数
var f=()=>5;
//等同于
var f = function(){
    return 5;
}

//一个参数
var s=v=>v;
//等同于
var s = function (v) {
    return v;
}
//多个参数
var sum = (num1,num2) =>{
    return num1 + num2;
}
//等同于
var sum1 = function (num1,num2) {
    return num1 + num2;
}

//返回值为对象
var getTempTtem = id=>({id:1,name:"Temp"});
//等同于
var getTempTtem = function (id) {
    return ({ id: 1, name: "Temp" }); 
};
```  
()=>相当于js中的函数，它的好处是可以自动将函数中的this附加到上下文中去。  
尝试执行以下代码：  
```typescript
var shape = {
    name: "rectangle",
    popup: function () {
        var _this = this;
        console.log('this inside popup():' + this.name);
        setTimeout(function () {
            console.log('this inside setTimeOut():' + _this.name);
            console.log("I'm a " + _this.name);
        }, 3000);
    }
};
```  

### [装饰器](https://github.com/IFYOUUUU/Blog/blob/master/studynote/TypeScript/Decorators.md)  


## 项目配置  
**tsconfig.json**  
我们通常会往项目中加入一个TypeScript的配置文件（tsconfig），来知道编译器如何生成JavaScript文件  
`tsconfig.json`示例文件：  
```json
{
    "compilerOptions":{
        "target":"es5",                 //指定ECMAScript目标版本（默认ES3）
        "module":"commonjs",            //指定生成commomjs模块系统代码
        "moduleResolution":"node",      //决定如何处理模块
        "sourceMap":true,               //生成相应的.map文件
        "emitDecoratorMetaData":true,   //给源代码里装饰器声明加上设计类型元数据
        "experimentalDecorators":true,  //启用实验性的ES装饰器
        "removeComments":false,         //删除所有注释，除了以/!*开头的版权信息
        "noImplicitAny":false           //在表达式和声明上有隐含的any类型是报错
    },
    "include":[
        "src/**/*"
    ],
    "exclude":[
        "node_modules",
        "**/*.spec.ts"
    ]
}
```  
注：`compolerOptions`**可以被忽略，这时编译器会使用默认值**