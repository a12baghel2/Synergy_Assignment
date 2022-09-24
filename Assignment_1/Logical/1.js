const fs = require('fs');

const path = './sample.txt';

try{
    let size = 0;
    const stats = fs.statSync(path);
    size = stats.size;
    console.log(size);
    const data = fs.readFileSync(path, "utf8");
    console.log(data);
    let s = data;
    let countWords = s.split(' ').length;
    s = data;
    let countLines = s.split('.').length;
    console.log(`No. of words ${countWords} and No. of Lines ${countLines}`);
}catch(err){
    console.log(err);
}
