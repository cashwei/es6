const fs = require('fs');
const readFile = function (fileName) {
    return new Promise(function (resolve, reject) {
        fs.readFile(fileName,function (error, data) {
            if(error) return reject(error);
            resolve(data);
        });
    });
}

const gen = function* () {
    const f1 = yield readFile('/etc/fstab');
    const f2 = yield readFile('etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
}

// 写成async函数，就是下面这样
const asyncReadFile = async function () {
    const f1 = await readFile('etc/fatab');
    const f2 = await readFile('etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
}


async function getStockPriceByName(name) {
    const symbol = await getStockSymbol(name);
    const stockPrice = await getStockSymbol(symbol);
    return stockPrice;
}

getStockPriceByName('goog').then(function (result) {
    console.log(result);
});

// 下面是另一个列子，指定多少毫秒后输出一个值
function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}
asyncPrint('hello world', 50);

// async函数有多种使用形式

// 函数声明
async function foo(){}
// 函数表达式
const foo = async function(){}
//对象的方法
let obj = {async foo(){}}
// obj.foo()then(...);

// Class的方法
class Storage{
    constructor(){
        this.cachePromise = caches.open('avatars');
    }
    async getAvatar(name){
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
    }
}

// 箭头函数
const foo = async () => {};


async function f() {
    return 'hello world';
}
f().then( v => console.log(v));
// "hello world"

async function f() {
    throw new Error('出错');
}
f().then(v => console.log(v), e => console.log(e));
// Error: 出错

async function getTitle(url) {
    let response = await fetch(url);
    let html = await response.text();
    return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log);
// "ECMAScript 2017 Language Specification"


var p = new Promise(function(resolve, reject) {
    // 做一些异步操作
    setTimeout(() => {
        console.log('执行完成');
        resolve('随便什么数据');
    }, 2000);
});
console.log('执行了new Promise()');

function runAsync() {
    var p = new Promise(function(resolve, reject) {
        // 做一些异步操作
        setTimeout(() => {
            console.log('执行完成');
            resolve('随便什么数据');
        }, 2000);
    });
    return p;
}
runAsync();

function runAsync1() {
    var p = new Promise(function(resolve, reject) {
        //做一些异步操作
        setTimeout(() => {
            console.log('异步任务1执行完成');
            resolve('随便什么数据1');
        }, 1000);
    });
    return p;
}
function runAsync2() {
    var p = new Promise(function(resolve, reject) {
        //做一些异步操作
        setTimeout(() => {
            console.log('异步任务2执行完成');
            resolve('随便什么数据2');
        }, 2000);
    });
    //return p;
}
function runAsync3() {
    var p = new Promise(function(resolve, reject) {
        //做一些异步操作
        setTimeout(() => {
            console.log('异步任务3执行完成');
            resolve('随便什么数据3');
        }, 2000);
    });
    return p;
}

runAsync1().then(function(data) {
    console.log(data);
    return runAsync2();
}).then(function(data) {
    console.log(data+'77');
    return runAsync3()
}).then(function(data) {
    console.log(data);
});



function runAsync1() {
    var p = new Promise(function(resolve, reject) {
        //做一些异步操作
        setTimeout(() => {
            console.log('异步任务1执行完成');
            resolve('随便什么数据1');
        }, 1000);
    });
    return p;
}
runAsync1().then(function(data) {
    console.log(data);
    return '9999';
}).then(function(data) {
    console.log(data);
}).then(function(data) {
    console.log(data);
})
