import { Image } from "antd";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import gettimekeepingstaff from "../../api/get-timekeeping-staff";
import moment from "moment";
import get_detail_staff from "../../api/get_detail_staff";

function TimeSheets() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceDays, setAttendanceDays] = useState([]);
  const [user, setUser]= useState()
  useEffect(()=> {
    (async ()=> {
      const result = await get_detail_staff();
      return setUser(result);
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const result = await gettimekeepingstaff();
      return setAttendanceDays(result);
    })();
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
            {user?.name}
          </div>
          <Image src={"http://localhost:5000/db_face/"+ user?.id+ "_.png"} style={{ width: 200, aspectRatio: 1 / 1 }} alt={""} />
        </div>
      </div>
      <div>
        <Calendar
          
          tileContent={({ date, view }) => {
            return (
              <>
                {attendanceDays?.filter(
                  (item) =>
                    moment(item?.date).format("DD-MM-YYYY") ===
                    moment(date).format("DD-MM-YYYY")
                )?.length > 0 ? (
                  <div className="checked-date">
                    <div className="checked-date-text" style={{height: 50}}>Đã chấm công</div>
                  </div>
                ) : <div className="">
                    <div className="checked-date-text" style={{height: 50}}></div>
                  </div>}
              </>
            );
          }}
          onChange={handleDateChange}
          value={selectedDate}
        />
      </div>
    </div>
  );
}

export default TimeSheets;
