const express = require("express");
 const {login,register}=require("../controllers/auth.controller");

 const router = express.Router();
 router.post("/login",login)
 router.get("/login",(req,res)=>{
    res.json("this is the login page");
 })
 router.post("/register", register);
 router.get("/register",(req,res)=>{
    res.json("this is the register page");
 })


 module.exports = router;