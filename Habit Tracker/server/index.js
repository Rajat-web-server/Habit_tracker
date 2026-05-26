const http = require('http');
const fs = require('fs')
const myServer = http.createServer((req, res)=>{
    const log =`${Date.now()}:${req.url} New Req recieved\n`
   fs.appendFile("log.txt",log,(error, data)=>{
       res.end("Hello from my Server");
   })
});

myServer.listen(5000,()=>{
    console.log("Server Started");
}) 





// console.log(req.ip);
// console.log(req.socket.remoteAddress);
// console.log(req.headers["x-forwarded-for"]);