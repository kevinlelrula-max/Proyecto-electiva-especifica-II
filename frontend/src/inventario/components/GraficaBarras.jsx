import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export const GraficaBarras = ({ data, dataKey, label, color }) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={label} />
      <YAxis />
      <Tooltip formatter={(value) => `${value}`} />
      <Bar dataKey={dataKey} fill={color} />
    </BarChart>
  </ResponsiveContainer>
);
