//数组
var arr = [1, 2, 3];
var arr1 = [1, 23]; //这是利用数组泛型定义
//字符串
var str = "\u6570\u5B57 " + arr;
//元组(定义了类型的数组)
var arr2;
arr2 = ["dsdj", 2];
//枚举
var a;
(function (a) {
    a[a["num"] = 1] = "num";
    a[a["num1"] = 2] = "num1";
    a[a["num2"] = 3] = "num2";
})(a || (a = {}));
console.log(a);
//any
var x = "fjff";
x = 12;
//联合类型，可以给一个变量定义多种类型
var y = '12';
//类型断言(允许类型的转换，仅当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 T)
var num = 1;
var num1 = num;
//作用域
var p = /** @class */ (function () {
    function p() {
        this.name = "huhu"; //实例变量
    }
    p.age = 22; //静态变量
    return p;
}());
console.log(p.age);
//函数可选参数
function test(name, age) {
    if (age) {
        console.log(age);
    }
}
test("ggy", 22);
//unknown(弥补)
var k;
var num = k;
