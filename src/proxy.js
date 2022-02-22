// 概述
var obj = new Proxy({},{
    get:function(target,key,receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target,key,receiver);
    },
    set:function(target,key,value,receiver) {
        console.log(`setting ${key}!`);
        return Reflect.set(target,key,value,receiver);
    }
});
obj.count = 1;
++obj.count;

var proxy = new Proxy({},{
    get:function(target,property) {
        return 35;
    }
});
console.log(proxy.time);
console.log(proxy.name);
console.log(proxy.title);

// 如果 handler 没有设置任何拦截，那就等同于直接通向原对象。
var target = {};
var handler = {};
var proxy = new Proxy(target,handler);
proxy.a = 'b';
console.log(target.a);

var proxy = new Proxy({},{
    get:function(target,property) {
        return 35;
    }
});
let obj = Object.create(proxy);
console.log(obj.time);

var handler = {
    get:function(target,name) {
        if (name === 'prototype') {
            return Object.prototype
        }
        return 'Hello, ' + name;
    },
    // apply:function(target,thisBinding,args) {
    //     return args[0];
    // },
    construct:function(target,args) {
        return {value:args[1]};
    }
}
var fproxy = new Proxy(function(x,y) {
    return x+y;
},handler);
console.log(fproxy(1,2));
console.log(new fproxy(1,2));

// Proxy实例的方法
// get()
var person = {
    name: "张三"
}
var proxy = new Proxy(person,{
    get: function(target,property) {
        if (property in target) {
            return target[property];
        }else{
            throw new ReferenceError("Property \""+property+"\" does not exist!");
        }
    }
});
proxy.name; // 张三
proxy.age; // 抛出一个错误

// get方法可以继承
let proto = new Proxy({},{
    get:function(target,propertyKey,receiver) {
        console.log('GET '+propertyKey);
        return target[propertyKey];
    }
});
let obj = Object.create(proto);
// obj.foo = 'Hello';
obj.foo;

function createArray(...elements) {
    let handler = {
        get(target,propKey,receiver){
            let index = Number(propKey);
            if (index < 0) {
                propKey = String(target.length+index);
            }
            return Reflect.get(target,propKey,receiver);
        }
    }
    let target = [];
    target.push(...elements);
    return new Proxy(target,handler);
}
let arr = createArray('a','b','c');
console.log(arr[-1]);

var pipe = (function() {
    return function(value) {
        var funcStack = [];
        var oproxy = new Proxy({},{
            get:function(pipeObject,fnName) {
                if (fnName === 'get') {
                    return funcStack.reduce(function(val,fn) {
                        return fn(val);
                    },value);
                }
            }
        });
        return oproxy;
    }
}());
var double = n => n*2;
var pow = n => n*n;
var veserseInt = n.toString().split("").reverse().join("") | 0;
pipe(3).double.pow.reverseInt.get;

const dom = new Proxy({},{
    get(target,property){
        return function(attrs = {}, ...chilren) {
            const el = document.createElement(property);
            for (let prop of Object.keys(attrs)) {
                el.setAttribute(prop,attrs[prop]);
            }
            for (let child of chilren) {
                if (typeof child === 'string') {
                    child = document.createTextNode(child);
                }
                el.appendChild(child);
            }
            return el;
        }
    }
});
const el = dom.div({},
    'Hello, my name is ',
    dom.a({href:'//example.com','Mark'}),
    '.I like:',
    dom.ul({},
        dom.li({},'The web'),
        dom.li({},'Food'),
        dom.li({},'...actually that\'s it')
        )
    );
document.body.appendChild(el);



const target = Object.defineProperties({},{
    foo:{
        value:123,
        writable:false,
        configurable:false
    }
});
const handler = {
    get(target,propKey){
        return 'abc';
    }
}
const proxy = new Proxy(target,handler);
proxy.foo;


// set()

