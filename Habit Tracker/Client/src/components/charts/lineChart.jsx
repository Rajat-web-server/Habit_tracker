import { RechartsDevtools } from "@recharts/devtools";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", completed: 5 },
  { day: "Tue", completed: 8 },
  { day: "Wed", completed: 3 },
  { day: "Thu", completed: 10 },
];
export const Linechart = () => {
  return (
    <>
      {/* <div className="bg-slate-900 p-4 rounded-lg w-[50%] flex justify-center items-center"> */}
        <ResponsiveContainer width="80%" height="300">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis dataKey={"day"} tick={{ fill: "#16a34b" }} />
            <YAxis />
            <Tooltip />
            <Line
              type="natural"
              dataKey="completed"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ fill: "#16a34b", r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      {/* </div> */}
    </>
  );
};
