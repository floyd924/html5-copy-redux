console.log("hello world");


let iain = ["one"];
let benj = ["two"];
let steven = ["three"];

let array = [iain, benj, steven];
console.log("this is array:", array);


// array.splice(benj)
// console.log("this is array", array);

let ind = array.indexOf(benj);
array.splice(ind, 1)
// console.log(ind)
// array.slice(ind, 1);
console.log(array);

let newArray = [];
let a = 5;
let b = 4;
let c = 3;
let d = 4;
let e = 4;

newArray.push(a);
newArray.push(b);
newArray.push(c);
newArray.push(d);
newArray.push(e);
console.log(newArray);
newArray.sort();
console.log(newArray);