/**
 * Created by Administrator on 2017/8/24.
 */
//泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。
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