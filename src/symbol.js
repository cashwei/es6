// 作为属性名的Symbol
let mySymbol = Symbol();
//第一种写法
let a = {};
a[mySymbol] = 'Hello';
// 第二种写法
let a = {
    [mySymbol] = 'Hello'
};
// 第三种写法
let a = {};
Object.defineProperty(a,mySymbol,{value:'Hello'});

const COLOR_RED = Symbol();
const COLOR_GREEN = Symbol();
function getComplement(color) {
    switch (color) {
        case COLOR_RED:
            return COLOR_GREEN
        case COLOR_GREEN:
            return COLOR_RED;
        default:
            throw new Error('undefined color');
    }
}
const shapeType = {
    triangle:Symbol()
};
function getArea(shape,options) {
    let area = 0;
    switch (shape) {
        case shapeType.triangle: // 魔术字符串
            area = .5 * options.width * options.height;
            break;
    }
    return area;
}
getArea(shapeType.triangle,{width:100,height:100});

// 属性名的遍历
const obj = {};
let a = Symbol('a');
let b = Symbol('b');

obj[a] = 'Hello';
obj[b] = 'World';

const objectSymbols = Object.getOwnPropertySymbols(obj);
console.log(objectSymbols);

const obj = {};
let foo = Symbol('foo');
Object.defineProperty(obj,foo,{
    value:'foobar'
});
for (let i in obj) {
    console.log(i);
}
console.log(Object.getOwnPropertyNames(obj));
console.log(Object.getOwnPropertySymbols(obj));
console.log(Object.getOwnPropertyDescriptor(obj,foo));
console.log(Reflect.ownKeys(obj));

let size = Symbol('size');
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
let x = new Collection();
console.log(Collection.sizeOf(x));
x.add('foo')
console.log(Collection.sizeOf(x));
console.log(Object.keys(x));
console.log(Object.getOwnPropertyNames(x));
console.log(Object.getOwnPropertySymbols(x));

// Symbol.for(),Symbol.keyFor()
let s1 = Symbol.for('foo');
let s2 = Symbol.for('foo');
console.log(s1 === s2);
console.log(Symbol('bar')===Symbol('bar'));

let s1 = Symbol.for('foo');
console.log(Symbol.keyFor(s1));
let s2 = Symbol('foo');
console.log(Symbol.keyFor(s2));

//实例:模块的 Singleton 模式
// mod.js
const FOO_KEY = Symbol.for('foo');
function A() {
    this.foo = 'hello';
}
if(!global[FOO_KEY]){
    global[FOO_KEY] = new A();
}
module.exports = global[FOO_KEY]

// 内置的Symbol值
// Symbol.hasInstance
class MyClass{
    [Symbol.instance](foo){
        return foo instanceof Array;
    }
}

// Symbol.isConcatSpreadable
let arr1 = ['c','d'];
console.log(['a','b'].concat(arr1,'e'));
console.log(arr1[Symbol.isConcatSpreadable]);

let arr2 = ['c','d'];
arr2[Symbol.isConcatSpreadable] = false;
console.log(['a','b'].concat(arr2,'e'));

let obj = {length:2,0:'c',1:'d'};
console.log(['a','b'].concat(obj,'e'));

obj[Symbol.isConcatSpreadable] = true;
console.log(['a','b'].concat(obj,'e'));

class A1 extends Array{
    constructor(args){
        super(args);
        this[Symbol.isConcatSpreadable] = true;
    }
}
class A2 extends Array{
    constructor(args){
        super(args);
    }
    get [Symbol.isConcatSpreadable] (){
        return false;
    }
}

let a1 = new A1();
a1[0] = 3;
a1[1] = 4;
let a2 = new A2();
a2[0] = 5;
a2[1] = 6;
console.log([1,2].concat(a1,a2));
console.log([1,2].concat(a1).concat(a2));

// Symbol.species 指向当前对象的构造函数
class MyArray extends Array{
    // 覆盖父类Array的构造函数
    static get [Symbol.species](){return Array;}
}
let a = new MyArray(1,2,3);
let mapped = a.map(x => x * x);
console.log(mapped instanceof MyArray);
console.log(mapped instanceof Array);

// Symbol.match
