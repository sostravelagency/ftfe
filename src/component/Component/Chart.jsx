import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  // ResponsiveContainer,
} from "recharts";
import stats from "../../api/stats";



const Chart = () => {
  const [d, setD]= useState([])
  useEffect(()=> {
    (async ()=> {
      const result= await stats()
      return setD(result)
    })()
  }, [])
  const data = [
    {
      date: moment(new Date()).format("DD-MM-YYYY"),
      onTime: d?.filter(item=> moment(item?.date).format("DD-MM-YYYY") === moment(new Date()).format("DD-MM-YYYY") && parseInt(item?.status)=== 1)?.length,
      late: d?.filter(item=> moment(item?.date).format("DD-MM-YYYY") === moment(new Date()).format("DD-MM-YYYY") && parseInt(item?.status)=== 0)?.length,
      absent: d?.filter(item=> moment(item?.date).format("DD-MM-YYYY") === moment(new Date()).format("DD-MM-YYYY") && parseInt(item?.status)=== 2)?.length,
    },
    {
      date: moment(new Date()).subtract("days", 1).format("DD-MM-YYYY"),
      onTime: d?.filter(item=> moment(item?.date).format("DD-MM-YYYY") === moment(new Date()).subtract("days", 1).format("DD-MM-YYYY") && parseInt(item?.status)=== 1)?.length,
      late: d?.filter(item=> moment(item?.date).format("DD-MM-YYYY") === moment(new Date()).subtract("days", 1).format("DD-MM-YYYY") && parseInt(item?.status)=== 0)?.length,
      absent: d?.filter(item=> moment(item?.date).format("DD-MM-YYYY") === moment(new Date()).subtract("days", 1).format("DD-MM-YYYY") && parseInt(item?.status)=== 2)?.length,
    },
    {
      date: moment(new Date()).subtract("days", 2).format("DD-MM-YYYY"),
      onTime: d?.filter(item=> moment(item?.date).format("DD-MM-YYYY") === moment(new Date()).subtract("days", 2).format("DD-MM-YYYY") && parseInt(item?.status)=== 1)?.length,
      late: d?.filter(item=> moment(item?.date).format("DD-MM-YYYY") === moment(new Date()).subtract("days", 2).format("DD-MM-YYYY") && parseInt(item?.status)=== 0)?.length,
      absent: d?.filter(item=> moment(item?.date).format("DD-MM-YYYY") === moment(new Date()).subtract("days", 2).format("DD-MM-YYYY") && parseInt(item?.status)=== 2)?.length,
    },
    {
      date: moment(new Date()).subtract("days", 3).format("DD-MM-YYYY"),
      onTime: d?.filter(item=> moment(item?.date).format("DD-MM-YYYY") === moment(new Date()).subtract("days", 3).format("DD-MM-YYYY") && parseInt(item?.status)=== 1)?.length,
      late: d?.filter(item=> moment(item?.date).format("DD-MM-YYYY") === moment(new Date()).subtract("days", 3).format("DD-MM-YYYY") && parseInt(item?.status)=== 0)?.length,
      absent: d?.filter(item=> moment(item?.date).format("DD-MM-YYYY") === moment(new Date()).subtract("days", 3).format("DD-MM-YYYY") && parseInt(item?.status)=== 2)?.length,
    },
    {
      date: moment(new Date()).subtract("days", 4).format("DD-MM-YYYY"),
      onTime: d?.filter(item=> moment(item?.date).format("DD-MM-YYYY") === moment(new Date()).subtract("days", 4).format("DD-MM-YYYY") && parseInt(item?.status)=== 1)?.length,
      late: d?.filter(item=> moment(item?.date).format("DD-MM-YYYY") === moment(new Date()).subtract("days", 4).format("DD-MM-YYYY") && parseInt(item?.status)=== 0)?.length,
      absent: d?.filter(item=> moment(item?.date).format("DD-MM-YYYY") === moment(new Date()).subtract("days", 4).format("DD-MM-YYYY") && parseInt(item?.status)=== 2)?.length,
    },
  ];
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
