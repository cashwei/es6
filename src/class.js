// Class 的基本语法
// JavaScript 语言中，生成实例对象的传统方法是通过构造函数
function Point(x,y) {
    this.x = x;
    this.y = y;
}
Point.prototype.toString = function() {
    return '(' + this.x + ', ' + this.y + ')';
}
var p = new Point(1,2);

// 定义类
class Point{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    toString(){
        return '(' + this.x + ', ' + this.y + ')';
    }
}

// Class 表达式
const MyClass = class Me{
    getClassName(){
        return Me.name;
    }
}
let inst = new MyClass();
console.log(inst.getClassName());

// 采用 Class 表达式，可以写出立即执行的 Class
let person = new class{
    constructor(name){
        this.name = name;
    }
    sayName(){
        console.log(this.name);
    }
}('张三');
console.log(person.sayName());

//  私有方法
class Widget{
    // 共有方法
    foo(baz){
        this._bar = baz;
    }
    // 私有方法
    _bar(baz){
        return this.snaf = baz;
    }
}

// 私有属性
class Point{
    #x;
    constructor(x=0){
        #x = +x;
    }
    get x(){return #x;}
    set x(value){#x = +value}
}


// this 的指向
// 类的方法内部如果含有 this ，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错
class Logger{
    printName(name = 'there'){
        this.print(`Hello ${name}`);
    }
    print(text){
        console.log(text);
    }
}
const logger = new Logger();
const {printName} = logger;
printName();

// 一个比较简单的解决方法是，在构造方法中绑定 this ，这样就不会找不到 print 方法了
class Logger{
    constructor(){
        this.printName = this.printName.bind(this);
    }
}

// 另一种解决方法是使用箭头函数
class Logger{
    constructor(){
        this.printName = (name = 'there') => {
            this.print(`Hello ${name}`);
        }
    }
}

// 还有一种解决方法是使用 Proxy ，获取方法的时候，自动绑定 this 



// Class 的取值函数(getter)和存值函数(setter)
class MyClass{
    constructor(){}
    get prop(){
        return 'getter';
    }
    set prop(value){
        console.log('setter: '+value);
    }
}
let inst = new MyClass();
inst.prop = 123;
inst.prop;

// 存值函数和取值函数是设置在属性的 Descriptor 对象上的
class CustomHtmlElement{
    constructor(element){
        this.element = element;
    }
    get html(){
        return this.element.innerHTML;
    }
    set html(value){
        this.element.innerHTML = value;
    }
}
var descriptor = Object.getOwnPropertyDescriptor(CustomHtmlElement.prototype,"html");
"get" in descriptor // true 
"set" in descriptor // true

// Class 的 Generator 方法
class Foo{
    constructor(...args){
        this.args = args;
    }
    * [Symbol.iterator](){
        for (let arg of this.args) {
            yield arg
        }
    }
}
for (let x of new Foo('hello','world')) {
    console.log(x);
}

// Class 的静态方法
// 类相当于实例的原型，所有在类中定义的方法，都会被实例继承。如果在一个方法前，加上 static 关键字，就表示该方法不会被实例继承，而是直接通过 类来调用，这就称为“静态方法”
class Foo{
    static classMethod(){
        return 'hello';
    }
}
console.log(Foo.classMethod());
var foo = new Foo();
foo.classMethod();


// 注意，如果静态方法包含 this 关键字，这个 this 指的是类，而不是实例。
class Foo{
    static bar(){
        this.baz();
    }
    static baz(){
        console.log('hello');
    }
    baz(){
        console.log('world');
    }
}
Foo.bar();

// 父类的静态方法，可以被子类继承
class Foo{
    static classMethod(){
        return 'hello';
    }
}
class Bar extends Foo{

}
console.log(Bar.classMethod());

// 静态方法也是可以从 super 对象上调用的
class Foo{
    static classMethod(){
        return 'hello';
    }
}
class Bar extends Foo{
    static classMethod(){
        return super.classMethod() + ', too';
    }
}
console.log(Bar.classMethod());

// new.target 属性
function Person(name) {
    if (new.target !== undefined) {
        this.name = name;
    }else{
        throw new Error('必须使用 new 命令生成实例');
    }
}

// 另一种写法
function Person(name) {
    if (new.target === Person) {
        this.name = name;
    }else{
        throw new Error('必须使用 new 命令生成实例');
    }
}

// Class 内部调用 new.target ，返回当前 Class
class Rectangle{
    constructor(length, width){
        console.log(new.target === Rectangle);
        this.length = length;
        this.width = width;
    }
}

// 需要注意的是，子类继承父类时， new.target 会返回子类
class Rectangle{
    constructor(length, width){
        console.log(new.target === Rectangle);
    }
}
class Square extends Rectangle{
    constructor(length){
        super(length,length);
    }
}
var obj = new Square(3); // 输出 false

// 利用这个特点，可以写出不能独立使用、必须继承后才能使用的类

class Shape{
    constructor(){
        if (new.target === Shape) {
            throw new Error('本类不能实例化');
        }
    }
}
class Rectangle extends Shape{
    constructor(length, width){
        super();
    }
}

var x = new Shape(); // 报错
var y = new Rectangle(3,4); // 正确


// Class 的继承
class Point{

}
class ColorPoint extends Point{
    constructor(x,y,color){
        super(x,y);
        this.color = color;
    }
    toString(){
        return this.color + ' ' + super.toString(); // 调用父类的toString()
    }

}

class Point{}
class ColorPoint extends Point{
    constructor(){
        super();
    }
}
let cp = new ColorPoint();

// 第二种情况， super 作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类
class A{
    p(){
        return 2;
    }
}
class B extends A{
    constructor(){
        super();
        console.log(super.p());
    }
}
let b = new B();

// 这里需要注意，由于 super 指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过 super 调用的
class A{
    constructor(){
        this.p = 2;
    }
}
class B extends A{
    get m(){
        return super.p;
    }
}
let b = new B();
console.log(b.m);

// 如果属性定义在父类的原型对象上， super 就可以取到
class A{}
A.prototype.x = 2;
class B extends A{
    constructor(){
        super();
        console.log(super.x);
    }
}
let b = new B();


// ES6 规定，通过 super 调用父类的方法时，方法内部的 this 指向子类
class A{
    constructor(){
        this.x = 1;
    }
    print(){
        console.log(this.x);
    }
}
class B extends A{
    constructor(){
        super();
        this.x = 2;
    }
    m(){
        super.print();
    }
}
let b = new B();
b.m();

// 由于 this 指向子类，所以如果通过 super 对某个属性赋值，这时 super 就是 this ，赋值的属性会变成子类实例的属性
class A{
    constructor(){
        this.x = 1;
    }
}
class B extends A{
    constructor(){
        super();
        this.x = 2;
        super.x = 3;
        console.log(super.x);
        console.log(this.x);
    }
}
let b = new B();

// 如果 super 作为对象，用在静态方法之中，这时 super 将指向父类，而不是父类的原型对象
class Parent{
    static myMethod(msg){
        console.log('static',msg);
    }
    myMethod(msg){
        console.log('instance',msg);
    }
}
class Child extends Parent{
    static myMethod(msg){
        super.myMethod(msg);
    }
    myMethod(msg){
        super.myMethod(msg);
    }
}
Child.myMethod(1);
var child = new Child();
child.myMethod(2);

// 类的 prototype 属性和__proto__属性
class A{}
class B extends A{}
console.log(B.__proto__ === A);
console.log(B.prototype.__proto__ === A.prototype);


// 下面就是定义了一个带版本功能的数组
class VersionedArray extends Array{
    constructor(){
        super();
        this.history = [[]];
    }
    commit(){
        this.history.push(this.slice());
    }
    revert(){
        this.splice(0, this.length, ...this.history[this.history.length - 1]);
    }
}
var x = new VersionedArray();
x.push(1);
x.push(2);
x.history;

x.commit();
x.history;

x.push(3);
x.history;

x.revert();

// 下面是一个自定义 Error 子类的例子，可以用来定制报错时的行为
class ExtendableError extends Error{
    constructor(message){
        super();
        this.message = message;
        this.stack = (new Error()).stack;
        this.name = this.constructor.name;
    }
}

class MyError extends ExtendableError{
    constructor(m){
        super(m);
    }
}
var myerror = new MyError('11');
myerror.message;
myerror instanceof Error;
myerror.name;
myerror.stack;