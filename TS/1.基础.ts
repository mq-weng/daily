//数组
let arr:number[] = [1,2,3];
let arr1:Array<number> = [1,23];//这是利用数组泛型定义
//字符串
let str: string = `数字 ${arr}`;
//元组(定义了类型的数组)
let arr2:[string,number];
arr2 = ["dsdj",2];
//枚举
enum a {
	num=1,
	num1,
	num2
}
console.log(a)

//any
let x : any =  "fjff";
x = 12;

//联合类型，可以给一个变量定义多种类型
let y : string | number  = '12';

//类型断言(允许类型的转换，仅当 S 类型是 T 类型的子集，或者 T 类型是 S 类型的子集时，S 能被成功断言成 T)
let num = 1;
let num1 : string = <string> <any> num;

//作用域
class p {
	name = "huhu"; //实例变量
	static age = 22; //静态变量
}
console.log(p.age);

//函数可选参数
function test(name: string, age ? : number){
	if(age){
		console.log(age)
	}
}
test("ggy",22);


