import { StatsCards } from "./statsCard";
export const HabitUtils = ({ habitList, now }) => {
  const daysAgoKey = (n) => {
    const d = new Date(now);
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
    console.log("d value is :", d);
  };
  // console.log(now)
  // console.log(habit)
  console.log("habitlist :", habitList);
  const currentStreak = (habit) => {
    let streak = 0;
    let i = 0;
    console.log("habit :", habit);

    if (!habit.completionDate.includes(daysAgoKey(0))) {
      i = 1;
    }
    while (habit.completionDate.includes(daysAgoKey(i))) {
      streak++;
      i++;
    }
    console.log(streak);

    return streak;
  };
  const consistency7d = () => {
  let totalDone = 0;

  for (const habit of habitList) {
    for (let i = 0; i < 7; i++) {
      if (habit.completionDate.includes(daysAgoKey(i))) {
        totalDone++;
      }
    }
  }

  const totalPossible = habitList.length * 7;

  if (totalPossible === 0) return 0;

  return Math.round((totalDone / totalPossible) * 100);
};

  const greetingText = () => {
    const h = now.getHours();
    if (h < 5) return "Still up?";
    if (h < 12) return "Hello, Good morning";
    if (h < 17) return "Good afternoon";
    if (h < 21) return "Good evening";
    return "Winding down?";
  };

  const getRemainingToday = () => {
    return habitList.filter((h) => !h.completionDate.includes(daysAgoKey(0)))
      .length;
  };

  const getBestHabit = () => {
    return habitList.reduce((b, h) => {
      const streak = currentStreak(h);
      const cons = consistency7d(h);
      const total = Object.keys(h.completionDate).length;
      const score = streak * 3 + cons * 0.5 + total * 0.2;
      return !b || score > b.score
        ? { habit: h, streak, consistency: cons, score }
        : b;
    }, null);
  };

  const getBestStreak = () => {
    return habitList.reduce((b, h) => {
      const s = currentStreak(h);
      return !b || s > b.streak ? { habit: h, streak: s } : b;
    }, null);
  };

  const weeklyTrend = () => {
    const out = [];
    for (let i = 6; i >= 0; i--) {
      const key = daysAgoKey(i);
      const done = habitList.filter((h) =>
        h.completionDate.includes(key),
      ).length;
      const label = new Date(Date.now() - i * 86400000).toLocaleDateString(
        undefined,
        { weekday: "short" },
      );
      out.push({
        day: label,
        completion: Math.round((done / habitList.length) * 100),
      });
    }
    return out;
  };

  const trend = weeklyTrend();
  const bestStreak = getBestStreak();
  const bestHabit = getBestHabit();
  const streak = currentStreak(habitList[0]);
  const consistency = consistency7d(habitList[0]);
  const greetings = greetingText();
  const Remaining = getRemainingToday();

  return (
    <div>
      {/* <p>🔥 {streak}</p>
          <p>📈 {consistency}%</p>
          <p>{greetings}</p>
          <p>{Remaining}</p>
          <p>{bestHabit.habit.title}</p>
          <p>{bestStreak?.streak}</p>
          <p>
          {trend.map((item) => `${item.day}: ${item.completion}% `)}
          </p> */}
      <StatsCards
        trend={trend}
        bestStreak={bestStreak}
        bestHabit={bestHabit}
        Remaining={Remaining}
        consistency={consistency}
        streak={streak}
      />
    </div>
  );
};
