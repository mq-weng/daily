//数字枚举
var Num;
(function (Num) {
    Num[Num["one"] = 0] = "one";
    Num[Num["two"] = 1] = "two";
    Num[Num["three"] = 2] = "three";
})(Num || (Num = {}));
var num = Num.two;
console.log(Num[0]);
Num.two = 4;
//字符枚举
var Str;
(function (Str) {
    Str["one"] = "sjj";
    Str["two"] = "Sdkmkdnj";
    Str["three"] = "sqq";
})(Str || (Str = {}));
var str = Str.one;
var s = 0 /* one */;
//异构枚举的成员值是数字和字符串的混合
var Enum;
(function (Enum) {
    Enum[Enum["A"] = 0] = "A";
    Enum[Enum["B"] = 1] = "B";
    Enum["C"] = "C";
    Enum["D"] = "D";
    Enum[Enum["E"] = 8] = "E";
    Enum[Enum["F"] = 9] = "F";
})(Enum || (Enum = {}));
