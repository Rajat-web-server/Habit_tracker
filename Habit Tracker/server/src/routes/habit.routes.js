const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");
const { create, getAll, getOne,update, remove, complete,getCompletions } = require("../controllers/habit.controller");

const router = express.Router();

router.post("/", authMiddleware, create);
router.get("/",authMiddleware,getAll)
router.get("/:id",authMiddleware,getOne)
router.patch("/:id", authMiddleware, update);
router.delete("/:id", authMiddleware, remove);
router.post("/:id/completions", authMiddleware, complete);
router.get("/:id/completions", authMiddleware, getCompletions);

module.exports = router;