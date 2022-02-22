// Generator 函数的语法
function* helloworldGenerator() {
    yield 'hello';
    yield 'world';
    // return 'ending';
    // return 'otherEnding';
    // console.log('123');
}
var hw = helloworldGenerator();
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());

// yield表达式

var arr = [1,[[2,3],4],[5,6]];
var flat = function* (a) {
    a.forEach(function(item) {
        if (typeof item !== 'number') {
            yield* flat(item);
        }else{
            yield item;
        }
    });
}
for (var f of flat(arr)) {
    console.log(f);
}

var flat = function* (a) {
    var length = a.length;
    for (let i = 0; i < length; i++) {
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

// 另外， yield 表达式如果用在另一个表达式之中，必须放在圆括号里面
function* demo() {
    // console.log('Hello' + yield); // SyntaxError
    // console.log('Hello' + yield 123); // SyntaxError

    console.log('Hello' + (yield));
    console.log('Hello' + (yield 123));
}

// next 方法的参数
// yield 表达式本身没有返回值，或者说总是返回 undefined 。 next 方法可以带一个参数，该参数就会被当作上一个 yield 表达式的返回值
function* f() {
    for(var i = 0; true; i++){
        var reset = yield i;
        if (reset) {
            i = -1;
        }
    }
}
var g = f();
g.next();
g.next();
g.next(true);

function* foo(x) {
    var y = 2*(yield (x+1));
    var z = yield (y/3);
    return (x+y+z);
}
var a = foo(5);
console.log(a.next());
console.log(a.next());
console.log(a.next());

var b = foo(5);
console.log(b.next());
console.log(b.next(12));
console.log(b.next(13));

function* dataConsumer() {
    console.log('Started');
    console.log(`1.${yield}`);
    console.log(`2.${yield}`);
    return 'result';
}
let genObj = dataConsumer();

genObj.next();
genObj.next('a');
console.log(genObj.next('b'));
console.log(genObj.next());
console.log(genObj.next('a'));
console.log(genObj.next('b'));

function wrapper(generatorFunction) {
    return function(...args) {
        let generatorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject;
    }
}
const wrapped = wrapper(function*() {
    console.log(`First input: ${yield}`);
    return 'DONE';
});
console.log(wrapped().next('hello'));

// for...of循环
// for...of 循环可以自动遍历 Generator 函数时生成的 Iterator 对象，且此时不再需要调用 next 方法
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

function* object(obj) {
    let propKeys = Reflect.ownKeys(obj);
    for (let propKey of propKeys) {
        yield [propKey, obj[propKey]]
    }
}
let jane = {first:'Jane', last:'Doe'};
for (let [key, value] of object(jane)) {
    console.log(`${key}: ${value}`);
}

function* object() {
    let propKeys = Object.keys(this);

    for (let propKey of propKeys) {
        yield [propKey,this[propKey]];
    }
}
let jane = {first: 'Jane', last: 'Doe'};

jane[Symbol.iterator] = object;

for (let [key,value] of jane) {
    console.log(`${key}: ${value}`);
}

function* numbers() {
    yield 1;
    yield 2;
    return 3;
    yield 4;
}

// 扩展运算符
console.log([...numbers()]);
// Array.from 方法
Array.from(numbers());
// 解构赋值
let [x,y] = numbers();
// for...of循环
for (let n of numbers()) {
    console.log(n);
}

//Generator.prototype.throw()
// Generator 函数返回的遍历器对象，都有一个 throw 方法，可以在函数体外抛出错误，然后在 Generator 函数体内捕获
var g = function*() {
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

var g = function* () {
    try {
        yield;
    } catch (e) {
        console.log(e);
    }
}
var i = g();
i.next();
i.throw(new Error('出错了！'));

// 注意，不要混淆遍历器对象的 throw 方法和全局的 throw 命令。上面代码的错误，是用遍历器对象的 throw 方法抛出的，而不是用 throw 命令抛出的。后 者只能被函数体外的 catch 语句捕获
var g = function* () {
    while (true) {
        yield;
        console.log('内部捕获',e);
    }
}
var i = g();
i.next();

try {
    i.throw('a');
    i.throw('b');
} catch (e) {
    console.log('内部捕获',e);
}

// 如果 Generator 函数内部和外部，都没有部署 try...catch 代码块，那么程序将报错，直接中断执行
var gen = function* gen() {
    yield console.log('hello');
    yield console.log('world');
}
var g = gen();
g.next();
g.throw();

// throw 方法被捕获以后，会附带执行下一条 yield 表达式。也就是说，会附带执行一次 next 方法
var gen = function* () {
    try {
        yield console.log('a');
        yield console.log('b');
    } catch (e) {
        
    }
    
    yield console.log('c');
};
var g = gen();
g.next();
g.throw();
g.next();

var gen = function* () {
    yield console.log('hello');
    yield console.log('world');
}
var g = gen();
g.next();
try {
    throw new Error();
} catch (e) {
    g.next();
}

function* foo() {
    var x = yield 3;
    var y = x.toUpperCase();
    yield y;
}
var it = foo();
it.next();
try {
    it.next(42);
} catch (err) {
    console.log(err);
}

function* g() {
    yield 1;
    console.log('throwing an exception');
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
    } catch (err) {
        console.log('捕获错误',v);
    }
    try {
        v = generator.next();
        console.log('第二次运行next方法',v);
    } catch (err) {
        console.log('捕捉错误',v);
    }
    try {
        v = generator.next();
        console.log('第三次运行next方法',v);
    } catch (err) {
        console.log('捕捉错误',v);
    }
    console.log('caller done');
}
log(g());

// Generator.prototype.return()

function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
var g = gen();
console.log(g.next());
console.log(g.return('foo'));
console.log(g.next());

// 如果 Generator 函数内部有 try...finally 代码块，那么 return 方法会推迟到 finally 代码块执行完再执行
function* numbers() {
    yield 1;
    try{
        yield 2;
        yield 3;
    }finally{
        yield 4;
        yield 5;
    }
    yield 6;
}
var g = numbers();
console.log(g.next());
console.log(g.next());
console.log(g.return(7));
console.log(g.next());
console.log(g.next());

// next(),throw(),return()的共同点

// next() 是将 yield 表达式替换成一个值
const g = function* (x,y) {
    let result = yield x + y;
    return result;
}
const gen = g(1,2);
console.log(gen.next());
console.log(gen.next(1));

// throw() 是将 yield 表达式替换成一个 throw 语句
gen.throw(new Error('出错了')); // Uncaught Error: 出错了 
// 相当于将 let result = yield x + y
// 替换成 let result = throw(new Error('出错了'));

// return() 是将 yield 表达式替换成一个 return 语句
gen.return(2); // Object {value: 2, done: true} 
// 相当于将 let result = yield x + y
// 替换成 let result = return 2;


// yield* 表达式
// 如果在 Generator 函数内部，调用另一个 Generator 函数，默认情况下是没有效果的
function* foo() {
    yield 'a';
    yield 'b';
}
function* bar() {
    yield 'x';
    foo();
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
        yield v;
    }
    yield 'y';
}

function* inner() {
    yield 'hello';
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

let delegatedIterator = (function* () {
    yield 'Hello';
    yield 'Bye';
}());
let deletatingIterator = (function* () {
    yield 'Greetings';
    yield* delegatedIterator;
    yield 'Ok, bye';
}());
for (let value of deletatingIterator) {
    console.log(value);
}

// yield* 后面的 Generator 函数(没有 return 语句时)，等同于在 Generator 函数内部，部署一个 for...of 循环
function* concat(iter1, iter2) {
    yield* iter1;
    yield* iter2;
}

// 等同于
function* concat(iter1, iter2) {
    for (var value of iter1) {
        yield value;
    }
    for (var value of iter2) {
        yield value;
    }
}
// 上面代码说明， yield* 后面的 Generator 函数(没有 return 语句时)，不过是 for...of 的一种简写形式，完全可以用后者替代前者。反之，在有
// return 语句时，则需要用 var value = yield* iterator 的形式获取 return 语句的值

// 如果 yield* 后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员
function* gen() {
    yield* ["a", "b", "c"];
}
console.log(gen().next());

// 实际上，任何数据结构只要有 Iterator 接口，就可以被 yield* 遍历
let read = (function* () {
    yield 'hello';
    yield* 'hello';
}());
console.log(read.next().value);
console.log(read.next().value);

// 如果被代理的 Generator 函数有 return 语句，那么就可以向代理它的 Generator 函数返回数据
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
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

function* gen() {
    yield 1;
    yield 2;
    return 3;
}
var it = gen();
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());

function* genFuncWithReturn() {
    yield 'a';
    yield 'b';
    return 'The Result';
}
console.log([...genFuncWithReturn()]);
function* logReturned(genObj) {
    let result = yield* genObj;
    console.log(result);
}
[...logReturned(genFuncWithReturn())]

// yield* 命令可以很方便地取出嵌套数组的所有成员
function* iterTree(tree) {
    if (Array.isArray(tree)) {
        for (let i = 0; i < tree.length; i++) {
            yield* iterTree(tree[i]);
        }
    }else{
        yield tree;
    }
}
const tree = ['a',['b', 'c'],['d','e']];
for (let x of iterTree(tree)) {
    console.log(x);
}

// 作为对象属性的Generator函数
let obj = {
    * myGeneratorMethod(){

    }
};

// Generator函数的this
function* g() {
    
}
// g.prototype.hello = function () {
//     return 'hi!';
// }
let obj = g();
let it = g();
console.log(obj);
console.log(it);
console.log(obj == it);


console.log(obj instanceof g);
console.log(obj.hello());

function* g() {
    this.a = 11;
}
let obj = g();
console.log(obj.a);

// 下面是一个变通方法。首先，生成一个空对象，使用 call 方法绑定 Generator 函数内部的 this 。这样，// 构造函数调用以后，这个空对象就是 Generator 函数的实例对象了
function* F() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
}
var obj = {};
var f = F.call(obj);

