import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const GraficaLineas = ({ data }) => (
  <LineChart width={600} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="mes" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="total" stroke="#ff8042" />
  </LineChart>
);
