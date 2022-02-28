// Module 的语法

// CommonJS 模块
let {stat, exists, readFile} = require('fs');
// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readFile = _fs.readFile;

import { format } from 'path';
// ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，再通过 import 命令输入
// ES6模块
import {stat, exists, readFile} from 'fs';

// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
export {firstName, lastName, year};

// import 命令
// 使用 export 命令定义了模块的对外接口以后，其他 JS 文件就可以通过 import 命令加载这个模块
// main.js
import {firstName, lastName, year} from './profile'
function setName(element) {
    element.textContent = firstName + " " + lastName;
}

// 如果想为输入的变量重新取一个名字， import 命令要使用 as 关键字，将输入的变量重命名
import {lastName as surname} from './porfile';


// 模块的整体加载
// 除了指定加载某个输出值，还可以使用整体加载，即用星号( * )指定一个对象，所有输出值都加载在这个对象上面
// circle.js
export function area(radius) {
    return Math.PI * radius * radius;
}
export function circumference(radius) {
    return 2 * Math.PI * radius;
}

// 现在，加载这个模块
// main.js
import {area, circumference} from './circle';
console.log('圆面积:' + area(4));
console.log('圆周长:' + circumference(14));
// 上面写法是逐一指定要加载的方法，整体加载的写法如下
import * as circle from './circle';

// 注意，模块整体加载所在的那个对象(上例是 circle )，应该是可以静态分析的，所以不允许运行时改变。下面的写法都是不允许的
// 下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {};

// export default 命令
// export-default.js
export default function() {
    console.log('foo');
}

// 其他模块加载该模块时， import 命令可以为该匿名函数指定任意名字
// import-default.js
import customName from './export-default';
customName(); // foo

// 下面比较一下默认输出和正常输出

// 第一组
export default function crc32() { // 输出
    
}
import crc32 from 'crc32'; // 输入

// 第二组
export function crc32() { // 输出
    
}
import {crc32} from 'crc32'; // 输入

// 本质上， export default 就是输出一个叫做 default 的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的
// modules.js
function add(x,y) {
    return x * y;
}
export {add as default};
// 等同于
export default add;

// app.js
import {default as foo} from 'module';
// 等同于
import foo from 'module';

// 有了 export default 命令，输入模块时就非常直观了，以输入 lodash 模块为例
import _ from 'lodash';

// 如果想在一条 import 语句中，同时输入默认方法和其他接口，可以写成下面这样
import _,{each, each as forEach} from 'lodash';

//对应上面代码的 export 语句如下
export default function(obj) {
    // ...
}
export function each(obj, iterator, context) { // ···
}
export { each as forEach };

// export 与 import 的复合写法
// 如果在一个模块之中，先输入后输出同一个模块， import 语句可以与 export 语句写在一起
export {foo, bar} from 'my_module';
// 等同于
import {foo, bar} from 'my_module';
export {foo, bar};

// 模块的接口改名和整体输出，也可以采用这种写法
// 接口改名
export {foo as myFoo} from 'my_module';

// 整体输出
export * from 'my_module';

// 默认接口的写法如下
export {default} from 'foo';

// 具名接口改为默认接口的写法如下
export {es6 as default} from './someModule';
// 等同于
import {es6} from './someModule';
export default es6;

// 同样地，默认接口也可以改名为具名接口
export {default as es6} from './someModule';

// 模块的继承
// 假设有一个 circleplus 模块，继承了 circle 模块
// circleplus.js
export * from 'circle';
export var e = 2.71828182846;
export default function(x) {
    return Math.exp(x);
}

// import()
const main = document.querySelector('main');
import('./section-modules/${someVariable}.js').then(
    module => {
        module.loadPageInto(main);
    }
).catch(err => {
    main.textContent = err.message;
});

// 适用场合
// 下面是 import() 的一些适用场合
// (1)按需加载
botton.addEventListener('click', event => {
    import('./dialogBox.js').then(dialogBox => {
        dialogBox.open();
    }).catch(error => {

    });
});

// (2)条件加载
if (condition) { 
    import('moduleA').then();
} else { 
    import('moduleB').then();
}

// (3)动态的模块路径
import(f()).then();

// 注意点
// import() 加载模块成功以后，这个模块会作为一个对象，当作 then 方法的参数。因此，可以使用对象解构赋值的语法，获取输出接口
import('./myModule.js').then((export1,export2) => {

});

// 如果模块有 default 输出接口，可以用参数直接获得
import('./mhyModule.js').then(myModule => {
    console.log(myModule.default);
});

// 上面的代码也可以使用具名输入的形式
import('./myModule.js').then(({default: theDefault}) => {
    console.log(theDefault);
});

// 如果想同时加载多个模块，可以采用下面的写法
Promise.all([
    import('./module1.js'),
    import('./module2.js'),
    import('./module3.js'),
]).then(
    ([module1, module2, module3]) => {

    }
);

// import() 也可以用在 async 函数之中
async function main() {
    const myModule = await import('./myModule.js');
    const {export1, export2} = await import('./myModule.js');
    const [module1, module2, module3] = await Promise.all([
        import('./module1.js'), 
        import('./module2.js'), 
        import('./module3.js')
    ]);
}

// Module 的加载实现

// 浏ES6 模块与 CommonJS 模块的差异
// 它们有两个重大差异
// - CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用
// - CommonJS 模块是运行时加载，ES6 模块是编译时输出接口

// CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。请看下面这个模块文件 lib.js 的例子
// lib.js
var counter = 3;
function incCounter() {
    counter++;
}
module.exports = {
    counter: counter,
    incCounter:incCounter
}

