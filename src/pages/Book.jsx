import React from 'react'
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};



const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};

const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(4, 20),
  disabledMinutes: () => range(30, 60),
  disabledSeconds: () => [55, 56],
});


const handleChange = (date, string)=> {
  console.log(date, string)
}

function Book() {
  return (
    <>
    <div>Book</div>
    <Space>
        <DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          disabledDate={disabledDate}
          disabledTime={disabledDateTime}
          showTime={{
            defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
          }}
          onChange={handleChange}
        />
    </Space>
    </>

  )
}

export default Book