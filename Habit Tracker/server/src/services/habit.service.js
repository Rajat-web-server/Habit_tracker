const prisma = require("../config/prisma");

async function createHabit({ title, userId }) {
  const habit = await prisma.habit.create({
    data: {
      title,
      userId,
    },
  });

  return habit;
}

module.exports = {
  createHabit,
};