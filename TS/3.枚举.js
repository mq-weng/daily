// 常量枚举会在编译阶段被删除
var myColors = [0 /* Red */, 1 /* Yellow */, 2 /* Blue */];
// Num.two = 4;   报错，enum是只读属性
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
var Char;
(function (Char) {
    // const member 常量成员：在编译阶段被计算出结果
    Char[Char["a"] = 0] = "a";
    Char[Char["b"] = 0] = "b";
    Char[Char["c"] = 4] = "c";
    // computed member 计算成员：表达式保留到程序的执行阶段
    Char[Char["d"] = Math.random()] = "d";
    Char[Char["e"] = '123'.length] = "e";
    // 紧跟在计算成员后面的枚举成员必须有初始值
    Char[Char["f"] = 1] = "f";
    Char[Char["g"] = 2] = "g";
})(Char || (Char = {}));
