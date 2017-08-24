# 泛型（Generics）  

我们在定义良好的API时，同时还需要考虑重用性的问题，而**泛型**的出现正好可以来创建重用性组件，一个组件可以支持多种类型的数据。  

## 泛型函数的定义  

我们来看一个简单的例子：identity函数。 这个函数会返回任何传入它的值。  
```typescript
//如果不使用泛型的话，这个函数可能是这样的
function identity(arg:number):number{
    return arg;     //只能接受和返回数值类型的参数
}
//或者用any类型来定义函数：
function identity(arg:any):any{
    return arg;
}
```  
虽然使用any类型后这个函数已经能接收任何类型的arg参数，但是还是无法确认一些信息：传入的类型与返回的类型是否是相同的。  
比如我们传入的类型是数值的，而返回的我们只知道是任何类型的。  
因此我们需要一种方法来确认传入的类型和返回类型相同的，这里我们就用到了**类型变量**，它是一种特殊的变量，只用于表示类型，与值无关。  
```typescript
//就上面的identity函数来说
function identity<T>(arg:T):T{
    return arg;
}
//我们给identity添加了类型变量T。 T帮助我们捕获用户传入的类型（比如：number），之后我们就可以使用这个类型。
// 之后我们再次使用了 T当做返回值类型,这样我们可以控制参数类型与返回值类型是相同的。
```  
这种定义函数的方式我们称为泛型函数，它可以适用于多种类型。  

## 泛型函数的使用  
有两种使用的方式：  
第一种：传入所有的参数，包括类型变量：  
```typescript
//这里我们明确的指定了T是string类型，并做为一个参数传给函数，使用了<>括起来而不是()
function identity<T>(arg:T):T{
    return arg;
}
let output = identity<string>("hello world");
```  
第二种：利用**类型推论**来确定T的类型（这种应用最多）：  
```typescript
function identity<T>(arg:T):T{
    return arg;
}
let output = identity("hello world");
//根据传入的参数"hello world"，编译器可以自动推断出T是string类型。
```  

## 使用泛型变量  
通过上面的泛型函数的使用，编译器要求你在函数体必须正确的使用这个通用的类型。 换句话说，你必须把这些参数当做是任意或所有类型。  
如果说我们想要知道参数的长度？按照上面的写法的话应该如下：  
```typescript
function identity<T>(arg:T):T{
    console.log(arg.length);     //这样定义是错的，因为我们无法确认传入参数的类型，如果是number类型，是没有.length属性的
    return arg;
}
```  
想到length属性，首先想到的是数组，那么我们是否可以将操作T改变成直接操作T类型的数组呢？答案是肯定，我们可以像创建其他数组一样创建这个数组：  
```typescript
function loggingIdentity<T>(arg:T[]):T[] {
    console.log(arg.length);
    return arg;
}
//我们可以这样理解这个泛型函数，定义了一个类型参数T和参数arg，arg是一个元素类型为T的数组，返回的也是类型为T的数组。如果我们传入数字数组，将返回一个数字数组，//因为此时 T的的类型为number。 这可以让我们把泛型变量T当做类型的一部分使用，而不是整个类型，增加了灵活性。  
```  
还有另外一种方式来定义：  
```typescript
//这种定义方式和我们之前使用的java语言类似。
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);  
    return arg;
}
```  

## 泛型接口  
```typescript
interface GenericIdentityFn {
    <T>(arg: T): T;       
}

function identity<T>(arg: T): T {   
    return arg;           
}

let myIdentity: GenericIdentityFn = identity;  
```  
这种定义的接口的方式弊端在于我们无法清楚的知道我们使用的是那个泛型类型，而下面这种方式却可以解决这个问题：  
```typescript
interface GenericIdentityFn<T> {   //我们把泛型参数直接当作整个接口的一个参数，这样就可以知道使用的是那种类型了。
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}
let myIdentity: GenericIdentityFn<number> = identity;
```  

## 泛型类  
泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。  
```typescript
class MyClass<T>{
    x:T;
    y:T;
    show(x:T):T{

        return x;
    }
}

let class1 = new MyClass<number>();  //可以创建不能类型的实例
let class2 = new MyClass<string>();
console.log(class1.show(1));
console.log(class2.show("str"));
```  

## 泛型约束  
 在下面这个例子中，我们想访问arg的length属性，但是编译器并不能证明每种类型都有length属性，所以就报错了。  
 ```typescript
function loggingIdentity<T>(arg: T): T {
    console.log(arg.length);  //这样定义肯定会报错的，无法确认参数类型，也就无法确认是否有length属性
    return arg;
}
 ```  
 我们想要限制函数去处理任意带有.length属性的所有类型。 只要传入的类型有这个属性，我们就允许，就是说至少包含这一属性。  

 为此，我们定义一个接口来描述约束条件。 创建一个包含 .length属性的接口，使用这个接口和extends关键字还实现约束：  
 ```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {   //extends关键字实现了约束
    console.log(arg.length);  // 这样就不会报错了
    return arg;
}
loggingIdentity(3);  //此时的泛型函数定义了约束，不再适用任何数据类型了
loggingIdentity({length:2,value:3});   //我们传入的值必须得符合我们定义的约束，必须包含约束里定义的属性。
 ```