// 上面代码输出内部变量 counter 和改写这个变量的内部方法 incCounter 。然后，在 main.js 里面加载这个模块
// main.js
var mod = require('./lib');
console.log(mod.counter); // 3
mod.incCounter();
console.log(mod.counter); // 3

// lib.js
export let counter = 3;
export function incCounter() {
    counter++;
}

// main.js
import {counter, incCounter} from './lib';
console.log(counter); // 3
incCounter();
console.log(counter); // 4

// 再举一个出现在 export 一节中的例子
// m1.js
export var foo = 'bar';
setTimeout(() => {
    foo = 'baz'
}, 500);

//m2.js
import {foo} from './m1.js';
console.log(foo);
setTimeout(() => {
    console.log(foo);
}, 500);


// 由于 ES6 输入的模块变量，只是一个“符号连接”，所以这个变量是只读的，对它进行重新赋值会报错
// lib.js
export let obj = {};

// main.js
import {obj} from './lib';
obj.prop = 123;// Ok
obj = {}; // TypeError

// 最后， export 通过接口，输出的是同一个值。不同的脚本加载这个接口，得到的都是同样的实例
// mod.js
function C() {
    this.sum = 0;
    this.add = function() {
        this.sum += 1;
    }
    this.show = function() {
        console.log(this.sum);
    }
}
export let c = new C();
// 上面的脚本 mod.js ，输出的是一个 C 的实例。不同的脚本加载这个模块，得到的都是同一个实例
// x.js
import {c} from './mod';
a.add();

// y.js
import {c} from './mod';
c.show();

// main.js
import './x';
import './y';

// ES6 模块加载 CommonJS 模块
// a.js
module.exports = {
    foo: 'hello',
    bar: 'world'
};

// 等同于
export default {
    foo: 'hello',
    bar: 'world'
};

// import 命令加载上面的模块， module.exports 会被视为默认输出，即 import 命令实际上输入的是这样一个对象 { default: module.exports }

// 所以，一共有三种写法，可以拿到 CommonJS 模块的 module.exports
// 写法一
import baz from './a';
// baz = {foo: 'hello', bar: 'world'};

// 写法二
import {default as baz} from './a';
// baz = {foo: 'hello', bar: 'world'};

// 写法三
import * as baz from './a';
/* baz = {
    get default(){return module.exports},
    get foo(){return this.default.foo}.bind(baz),
    get bar(){return this.default.bar}.bind(baz)
}; */

// 下面是一些例子b

// b.js
module.exports = null;

// es.js
import foo from './b';
// foo = null;

import * as bar from './b';
// bar = {dafault:null}

// 上面代码中， es.js 采用第二种写法时，要通过 bar.default 这样的写法，才能拿到 module.exports

// c.js
module.exports = function two() {
    return 2;
}
// es.js
import foo from './c';
foo(); // 2

import * as bar from './c';
bar.default(); // 2
bar(); // throws, bar is not a function
// 上面代码中， bar 本身是一个对象，不能当作函数调用，只能通过 bar.default 调用


// CommonJS 模块的输出缓存机制，在 ES6 加载方式下依然有效
// foo.js
module.exports = 123;
setTimeout(_ => module.exports = null);


// CommonJS 模块加载 ES6 模块
// CommonJS 模块加载 ES6 模块，不能使用 require 命令，而要使用 import() 函数。ES6 模块的所有输出接口，会成为输入对象的属性
// es.mjs
let foo = {bar: 'my-default'};
export default foo;
foo = null;

// cjs.js
const es_namespace = await import('./es');
/* es_namespace = {
    get default() {
        ...
    }
} */
console.log(es_namespace);
// {bar:'my-default'}
// 上面代码中， default 接口变成了 es_namespace.default 属性。另外，由于存在缓存机制， es.js 对 foo 的重新赋值没有在模块外部反映出来

// 下面是另一个例子
// es.js
export let foo = {bar:'my-default'};
export {foo as bar};
export function f() {
    
};
export class c{};

// cjs.js
const es_namespace = await import('./es');
es_namespace = {
    get foo(){return foo;},
    get bar(){return foo;},
    get f(){return f;},
    get c(){return c;}
}


// 循环加载
// “循环加载”(circular dependency)指的是， a 脚本的执行依赖 b 脚本，而 b 脚本的执行又依赖 a 脚本
// a.js
var b = require('b');

// b.js
var a = require('a');

// CommonJS 模块的加载原理
/* {
    id: '...', 
    exports: { ... }, 
    loaded: true, 
    ...
} */

// CommonJS 模块的循环加载
// 让我们来看，Node 官方文档里面的例子。脚本文件 a.js 代码如下
exports.done = false;
var b = require('./b.js');
console.log('在 a.js 之中，b.done = %j', b.done);
exports.done = true;
console.log('a.js 执行完毕');

// 上面代码之中， a.js 脚本先输出一个 done 变量，然后加载另一个脚本文件 b.js 。注意，此时 a.js 代码就停在这里，等待 b.js 执行完毕，再往下执行
// 再看 b.js 的代码
exports.done = false;
var a = require('./a.js');
console.log('在 b.js 之中，a.done = %j', a.done);
exports.done = true;
console.log('b.js 执行完毕');

// ES6 模块的循环加载

// a.mjs
import {bar} from './b';
console.log('a.mjs');
console.log(bar);
export let foo = 'foo';

// b.mjs
import {foo} from './a';
console.log('b.mjs');
console.log(foo);
export let bar = 'bar';