const express = require("express");
 const register=require("../controllers/auth.controller");

 const router = express.Router();
 
 router.post("/register", register);
 router.get("/register",(req,res)=>{
    res.json("this si the page");
 })


 module.exports = router;