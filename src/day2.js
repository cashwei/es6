// ECMAScript 6 - 解构赋值、模板字符串、简化对象写法


//1.解构赋值
//(1) 数组的解构
const BCI = ['New Blanch','Nike','Puma'];
let BCI1,BCI2,BCI3 = BCI;
console.log(BCI1);
console.log(BCI2);
console.log(BCI3);

// (2) 对象的解构
const BCI = {
    arr: ['New Blance','Nike','Puma'],
    tag: function () {
        console.log(`We're very Fake!`);
    }
};
let {arr ,tag} = BCI;
console.log(arr);
console.log(tag);


//2.模板字符串
//(2) 变量拼接
let wechatName = '称成儿';
let description = `${wechatName}是一个分享生活和技术的公众号`;
console.log(description);

//3.简化对象写法
let wechatName = '称成儿';
let description = function () {
    console.log('一个分享生活和技术的公众号');
}
const ChengDale_Coder = {
    wechatName, // 简化写法，等价于wechatName: wechatName
    description, //简化写法，等价于description : description
    improve(){
        console.log('这是简化写法'); // 简化写法，等价于improve: function(){console.log('------');}
    }
};


// 对象的结构赋值
let obj = {
    p:[
        'Hello',
        {y:'World'}
    ]
};
let {p,p:[x,[y]]} = obj;
// x "Hello"
// y "World"
// ['Hello', {y:'World'}]

// 另一个例子。
const node = {
    loc:{
        start:{
            line:1,
            column:5
        }
    }
}
let {loc,loc:{start},loc:{start:{line}}} = node;
// line 1
// loc Object { start: { line:1, column:5 } }
// start Object { line:1, column:5 }

// 函数参数的解构赋值
function add([x,y]) {
    return x + y;
}
add([2,3]); // 5

// 函数参数的解构也可以使用默认值
function move({x=0 ,y=0} = {}) {
    return [x,y];
}
move({x:3,y:8}); // [3,8]
move({x:3}); // [3,0]
move({}); // [0,0]
move(); // [0,0]

// 下面的写法会得到不一样的结果
function move({x,y} = {x:0, y:0}) {
    return[x,y];
}
move({x:3, y:8}); // [3,8]
move({x:3}); // [3,undefined]
move({}); // [undefined, undefined]
move(); // [0,0]

[1,undefined,3].map((x=yes) => x); //[1,yes,3]