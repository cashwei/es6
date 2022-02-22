// 老写法
try {
    Object.defineProperty(target,property,attributes);
    // success
} catch (e) {
    // failure
}
// 新写法
if (Reflect.defineProperty(target,property,attributes)) {
    // success
}else{
    // failure
}

Proxy(target,{
    set:function(target,name,value,receiver) {
        var success = Reflect.set(target,name,value,receiver);
        if (success) {
            log('property ' + name + ' on ' + target + ' set to ' + value);
        }
        return success;
    }
});

var loggedObj = new Proxy(obj,{
    get(target,name){
        console.log('get', target, name);
        return Reflect.get(target,name);
    },
    deleteProperty(target,name){
        console.log('delete' + name);
        return Reflect.deleteProperty(target,name);
    },
    has(target,name){
        console.log('has' + name);
        return Reflect.has(target,name);
    }
});

Function.prototype.apply.call(Math.floor,undefined,[1.75]);
Reflect.apply(Math.floor,undefined,[1.75]);

// Reflect.get(target,name,receiver)
var myObject = {
    foo:1,
    bar:2,
    get baz(){
        return this.foo + this.bar;
    }
};
var myReceiverObject = {
    foo:4,
    bar:4
};
console.log(myObject.baz);
console.log(Reflect.get(myObject,'foo'));
console.log(Reflect.get(myObject,'bar'));
console.log(Reflect.get(myObject,'baz',myReceiverObject));


// Reflect.set(target,name,value,receiver)
var myObject = {
    foo:4,
    set bar(value){
        return this.foo = value;
    }
};
var myReceiverObject = {
    foo:0
};
console.log(myObject.foo);
Reflect.set(myObject,'foo',2);
console.log(myObject.foo);

Reflect.set(myObject,'bar',1,myReceiverObject);
console.log(myObject.foo);
console.log(myReceiverObject.foo);

let p = {
    a:'a'
};
let handler = {
    set(target,key,value,receiver){
        console.log('set');
        Reflect.set(target,key,value,receiver);
    },
    defineProperty(target,key,attribute){
        console.log('defineProperty');
        Reflect.defineProperty(target,key,attribute);
    }
};
let obj = new Proxy(p,handler);
obj.a = 'A';
console.log(p.a);
console.log(obj.a);

// Reflect.has(obj,name)
var myObject = {
    foo:1
};
console.log('foo' in myObject);
console.log(Reflect.has(myObject,'foo'));

// Reflect.deleteProperty(obj,name);
const myObj = {
    foo: 'bar'
};
// 旧写法
delete myObject.foo;
// 新写法
Reflect.deleteProperty(myObj,'foo');

// Reflect.construct(target,args)
// Reflect.construct方法等同于new target(...args)，这提供了一种不使用new来调用构造函数的方法
function Greeting(name) {
    this.name = name;
}
// new 写法
const instance = new Greeting('张三');
// Reflect.construct的写法
const instance = Reflect.construct(Greeting,['张三']);

// Reflect.getPrototypeOf(obj)
const myObj = new FancyThing();
// 旧写法
Object.getPrototypeOf(myObj) === FancyThing.prototype;
// 新写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype;

// Reflect.setPrototypeOf(obj,newProto)
const myObj = new FancyThing();
// 旧写法
Object.setPrototypeOf(myObj,OtherThing.prototype);
// 新写法
Reflect.setPrototypeOf(myObj,OtherThing.prototype);

// Reflect.apply(func,thisArg,args)
const ages = [11,33,12,54,18,96];
// 旧写法
const youngest = Math.min.apply(Math,ages);
const oldest = Math.max.apply(Math,ages);
const type = Object.prototype.toString.call(youngest);

//新写法
const youngest = Reflect.apply(Math.min,Math,ages);
const oldest = Reflect.apply(Math.max,Math,ages);
const type = Reflect.apply(Object.prototype.toString,youngest,[]);

// Reflect.defineProperty(target,propertyKey,attributes)
function MyDate() {
    /*...*/
}
// 旧写法
Object.defineProperty(MyDate,'now',{
    value:() => Date.now()
});
// 新写法
Reflect.defineProperty(MyDate,'now',{
    value:() => Date.now()
});

// Reflect.getOwnPropertyDescriptor(target,propertyKey)
var myObject = {};
Object.defineProperty(myObject,'hidden',{
    value:true,
    enumerable:false
});
// 旧写法
var theDescriptor = Object.getOwnPropertyDescriptor(myObject,'hidden');
// 新写法
var theDescriptor = Reflect.getOwnPropertyDescriptor(myObject,'hidden');


// Reflect.isExtensible(target)
const myObject = {};
// 旧写法
Object.isExtensible(myObject);
// 新写法
Reflect.isExtensible(myObject);

// Reflect.preventExtensions(target)
var myObject = {};
// 旧写法
Object.preventExtensions(myObject);
// 新写法
Object.preventExtensions(myObject);

// Reflect.ownKeys(target)
var myObject = {
    foo:1,
    bar:2,
    [Symbol.for('baz')]:3,
    [Symbol.for('bing')]:4
};
// 旧写法
Object.getOwnPropertyNames(myObject);
Object.getOwnPropertySymbols(myObject);
// 新写法
Reflect.ownKeys(myObject);

// 实例子：使用Proxy实现观察者模式
const queuedObservers = new Set();
const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj,{set});

function set(target,key,value,receiver) {
    const result = Reflect.set(target,key,value,receiver);
    queuedObservers.forEach(observer => observer());
    return result;
}
