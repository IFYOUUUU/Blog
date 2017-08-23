/**
 * Created by Administrator on 2017/8/23.
 */
//Symbol还可以用来创建私有属性，外部无法直接访问由symbol做为键的属性值。
(function() {
    // 创建symbol
    var key = Symbol("key");

    function MyClass(privateData) {
        this[key] = privateData;
    }

    MyClass.prototype = {
        doStuff: function() {
            return this[key];
        }
    };

})();

var c = new MyClass("hello")
c["key"] === undefined//无法访问该属性，因为是私有的