export const Greeting=()=>{
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight text-fg">{greetingText()}, Alex</h1>
      <p className="text-sm text-muted-fg">{today}</p>
    </div>
  );
}
