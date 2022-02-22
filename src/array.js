// Es5系列
// indexof
let list = [1,2,3];
console.log(list.indexOf(2));
console.log(list.indexOf('蛙人'));

// map
let list = [1,2,3];
const res = list.map((value, key, self) => {
    console.log(value);
    console.log(key);
    console.log(self);
    return value*2;
});
console.log(res);

// forEach
let list = [1,2,3];
const res = list.forEach((value, key, self) => {
    console.log(value);
    console.log(key);
    console.log(self);
    return 123;
});
console.log(res);

// splice
let list = [1,2,3,4,5];
/* list.splice(0,1); // 从第0个位置，删除一位
console.log(list); */

list.splice(1,0,'蛙人'); // 从第0个位置，删除一位，添加一个字符串'蛙人'
console.log(list)

// slice
let list = [1,2,3,4,5];
let res = list.slice(1,3);
console.log(res);
console.log(list);

// filter
let list = [1,2,3,4,5];
let res = list.filter(item => item>2);
console.log(res);
console.log(list);

// every
let list = [1,2,3,4,5];
let res = list.every(item => item > 2);
console.log(res);

// some
let list = [1,2,3,4,5];
let res = list.some(item => item > 4);
console.log(res);

// reverse
let list = [1,2,3,4,5];
let res = list.reverse();
console.log(res);
console.log(list);

// toString
let list = [1,2,3,4,5];
let res  = list.toString();
console.log(res);
console.log(list);

// Array.isArray()
let list = [1,2,3,4,5];
let res = Array.isArray(list);
console.log(res);

// join
let list = [1,2,3,4,5];
let res = list.join('-');
console.log(res);
console.log(list);

// sort
let list = [1,2,3];
let sort = list.sort((a,b) => b-a);
console.log(list);
console.log(sort);

// concat
let list = [1,2,3];
let res = list.concat([4,[5],[6,['蛙人']]]);
console.log(list);
console.log(res);


// push
let list = [1,2,3];
let res = list.push(['蛙人',5]);
console.log(res);
console.log(list);

// pop
let list = [1,2,3,null,'蛙人'];
let res = list.pop();
console.log(res);
console.log(list);

// shift
let list = [1,2,3];
let res = list.shift();
console.log(res);
console.log(list);

// unshift
let list = [1,2,3];
let res = list.unshift(undefined);
console.log(list);
console.log(res);

// reduce
let list = [1,2,3];
let res = list.reduce((prev, cur) => prev += cur, 0);
console.log(list);
console.log(res);

//Es6系列
// includes
let list = [1,2,3];
let res = list.includes("蛙人");
let res1 = list.includes(1);
console.log(res, res1);

// find
let list = [1,2,3];
let res = list.find((item) => item > 1);
console.log(res);

// findIndex
let list = [1,2,3];
let res = list.findIndex((item) => item > 1);
console.log(res);

// flat
let list = [1,2,3,[4,[5]]];
let res = list.flat(Infinity);
console.log(list);
console.log(res);

// fill
let list = [1,2,3,null,undefined,,8];
let res = list.fill('蛙人');
console.log(res);
console.log(list);

// Array.from
let res = Array.from(document.getElementsByTagName('div'));
console.log(res);

// Array.of
let res = Array.of(1,2,'蛙人');
console.log(res);


// 扩展运算符...
console.log(...[1,2,3]);
console.log([1,2,3]);
let arr = [...[4,5]];
console.log(arr instanceof Array)

var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.push("Kiwi", "Lemon", "Pineapple");
console.log(fruits)

function  length(str) {
    return [...str].length;
}

const go = function*() {
    yield 1;
    yield 2;
    yield 3;
    return 4;
}
console.log([...go()]);

let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three'],
])
console.log(...map.keys());

let arrayLike = {
    '0':'a',
    '1':'b',
    '2':'c',
    length:3
};
let arr = Array.from(arrayLike, x => x+'0');
console.log(arr);

console.log([1,2,3,4,5].copyWithin(0,3));


for (let index of ['a','b'].keys()) {
    console.log(index);
}

