// 修饰器
// 类的修饰
// @testable
class MyTestableClass{

}

function testable(target) {
    target.isTestable = true;
}

MyTestableClass.isTestable; // true


// 基本上，修饰器的行为就是下面这样
// @decorator
class A{}
 
// 等同于
class A{}
A = decorator(A) || A;

// 如果觉得一个参数不够用，可以在修饰器外面再封装一层函数
function testable(isTestable) {
    return function(target) {
        target.isTestable = isTestable;
    }
}
// @testable(true)
class MyTestableClass{}
MyTestableClass.isTestable; // true

// @testable(false)
class MyClass{}
MyClass.isTestable; // false

// 前面的例子是为类添加一个静态属性，如果想添加实例属性，可以通过目标类的 prototype 对象操作
function testable(target) {
    target.prototype.isTestable = true;
}
// @testable
class MyTestableClass{}
let obj = new MyTestableClass();
obj.isTestable; // true

// 下面是另外一个例子
// mixins.js
export function mixins(...list) {
    return function(target) {
        Object.assign(target.prototype,...list);
    }
}

// main.js
import {mixins} from './mixins';
const Foo = {
    foo(){
        console.log('foo');
    }
}
// @mixins(Foo)
class MyClass{}
let obj = new MyClass();
obj.foo();// foo

// 上面代码通过修饰器 mixins ，把 Foo 类的方法添加到了 MyClass 的实例上面。可以用 Object.assign() 模拟这个功能
const Foo = {
    foo(){console.log('foo')}
};
class MyClass{}
Object.assign(MyClass.prototype,Foo);
let obj = new MyClass();
obj.foo();

// 方法的修饰
// 修饰器不仅可以修饰类，还可以修饰类的属性
class Person{
    // @readonly
    name(){
        return `${this.first} ${this.last}`;
    }
}
function readonly(target,name,descriptor) {
    // descriptor对象原来的值如下
    // {
    //     value:sepcifiedFunction,
    //     enumerable:false,
    //     configurable:true,
    //     writable:true
    // }
    descriptor.writable = false;
    return descriptor;
}

// 下面是另一个例子，修改属性描述对象的 enumerable 属性，使得该属性不可遍历
class Person{
    // @nonenumerable
    get kidCount(){return this.children.length;}
}
function nonenumerable(target,name,descriptor) {
    descriptor.enumerable = false;
    return descriptor;
}

// 下面的 @log 修饰器，可以起到输出日志的作用
class Math{
    // @log
    add(a,b){
        return a+B;
    }
}
function log(target,name,descriptor) {
    var oldValue = descriptor.value;
    descriptor.value = function() {
        console.log(`Calling "${name}" with`,arguments);
        return oldValue.apply(null,arguments);
    }
    return descriptor;
}
const math = new Math();
//  passed parameters should get logged now
math.add(2,4);