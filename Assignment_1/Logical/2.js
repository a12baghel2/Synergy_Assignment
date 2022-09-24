const prompt = require('prompt-sync')();

let a = prompt("Enter size of the array");
let array = [];
for(let i=0;i<a;i++){
    array.push(prompt("Enter the elements"));
}

array.sort();

console.log(`Smallest is ${array[0]} and second smallest is ${array[1]}`);