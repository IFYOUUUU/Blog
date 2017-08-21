# 装饰器（Decorators）  

##介绍  
随着TypeScript和ES6里引入了类，在一些场景下我们需要额外的特性来支持标注或修改类及其成员。 装饰器（Decorators）为我们在类的声明及成员上通过元编程语法添加标注提供了一种方式。 Javascript里的装饰器目前处在 建议征集的第二阶段，但在TypeScript里已做为一项实验性特性予以支持。  
> **注意**：装饰器是一项实验性特性，在未来的版本中可能会发生改变。  
若要启用实验性的装饰器特性，你必须在命令行或tsconfig.json里启用experimentalDecorators编译器选项：  
**命令行**  
```
tsc --target ES5 --experimentalDecorators
```  
**tsconfig**  
```json
{
    "compilerOptions": {
        "target": "ES5",
        "experimentalDecorators": true
    }
}
```  

## 装饰器  
* 装饰器是一种特殊类型的声明，它能够被附加到类声明，方法， 访问符，属性或参数上。  
* 装饰器使用 `@expression`这种形式，`expression`求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入。  
例如，有一个@sealed装饰器，我们会这样定义sealed函数：  
```typescript
function sealed(target){
    // do something with "target" ...
}
```  
> **注意**：后面的类装饰器小节会有更加详细的例子。  

## 装饰器工厂  
如果我们要定制一个修饰器如何应用到一个声明上，我们得写一个装饰器工厂函数。 装饰器工厂就是一个简单的函数，它返回一个表达式，以供装饰器在运行时调用。  
我们可以通过下面的方式来写一个装饰器工厂函数：  
```typescript
function color(value:string){   //这是一个装饰器工厂
    return function (target){   //这是一个装饰器
        // do something with "target" and "value"  ....
    }
}
```  
> **注意**： 后面方法装饰器有详细的例子。  

## 装饰器的组合  
多个装饰器可以同时应用到一个声明上，就像下面的示例：  
* 书写在同一行上  
```typescript
@f @g x
```  
* 书写在多行上  
```typescript
@f
@g
x
```  
当多个装饰器应用于一个声明上，它们求值方式与复合函数相似。在这个模型下，当复合f和g时，复合的结果(f ∘ g)(x)等同于f(g(x))。  
同样的，在TypeScript里，当多个装饰器应用在一个声明上时会进行如下步骤的操作：  
1、由上至下依次对装饰器表达式求值。  
2、求值的结果会被当作函数，由下至上依次调用。  

如果我们使用装饰器工厂的话，可以通过下面的例子来观察它们求值的顺序：  
```typescript
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}
//输出的结果为：首先由上至下对装饰器进行求值，分别打印出f(): evaluated、g(): evaluated，
//然后求值的结果作为函数返回，由下至上依次调用，打印g(): called、f(): called
f(): evaluated
g(): evaluated
g(): called
f(): called
```  
## 装饰器求值  
类中不同声明上的装饰器将按以下规定的顺序应用：  
1、参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个实例成员。  
2、参数装饰器，然后依次是方法装饰器，访问符装饰器，或属性装饰器应用到每个静态成员。  
3、参数装饰器应用到构造函数。  
4、类装饰器应用到类。  

## Angular自带的装饰器
Angular使用自己的一套装饰器来实现应用程序各部分之间的互相操作  
`@Component`组件装饰器  
它把紧随其后的类标记成组件类，它能接收一个配置对象，Angular会根据这个信息创建和展示组件及其视图  
@Component的配置项包括：  
```json
moduleId:module.id,         //为与模块相关的URL提供基地址
selector:'my-clazzes',      //告诉Angular在父亲HTML查找<my-clazzes>标签，创建并插入该组件
templateUrl:'../html/clazzes.component.html',       //组件HTML模板的模块的模块相对地址
styleUrl:['../css/style.css','../css/clazzes.css']  
//provider：[ClazzService]  //组件所需服务的依赖注入提供商数组，告诉Angular该组件的构造函数需要一个ClazzService服务
```  
`@Injecttable装饰器`  
声明当前类有一些依赖，当依赖注入创建该类的实例时，这些依赖应该被注入到构造函数中  

`@Input、@Output装饰器`  
@Input声明一个输入属性，以便我们可以通过属性绑定更新它  
@Output声明一个输出属性，以便我们可以通过事件绑定进行订阅