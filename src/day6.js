// Symbol

// Object.getOwnPropertySymbols方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
const obj = {};
let a = Symbol('a');
let b = Symbol('b');
obj[a] = 'Hello';
obj[b] = 'World';
const objectSymbols = Object.getOwnPropertySymbols(obj);
objectSymbols // [Symbol(a), Symbol(b)]

// 下面是另一个例子， Object.getOwnPropertySymbols 方法与 for...in 循环、 Object.getOwnPropertyNames 方法进行对比的例子。

const obj = {};
let foo = Symbol('foo');
Object.defineProperties(obj, foo, {
    value:'foobar'
});
for (let i in obj) {
    console.log(i); // 无输出
}
Object.getOwnPropertyNames(obj); //[]
Object.getOwnPropertySymbols(obj); // [Symbol(foo)]

//另一个新的 API， Reflect.ownKeys 方法可以返回所有类型的键名，包括常规键名和 Symbol 键名。
const obj = {
    [Symbol('my_key')]: 1,
    enum: 2,
    nonEnum: 3
}
Reflect.ownKeys(obj); // [Symbol(my_key), "enum", "nonEnum"]

//由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法
let size  = Symbol('size');
class Collection{
    constructor(){
        this[size] = 0;
    }
    add(item){
        this[this[size]] = item;
        this[size]++;
    }
    static sizeOf(instance){
        return instance[size];
    }
}
let x  = new Collection();
Collection.sizeOf(x); // 0

x.add('foo');
Collection.sizeOf('x') // 1

Object.keys(x); // ['0']
Object.getOwnPropertyNames(x); // ['0']
Object.getOwnPropertySymbols(x); // [Symbol(size)]


//6. 实例:模块的 Singleton 模式
// mod.js
function A(params) {
    this.foo = 'hello';
}
if(!global._foo){
    global._foo = new A();
}
module.exports = global._foo;

// Symbol.isConcatSpreadable
// 对象的 Symbol.isConcatSpreadable 属性等于一个布尔值，表示该对象用于 Array.prototype.concat() 时，是否可以展开。
let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1,'e'); // ['a', 'b', 'c', 'd', 'e']
arr1[Symbol.isConcatSpreadable] // undefined

let arr2  = ['c', 'd'];
arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e'); // ['a', 'b', ['c', 'd'], 'e']