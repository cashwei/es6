// ES6 系列之箭头函数
let func = value => value;
// 相当于
function func(value) {
    return value;
}

// 如果需要给函数传入多个参数：
let func  = (value, num) => value * num;
// 如果函数的代码块需要多条语句：
let func = (value, num) => {
    return value * num;
}


// 如果需要直接返回一个对象：
let func = (value,num) => ({total: value * num})

// 与变量解构结合：
let func = ({value,num}) => ({total: value * num})
// 使用
var result = func({
    value:10,

    

    
    num:10
});
console.log(result);