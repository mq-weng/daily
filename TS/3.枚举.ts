//常量枚举
const enum Colors {
    Red,
    Yellow,
    Blue
}
// 常量枚举会在编译阶段被删除
let myColors = [Colors.Red, Colors.Yellow, Colors.Blue];

// Num.two = 4;   报错，enum是只读属性

//字符枚举
enum Str {
	one = "sjj",
	two = "Sdkmkdnj",
	three = "sqq"
}
let str : Str = Str.one;

//常量枚举（不会为枚举类型编译生成任何 JavaScript）	
const enum S{
	one,
	two,
	three
}
let s : S = S.one;

//异构枚举的成员值是数字和字符串的混合
enum Enum {
  A,
  B,
  C = "C",
  D = "D",
  E = 8,
  F,
}

enum Char {
    // const member 常量成员：在编译阶段被计算出结果
    a,				 // 没有初始值
    b = Char.a,// 对常量成员的引用
    c = 1 + 3, // 常量表达式
  
    // computed member 计算成员：表达式保留到程序的执行阶段
    d = Math.random(),// 非常量表达式
    e = '123'.length,
    // 紧跟在计算成员后面的枚举成员必须有初始值
    f = 1,
    g
}

