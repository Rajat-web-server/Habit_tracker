const http = require('http');
const fs = require('fs')
const myServer = http.createServer((req, res)=>{
    const log =`${Date.now()}:${req.url} New Req recieved\n`
   fs.appendFile("log.txt",log,(error, data)=>{
    console.log("Inside appendFile");

        if (error) {
            console.log(error);
            res.end("Error");
            return;
        }
    switch(req.url){
        case "/":
            res.end("Hello from my Server");
            break;
        case "/dashboard":
            res.end("This is my dashboard");
            break;
        case "/dashboard/under":
            res.end("This is my under");
            break;
        case "/hashmap":
            res.end("Hello from my hashmap");
            break;
            default:
                res.end("Page not found");
    }
   })
});

myServer.listen(5000,()=>{
    console.log("Server Started");
}) 





// console.log(req.ip);
// console.log(req.socket.remoteAddress);
// console.log(req.headers["x-forwarded-for"]);