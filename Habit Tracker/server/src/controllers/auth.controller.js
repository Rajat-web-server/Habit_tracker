const { registerSchema, loginSchema } = require("../validators/auth.validator");
const { registerUser, loginUser } = require("../services/auth.service");

async function login(req, res) {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "There's an error",
        error: result.error.flatten,
      });
    }
    const { token, user } = await loginUser(result.data);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.log(error);
    if (error.message === "Invalid email or password") {
      return res.status(401).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

async function register(req, res) {
  try {
    const result = registerSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: result.error.flatten(),
      });
    }
    const user = await registerUser(result.data);

    res.status(201).json({
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    if (error.message === "User already exists") {
      return res.status(409).json({
        message: error.message,
      });
    }
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}
module.exports = {login,register};
