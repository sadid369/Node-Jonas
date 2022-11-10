const EventEmitter = require("events");
const http = require("http");
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();
myEmitter.on("newSale", () => {
  console.log("There was a new sale");
});
myEmitter.on("newSale", () => {
  console.log("Customer name: Jonas");
});
myEmitter.on("newSale", (stock) => {
  console.log(`Item stock remaining ${stock}`);
});
myEmitter.emit("newSale", 9);

/////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request Received");
  res.end("Request Received");
});
server.on("request", (req, res) => {
  console.log("Another Received 😊 ");
  //   res.end("Another Received 😊");
});

server.on("close", () => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for request");
});