console.log(f.next());
console.log(f.next());
console.log(f.next());

console.log(obj.a);
console.log(obj.b);
console.log(obj.c);

// 上面代码中，执行的是遍历器对象 f ，但是生成的对象实例是 obj ，有没有办法将这两个对象统一呢?
// 一个办法就是将 obj 换成 F.prototype 
function* F() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
}
var f = F.call(F.prototype);
console.log(f.next());
console.log(f.next());
console.log(f.next());

console.log(f.a);
console.log(f.b);
console.log(f.c);


// 再将 F 改成构造函数，就可以对它执行 new 命令了
function* gen() {
    this.a = 1;
    yield this.b = 2;
    yield this.c = 3;
}
function F() {
    return gen.call(gen.prototype);
}
var f  = new F();

console.log(f.next());
console.log(f.next());
console.log(f.next());

console.log(f.a);
console.log(f.b);
console.log(f.c);

// Generator 与状态机
// Generator 是实现状态机的最佳结构。比如，下面的 clock 函数就是一个状态机
var ticking = true;
var clock = function() {
    if (ticking) {
        console.log('Tick!');
    }else{
        console.log('Tock!');
        ticking = !ticking;
    }
}

// 上面代码的 clock 函数一共有两种状态( Tick 和 Tock )，每运行一次，就改变一次状态。这个函数如果用 Generator 实现，就是下面这样。
var clock = function* () {
    while (true) {
        console.log('Tick!');
        yield;
        console.log('Tock!');
        yield;
    }
}

