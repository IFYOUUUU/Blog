<!--TOC-->
- [TypeScript入门教程]()
    - [什么是javascript]()
    - [必备知识]()
    - [语法特性]()
    - []()
        - []()
        - []()
    - []()
        - []()
        - []()
    - []()
    - []()
        - []()
        - []()
        - []()
    - []()
        - []()
        - []()
        - []()
        - []()
        - []()
    - []()
<!--/tov-->

# TypeScript入门教程  

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

## 


