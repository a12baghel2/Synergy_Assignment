const fs = require("fs");

const dir = "./";

fs.readdir(dir, (err, files) => {
  files.forEach((title) => {
    console.log(title);
  });
});
