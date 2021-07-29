//数字枚举
enum Num {
	one,
	two,
	three
}
let num : Num =  Num.two;
console.log(Num[0])
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
