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

async function getUserHabits(userId){
  const habits = await prisma.habit.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return habits;
}

module.exports = {
  createHabit,
  getUserHabits
};