let validator = {
    set: function(obj,prop,value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('The age is not an integer');
            }
            if (value > 200) {
                throw new RangeError('The age seems invalid');
            }
            // 对于age以为的属性，直接保存
            obj[prop] = value;
        }
    }
};
let person = new Proxy({},validator);
person.age = 100;
person.age = 'young'; // 报错
person.age = 300; // 报错


const handler = {
    get(target,key){
        invariant(key,'get');
        return target[key];
    },
    set(target,key,value){
        invariant(key,'set');
        target[key] = value;
        return true;
    }
};
function invariant(key,action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
}
const target = {};
const proxy = new Proxy(target,handler);
proxy._prop;

// apply()
var handler = {
    apply(target,ctx,args){
        return Reflect.apply(...arguments);
    }
};

var target = function() {
    return 'I am target';
}
var handler = {
    apply:function() {
        return 'I am the proxy';
    }
}
var p = new Proxy(target,handler);
console.log(p());

var twice = {
    apply(target,ctx,args){
        return Reflect.apply(...arguments) * 2;
    }
};
function sum(left,right) {
    return left + right;
}
var proxy = new Proxy(sum,twice);
proxy(1,2); // 6
proxy.call(null,5,6); // 22
proxy.apply(null,[7,8]); // 30

// has()
var handler = {
    has(target,key){
        if (key[0] === '_') {
            return false;
        }
        return key in target;
    }
}
var target = {
    _prop:'foo',
    prop:'foo'
}
var proxy = new Proxy(target,handler);
console.log('_prop' in proxy);

var obj = {a:10};
Object.preventExtensions(obj);
var p = new Proxy(obj,{
    has:function(target,prop) {
        return false;
    }
});
'a' in p;


let stu1 = {name:'张三', score:59};
let stu2 = {name:'李四', score:99};
let handler = {
    has(target,prop){
        if (prop === 'score' && target[prop] < 60) {
            console.log(`${target.name} 不及格`);
            return false;
        }
        return prop in target;
    }
};
let oproxy1 = new Proxy(stu1,handler);
let oproxy2 = new Proxy(stu2,handler);

'score' in oproxy1;
'score' in oproxy2;

for (let a in oproxy1) {
    console.log(oproxy1[a]);
};
for (let b in oproxy2) {
    console.log(oproxy2[b]);
}

// construct()
var handler = {
    construct(target,args,newTarget){
        return new target(...args);
    }
}

var p = new Proxy(function() {},{
    construct:function(target,args) {
        console.log('called: ' + args.join(', '));
        return {value: args[0] * 10};
    }
});
console.log((new p(1)).value);

// deleteProperty()
var handler = {
    deleteProperty(target,key){
        invariant(key,'delete');
        delete target[key];
        return true;
    }
}
function invariant(key,action) {
    if (key[0] === '_') {
        throw new Error(`Invalid attempt to ${action} private "${key}" property`);
    }
}
var target = {_prop:'foo'};
var proxy = new Proxy(target,handler);
delete proxy._prop;

// defineProperty()
var handler = {
    defineProperty(target,key,descriptor){
        return false;
    }
};
var target = {};
var proxy = new Proxy(target,handler);
// proxy.foo = 'bar';
Object.defineProperty(proxy,'foo',{
    value:'bar'
})
console.log(proxy.foo);

// getOwnPropertyDescriptor()
var handler = {
    getOwnPropertyDescriptor(target,key){
        if (key[0] === '_') {
            return;
        }
        return Object.getOwnPropertyDescriptor(target,key);
    }
};
var target = {_foo:'bar',baz:'tar'};
var proxy = new Proxy(target,handler);
console.log(Object.getOwnPropertyDescriptor(proxy,'wat'));
console.log(Object.getOwnPropertyDescriptor(proxy,'_foo'));
console.log(Object.getOwnPropertyDescriptor(proxy,'baz'));

