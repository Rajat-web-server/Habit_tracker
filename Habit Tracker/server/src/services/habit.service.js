const prisma = require("../config/prisma");

async function createHabit({ title, userId }) {
  const habit = await prisma.habit.create({
    data: {
      title,
      userId,
    },
    include: {
      completions: true,
    },
  });

  return habit;
}

async function getUserHabits(userId) {
  const habits = await prisma.habit.findMany({
    where: { userId },
    include: {
      completions: true,
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
async function deleteHabitCompletion(completionId, habitId, userId) {
  const habit = await prisma.habit.findFirst({
    where: {
      id: habitId,
      userId,
    },
  });

  if (!habit) {
    return null;
  }

  const completion = await prisma.habitCompletion.findFirst({
    where: {
      id: completionId,
      habitId,
    },
  });

  if (!completion) {
    return null;
  }

  await prisma.habitCompletion.delete({
    where: {
      id: completionId,
    },
  });

  return completion;
}
async function resetHabitCompletions(habitId, userId) {
  const habit = await prisma.habit.findFirst({
    where: {
      id: habitId,
      userId,
    },
  });

  if (!habit) return null;

  const result = await prisma.habitCompletion.deleteMany({
    where: {
      habitId,
    },
  });

  return result;
}

module.exports = {
  createHabit,
  getUserHabits,
  getHabitById,
  updateHabit,
  deleteHabit,
  completeHabit,
  getHabitCompletions,
  deleteHabitCompletion,
  resetHabitCompletions,
};
