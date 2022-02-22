// 基本用法
const promise = new Promise(function(resolve,reject) {
    // ...some code
    // if (/* 异步操作成功 */) {
    //     resolve(value);
    // }else{
    //     reject(error);
    // }
});

promise.then(function(value) {
    // success
},function(error) {
    // failure
});

function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve,ms,'done');
    });
}
timeout(100).then((value) => {
    console.log(value);
});

let promise = new Promise(function(resolve, reject) {
    console.log('Promise');
    resolve();
});
let p = promise.then(function() {
    console.log('resolved.');
});
console.log('Hi!');
console.log(p instanceof Promise);

// 异步加载图片的例子
function loadImageAsync(url) {
    return new Promise(function(resolve, reject) {
        const image = new Image();
        image.onload = function() {
            resolve(image);
        };
        image.onerror = function() {
            reject(new Error('Could not load image at '+url));
        }
        image.src = url;
    });
}

// Promise实现Ajax操作
const getJSON = function(url) {
    const promise = new Promise(function(resolve, reject) {
        const handler = function() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            }else{
                reject(new Error(this.statusText));
            }
        };
        const client = new XMLHttpRequest();
        client.open("GET",url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept","application/json");
        client.send();
    });
    return promise;
}

getJSON("/posts.json").then(function(json) {
    console.log('Contents: '+json);
},function(error) {
    console.error('出错咯',error);
});

const p1 = new Promise(function(resolve, reject) {
    // ...
});
const p2 = new Promise(function(resolve, reject) {
    // ...
    resolve(p1);
});

const p1 = new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error('fail')), 3000);
});
const p2 = new Promise(function(resolve, reject) {
    setTimeout(() => resolve(p1),1000);
});
p2.then(result => console.log(result)).catch(error => console.log(error));


new Promise(function(resolve, reject) {
    resolve(1);
    console.log(2);
}).then(r => {
    console.log(r);
});

// Promise.prototype.then()
getJSON("/post/1.json").then(function(post) {
    return getJSON(post.commentURL);
}).then(function funcA(comments) {
    console.log("resolved: ", comments);
},function funcB(error) {
    console.log("rejected: ", error);
})
// 如果采用箭头函数，上面的代码可以写得更简洁
getJSON("/post/1.json").then(post => getJSON(post.commentURL)).then(comments => void console.log("resolved: ", comments),
error => void console.log("rejected: ", error));

// Promise.prototype.catch()
// Promise.prototype.catch()方法是.then(null,rejection)的别名，用于指定发生错误时的回调函数
getJSON('/posts.json').then(function(posts) {
    // ...
}).catch(function(error) {
    // 处理getJSON和前一个回调函数运行时发生的错误
    console.log('发生错误！',error);
});

p.then((val) => console.log('fulfilled:', val)).catch(
    (error) => console.log('rejected', error)
);
// 等同于
p.then((val) => console.log('fulfilled:', val)).then(ull,
    (error) => console.log('rejected', error));


const promise = new Promise(function(resolve,reject) {
    throw new Error('test');
});
promise.catch(function(error) {
    console.log(error);
});

// 上面的写法与下面两种写法是等价的
// 写法一
const promise = new Promise(function(resolve, reject) {
    try {
        throw new Error('test');
    } catch (e) {
        reject(e);
    }
});
promise.catch(function(error) {
    console.log(error);
});

// 写法二
const promise = new Promise(function(resolve, reject) {
    reject(new Error('test'));
});
promise.catch(function(error) {
    console.log(error);
});

const promise = new Promise(function(resolve, reject) {
    resolve('ok');
    throw new Error('test');
});
promise.then(function(value) {
    console.log(value);
}).catch(function(error) {
    console.log(error);
});

// Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个 catch 语句捕获
getJSON('/post/1.json').then(function(post) {
    return getJSON(psot.commentURL);
}).then(function(comments) {
    // some code
}).catch(function(error) {
    // 处理前面三个Promise产生的错误
});

// 一般来说，不要在 then 方法里面定义 Reject 状态的回调函数(即 then 的第二个参数)，总是使用 catch 方法
// bad
promise.then(function(data) {
     // success
},function(err) {
    // error
});

// good
promise.then(function(data) { // cb
    // success
}).catch(function(err) {
    // error
});

// 跟传统的 try/catch 代码块不同的是，如果没有使用 catch 方法指定错误处理的回调函数，Promise 对象抛出的错误不会传递到外层代码，即不会有任何 反应
const someAsyncThing = function() {
    return new Promise(function(resolve, reject) {
        // 下面一行会报错,因为x没有声明
        resolve(x+2);
    });
};
someAsyncThing().then(function() {
    console.log('everything is great');
});
setTimeout(() => {
    console.log(123);
}, 2000);

const promise = new Promise(function(resolve, reject) {
    resolve('ok');
    setTimeout(() => {
        throw new Error('test');
    }, 0);
});
promise.then(function(value) {
    console.log(value);
});