// getPrototypeOf()
var proto = {};
var p = new Proxy({},{
    getPrototypeOf(target){
        return proto;
    }
});
console.log(Object.getPrototypeOf(p) === proto);

// isExtensible()
var p = new Proxy({},{
    isExtensible:function(target) {
        console.log('called');
        return false;
    }
});
Object.isExtensible(p);

// ownKeys()
let target = {
    a:1,
    b:2,
    c:3
};
let handler = {
    ownKeys(target){
        return ['a'];
    }
};
let proxy = new Proxy(target,handler);
console.log(Object.keys(proxy));

let target = {
    _bar:'foo',
    _prop:'bar',
    prop:'baz'
};
let handler = {
    ownKeys(target){
        return Reflect.ownKeys(target).filter(key => key[0] !== '_');
    }
}
let proxy = new Proxy(target,handler);
for (let key of Object.keys(proxy)) {
    console.log(target[key]);
}

let target = {
    a:1,
    b:2,
    c:3,
    [Symbol.for('secret')]:'4'
};
Object.defineProperty(target,'key',{
    enumerable:false,
    configurable:true,
    writable:true,
    value:'static'
});
let handler = {
    ownKeys(target){
        return ['a','d',Symbol.for('secret'),'key'];
    }
};
let proxy = new Proxy(target,handler);
console.log(Object.keys(proxy));
console.log(Object.getOwnPropertyNames(proxy));


var p = new Proxy({},{
    ownKeys:function(target) {
        return ['a','b','c'];
    }
});
console.log(Object.getOwnPropertyNames(p));


var obj = {};
var p = new Proxy(obj,{
    ownKeys:function(target) {
        return [123, true, undefined, null, {}, []];
    }
});
Object.getOwnPropertyNames(p);

var obj = {};
Object.defineProperty(obj,'a',{
    configurable:false,
    enumerable:true,
    value:10
});
var p = new Proxy(obj,{
    ownKeys:function(target) {
        return ['b'];
    }
});
Object.getOwnPropertyNames(p);

var obj = {
    a:1
};
Object.preventExtensions(obj);
var p = new Proxy(obj,{
    ownKeys:function(target) {
        return ['a','b'];
    }
});
Object.getOwnPropertyNames(p);

// preventExtensions()
var p = new Proxy({},{
    preventExtensions:function(target) {
        return true;
    }
});
Object.preventExtensions(p);

var p = new Proxy({},{
    preventExtensions:function(target) {
        console.log('called');
        Object.preventExtensions(target);
        return true;
    }
});
Object.preventExtensions(p);

// setPrototypeOf()
var handler = {
    setPrototypeOf(target,proto){
        throw new Error('Changing the prototype is forbidden');
    }
};

var proto = {};
var target = function() {
    
}
var proxy = new Proxy(target,handler);
Object.setPrototypeOf(proxy,proto);

// Proxy.revocable()
let target = {};
let handler = {};

let {proxy,revoke} = Proxy.revocable(target,handler);
proxy.foo = 123;
console.log(proxy.foo);
revoke();
proxy.foo;

// this问题
const target = {
    m:function() {
        console.log(this === proxy);
    }
};
const handler = {};
const proxy = new Proxy(target,handler);
target.m();
proxy.m();

const _name = new WeakMap();
class Person{
    construct(name){
        _name.set(this,name);
    }
    get name(){
        return _name.get(this);
    }
}
const jane = new Person('Jane');
console.log(jane.name);

const proxy = new Proxy(jane,{});
console.log(proxy.name);

const target = new Date();
const handler = {};
const proxy = new Proxy(target,handler);
proxy.getDate();


const target = new Date('2015-01-01');
const handler = {
    get(target,prop){
        if (prop === 'getDate') {
            return target.getDate.bind(target);
        }
        return Reflect.get(target,prop);
    }
};
const proxy = new Proxy(target,handler);
console.log(proxy.getDate());