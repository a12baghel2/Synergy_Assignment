const prompt = require('prompt-sync')();

const requiredBits = (num) => {
    let count = 0;
    while(num != 0){
        count++;
        num >>= 1;
    }
    return count;
}

let num = prompt("Enter a number ");
console.log(`No. of bits required are ${requiredBits(num)}`);