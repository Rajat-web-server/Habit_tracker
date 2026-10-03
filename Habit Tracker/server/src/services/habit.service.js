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

async function getUserHabits(userId) {
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

async function getHabitById(habitId, userId) {
  const habit = await prisma.habit.findFirst({
    where: {
      id: habitId,
      userId: userId,
    },
    include: {
      completions: true,
    },
  });

  return habit;
}

async function updateHabit(habitId, userId, title) {
  const habit = await prisma.habit.findFirst({
    where: {
      id: habitId,
      userId: userId,
    },
  });

  if (!habit) {
    return null;
  }

  const updatedHabit = await prisma.habit.update({
    where: {
      id: habitId,
    },
    data: {
      title,
    },
  });

  return updatedHabit;
}

module.exports = {
  createHabit,
  getUserHabits,
  getHabitById,
  updateHabit
};
