/**
 * Created by Administrator on 2017/8/24.
 */
//泛型类看上去与泛型接口差不多。 泛型类使用（ <>）括起泛型类型，跟在类名后面。
var MyClass = (function () {
    function MyClass() {
    }
    MyClass.prototype.show = function (x) {
        return x;
    };
    return MyClass;
}());
var class1 = new MyClass(); //可以创建不能类型的实例
var class2 = new MyClass();
console.log(class1.show(1));
console.log(class2.show("str"));
