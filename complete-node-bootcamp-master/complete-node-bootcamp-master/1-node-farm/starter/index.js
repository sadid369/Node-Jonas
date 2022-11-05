const fs = require("fs");

const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);
const textOut = `This is what we know about the avocado: ${textIn}.\n Create on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
const output = fs.readFileSync("./txt/output.txt", "utf-8");
console.log(output);
console.log("File written!");
