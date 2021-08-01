var a = {
    name: '前端食堂',
    age: 2 
}
var expand = function (b) {
    b.age = 18;
    b = {
        name: '童欧巴',
        age: 25
    };
    return b;
};
var c = expand(a);
console.log(c);
console.log(a.age);
console.log(a);
// 25
// 18
// {name: "前端食堂", age: 18}

