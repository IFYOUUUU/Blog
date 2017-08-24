/**
 * Created by Administrator on 2017/8/24.
 */
//泛型约束

interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {   //extends关键字实现了约束
    console.log(arg.length);  // 这样就不会报错了
    return arg;
}
//loggingIdentity(3);  //此时的泛型函数定义了约束，不再适用任何数据类型了
loggingIdentity({length:2,value:3});   //我们传入的值必须得符合我们定义的约束，必须包含约束里定义的属性。