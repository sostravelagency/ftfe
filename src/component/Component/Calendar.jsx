import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const [events, setEvents] = useState([]);

  // Hàm xử lý sự kiện khi người dùng chọn ngày trên lịch
  const handleSelect = ({ start, end }) => {
    const title = window.prompt('Nhập tiêu đề sự kiện:');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  // Hàm để tô màu cho các ngày đã được chấm công
  const eventStyleGetter = (event, start, end, isSelected) => {
    const backgroundColor = event.chamCong ? '#00a65a' : '#3c8dbc';
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style,
    };
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelect}
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default MyCalendar;