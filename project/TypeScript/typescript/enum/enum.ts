/**
 * Created by Administrator on 2017/8/21.
 */
enum Color{Red,Green,Blue};
let c:Color = Color.Red;

/*枚举类型提供了一个便利就是可以由枚举的值得到它的名字。
例如：我们知道数值为2，但是不确定它映射到Color里是那个名字，我们可以查找相应的名字*/
let colorName : string = Color[2];
console.log(colorName);