// 一般总是建议，Promise 对象后面要跟 catch 方法，这样可以处理 Promise 内部发生的错误。 catch 方法返回的还是一个 Promise 对象，因此后面还可 以接着调用 then 方法
const someAsyncThing = function() {
    return new Promise(function(resolve, reject) {
        // 下面一行会报错，因为x没有声明
        resolve(3+2);
    });
};
someAsyncThing().catch(function(error) {
    console.log('ho no', error);
}).then(function(v) {
    console.log('carry on'+v);
});

// catch 方法之中，还能再抛出错误
const someAsyncThing = function() {
    return new Promise(function(resolve, reject) {
        // 下面一行会报错，因为x没有声明
        resolve(x+2);
    });
};
someAsyncThing().then(function() {
    return someAsyncThing();
}).catch(function(error) {
    console.log('ho no',error);
    // 下面一行会报错，因为y没有声明
    return 2+2;
}).then(function(v) {
    console.log('carry on'+v);
});

someAsyncThing().then(function() {
    return someAsyncThing();
}).catch(function(error) {
    console.log('ho no',error);
    // 下面一行会报错，因为y没有声明
    y+2;
}).catch(function(error) {
    console.log('carry on', error);
});

// Promise.all()
const p = Promise.all([p1,p2,p3]);
const promises = [2,3,5,7,11,1].map(function(id) {
    return getJSON('/post/'+id+'.json');
});
Promise.all(promises).then(function() {
    // ...
}).catch(function() {
    // ...
});

const databasePromise = connectDatabase();
const booksPromise = databasePromise.then(findAllBooks);
const userPromise = databasePromise.then(getCurrentUser);
Promise.all([booksPromise, userPromise]).then(([books,user]) => pickTopRecommentations(books, user));

// 如果作为参数的 Promise 实例，自己定义了 catch 方法，那么它一旦被 rejected ，并不会触发 Promise.all() 的 catch 方法
const p1 = new Promise((resolve, reject) => {
    resolve('hello');
}).then(result => result).catch(e => e);
const p2 = new Promise((resolve, reject) => {
    throw new Error('报错了');
}).then(result => result).catch(e => e);
Promise.all([p1,p2]).then(result => console.log(result)).catch(e => console.log(e));

// Promise.race()
// Promise.race 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例
const p = Promise.race([p1,p2,p3]);

const p = Promise.race([fetch('/resource-that-may-take-a-while'),new Promise(function(resolve, reject) {
    setTimeout(() => {
        reject(new Error('request timeout'));
    }, 5000);
})]);
p.then(response => console.log(response));
p.catch(error => console.log(error));

// Promise.resolve()
const jsPromise = Promise.resolve($.ajax('/whatever.json'));

Promise.resolve('foo');
// 等价于
new Promise(resolve => resolve('foo'));

// (2)参数是一个thenable对象
let thenable = {
    then:function(resolve,reject) {
        resolve(42);
    }
};
let p1 = Promise.resolve(thenable);
p1.then(function(value) {
    console.log(value);
});

// (3) 参数不是具有then方法的对象,或者根本就不是对象，则 Promise.resolve 方法返回一个新的 Promise 对象，状态为 resolved 
const p = Promise.resolve('Hello');
p.then(function(s) {
    console.log(s);
});

setTimeout(function() {
    console.log('three');
},0);
Promise.resolve().then(function() {
    console.log('two');
});
console.log('one');

// Promise.reject()
const p = Promise.reject('出错了');
// 等同于
const p = new Promise((resolve, reject) => reject('出错了'));
p.then(null,function(s) {
    console.log(s);
});

 // 注意， Promise.reject() 方法的参数，会原封不动地作为 reject 的理由，变成后续方法的参数。这一点与 Promise.resolve 方法不一致
 const thenable = {
     then(resolve, rejected){
        reject('出错了');
     }
 };
 Promise.reject(thenable).catch(e => {
     console.log(e === thenable);
 });

 // done()
 Promise.prototype.done = function(onFulfilled, onRejected) {
     this.then(onFulfilled, onRejected).catch(function(reason) {
         // 抛出一个全局错误
         setTimeout(() => {
             throw reason;
         }, 0);
     })
 }

 // finally()
 // finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。它与 done 方法的最大区别，它接受一个普通的回调函数作为参数，该函数不
//管怎样都必须执行
ServiceWorkerRegistration.listen(0).then(function() {
    // run test
}).finally(server.stop);

// 它的实现
Promise.prototype.finally = function(callback) {
    let P = this.constructor;
    return this.then(value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {throw reason}));
}

// 应用
// 加载图片
const preloadImage = function(path) {
    return new Promise(function(resolve,reject) {
        const image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = path;
    });
}

// Generator函数Promise的结合
function getFoo() {
    return new Promise(function(resolve, reject) {
        resolve('foo');
    });
}
const g = function* () {
    try {
        const foo = yield getFoo();
        console.log(foo);
    } catch (e) {
        console.log(e);
    }
}
function run(generator) {
    const it = generator();
    function go(result) {
        if (result.done) return result.value;
        return result.value.then(function(value) {
            return go(it.next(value));
        },function(error) {
            return go(it.throw(error));
        });
    }
    go(it.next());
}
run(g);