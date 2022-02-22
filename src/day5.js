// Generator 函数的语法
function* helloWorldGenerator(params) {
    yield 'hello';
       yield 'world';
          return 'ending';
}
var hw = helloWorldGenerator();
hw.next() // {value:'hello',done:false}
hw.next() // {value:'world', done:false}
hw.next() // {value:'ending',done:true}
hw.next() // {value:undefined, done:true}

var arr = [1,[[2,3],4],[5,6]];
var flat = function* (a) {
    a.forEach(function (item) {
        if (typeof item !== 'number') {
            yield* flat(item);
        } else {
            yield item;
        }
    });
};
for (var f of flat(arr)) {
    console.log(f);
}
//上面代码也会产生句法错误，因为forEach方法的参数是一个普通函数，但是在里面使用了yield表达式（这个函数里面还使用了yield*表达式，详细介绍见后文）。一种修改方法是改用for循环。

var arr = [1,[[2,3],4],[5,6]];
var flat = function* (a) {
    var length = a.length;
    for (var i = 0; i < length; i++) {
        var item = a[i];
        if (typeof item !== 'number') {
            yield* flat(item);
        } else {
            yield item;
        }
    }
}
for (var f of flat(arr)) {
    console.log(f);
}
// 1,2,3,4,5,6

// yield表达式如果用在另一个表达式之中，必须放在圆括号里面
function* demo(params) {
    console.log('Hello' + yield); // SyntaxError
    console.log('Hello' + yield 123);// SyntaxError
    console.log('Hello' + (yield)); // ok
    console.log('Hello' + (yield 123)); // ok
}


var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
}
[...myIterable]; // [1,2,3]


// next 方法的参数 
function* f() {
    for (var i = 0; true; i++) {
        var reset  = yield i;
        if (reset) {
            i = -1;
        }        
    }
}
var g = f();
g.next(); // {value:0, done:false}
g.next(); // {value:1, done:false}
g.next(true); // {value:0, done:false}

// 再看一个例子
function* foo(x) {
    var y = 2 * (yield (x + 1));
    var z = yield (y/3);
    return (x+y+z);
}
var a = foo(5);
a.next(); // {value:6, done:false}
a.next(); // {value:NaN, done:false}
a.next(); // {value:NaN, done:ture}

var b = foo(5);
b.next(); // {value:6, done:false}
b.next(12); //{value:8, done:false}
b.next(13); //{value:42, done:true}

function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return 'result';
}

let genObj = dataConsumer();
genObj.next();
// Started
genObj.next('a')
// 1. a
genObj.next('b')
// 2. b
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}

for (let v of foo()) {
  console.log(v);
}
// 1 2 3 4 5

function* helloWorldGenerator() {
    console.log('start');
    yield 'hello';
    console.log('second');
    yield 'world';
    console.log('3');
    return 'ending';
}
var hw = helloWorldGenerator();
hw.next();
hw.next();
hw.next();
hw.next();

var arr = [1,[[2,3],4], [5,6]];
var flat = function* (a) {
    var length = a.length;
    for (var i = 0; i < length; i++) {
        var item = a[i];
        if (typeof item !== 'number') {
            yield* flat(item);
        }else{
            yield item;
        }
    }
}
for (var f of flat(arr)) {
    console.log(f);
}

function* demo(params) {
    console.log('Hello1' + (yield));
    console.log('Hello2' + (yield 123));
}
let myDemo = demo();
myDemo.next('555');
myDemo.next('666');
myDemo.next('999');

var myIterable = {};
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
console.log([...myIterable]); // [1,2,3]


// next方法的参数
function* f() {
    for (var i=0; true; i++) {
        var reset = yield i;
        if (reset) {
            i = -1;
        }
    }
}
var g = f();
g.next(); // { value: 0, done: false }
g.next(); // { value: 1, done: false }
g.next(true); // { value: 0, done: false }