for (let elem of ['a','b'].values()) {
    console.log(elem);
}

for (let [index,elem] of ['a','b'].entries()) {
    console.log(index, elem)
}

let letter = ['a','b','c'];
let entries = letter.entries();
console.log(entries.next().value);
console.log(entries.next().value);
console.log(entries.next().value);

console.log([1, 2, 3].includes(3, -4));

// 数组的空位
[,'a'].forEach((x,i) => console.log(i));
let newArr = ['a',,'b'].filter(x => true);
console.log(newArr);
console.log([,'a'].every(x => x === 'a'));
console.log([,'a'].some(x => x !== 'a'));
console.log([,'a'].map(x => 1));

let arr = [ ,,  ];
console.log(arr.length);
for (let i of arr) {
    console.log(1);
}

let set = new Set(['red','green','blue']);
for (let item of set.keys()) {
    console.log(item);
}
for (let [key,value] of set.entries()) {
    console.log(key,value);
}

let set = new Set([1,2,3]);
set = new Set([...set].map(x => x*2));
console.log(set);

//WeakSet
const a = [[1,2],[3,4]];
const ws = new WeakSet(a);
console.log(ws.has(a[0]));

// Map
const m = new Map();
const o = {p:'Hello World'};
m.set(o,'content');
console.log(m.get(o));
console.log(m.has(o));
m.delete(o);
console.log(m.has(o));

const map = new Map([
    ['name','张三'],
    ['title','Author']
]);
console.log(map.size);
console.log(map.has('name'));
console.log(map.get('name'));

const items = [
    ['name','张三'],
    ['title','Author']
];
const map = new Map();
items.forEach(([key,value]) => map.set(key,value));

const set = new Set([
    ['foo',1],
    ['bar',2]
]);
const m1 = new Map(set);
console.log(m1.get('foo'));
m1.set('hello',null);
console.log(m1.has('hello'));
console.log(m1.delete('hello'));
console.log(m1.delete('world'));
console.log(m1.delete('hello'));


const m2 = new Map([['baz',3]]);
const m3 = new Map(m2);
console.log(m3.get('baz'));

const map = new Map([
    ['F','no'],
    ['T','yes']
]);

for (let key of map.keys()) {
    console.log(key);
}
for (let value of map.values()) {
    console.log(value);
}
for (let [key,value] of map.entries()) {
    console.log(key,value);
}

const map0 = new Map().set(1,'a').set(2,'b').set(3,'c');
const map1 = new Map([...map0].filter(([k,v]) => k < 3));
console.log(map1);

const map2 = new Map([...map0].map(([k,v]) => [k*2,'_'+v]));
console.log(map2);

// Map转化为对象
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}
const myMap = new Map().set('yes',true).set('no',false);
console.log(strMapToObj(myMap));

// 对象转为Map
function objToStrMap(obj) {
    let strMap = new Map()
    for (let k of Object.keys(obj)) {
        strMap.set(k,obj[k]);
    }
    return strMap;
}
console.log(objToStrMap({yes:true,no:false}));

// Map转为JSON
function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
}

function maoToArrayJson(map) {
    return JSON.stringify([...map]);
}

// JSON转为Map
function jsonToStrMap(jsonStr) {
    return objToStrMap(JSON.parse(jsonStr));
}

function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}

// WeakMap
const wm1 = new WeakMap();
const key = {foo:1};
wm1.set(key,2);
console.log(wm1.get(key));

let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();
myWeakmap.set(myElement,{timesClicked:0});
myElement.addEventListener('click',function() {
    let logoData = myWeakmap.get(myElement);
    logoData++;
},false);

const _counter = new WeakMap();
const _action = new WeakMap();
class Countdown{
    constructor(counter,action){
        _counter.set(this,counter);
        _action.set(this,action);
    }
    dec(){
        let counter = _counter.get(this);
        if (counter < 1) return;
        counter--;
        _counter.set(this,counter);
        if (counter === 0) {
            _action.get(this)();
        }
    }
}
const c = new Countdown(2,() => console.log('DONE'));
c.dec()
c.dec()