//找出数组不存在的最小正整数

let fn = function(arr){
    let len = arr.length
    let i = 0;
    let res = [];
    while(i < len){
        if(arr[i] - 1 <= 0){
            i++;
        }else if(a[i] - 1 == 1){

        }
        else{
           res.push(arr[i]-1);

        }
    }
    return arr
}
console.log(fn([2,3,4]))