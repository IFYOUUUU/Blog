# CommonJS模块定义规范  
在commonjs规范中，一个模块就是一个文件  

## Mudole Context (模块环境)  
每个模块中都有变量**require、exports、module**  
### **require**  
* `require`是一个方法，接受一个参数，即模块标识符  
* `require`返回外部模块输出的**API**  

### **exports**  
* `exports`是一个对象，模块对外输出的**API**就绑定在这个对象上  
* `exports`是模块对外输出**API**的唯一途径  

### **modole**  
* `module`是一个对象，这个对象有一个**id**属性，表示的是该模块的**id**，是一个只读属性  
* `module`对象可以有一个**URL**属性  

## Module Identifiers（模块的标识符）  
* 模块标识符是以斜杠（/）分割的多项组成的字符串  
* 每项必须是一个驼峰命名法的标识符或者"(.)","(..)"的形式  
* 模块标识符可以不加文件的扩展名，例如 ".js"  
* 模块标识符可以是**相对的**或**顶级的**，如果模块标识符的第一项是"."或".."，则这个是相对标识符  
* 顶级标识符是根据路径来解析的  
* 相对标识符是根据调用**require**的模板的标识符来解析的  

## 示例代码  

**math.js**  
```javascript
exports.add = function(){
    var sum =0,i=0,args = arguments,l = args.length;
    while(i < l){
        sum += args[i++];
    }
    return sum;
}
```  
**increment.js**  
```js
var add = require('math').add;
exports.increment = function (val) {
    return add(val,1);
}
```  
**program.js**  
```js
var inc = require('increment').increment;
var a = 1;
inc(a);  //2
```