function* foo(x) {
    var y = 2 * (yield (x+1));
    var z = yield (y/3);
    return (x+y+z);
}

function* dataConsumer() {
    console.log('Started');
    console.log(`1.${yield}`);
    console.log(`2.${yield}`);
    return 'result';
}
let genObj = dataConsumer();
genObj.next();
genObj.next('a');
genObj.next('b');

function* foo() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}
for (let v of foo()) {
    console.log(v);
}



function* numbers() {
    yield 1;
    yield 2;
    return 3;
    yield 4;
}

// 扩展运算符
[...numbers()] // [1,2]

// Array.from 方法
Array.from(numbers()); // [1,2]

// 解构赋值
let [x,y] = numbers();
x // 1
y // 2

// for...of 循环
for (let n of numbers()) {
    console.log(n);
}
// 1
// 2

var g = function* () {
    try {
        yield;
    } catch (e) {
        console.log('内部捕获',e);
    }
}
var i = g();
i.next();
try {
    i.throw('a');
    i.throw('b');
} catch (e) {
        console.log('外部捕获',e);
}

var gen = function* gen() {
    yield console.log('hello');
    yield console.log('world');
}
var g = gen();
g.next();
g.throw();

var gen = function* gen() {
    try {
        yield console.log('a');
        yield console.log('b');
    } catch (error) {
        console.log('出错了');
    }
    yield console.log('c');
}
var g = gen();
g.next();
g.throw();
// g.next();


function* g() {
    yield 1;
    console.log('throwing an exceptio');
    throw new Error('generator broke!');
    yield 2;
    yield 3;
}
function log(generator) {
    var v;
    console.log('starting generator');
    try {
        v = generator.next();
        console.log('第一次运行next方法',v);
    } catch (error) {
        console.log('捕捉错误', v);
    }

    try {
        v = generator.next();
        console.log('第二次运行next方法', v);
    } catch (error) {
        console.log('捕捉错误', v);
    }

    try {
        v = generator.next();
        console.log('第三次运行next方法', v);
    } catch (error) {
        console.log('捕捉错误', v);
    }
    console.log('caller done');
}
log(g());

function* gen() {
    yield 1;
    yield 3;
    yield 2;
}
var g = gen();
g.next(); // {value:1, done:false}
g.return('foo'); // {value: "foo", done: true}
g.next(); // { value: undefined, done: true }

function* numbers() {
    yield 1;
    try{
        yield 2;
        yield 3;
    }finally{
        // yield 4;
        // yield 5;
    }
    yield 6;
}
var g = numbers();
g.next();
g.next();
var tmp = g.return(9);
console.log(tmp);
// g.next()

function* foo() {
    yield 'a';
    yield 'b';
}

function* bar() {
    yield 'x';
    // 手动遍历 foo()
    for (let i of foo()) {
        console.log(i);
    }
    yield 'y';
}
for (let v of bar()) {
    console.log(v);
}

function* bar() {
    yield 'x';
    yield* foo();
    yield 'y';
}

// 等同于
function* bar() {
    yield 'x';
    yield 'a';
    yield 'b';
    yield 'y';
}

// 等同于
function* bar() {
    yield 'x';
    for (let v of foo()) {
        yield v
    }
    yield 'y';
}

function* inner() {
    yield 'hello!';
}
function* outer1() {
    yield 'open';
    yield inner();
    yield 'close';
}
var gen = outer1();
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);

function* outer2() {
    yield 'open';
    yield* inner();
    yield 'close';
}

var gen = outer2();
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().value);


function* foo() {
    yield 2;
    yield 3;
    return "foo";
}
function* bar() {
    yield 1;
    var v = yield* foo();
    console.log("v: "+v);
    yield 4;
}
var it = bar();

function* genFuncWithReturn() {
    yield 'a';
    yield 'b';
    return 'The result';
}
function* logReturned(genObj) {
    let result = yield* genObj;
    console.log(result);
}
console.log([...logReturned(genFuncWithReturn())]);

