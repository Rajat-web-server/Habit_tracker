const { createHabitSchema } = require("../validators/habit.validator");
const { createHabit } = require("../services/habit.service");

async function create(req, res) {
  try {
    const result = createHabitSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: result.error.flatten(),
      });
    }
    const habit = await createHabit({
      title: result.data.title,
      userId: req.user.id,
    });
    res.status(201).json({
      message: "Habit created successfully",
      habit,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

module.exports={create}