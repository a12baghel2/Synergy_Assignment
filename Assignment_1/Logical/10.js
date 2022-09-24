const prompt = require("prompt-sync")();

const sortString = (s) => {
    return s.split('').sort().join('');
}

let s = prompt("Enter a String : ");
console.log(`String after sorting ${sortString(s)}`);