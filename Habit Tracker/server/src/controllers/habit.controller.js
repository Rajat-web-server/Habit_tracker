const { createHabitSchema } = require("../validators/habit.validator");
const { createHabit,getUserHabits, getHabitById } = require("../services/habit.service");

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

async function getAll(req, res) {
  try {
    const habits = await getUserHabits(req.user.id);

    res.status(200).json({
      habits,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
}
async function getOne(req, res) {
  try {
    const habit = await getHabitById(
      req.params.id,
      req.user.id
    );

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found",
      });
    }

    res.status(200).json({
      habit,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

module.exports={create, getAll, getOne}