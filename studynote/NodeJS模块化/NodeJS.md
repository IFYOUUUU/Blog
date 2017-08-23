# NodeJS基础  

## 1、什么是NodeJS  
JS是脚本语言，脚本语言都是需要一个解析器才能运行。对于写在HTML里面的JS，浏览器充当了解析器的角色，而对于需要独立运行的JS文件，NodeJS就是一个解析器。  
每一种解析器都是一个运行环境，不但允许JS定义各种数据结构，进行各种运算，还允许JS使用运行环境提供的内置对象和方法做一些事情。例如运行在浏览器中的JS的用途是操作DOM，浏览器就提供了document之类的内置对象。而运行在NodeJS中的JS的用途是操作磁盘文件或搭建HTTP服务器，NodeJS就相应提供了fs、http等内置对象。  

## 2、NodeJS的用处  
NodeJS作者说，他创造NodeJS的目的是为了实现高性能Web服务器，他首先看中的是事件机制和异步IO模型的优越感，而不是JS。但是他需要选择一种编程语言实现他的想法，这种编程语言不能自带IO功能，并且需要能良好支持事件机制。JS没有自带的IO功能，天生就是用于处理浏览器中的DOM事件，并且拥有大量的程序员，因此JS就成为了天然的选择。  

## 3、如何安装  
参考[Web开发环境搭建指南](http://www.runoob.com/nodejs/nodejs-install-setup.html)  

## 4、NodeJS模块  
编写稍大一点的程序时一般都会将代码模块化。NodeJS实现了[CommonJS规范]()。在NodeJS中，一般讲代码合理拆分到不同的JS文件中，每一个文件就是一个模块，而文件路径就是模块名。  
在编写每一个模块时，都有exports、module、require三个预先定义好的变量可供使用。  

### 4.1 exports  
exports对象用于导出模块公有方法和属性。以下的例子中导出了公有方法。  
```js
exports.hello = function(){
    console.log("Hello World");  
};
```  
### 4.2 module  
通过`module`对象可以访问到当前模块的一些相关信息。  
* __module.id__  返回string类型的模块标识，一般为绝对路径。  
* __module.filename__ 返回一个string类型的完全解析后文件名  
* __module.loaded__ 返回一个boolean类型，表示是否加载完成。  
* __module.parent__  返回引用该模块的模块  
* __module.children__ 返回该模块引用的所有模块对象的数组  
* __module.paths__ 返回一个数组。从当前文件开始查找`node_modules`目录，然后依次进入父目录，查找父目录的`node_modules`目录，知道跟目录的`node_modules`目录。如果当前文件路径为`c:\\projects\\nodejs\\indexx.js`,module.paths的值为：  `['c:\\projects\\nodejs\\node_modules','c:\\projects\\node_modules','c:\\node_modules']`  
* __module.exports__ 属性表示当前模块对外输出接口。  

__`exports`和`module.exports`的区别__  

```js
exports.hello = function(){
    console.log("Hello World!");
}
module.exports = {
    hello : function(){
        console.log("Hello World!");
    }
}
```  
`module.exports`才是真正的接口，`exports`只不过是它的一个辅助工具，最终返回给调用的是`module.exports`而不是`exports`。  
所有的`exports`收集到的属性和方法，都赋值给了`module.exports`。当然，这个的前提是`module.exports`本身不具备任何属性和方法的。如果`module.exports`已经具备一些属性和方法，那么`exports`收集来的信息将被忽略，所以：  
* 最好不要分别定义`module.exports`和`exports`.  
* NodeJS开发者建议导出对象是用`module.exports`，导出多个方法和变量用`exports`.  

### 4.3 require  
`require`函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。模块名可以使用绝对路径（以/或C:之类的盘符开头），也可以使用相对路径（以./或../开头）。另外，模块名中的.js扩展名可以省略，如：  
```js
var service1 = require('/service.js');      //绝对路径
var service1 = require('c:/service.js');    //绝对路径
var service1 = require('./service.js');     //相对路径
var service1 = require('../service.js');    //相对路径
var service1 = require('/service');         //省略.js扩展名
```  

### 4.4 加载内置模块  
NodeJS自带的模块，可以直接通过模块名来引用。内置模块拥有最高的加载优先级，及时已经有了一个同名的第三方模块，内置模块也会被优先加载。  
例如，如果想加载和使用http核心模块，可以这样做：  
```js
var http = require('http);
```  

### 4.5 加载文件模块  
使用绝对路径从文件系统里加载模块：  
```js
var service1 = require('/service.js');
var service2 = require('c:/service.js');
```  
使用基于当前文件的相对路径加载模块：  
```js
var service3 = require('./service');
var service4 = require('../service');
```  
注意上面的代码，可以忽略文件的扩展名。如果NodeJS找不到这个文件，会依次尝试添加扩展名（.js.json.node）后再查找。NodeJS支持4种文件类型的模块  
* 没有扩展名的文件，作为javascript脚本文件加载  
* .js  
* .json,json转换为javascript对象返回  
* .node,通过C/C++进行编写的模块  

### 4.6 加载目录模块  
使用目录的路径加载模块  
```js
var service5 = require('./service');
```  
service目录结构  
```
-service/
    package.json
    index,js
```  
package.json  
```json
{
    "name" : "service",
    "version" : "0.0.1",
    "main" : "main.js"
}
```  
如果service是一个目录，NodeJS会尝试在这个目录下查找包定义文件package.json的main属性指定的js文件，如果没有找到则会依次查找目录下的index.js,index.json,index.node  

### 4.7 加载node_modules目录里的模块  
`node_modules`目录是NPM安装模块的默认位置，这个设计把NodeJS和NPM关联在一起了。可以简单的使用NPM安装、更新和删除包，它会帮你维护`node_modules`目录。  
`require`的参数不是路径也不是内置模块名  
```js
var service = require('service')
```  
NodeJS会在当前目录的`node_modules`子目录下，先把service当作文件模块查找，再当作目录模块查找。如果没有找到，会继续在上级目录的node_modules子目录中查找，直到根目录为止。  

### 4.8 加载DODE_PATH环境变量中的模块  
NodeJS最后会去查找`NODE_PATH`环境变量指定目录下的模块，环境变量需要用户手动添加，变量名为`NODE_PATH`,值为目录路径。如果需要NodeJS加载全局安装包，就要把全局安装包的目录路径加入到环境变量中去，修改环境变量后，需要重启node.exe。

### 4.9 require.cache  
`require.cache`对象可以访问以缓存的模块  
`require.cache`是键值对的结构，键为module.id，值为模块导出对象。  
可以通过键名访问模块缓存：  
```js
require.cache['moduleId'];
```  
使用`delete`关键字删除模块缓存  
```js
delete require.cache['moduleId'];
```  
模块中的js代码仅在模块第一次被使用时执行一次，并在执行过程中初始化模块导出对象。然后缓存导出对象，之后使用该模块时，直接返回缓存中的模块导出对象。  

### 4.10 循环依赖  
简单的来说就是a模块`require`b模块，b模块`require`a模块。看一个简单的例子：  
a.js  
```js
console.log('a strating');
exports.done = false;
var b = require('./b');
console.log(b);
console.log('in a,b.done = %j', b.done);
exports.done =true;
console.log('a.done');
```  
b.js
```js
console.log('b starting');
exports.done = false;
var a = require('./a');
console.log(a);
console.log('in b,a.done = %j',a.done);
exports.done = true;
console.log('b done');
```  
index.js  
```js
var a = require('./a');
var b = require('./b');
```  
NodeJS的`require`是同步执行，所以运行index.js的流程如下：  
```js
//a.js                                              //b.js
console.log('a strating');
exports.done = false;
var b = require('./b');
                                                    console.log('b starting');
                                                    exports.done = false;
                                                    var a = require('./a');
                                                    console.log(a);
                                                    console.log('in b,a.done = %j',a.done);
                                                    exports.done = true;
                                                    console.log('b done');

console.log(b);
console.log('in a,b.done = %j', b.done);
exports.done =true;
console.log('a.done');

//结果为：
a strating
b starting
{ done: false }
in b,a.done = false
b done
{ done: true }
in a,b.done = true
a.done
```  
执行a模块的代码时，会将a模块的`module_exports`放入缓存中。`require`b模块时，缓存中没有b模块，所以执行b模块的代码。b模块中`require`a模块时，缓存中已经有了a模块（此时a.done = false），直接返回缓存中的a模块的module.exports，不会再去执行a模块的代码，所以不会引起重复加载的死循环。  

## 5.模块查找顺序  
```js
require(x)
```  
1、如果x是内置模块，加载并返回内置模块。  
2、如果x是路径，先当作文件模块查找，在当作目录模块查找。  
3、node_modules里面查找  

![require](https://github.com/IFYOUUUU/Blog/blob/master/images/NodeJS/require.jpg)  

## 6.package.json介绍  
package.json是CommonJS规范的用来描述包的文件，该文件包含的字段有：  
* name：包名，必须是唯一的，由小写英文字母、数字和下划线组成，不能包括空格，不要在name中包含js、node字样；这个名字最终会是url的一部分，命令行的参数、目录名，所以不能以（.）或(_)开头；这个名字可能在require()方法中被调用，所以应该尽可能短。  
* version：符合语义化版本识别规范的版本字符串，通常是xy.z,即主版本号.副版本号.补丁版本号，要能被node_server解析  
* description:包的简要说明，字符串，搜索时用到  
* keywords：关键字数组，通常用于搜索。  
* contributors:贡献者数组，格式与maintainers相同。包的作者应该是贡献者数组的第一个元素  
* bugs：提交bug的地址，可以是网址或者电子邮件地址  
* license：许可证数组，让人知道使用的权利和限制。每个元素要包含type（许可证的名称）和url（链接到许可证文本的地址）字段  
* repository：仓库托管地址数组，指示代码存放位置  
* dependencies：包的依赖，一个关联数组，指示当前包依赖的其他包，由包名称和版本组成  
* maintainers：包的维护者，数组元素是一个包含name、email、web三个属性的JSON对象  

## 7.练习  []()  
服务端采用NodeJS，以httpserver将服务提供客户端查询展示  
要求：  
1、服务端采用CommonJS规范提供服务。  
2、服务描述：初始化一个警情数组并采用Lodash按警情id排序，将排序的结果发送给客户端，其中，警情包含如下属性：警情id（数字型，为主键）、警情标题（字符串）、警情事发地址（字符串）、报警人（字符串）。  
3、客户端可根据报警人查询警情详细信息。  
4、客户端模块采用AMD规范。