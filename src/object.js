// 属性的简洁表示法

let ms = {};

function getItem(key) {
   return key in ms ? ms[key] : null; 
}
function setItem(key,value) {
    ms[key] = value;
}
function clear() {
    ms = {}
}
module.exports = {getItem, setItem, clear};
// 等同于
module.exports = {
    getItem: getItem,
    setItem: setItem,
    clear: clear
};

const cart = {
    _wheels:4,
    get wheels(){
        return this._wheels;
    },
    set wheels(value){
        if (value < this._wheels) {
            throw new Error('数值太小了');
        }
        this._wheels = value;
    }
}

const o = {
    method(){
        console.log('method');
    },
    class(){
        console.log('Hello World!');
    }
}
o.method();
o.class();
// o['method']();
// o['class']();

const obj = {
    get foo(){},
    set foo(x){}
}
// console.log(obj.foo.name);
const dercriptor = Object.getOwnPropertyDescriptor(obj,'foo');
console.log(dercriptor.get.name);

const target = {a:1};
const source1 = {b:2};
const source2 = {c:3};
Object.assign(target,source1,source2);
console.log(target);

let o = Object.assign(2);
console.log(o);

const v1 = 'abc';
const v2 = true;
const v3 = 10;
const obj = Object.assign({},v1,v2,v3);
console.log(obj);
console.log(Object('abc'));
console.log(Object(true));
console.log(Object(10));

let obj = {a:'b'}
Object.assign(obj, {[Symbol('c')]:'d'});
console.log(obj);

const obj1 = {a:{b:1}};
const obj2 = Object.assign({},obj1);
console.log(obj1.a === obj2.a);

const target = {a:{b:'c'}};
const source = {a:10};
Object.assign(target,source);
console.log(target);

const source = {
    get foo(){
        return 1;
    },
    method(){
        return 'c';
    }
};
Object.defineProperty(source,'a',{
    enumerable:false,
    value:'b'
});
const target = {};
Object.assign(target,source);
console.log(source.a);
console.log(target.method());

// (1)为对象添加属性
class Point{
    constructor(x,y){
        Object.assign(this,{x,y});
    }
}
// (3)克隆对象
function clone(origin) {
    let originProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto),origin);
}
// (4)合并多个对象
const merge = (target,...source) => Object.assign(target,...source);
// 合并后返回新对象
const merge = (...source) => Object.assign({}, ...source);

// (5)为属性指定默认值
const DEFAULTS = {
    logLevel:0,
    outputFormat:'html'
}
function processContent(options) {
    options = Object.assign({},DEFAULTS,options);
    console.log(options);
}

// 属性的可枚举性和遍历
let obj = {
    foo: 123
}
let descriptor = Object.getOwnPropertyDescriptor(obj,'foo');
console.log(descriptor);

// 属性的可枚举性和遍历
// (1)for...in 循环遍历对象自身的和继承的可枚举属性(不含 Symbol 属性)。
// (2)Object.keys(obj) 返回一个数组，包括对象自身的(不含继承的)所有可枚举属性(不含 Symbol 属性)的键名。
// (3)Object.getOwnPropertyNames(obj) 返回一个数组，包含对象自身的所有属性(不含 Symbol 属性，但是包括不可枚举属性)的键名。
// (4)Object.getOwnPropertySymbols(obj) 返回一个数组，包含对象自身的所有 Symbol 属性的键名。
// (5)Reflect.ownKeys(obj) 返回一个数组，包含对象自身的所有键名，不管键名是 Symbol 或字符串，也不管是否可枚举。

const obj = {
    foo:123,
    get bar(){
        return 'abc'
    }
};
let descriptors = Object.getOwnPropertyDescriptors(obj);
console.log(descriptors);

const source = {
    set foo(value){
        console.log(value);
    }
}
const target1 = {};
Object.assign(target1, source);
console.log(target1.foo);

const source = {
    set foo(value){
        console.log(value);
    }
};
const target2 = {};
Object.defineProperties(target2,Object.getOwnPropertyDescriptors(source));

const shallowMerge = (target,source) => Object.defineProperties(target,Object.getOwnPropertyDescriptors(sourceObject.create))

// __proto__用来读取或设置当前对象的 prototype 对象
// es6的写法
const obj = {
    method: function() {}
}
obj.__proto__ = someOtherObj;
// es5的写法
var obj = Object.create(someOtherObj);
obj.method = function() {}

// Object.setPrototypeOf()
let proto = {};
let obj = {x:10};
Object.setPrototypeOf(obj,proto);
proto.y = 20;
proto.z = 40;

// Object.getPrototypeOf()

// super关键字
const proto = {
    foo: 'Hello'
}
const obj = {
    find(){
        return super.foo;
    }
}
Object.setPrototypeOf(obj,proto);
// console.log(obj.find());
console.log(obj.foo);

const proto = {
    x:'hello',
    foo(){
        console.log(this.x);
    }
}
const obj = {
    x:'world',
    foo(){
        super.foo();
    }
}
Object.setPrototypeOf(obj,proto);
obj.foo();

// Object.keys(), Object.values(), Object.entries()

// Object.keys()
var obj = {foo:'bar',baz:42};
console.log(Object.keys(obj));

let {keys,values,entries} = Object;
let obj = {a:1,b:2,c:3};
for (let key of keys(obj)) {
    console.log(key);
}
for (let value of values(obj)) {
    console.log(value);
}
for (let [key,value] of entries(obj)) {
    console.log([key,value]);
}

const obj = {foo:'bar',baz:42};
const map = new Map(Object.entries(obj));
console.log(map);

let {x,y,...z} = {x:1,y:2,a:3,b:4};
console.log(z instanceof Object);

let {a,b,x,y,...z} = {x:1,y:2,a:3,b:4};
console.log(z);

let o1 = {a:1};
let o2 = {b:2};
o2.__proto__ = o1;
let {...o3} = o2;
console.log(o3);

const o = Object.create({ x: 1, y: 2 });
o.z = 3;
let {x} = o;
// let { x, ...{ y, z } } = o;
console.log(x);
// console.log(y);
// console.log(z);

function baseFunction({a,b}) {
    // ...
}
function wrapperFunction({x,y,...restConfig}) {
    // 使用x和y参数进行操作
    // 其余参数传给原始函数
    return baseFunction(restConfig);
}   

// Null传导运算符
