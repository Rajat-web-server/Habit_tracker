
const http = require('http');
const myServer = http.createServer((req, res)=>{
    console.log("hello, new request receved");
    res.end("Hello from my Server");
});

myServer.listen(5000,()=>{
    console.log("Server Started");
})