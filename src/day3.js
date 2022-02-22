//ECMAScript 6 入门教程—数组的扩展

// 将对象彻底冻结的函数
var constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach( (key,i) => {
        if (typeof obj[key] === 'object') {
            constantize(obj[key]);
        }
    });
}

