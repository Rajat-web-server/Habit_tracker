const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const { create } = require("../controllers/habit.controller");

const router = express.Router();

router.post("/", authMiddleware, create);

module.exports = router;