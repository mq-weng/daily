function fn() {
  let lineArr1 = [];
  lineArr1 = line1.split(" ");
  lineArr1 = lineArr1.map((item) => {
    return parseInt(item);
  });
  let n = lineArr1[0];
  let x = lineArr1[1];
  let y = lineArr1[2];
  let line2 = readline();
  let grade = [];
  grade = line2.split(" ");
  grade = grade.map((item) => {
    return parseInt(item);
  });
  grade.sort((a, b) => {
    return a - b;
  });
  let res = [];
  for (let i = x; i <= y; i++) {
    if (n - i >= x && n - i <= y) {
      return grade[i - 1];
    }
  }
  return -1;
}
console.log(fn());
