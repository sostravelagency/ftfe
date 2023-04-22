import { Image } from "antd";
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function TimeSheets() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceDays, setAttendanceDays] = useState([
    new Date(2023, 4, 1),
    new Date(2023, 4, 5),
    new Date(2023, 4, 10),
    new Date(2023, 4, 15),
  ]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const isAttendanceDay = (date) => {
    return attendanceDays.some(
      (attendanceDate) =>
        attendanceDate.getDate() === date.getDate() &&
        attendanceDate.getMonth() === date.getMonth() &&
        attendanceDate.getFullYear() === date.getFullYear()
    );
  };

  const getTileClassName = ({ date }) => {
    if (isAttendanceDay(date)) {
      return "attendance-day";
    } else {
      return "absent-day";
    }
  };

  return (
    <div
      style={{
        flex: "1 1 0",
        gap: 50,
        display: "flex",
        flexDirection: "row",
        padding: 20,
        margin: 100,
      }}
    >
      <div>
        <div>
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            Nguyễn Minh Anh
          </div>
          <Image src={""} style={{ width: 200, aspectRatio: 1 / 1 }} alt={""} />
        </div>
      </div>
      <div>
        <Calendar
          tileContent={({ date, view }) =>
            {
                console.log(date)
             return (
              <div className="checked-date">
                <div className="checked-date-text">Đã chấm công</div>
              </div>
            )
            }
          }
          onChange={handleDateChange}
          value={selectedDate}
          tileClassName={getTileClassName}
        />
      </div>
    </div>
  );
}

export default TimeSheets;
