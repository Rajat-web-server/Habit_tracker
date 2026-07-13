
export const HabitPreviewList=()=> {
  const [checked, setChecked] = useState(
    Object.fromEntries(habits.map((h) => [h.id, Boolean(h.completions[daysAgoKey(0)])]))
  );
  return (
    <Card className="h-full p-4">
      <h3 className="mb-3 text-sm font-semibold text-[--fg]">Today's habits</h3>
      <div className="space-y-2">
        {habits.map((habit) => {
          const done = checked[habit.id];
          const streak = currentStreak(habit);
          const Icon = ICONS[habit.icon];
          return (
            <div
              key={habit.id}
              className={`flex items-center gap-3 rounded-lg border border-borderp-3 transition-colors ${
                done ? "bg-muted" : "bg-card"
              }`}
            >
              <input
                type="checkbox"
                checked={done}
                onChange={() => setChecked((p) => ({ ...p, [habit.id]: !p[habit.id] }))}
                className="h-4 w-4 accent-primary"
              />
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: `${habit.color}22`, color: habit.color }}
              >
                <Icon size={16} />
              </span>
              <div className="min-w-0 flex-1">
                <p className={`truncate text-sm font-medium text-fg ${done ? "text-muted-fg line-through" : ""}`}>
                  {habit.name}
                </p>
                <p className="text-xs text-muted-fg">{habit.category}</p>
              </div>
              {streak > 0 && (
                <span className="flex items-center gap-1 text-xs font-medium text-orange-500">
                  <Flame size={13} />
                  {streak}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
