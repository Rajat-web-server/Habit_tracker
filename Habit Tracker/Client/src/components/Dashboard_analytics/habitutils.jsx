export const HabitUtils = ({ habitList, now }) => {
  const daysAgoKey = (n) => {
    const d = new Date(now);
    d.setDate(d.getDate() - n);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Convert backend completions into date strings
  const getCompletionDates = (habit) => {
    return (habit.completions || []).map((completion) =>
      new Date(completion.date).toISOString().slice(0, 10),
    );
  };

  // CURRENT STREAK
  const currentStreak = (habit) => {
    if (!habit) return 0;

    const dates = getCompletionDates(habit);
    let streak = 0;
    let i = 0;

    // If today isn't completed, start from yesterday
    if (!dates.includes(daysAgoKey(0))) {
      i = 1;
    }

    while (dates.includes(daysAgoKey(i))) {
      streak++;
      i++;
    }

    return streak;
  };

  // CONSISTENCY FOR ONE HABIT
  const consistencyForHabit = (habit) => {
    if (!habit) return 0;

    const dates = getCompletionDates(habit);
    let completed = 0;

    for (let i = 0; i < 7; i++) {
      if (dates.includes(daysAgoKey(i))) {
        completed++;
      }
    }

    return Math.round((completed / 7) * 100);
  };

  // OVERALL 7-DAY CONSISTENCY
  const consistency7d = () => {
    if (habitList.length === 0) return 0;

    let totalDone = 0;

    for (const habit of habitList) {
      const dates = getCompletionDates(habit);

      for (let i = 0; i < 7; i++) {
        if (dates.includes(daysAgoKey(i))) {
          totalDone++;
        }
      }
    }

    const totalPossible = habitList.length * 7;
    return Math.round((totalDone / totalPossible) * 100);
  };

  // GREETING
  const greetingText = () => {
    const h = now.getHours();

    if (h < 5) return "Still up?";
    if (h < 12) return "Hello, Good morning";
    if (h < 17) return "Good afternoon";
    if (h < 21) return "Good evening";

    return "Winding down?";
  };

  // REMAINING TODAY
  const getRemainingToday = () => {
    return habitList.filter(
      (habit) => !getCompletionDates(habit).includes(daysAgoKey(0)),
    ).length;
  };

  // BEST HABIT
  const getBestHabit = () => {
    return habitList.reduce((best, habit) => {
      const streak = currentStreak(habit);
      const consistency = consistencyForHabit(habit);
      const total = getCompletionDates(habit).length;

      const score = streak * 3 + consistency * 0.5 + total * 0.2;

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

  // RADAR DATA
  const radarData = habitList.map((habit) => ({
    habit: habit.title,
    consistency: consistencyForHabit(habit),
  }));

  // BEST STREAK
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

  // WEEKLY TREND
  const weeklyTrend = () => {
    const out = [];

    for (let i = 6; i >= 0; i--) {
      const key = daysAgoKey(i);

      const done = habitList.filter((habit) =>
        getCompletionDates(habit).includes(key),
      ).length;

      const label = new Date(now.getTime() - i * 86400000).toLocaleDateString(
        undefined,
        {
          weekday: "short",
        },
      );

      out.push({
        day: label,
        completion:
          habitList.length === 0
            ? 0
            : Math.round((done / habitList.length) * 100),
      });
    }

    return out;
  };

  // CALCULATE EVERYTHING
  const trend = weeklyTrend();
  const bestStreak = getBestStreak();
  const bestHabit = getBestHabit();
  const consistency = consistency7d();
  const greetings = greetingText();
  const Remaining = getRemainingToday();

  return {
    trend,
    bestStreak,
    bestHabit,
    consistency,
    greetings,
    Remaining,
    radarData,
  };
};
