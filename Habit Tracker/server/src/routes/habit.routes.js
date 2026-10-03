const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const { create, getAll } = require("../controllers/habit.controller");

const router = express.Router();

router.post("/", authMiddleware, create);
router.get("/",authMiddleware,getAll)

module.exports = router;