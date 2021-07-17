let message:string = "hello world";
console.log(message);

function test (name: string) : string{
	return "hello" + name;
}
console.log(test("mq"));

interface Person{
	name: string;
	age: number;
}
function test1(person : Person) : void{
	console.log(person.name);
	console.log(person.age);
}
test1({name: "huhu", age: 22})