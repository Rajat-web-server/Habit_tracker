import {
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,YAxis
} from "recharts";

const data = [
  { habit: "Reading", count: 20 },
  { habit: "Workout", count: 15 },
  { habit: "Coding", count: 25 },
  { habit: "Meditation", count: 10 },
];
export const Barchart = () => {
  return (
    <>
      <ResponsiveContainer width="80%" height="300">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="habit" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#22c55e" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};
