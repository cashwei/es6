// Iterator 和 for...of循环
var it = makeIterator = (['a', 'b']);

function makeIterator(array) {
    var nextIndex = 0;
    return {
        next:function() {
            return nextIndex < array.length ? {value: array[nextIndex++], done:false} : {
                value:undefined, done:true
            }
        }
    }
}

var it  = idMaker();

function idMaker() {
    var index = 0;
    return {
        next:function() {
            return {value:index++, done:false};
        }
    };
}

const obj = {
    [Symbol.iterator] : function() {
        return {
            next: function() {
                return {
                    value:1,
                    done:false
                };
            }
        };
    }
};

// 数组的Symbol.iterator
let arr = ['a','b','c'];
let iter = arr[Symbol.iterator]();
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

class RangeIterator{
    constructor(start, stop){
        this.value = start;
        this.stop = stop;
    }
    [Symbol.iterator](){return this}
    next(){
        var value = this.value;
        if (value < this.stop) {
            this.value++;
            return {done:false, value:value};
        }
        return {done:true, value:undefined};
    }
}
function range(start, stop) {
    return new RangeIterator(start, stop);
}

for (var value of range(0,3)) {
    console.log(value);
}


function Obj(value) {
    this.value = value;
    this.next = undefined;
}
Obj.prototype[Symbol.iterator] = function() {
    var iterator = {next:next};
    var current = this;
    function next() {
        if (current) {
            var value = current.value;
            current = current.next;
            return {done:false, value:value};
        }else{
            return {done:true};
        }
    }
    return iterator;
}
var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);

one.next = two;
two.next = three;

for (var i of one) {
    console.log(i);
}

let obj = {
    data:['hello', 'world'],
    [Symbol.iterator](){
        const self = this;
        let index = 0;
        return {
            next(){
                if (index < self.data.length) {
                    return {
                        value: self.data[index++],
                        done:false
                    };
                }else{
                    return {value:undefined, done:true};
                }
            }
        };
    }
};

let iterable = {
    0:'a',
    1:'b',
    2:'c',
    length:3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
    console.log(item);
}

let iterable = {
    a:'a',
    b:'b',
    c:'c',
    length:3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
    console.log(item);
}

var obj = {};
obj[Symbol.iterator] = () => 1;
[...obj];

var $iterator = ITERABLE[Symbol.iterator];
var $result = $iterator.next();
while (!$result.done) {
    var x = $result.value;
    // ...
    $result = $iterator.next();
}

// 调用 Iterator 接口的场合
// (1)对数组和 Set 结构进行解构赋值时，会默认调用 Symbol.iterator 方法
let set = new Set().add('a').add('b').add('c');
let [x,y] = set;
let [first,...rest] = set;
console.log(x);
console.log(y);
console.log(first);
console.log(rest);

// (2)扩展运算符
// 例一
var str = 'hello';
console.log([...str]);
// 例二
let arr = ['b','c'];
console.log(['a',...arr,'d']);

// yield*
// yield* 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口
let generator = function* () {
    yield 1;
    yield* [2,3,4];
    yield 5;
}
var iterator = generator();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());


// 字符串的 Iterator 接口
// 字符串是一个类似数组的对象，也原生具有 Iterator 接口
var someString = "hi";
console.log(typeof someString[Symbol.iterator]);

var iterator = someString[Symbol.iterator]();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

var str = new String('hi');
[...str];
str[Symbol.iterator] = function() {
    return {
        next:function() {
            if (this._first) {
                this._first = false;
                return {value:"bye",done:false};
            }else{
                return {done:true};
            }
        },
        _first:true
    };
};
[...str];


// Iterator 接口与 Generator 函数
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
}
console.log([...myIterable]);
// 或者采用下面的简洁写法
let obj = {
    *[Symbol.iterator](){
        yield 'hello';
        yield 'world';
    }
};
for (let x of obj) {
    console.log(x);
}

// 遍历器对象的 return()，throw()

