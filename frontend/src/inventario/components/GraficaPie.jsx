import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F", "#FFBB28"];

export const GraficaPie = ({ data }) => (
  <PieChart width={400} height={400}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      outerRadius={150}
      fill="#8884d8"
      dataKey="value"
      label
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
);
