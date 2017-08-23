/**
 * Created by Administrator on 2017/8/21.
 */
enum Color{Red,Green,Blue};
let c:Color = Color.Red;

//默认情况下，跟数组一样，从下标0开始为元素编号。我们也可以自己手动赋值
enum Animal{Cat = 1,Dog = 2,Mouse};
let a:Animal = Animal.Mouse;

/*枚举类型提供了一个便利就是可以由枚举的值得到它的名字。
例如：我们知道数值为2，但是不确定它映射到Color里是那个名字，我们可以查找相应的名字*/
let colorName : string = Color[2];
console.log(colorName);