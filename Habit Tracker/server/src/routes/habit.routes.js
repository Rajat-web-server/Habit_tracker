const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const { create, getAll, getOne,update } = require("../controllers/habit.controller");

const router = express.Router();

router.post("/", authMiddleware, create);
router.get("/",authMiddleware,getAll)
router.get("/:id",authMiddleware,getOne)
router.patch("/:id", authMiddleware, update);


module.exports = router;