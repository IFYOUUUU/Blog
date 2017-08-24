/**
 * Created by Administrator on 2017/8/24.
 */
function identity<T>(arg:T):T{
    return arg;
}
let output = identity("hello world");
console.log(output);