// 函数的扩展

// ES6 之前，不能直接为函数的参数指定默认值，只能采用变通的方法
function log(x,y) {
    // y = y || 'World';
    if (typeof y === 'undefined') {
        y = 'World';
    }
    console.log(x,y);
}
log('Hello');
log('Hello','China');
log('Hello','');

function log(x,y='World') {
    console.log(x,y);
}
log('Hello');
log('Hello','China');
log('Hello','');

function Point(x=0,y=0) {
    this.x=x;
    this.y=y;
}
const p = new Point();
console.log(p);

let x = 99;
function foo(p = x + 1) {
    console.log(p);
}
foo();
x = 100;
foo();
foo(88);

function foo({x,y = 5}) {
    console.log(x,y);
}
foo({});
foo({x:1});
foo({x:1,y:2});
foo();

var x = 1;
function f(y=x) {
    let x = 4;
    console.log(y);
}
f();

// rest 参数
function add(...values) {
    let sum = 0;
    for (var val of values) {
        sum += val;
    }
    return sum;
}
add(4,7,0,9);

function push(array, ...items) {
    items.forEach(function(item) {
        array.push(item);
        console.log(item);
    });
}
var a = [];
push(a,2,3,6);

// 报错
function doSomething(a, b = a) {
    'use strict'
    // code
}

function move({x,y}) {
    return [x,y];
}
console.log(move(1));


function Timer() {
    this.s1 = 0;
    this.s2 = 0;
    // 箭头函数
    setInterval(() => this.s1++, 1000);
    // 普通函数
    setInterval(function(){
        console.log('window s2:',this.s2)
        this.s2++;
    },1000);
}
var timer = new Timer()
setTimeout(() => {
    console.log('s1: ', timer.s1);
}, 3100);
setTimeout(() => {
    console.log('s2: ', timer.s2);
}, 3100);

function insert(value) {
    return {
        into: function(array) {
            return {
                after: function(afterValue) {
                    array.splice(array.indexOf(afterValue)+1,0,value)
                    return array;
                }
            }
        }
    }
}
console.log(insert(2).into([1,3]).after(1));

let insert = (value) => ({into: (array) => ({after: (afterValue) => {
    array.splice(array.indexOf(afterValue)+1,0,value);
    return array;
}})})
console.log(insert(4).into([3,5]).after(3));