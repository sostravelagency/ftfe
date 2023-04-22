import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    date: "2022-01-01",
    onTime: 5,
    late: 2,
    absent: 1,
  },
  {
    date: "2022-01-02",
    onTime: 6,
    late: 1,
    absent: 0,
  },
  {
    date: "2022-01-03",
    onTime: 4,
    late: 3,
    absent: 0,
  },
  {
    date: "2022-01-04",
    onTime: 7,
    late: 0,
    absent: 0,
  },
  {
    date: "2022-01-05",
    onTime: 5,
    late: 1,
    absent: 1,
  },
];

const Chart = () => {
  return (
    <BarChart
      width={800}
      height={400}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend formatter={(value, entry)=> {
        if(value=== "onTime") return "Đúng giờ"
        if (value === 'late') return 'Muộn giờ';
        if (value === 'absent') return 'Nghỉ';
      }} />
      <Bar dataKey="onTime" stackId="a" fill="#82ca9d" />
      <Bar dataKey="late" stackId="b" fill="#ffc658" />
      <Bar dataKey="absent" stackId="c" fill="#8884d8" />
    </BarChart>
  );
};

export default Chart;