// Ajax 是典型的异步操作，通过 Generator 函数部署 Ajax 操作，可以用同步的方式表达
function* main() {
    var result = yield request("http://some.url");
    var resp = JSON.parse(result);
    console.log(resp.value);
}
function request(url) {
    makeAjaxCall(url,function(response) {
        it.next(response);
    });
}
var it = main();
it.next();

// 下面是另一个例子，通过 Generator 函数逐行读取文本文件
function* numbers() {
    let file = new FileReader("numbers.txt");
    try{
        while (!file.eof) {
            yield parseInt(file.readLine(),10);
        }
    }finally{
        file.close();
    }
}

// 采用 Promise 改写上面的代码
Promise.resolve(step1)
.then(step2)
.then(step3)
.then(step4)
.then(function(value4) {
    // Do something with value4
},function(error) {
    // Handle any error from step1 through step4
});

// 上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量 Promise 的语法。Generator 函数可以进一步改善代码运行流程
function* longRunningTask(value1) {
    try {
        var value2 = yield step1(value1);
        var value3 = yield step1(value2);
        var value4 = yield step1(value3);
        var value5 = yield step1(value4);
        // Do something with value4
    } catch (e) {
        
    }
}
// 然后，使用一个函数，按次序自动执行所有步骤
scheduler(longRunningTask(initialValue));
function scheduler(task) {
    var taskObj = task.next(task.value);
    // 如果Generator函数未结束，就继续调用
    if (!taskObj.done) {
        task.value = taskObj.value
        scheduler(task);
    }
}

// 下面，利用 for...of 循环会自动依次执行 yield 命令的特性，提供一种更一般的控制流管理的方法
let steps = [step1Func, step2Func, step3Func];
function *iterateSteps(steps) {
    for (let i = 0; i < steps.length; i++) {
        var step = steps[i];
        yield step();
    }
}

//将任务分解成步骤之后，还可以将项目分解成多个依次执行的任务 
let jobs = [job1, job2, job3];
function* iterateJobs(jobs) {
    for (let i = 0; i < jobs.length; i++) {
        var job = jobs[i];
        yield* iterateSteps(job.steps);
    }
}
// 最后，就可以用 for...of 循环一次性依次执行所有任务的所有步骤
for (var step of iterateJobs(jobs)) {
    console.log(step.id);
}


