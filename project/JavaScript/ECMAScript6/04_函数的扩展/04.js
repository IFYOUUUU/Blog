/**
 * Created by Administrator on 2017/8/23.
 */
/*ES6中新增的箭头操作符=>便有异曲同工之妙。它简化了函数的书写。
操作符左边为输入的参数，而右边则是进行的操作以及返回的值Inputs=>outputs。

我们知道在JS中回调是经常的事，而一般回调又以匿名函数的形式出现，
每次都需要写一个function，甚是繁琐。当引入箭头操作符后可以方便地写回调了。*/

var array = [1, 2, 3];
//传统写法
array.forEach(function(v, i, a) {
    console.log(v);
});
//ES6
array.forEach(v => console.log(v));


var f = () => 5;
//等同于
var f =function(){
    return 5;
};

var sum = (sum1,sum2) => {
    return num1 + num2;
};
//等同于
var sum = function(num1,num2){
    return num1 + num2;
}