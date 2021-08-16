let arr = [1, 2, [4, 5, 6, [7, 2]], 0]


let fn1 = function(arr) {
	let res = arr.toString();
	res = res.split(",").map((item) => {
		return Number(item)
	})
	console.log(res)
}

let fn2 = function(arr) {
	let res = [];
	let fn3 = function(arr) {
		arr.forEach((item) => {
			item.constructor == Array ? fn3(item) : res.push(item)
		})
	}
	fn3(arr)
	return res;
}
console.log(fn2(arr))

console.log(Object.prototype.toString.call(arr))
