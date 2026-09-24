const express = require("express");
const prisma = require("./config/prisma.js")
const authRoutes = require("./routes/auth.routes.js")

const cookieParser = require("cookie-parser");
const app = express();
const PORT = 5000;
app.use(cookieParser());

app.use(express.json());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Habit Tracker API is running",
  });
});
app.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
