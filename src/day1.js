// 取值
const obj = {
    a:1,
    b:2,
    c:3,
    d:4,
    e:5
}
const {a,b,c,d,e} = obj || {};
const {a:a1} = obj || {};

// 合并数据
const a = [1,3,4];
const b =[1,5,6];
const obj1 = {
    a:1
}
const obj2 = {
    b:1
}
const c = [...new Set(...a, ...b)];
const obj3 = {...obj1, ...obj2};

// 拼接字符串
const name = '小明';
const score = 59;
const result = `${name}${score > 60?'的考试成绩及格':'的考试成绩不及格'}`;

// if中判断条件
const condition = [1,2,3,4];
if (condition.includes(type)) {
    //...
}

// 列表搜索
/* 精确搜索 */
const a = [1,2,3,4,5];
const result = a.find(item => {
    return item === 3;
});

//ES6中的可选链操作符
const name = obj?.name;

// ES6中新出的空值合并运算符
if((value??'') !== ''){

}

//添加对象属性
let obj = {};
let index = 1;
obj[`topic${index}`] = '话题内容';

// 扁平化数组
const deps = { 
    '采购部':[1,2,3],
    '人事部':[5,8,12],
    '行政部':[5,14,79],
    '运输部':[3,64,105]
}
let member = Object.values(deps).flat(Infinity); //flat方法不支持IE浏览器。