// 部署 Iterator 接口
// 利用 Generator 函数，可以在任意对象上部署 Iterator 接口
function* iterEntries(obj) {
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        yield [key, obj[key]];
    }
}
let myObj = {foo:3, bar:7};
for (let [key, value] of iterEntries(myObj)) {
    console.log(key,value);
}

// 下面是一个对数组部署 Iterator 接口的例子，尽管数组原生具有这个接口
function* makeSimpleGenerator(array) {
    var nextIndex = 0;
    while (nextIndex < array.length) {
        yield array[nextIndex++];
    }
}
var gen = makeSimpleGenerator(['yo', 'ya']);
console.log(gen.next().value);
console.log(gen.next().value);
console.log(gen.next().done);

// Generator 函数内部还可以部署错误处理代码，捕获函数体外抛出的错误
function* gen(x) {
    try {
        var y = yield x+2;
    } catch (e) {
        console.log(e);
    }
    return y;
}
var g = gen(1);
g.next();
g.throw('出错了');

// 异步任务的封装
var fetch = require('node-fetch');
function* gen() {
    var url = 'https://api.github.com/users/github';
    var result = yield fetch(url);
    console.log(result.bio);
}
// 执行这段代码的方法如下
var g = gen();
var result = g.next();

result.value.then(function(data) {
    return data.json();
}).then(function(data) {
    g.next(data);
});

// Thunk 函数的含义
function f(m) {
    return m * 2;
}
f(x+5);
// 等同于
var thunk = function() {
    return x + 5;
}
function f(thunk) {
    return thunk() * 2;
}

// JavaScript 语言的 Thunk 函数

// 正常版本的readFile(多参数版本)
fs.readFile(fileName, callback);

// Thunk版本的readFile(单参数版本)
var Thunk = function(fileName) {
    return function(callback) {
        return fs.readFile(fileName, callback);
    }
}

var readFileThunk = Thunk(fileName);
readFileThunk(callback);

// ES5版本
var Thunk = function(fn) {
    return function() {
        var args = Array.prototype.slice.call(arguments);
        return function(callback) {
            args.push(callback);
            return fn.apply(this, args);
        }
    }
}

// ES6版本
const Thunk = function(fn) {
    return function(...args) {
        return function(callback) {
            return fn.call(this, ...args, callback);
        }
    }
}

// 使用上面的转换器，生成 fs.readFile 的 Thunk 函数
var readFileThunk = Thunk(fs.readFile);
readFileThunk(fileA)(callback);

// 下面是另一个完整的例子
function f(a,cb) {
    cb(a);
}
const ft = Thunk(f);
ft(1)(console.log);

// Thunkify 的源码与上一节那个简单的转换器非常像
function thunkify(fn) {
    return function() {
        var args = new Array(arguments.length);
        var ctx = this;
        for(var i=0; i<args.length; i++){
            args[i] = arguments[i];
        }
        return function(done) {
            var called;
            args.push(function() {
                if (called) return;
                called = true;
                done.apply(null, arguments);
            });
            try {
                fn.apply(ctx, args);
            } catch (err) {
                done(err);
            }
        }
    }
}

// Generator 函数的流程管理
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* () {
    var r1 = yield readFileThunk('/etc/fstab');
    console.log(r1.toString());
    var r2 = yield readFileThunk('/etc/shells');
    console.log(r2.toString());
}

var g = gen();
var r1 = g.next();
r1.value(function(err, data) {
    if (err) throw err;
    var r2 = g.next(data);
    r2.value(function(err, data) {
        if (err) throw err;
        g.next(data);
    });
});


// 基于 Promise 对象的自动执行
var fs = require('fs');

var readFile = function(fileName) {
    return new Promise(function(resolve, reject) {
        fs.readFile(fileName, function(error, data) {
            if (error) return reject(error);
            resolve(data);
        });
    });
}
var gen = function* () {
    var f1 = yield readFile('etc/fstab');
    var f2 = yield readFile('etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
}
// 然后，手动执行上面的 Generator 函数
var g = gen();
g.next().then(function(data) {
    g.next(data).value.then(function(data) {
        g.next(data);
    });
});
// 手动执行其实就是用 then 方法，层层添加回调函数。理解了这一点，就可以写出一个自动执行器
function run(gen) {
    var g = gen();
    function next(data) {
        var result = g.next(data);
        if (result.done) return result.value;
        result.value.then(function(data) {
            next(data);
        });
    }
    next();
}
run(gen);
