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
async function deleteHabit(habitId, userId) {
  const habit = await prisma.habit.findFirst({
    where: {
      id: habitId,
      userId: userId,
    },
  });

  if (!habit) {
    return null;
  }

  await prisma.habit.delete({
    where: {
      id: habitId,
    },
  });

  return habit;
}
async function completeHabit({ habitId, userId, date }) {
  const habit = await prisma.habit.findFirst({
    where: {
      id: habitId,
      userId: userId,
    },
  });

  if (!habit) {
    return null;
  }

  const normalizedDate = new Date(`${date}T00:00:00.000Z`);

  const completion = await prisma.habitCompletion.create({
    data: {
      habitId,
      date: normalizedDate,
    },
  });

  return completion;
}
async function getHabitCompletions(habitId, userId) {
  const habit = await prisma.habit.findFirst({
    where: {
      id: habitId,
      userId: userId,
    },
  });

  if (!habit) {
    return null;
  }

  const completions = await prisma.habitCompletion.findMany({
    where: {
      habitId,
    },
    orderBy: {
      date: "desc",
    },
  });

  return completions;
}

module.exports = {
  createHabit,
  getUserHabits,
  getHabitById,
  updateHabit,
  deleteHabit,
  completeHabit,
  getHabitCompletions,
};
