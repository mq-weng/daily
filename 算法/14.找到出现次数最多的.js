let arr = [1,2,2,3,3,4,4,4];

function fn(arr) {
    let obj = {};
    for(let i = 0; i < arr.length; i++){
        console.log(arr[i])
        obj[arr[i]] = obj[arr[i]] ? ++obj[arr[i]] : 1;
    }
    let res = Object.keys(obj);
    let c = res[0];
    res.forEach((item) => {
       c = obj[item] > obj[c] ? item : c;  // 比较值，来保存较大值的索引
    })
    console.log(c,obj[c]);
    
}
fn(arr)
console.log(arr)