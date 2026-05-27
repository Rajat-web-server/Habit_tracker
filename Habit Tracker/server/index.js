const http = require('http');
const fs = require('fs');
const url = require('url');

const myServer = http.createServer((req, res)=>{
    const log =`${Date.now()}:${req.url} New Req recieved\n`
    const myURL = new URL(req.url, `http://${req.headers.host}`);
     console.log(myURL);
    console.log("Pathname:", myURL.pathname);
   fs.appendFile("log.txt",log,(error, data)=>{
    console.log("Inside appendFile");
        if (error) {
            console.log(error);
            res.end("Error");
            return;
        }
    switch(myURL.pathname){
        case "/":
            res.end("Hello from my Server");
            break;
        case "/dashboard":
            res.end("This is my dashboard");
            break;
        case "/dashboard/under":
            let username=myURL.searchParams.get("myname");
            res.end(`hey, ${username} are you unmeployed`);
            break;
        case "/hashmap":
            let report=myURL.searchParams.get("myreport");
            res.end(`yoo, take your ${report} to yourself`);
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