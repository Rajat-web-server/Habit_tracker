const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Authentication required",
        });
    }
    console.log("Token:", token);
     const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
    req.user = {
      id: decoded.userId,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
module.exports=authMiddleware


// //{   "name": "nigga",
//     "email":"1234@gmail.com",
//     "passoword":"password"
// }