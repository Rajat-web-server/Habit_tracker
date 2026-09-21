import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Sector } from "recharts";

const data = [
  { name: "Coding", value: 40 },
  { name: "Exercise", value: 25 },
  { name: "Reading", value: 15 },
  { name: "Meditation", value: 20 },
];
const Colors=[
      "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
]
const CustomShape=(props)=>{
    const { index } = props;

  return (
    <Sector
      {...props}
      fill={Colors[index % Colors.length]}
    />
  );
};
<Legend payload/>

export const Piechart = () => {
  return (

    <>

      <ResponsiveContainer width={"80%"} height={"300"}>
        <PieChart>
          <Pie data={data} dataKey={"value"} nameKey={"name"} cx={"50%"} cy={"50%"}  outerRadius={100} fill="#22c55e" shape={CustomShape} />
          <Tooltip />
          <Legend />
        </PieChart >
      </ResponsiveContainer>
    </>
  );
};
