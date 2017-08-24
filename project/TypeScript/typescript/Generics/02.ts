/**
 * Created by Administrator on 2017/8/24.
 */
//泛型接口。
interface GenericIdentityFn {
    <T>(arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn = identity;

//我们把泛型参数直接当作整个接口的一个参数，这样就可以知道使用的是那种类型了。
interface GenericIdentityFn1<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}
let myIdentity1: GenericIdentityFn1<number> = identity;