export const HabitUtils = ({ habitList, now }) => {
  const daysAgoKey = (n) => {
    const d = new Date(now);
    d.setDate(d.getDate() - n);

    return d.toISOString().slice(0, 10);
  };

  // -----------------------------
  // CURRENT STREAK
  // -----------------------------
  const currentStreak = (habit) => {
    if (!habit) return 0;

    let streak = 0;
    let i = 0;

    // If today isn't completed, start checking from yesterday
    if (!habit.completionDate.includes(daysAgoKey(0))) {
      i = 1;
    }

    while (habit.completionDate.includes(daysAgoKey(i))) {
      streak++;
      i++;
    }

    // If today was completed, include today
    if (habit.completionDate.includes(daysAgoKey(0))) {
      streak++;
    }

    return streak;
  };

  // -----------------------------
  // CONSISTENCY FOR ONE HABIT
  // -----------------------------
  const consistencyForHabit = (habit) => {
    if (!habit) return 0;

    let completed = 0;

    for (let i = 0; i < 7; i++) {
      if (habit.completionDate.includes(daysAgoKey(i))) {
        completed++;
      }
    }

    return Math.round((completed / 7) * 100);
  };

  // -----------------------------
  // OVERALL 7-DAY CONSISTENCY
  // -----------------------------
  const consistency7d = () => {
    if (habitList.length === 0) return 0;

    let totalDone = 0;

    for (const habit of habitList) {
      for (let i = 0; i < 7; i++) {
        if (habit.completionDate.includes(daysAgoKey(i))) {
          totalDone++;
        }
      }
    }

    const totalPossible = habitList.length * 7;

    return Math.round((totalDone / totalPossible) * 100);
  };

  // -----------------------------
  // GREETING
  // -----------------------------
  const greetingText = () => {
    const h = now.getHours();

    if (h < 5) return "Still up?";
    if (h < 12) return "Hello, Good morning";
    if (h < 17) return "Good afternoon";
    if (h < 21) return "Good evening";

    return "Winding down?";
  };

  // -----------------------------
  // REMAINING TODAY
  // -----------------------------
  const getRemainingToday = () => {
    return habitList.filter(
      (h) => !h.completionDate.includes(daysAgoKey(0)),
    ).length;
  };

  // -----------------------------
  // BEST HABIT
  // -----------------------------
  const getBestHabit = () => {
    return habitList.reduce((best, habit) => {
      const streak = currentStreak(habit);
      const consistency = consistencyForHabit(habit);
      const total = habit.completionDate.length;

      const score =
        streak * 3 +
        consistency * 0.5 +
        total * 0.2;

      return !best || score > best.score
        ? {
            habit,
            streak,
            consistency,
            score,
          }
        : best;
    }, null);
  };

  // -----------------------------
  // BEST STREAK
  // -----------------------------
  const getBestStreak = () => {
    return habitList.reduce((best, habit) => {
      const streak = currentStreak(habit);

      return !best || streak > best.streak
        ? {
            habit,
            streak,
          }
        : best;
    }, null);
  };

  // -----------------------------
  // WEEKLY TREND
  // -----------------------------
  const weeklyTrend = () => {
    const out = [];

    for (let i = 6; i >= 0; i--) {
      const key = daysAgoKey(i);

      const done = habitList.filter((habit) =>
        habit.completionDate.includes(key),
      ).length;

      const label = new Date(
        now.getTime() - i * 86400000,
      ).toLocaleDateString(undefined, {
        weekday: "short",
      });

      out.push({
        day: label,
        completion:
          habitList.length === 0
            ? 0
            : Math.round(
                (done / habitList.length) * 100,
              ),
      });
    }

    return out;
  };

  // -----------------------------
  // CALCULATE EVERYTHING
  // -----------------------------

  const trend = weeklyTrend();
  const bestStreak = getBestStreak();
  const bestHabit = getBestHabit();
  const consistency = consistency7d();
  const greetings = greetingText();
  const Remaining = getRemainingToday();

  // -----------------------------
  // RETURN DATA
  // -----------------------------

  return {
    trend,
    bestStreak,
    bestHabit,
    consistency,
    greetings,
    Remaining,
  };
};