const http = require('http');
const fs = require('fs');
const express = require("express")

const app = express();

app.get("/", (req, res)=>{
   return res.end("Hello from the Home Page "+ req.query.name);
})
app.get("/stting", (req, res)=>{
   return res.end("You are in settings Page")
})
app.get("/Analytics", (req, res)=>{
   return res.end("You are in Analytics Page")
})
app.get("/Dashboard", (req, res)=>{
   return res.end("You are in Dashboard Page")
})
app.get("/habits", (req, res)=>{
   return res.end("You are in habits Page")
})

// const myServer= http.createServer(app)

app.listen(5000,()=>{
    console.log("Server Started");
}) 





// console.log(req.ip);
// console.log(req.socket.remoteAddress);
// console.log(req.headers["x-forwarded-for"]);