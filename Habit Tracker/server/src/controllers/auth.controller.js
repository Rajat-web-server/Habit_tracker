const { registerSchema } = require("../validators/auth.validator");
const { registerUser } = require("../services/auth.service");

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
    })
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
module.exports=register;
