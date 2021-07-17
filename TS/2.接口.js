function test(person) {
    console.log(person);
}
test({ name: "huhu" });
var myHello;
myHello = function (gender) {
    return gender;
};
console.log(myHello(true));
var arr;
arr = ["huhu", "hgshhk"];
console.log(arr[1]);
var S = /** @class */ (function () {
    function S() {
    }
    S.prototype.hello = function (name) {
        return name;
    };
    return S;
}());
var s = new S();
s.date = new Date();
console.log(s.date.getDate()); //17
var p1 = { name: "fff" }; //就这两种写法
var p2 = {};
p2.name = "p2";
console.log(p2.name);
var p3 = { name: "fff" };
