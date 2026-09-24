const express = require("express");
 const {login,register}=require("../controllers/auth.controller");
 const authMiddleware = require("../middleware/auth.middleware")

 const router = express.Router();
 router.post("/login",login)
 router.get("/login",(req,res)=>{
    res.json("this is the login page");
 })
 router.post("/register", register);
 router.get("/register",(req,res)=>{
    res.json("this is the register page");
 })
router.get("/test-protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    userId: req.user.id,
  });
});

 module.exports = router;