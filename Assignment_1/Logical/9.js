const prompt = require("prompt-sync")();

const transform = (arr,n) => {
    let i = -1, j=0;
    while(j != n){
        if(arr[j]%2 == 0){
            let temp = arr[++i];
            arr[i] = arr[j];
            arr[j] = temp; 
        }
        j++;
    }
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

let n = prompt("Enter the size of array : ");
let arr = [];
for(let i = 0;i<n;i++){
    arr.push(prompt(`Enter ${i+1} element : `));
}

console.log(`Array after transforming ${transform(arr,n)}`);