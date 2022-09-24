const prompt = require("prompt-sync")();

const changeCase = (str,ch) => {
    let len = str.length;
    let ans = ""
    for(let i = 0;i<len;i++){
        if(str[i] == ch){
            ans += String.fromCharCode(str.charCodeAt(i)-32);
        }else {
            ans += str[i];
        }
    }
    console.log(ans);
}

let str = prompt("Enter a string ");
let char = prompt("Enter the char you want to transform ")
changeCase(str, char);