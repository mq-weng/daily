interface Person{
	name:string;
	age?:number;  //可选属性
}

function test(person: Person){
	console.log(person);
}
test({name: "huhu"})

//函数接口
interface Hello{
	(gender:boolean):boolean;
}
let myHello : Hello;
myHello = function(gender:boolean){
	return gender
}
console.log(myHello(true));

//可索引类型 （两种索引签名：字符串和数字）
interface Index{
	[index:number]:string;
}
let arr:Index;
arr = ["huhu","hgshhk"];
console.log(arr[1]);

//类 接口
interface Student{
	date?:
	 Date;
	hello?(name: string);
}
class S implements Student{
	date: Date;
	hello(name: string){
		return name;
	}
}
let s = new S();
s.date = new Date();
console.log(s.date.getDate()) //17

//接口继承
interface P extends Person{
	gender ?: boolean;
}
let p1 : P = {name:"fff"}; //就这两种写法

let p2 = <P>{};
p2.name = "p2"
console.log(p2.name)

//也可以继承多个接口
interface P3 extends Person, Student{
	gender?:boolean;
}
let p3:P3 = {name:"fff",}