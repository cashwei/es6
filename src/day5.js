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