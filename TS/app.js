var message = "hello world";
console.log(message);
function test(name) {
    return "hello" + name;
}
console.log(test("mq"));
function test1(person) {
    console.log(person.name);
    console.log(person.age);
}
test1({ name: "huhu", age: 22 });
