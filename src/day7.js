function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}
timeout(100).then((value) => {
  console.log(value);
});

let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

const getJSON = function (url) {
  const promise = new Promise(function (resolve, reject) {
    const handler = function () {
      if(this.readyState !== 4){
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    }
    const client = new XMLHttpRequest();
    client.open("GET",url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });
  return promise;
}
getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});


let promise  = new Promise((resolve, reject) => {
  reject("拒绝了");
  resolve("又通过了");
});
promise.then((data) => {
  console.log('success' + data);
}, (error) => {
  console.log(error);
});
// 执行结果：“拒绝了”


let fs = require('fs');
const { resolve } = require('path');
const { config } = require('process');
const { fileURLToPath } = require('url');
function read(filePath,encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath,encoding, (err, data) => {
      if(err) reject(err);
      resolve(data);
    });
  });
}

read('1.promise/readme.txt','utf8').then((data) => {
  console.log(data);
});

read('readme.txt', 'utf8').then((data) => {
  return read(data, 'utf8');
}).then((data) => {
  return read(data, 'utf8');
}).then((data) => {
  console.log(data);
});

//再对下一步then进行新的处理，我们对readme3.txt的内容进行加工并返回
read('readme.txt', 'utf8').then((data) => {
  return read(data, 'utf8');
}).then((data) => {
  return read(data, 'utf8');
}).then(data => {
  return data.split('').reverse().join(); // 这一步返回的是一个普通值，普通值在下一个then会作为resolve处理
}).then(null, data => {// 特意不对成功做处理，放过这一个值，进入下一步
  throw new Error('出错');// 由于上一步返回的是普通值，走成功回调，不会走到这里
}).then(data => {
  console.log(data); // 最终会打印出来上上步的普通值
});

read('readme.txt', 'utf8').then((data) => {
  return read(data, 'utf8');
}).then((data) => {
  return read(data, 'utf8');
}).then(data => {
  return data.split('').reverse().join();
}).then(null, data => {
  throw new Error('出错');
}).then(data => {
  return read(data, 'utf8');
}).then(null, (err) => {
  console.log(err);
});
