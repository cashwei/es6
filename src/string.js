// includes(),startsWith(),endsWith()
// includes(): 返回布尔值，表示是否找到了参数字符串
// startsWith(): 返回布尔值，表示参数字符串是否在原字符串的头部
// endsWith(): 返回布尔值，表示参数字符串是否在原字符串的尾部
let s = 'Hello world!';
console.log(s.startsWith('world',6));
console.log(s.endsWith('Hell',4));
console.log(s.includes('lo'));

// repeat()
console.log('x'.repeat(3));
console.log('hello'.repeat(2));
console.log('na'.repeat(0));

// padStart(), padEnd()
console.log('x'.padStart(5,'ab'));
console.log('x'.padStart(4,'ab'));
console.log('x'.padEnd(5,'ab'));
console.log('x'.padEnd(4,'ab'));

console.log(`In JavaScript\n is a line-feed.`);
console.log(`string text line 1
string text line 2`);
console.log(`\`Yo\` World!`);


