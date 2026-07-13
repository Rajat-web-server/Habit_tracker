export const currentStreak = (habit) => {
  let streak = 0;
  let i = 0;
  const todayKey = daysAgoKey(0);
  if (!habit.completions[todayKey]) i = 1;
  while (habit.completions[daysAgoKey(i)]) {
    streak += 1;
    i += 1;
  }
  return streak;
};

export const consistency7d = (habit) => {
  let done = 0;
  for (let i = 0; i < 7; i++) if (habit.completions[daysAgoKey(i)]) done++;
  return Math.round((done / 7) * 100);
};

export const weeklyTrend = () => {
  const out = [];
  for (let i = 6; i >= 0; i--) {
    const key = daysAgoKey(i);
    const done = habits.filter((h) => h.completions[key]).length;
    const label = new Date(Date.now() - i * 86400000).toLocaleDateString(undefined, { weekday: "short" });
    out.push({ day: label, completion: Math.round((done / habits.length) * 100) });
  }
  return out;
};

export const getBestStreak = () => {
  return habits.reduce((b, h) => {
    const s = currentStreak(h);
    return !b || s > b.streak ? { habit: h, streak: s } : b;
  }, null);
};

export const getBestHabit = () => {
  return habits.reduce((b, h) => {
    const streak = currentStreak(h);
    const cons = consistency7d(h);
    const total = Object.keys(h.completions).length;
    const score = streak * 3 + cons * 0.5 + total * 0.2;
    return !b || score > b.score ? { habit: h, streak, consistency: cons, score } : b;
  }, null);
};

export const getRemainingToday = () => {
  return habits.filter((h) => !h.completions[daysAgoKey(0)]).length;
};

export const greetingText = () => {
  const h = new Date().getHours();
  if (h < 5) return "Still up?";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Winding down?";
};

// Derived data computed once, shared by the chart components below
const radarData = habits.map((h) => ({ habit: h.name, consistency: consistency7d(h), fullMark: 100 }));
const trendData = weeklyTrend();
const getBestStreakHabit = getBestStreak();
const getWeeklyConsistencyByDay= Math.round(trendData.reduce((s, d) => s + d.completion, 0) / trendData.length);
const getBestHabit = getBestHabit();
const getRemainingToday = getRemainingToday();