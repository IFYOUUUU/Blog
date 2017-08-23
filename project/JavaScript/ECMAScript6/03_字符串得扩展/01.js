/**
 * Created by Administrator on 2017/8/23.
 */
//字符串的扩展，用反引号来表示（``）
//普通字符串
console.log(`In JavaScript '\n' is a line-feed.`);

//多行字符串
console.log(`In JavaScript this is
    
            not legal.`);

//字符串中嵌入变量
var name = "Bob",time = "today";
`Hello  ${name},how are you ${time} ?`

//模板字符串之中还能调用函数
function fn(){
    return "Hello World";
}
console.log(`foo ${fn()} bar`);