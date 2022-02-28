// async 函数

// 基本用法
async function getStockPriceByName(name) {
    const symbol = await getStockSymbol(name);
    const stockPrice = await getStockPriceByName(symbol);
    return stockPrice;
}
getStockPriceByName('goog').then(function(result) {
    console.log(result);
});

// 下面是另一个例子，指定多少毫秒后输出一个值
function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve,ms);
    });
}
async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}
asyncPrint('hello world', 50);

// 由于 async 函数返回的是 Promise 对象，可以作为 await 命令的参数。所以，上面的例子也可以写成下面的形式
async function timeout(ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
async function asyncPrint(value, ms) {
    await timeout(ms);
    console.log(value);
}
asyncPrint('hello world', 50);

// async 函数有多种使用形式

// 函数声明
async function  foo() {
    
}

// 函数表达式
const foo = async function() {
    
}

// 对象的方法
let obj = {async foo(){}};
obj.foo.then();

// Class 的方法
class Storage{
    constructor(){
        this.cachePromise = caches.open('avatars');
    }
    async getAvatar(name){
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
    }
}
const storage = new Storage();
storage.getAvatar('jake').then();

// 箭头函数
const foo = async () => {};

// 语法
// async 函数返回一个 Promise 对象
// async 函数内部 return 语句返回的值，会成为 then 方法回调函数的参数
async function f() {
    return 'hello world';
}
f().then(v => console.log(v));

//async 函数内部抛出错误，会导致返回的 Promise 对象变为 reject 状态。抛出的错误对象会被 catch 方法回调函数接收到
async function f() {
    throw new Error('出错了');
}
f().then(
    v => console.log(v),
    e => console.log(e)
);

async function getTitle(url) {
    let response = await fetch(url);
    let html = await response.text();
    return html.match(/<title>([\s\S]+)<\/title>/i)[1];
}
getTitle('https://tc39.github.io/ecma262/').then(console.log);

// await 命令
// 正常情况下， await 命令后面是一个 Promise 对象。如果不是，会被转成一个立即 resolve 的 Promise 对象
async function f() {
    return await 123;
}
f().then(v => console.log(v));

// await 命令后面的 Promise 对象如果变为 reject 状态，则 reject 的参数会被 catch 方法的回调函数接收到
async function f() {
    await Promise.reject('出错了');
}
f().then(v => console.log(v)).catch(e => console.log(e));

//只要一个 await 语句后面的 Promise 变为 reject ，那么整个 async 函数都会中断执行
async function f() {
    await Promise.reject('出错了');
    await Promise.resolve('hello world'); // 不会执行
}

// 有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。这时可以将第一个 await 放在 try...catch 结构里面，这样不管这个异步操作是
// 否成功，第二个 await 都会执行
async function f() {
    try {
    await Promise.reject('出错了');
    } catch (e) {
        
    }
    return await Promise.resolve('hello world');
}
f().then(v => console.log(v));

// 另一种方法是 await 后面的 Promise 对象再跟一个 catch 方法，处理前面可能出现的错误
async function f() {
    await Promise.reject('出错了').catch(e => console.log(e));
    return Promise.resolve('hello world');
}
f().then(v => console.log(v));

// 错误处理
// 如果 await 后面的异步操作出错，那么等同于 async 函数返回的 Promise 对象被 reject 
async function f() {
    await new Promise(function(resolve, reject) {
        throw new Error('出错了');
    });
}
f().then(v => console.log(v)).catch(e => console.log(e));

// 防止出错的方法，也是将其放在 try...catch 代码块之中
async function f() {
    try {
        await new Promise(function(resolve, reject) {
            throw new Error('出错了');
        });
    } catch (e) {
        
    }
    return await('hello world');
}
