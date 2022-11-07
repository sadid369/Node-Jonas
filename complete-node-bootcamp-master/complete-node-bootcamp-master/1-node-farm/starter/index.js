const { constants } = require("buffer");
const fs = require("fs");
const http = require("http");
const url = require("url");
/////////////
//FILES
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about the avocado: ${textIn}.\n Create on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// const output = fs.readFileSync("./txt/output.txt", "utf-8");
// console.log(output);
// console.log("File written!");
// non-blocking
/*
fs.readFile("./txt/start.txt", "utf-8", function (err, data1) {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", function (err, data2) {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", function (err, data3) {
      fs.writeFile(
        `./txt/final.txt`,
        `${data2}\n${data3}`,
        "utf-8",
        function (err) {
          console.log("Your file has been written");
        }
      );
    });
  });
});
console.log("Will read file");*/

///////////////////////////////
//server
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  return output;
};
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const server = http.createServer((req, res) => {
  console.log(req.url);
  const pathName = req.url;

  //OVERVIEW PAGE
  if (pathName === "/" || pathName === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARD%}", cardsHtml);
    console.log(cardsHtml);
    res.end(output);

    //PRODUCT PAGE
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");

    //API
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
    //NOT FOUND
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page Not Found</h1>");
  }
});

server.listen(8000, "127.0.0.1", function () {
  console.log(`listening to request on port 8000`);
});
