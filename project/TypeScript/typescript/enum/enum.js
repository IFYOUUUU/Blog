/**
 * Created by Administrator on 2017/8/21.
 */
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
;
var c = Color.Red;
/*枚举类型提供了一个便利就是可以由枚举的值得到它的名字。
例如：我们知道数值为2，但是不确定它映射到Color里是那个名字，我们可以查找相应的名字*/
var colorName = Color[2];
console.log(colorName);
