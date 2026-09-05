export const Greeting=()=>{
  const today = new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-semibold tracking-tight text-fg text-white flex justify-center items-center bg-bgcolor2">Hello, Alex</h1>
      <p className="text-sm text-muted-fg text-blue-50 flex justify-center items-center bg-bgcolor2">{today}</p>
    </div>
  );
}
