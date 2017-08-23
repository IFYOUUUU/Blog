/**
 * Created by Administrator on 2017/8/23.
 */
//标签模板

/*tag函数的第一个参数是一个数组，该数组的成员时模板字符串中那些没有变量替换的部分，也就是说，
变量替换只发生在数组的第一个成员和第二个成员之间，以此类推。tag函数的其他参数都是模板字符串各个变量被替换后的值，
由于本例中，模板字符串含有两个变量，因此tag会接收到value1和value2两个参数。
tag函数所有参数的实际值如下：
——第一个参数：['Hello ',' world ','']
——第二个参数：15
——第三个参数：50
也就是说tag函数实际上是以下面的形式调用的
tag(['Hello ',' world ',''],15,50);
我们可以按照需要编写tag 函数的代码。*/
var a = 5;
var b =10;
function tag(s,v1,v2){
    console.log(s[0]);
    console.log(s[1]);
    console.log(s[2]);
    console.log(v1);
    console.log(v2);
    return "OK";
}
tag`Hello ${ a + b } world ${ a * b }`;
//实际上等价于
tag(['Hello ',' world ',''],15,50);