function readLinesSync(file) {
    return {
        next: function() {
            return {done:false};
        },
        return: function() {
            file.close();
            return {done:true};
        }
    };
}
// 下面的三种情况，都 会触发执行 return 方法。
// 情况一
for (let line of readLinesSync(fileName)) {
    console.log(line);
    break;
}
// 情况二
for (let line of readLinesSync(fileName)) {
    console.log(line);
    continue;
}
// 情况三
for (let line of readLinesSync(fileName)) {
    console.log(line);
    throw new Error();
}

// for...of循环
// 数组
const arr = ['red','green','blue'];
for (let v of arr) {
    console.log(v);
}
const obj = {};
obj[Symbol.iterator] = arr[Symbol.iterator].bind(arr);
for (let v of obj) {
    console.log(v);
}

// for...of 循环可以代替数组实例的 forEach 方法
const arr = ['red', 'green', 'blue'];
arr.forEach(function(element,index) {
    console.log(element);
    console.log(index);
});

// JavaScript 原有的 for...in 循环，只能获得对象的键名，不能直接获取键值。ES6 提供 for...of 循环，允许遍历获得键值
var arr = ['a','b','c','d'];
for (let a in arr) {
    console.log(a);
}

for (let a of arr) {
    console.log(a);
}

// Set 和 Map 结构
// Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用 for...of 循环
var engines = new Set(["Gecko","Trident","Webkit","Webkit"]);
for (var e of engines) {
    console.log(e);
}

var es6 = new Map();
es6.set("edition",6);
es6.set("committee","TC39");
es6.set("standard","ECMA-262");
for (var [name,value] of es6) {
    console.log(name + ": " + value);
}

let map = new Map().set('a',1).set('b',2);
for (let pair of map) {
    console.log(pair);
}
for (let [key,value] of map) {
    console.log(key + ": " + value);
}

// 类似数组的对象
// 类似数组的对象包括好几类。下面是 for...of 循环用于字符串、DOM NodeList 对象、 arguments 对象的例子

// 字符串
let str = "hello";
for (let s of str) {
    console.log(s);
}

// DOM NodeList对象
let paras = document.querySelectorAll("p");
for (let p of paras) {
    console.log(p)
}

// arguments对象
function printArgs() {
    for (let x of arguments) {
        console.log(x);
    }
}
printArgs('a','b');

// 并不是所有类似数组的对象都具有 Iterator 接口，一个简便的解决方法，就是使用 Array.from 方法将其转为数组
let arrayLike = {length:2, 0:'a', 1:'b'};
// 报错
for (let x of arrayLike) {
    console.log(x);
}
// 正确
for (let x of Array.from(arrayLike)) {
    console.log(x);
}

// 对象
let es6 = {
    edition:6,
    committee:"TC39",
    standard:"ECMA-262"
};
for (let e in es6) {
    console.log(e);
}
for (let e of es6) {
    console.log(e);
}

// 一种解决方法是，使用 Object.keys 方法将对象的键名生成一个数组，然后遍历这个数组
for (var key of Object.keys(someObject)) {
    console.log(key + ": " + someObject[key]);
}
// 另一个方法是使用 Generator 函数将对象重新包装一下
function* entries(obj) {
    for (let key of Object.keys(obj)) {
        yield [key,obj[key]];
    }
}
for (let [key,value] of entries(obj)) {
    console.log(key,'->',value);
}

// 与其他遍历语法的比较
// 以数组为例，JavaScript 提供多种遍历语法。最原始的写法就是 for 循环
for (let index = 0; index < array.length; index++) {
   console.log(array[index]); 
}
// 这种写法比较麻烦，因此数组提供内置的 forEach 方法
myArray.forEach(function(value) {
    console.log(value);
});
// 这种写法的问题在于，无法中途跳出 forEach 循环， break 命令或 return 命令都不能奏效
// for...in 循环可以遍历数组的键名
for (var index in myArray) {
    console.log(myArray[index]);
}
