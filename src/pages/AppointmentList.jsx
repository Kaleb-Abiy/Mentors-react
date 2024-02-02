import React, {useEffect, useState} from 'react'
import { Space, Table, Tag } from 'antd';
import MainLayout from '../layout/Layout';
import { useSelector } from 'react-redux';

const columns = [
   
    {
        title: 'Mentor',
        dataIndex: 'bookee',
        key: 'bookee',
        render: (text) => <a>{text}</a>
    },
    {
        title: 'Date',
        key: 'date',
        render: (_, record) => (
            <>
            <Space>
            <a>Date</a>: {record.appointment_time.date}
            </Space>
            <br />
            <Space>
            <a>Start time</a>: {record.appointment_time.start_time}
            </Space>
            <br />
            <Space>
                <a>End time</a>: {record.appointment_time.end_time}
            </Space>
            
            </>
        )
    },
    {
        title: 'Status',
        key: 'status',
        dataIndex: 'status',
        render: (_, record ) => (
            <>
                
                    <Tag color={record?.status ==='accepted' ? 'green' : 'red'} key={record?.status}>
                        {record?.status.toUpperCase()}
                    </Tag>
                
            </>
        ),
    },
    {
        title: 'Meeting Link',
        key: 'meeting_link',
        render: (_, record) => (
            <Space size="middle">
                <a href={record.meeting_link}>Meeting Link</a>
            </Space>
        ),
    },
];

function AppointmentList() {
    const [data, setData] = useState([])
    const token = useSelector(state => state.user.access)
    const refresh = useSelector(state => state.user.refresh)

  useEffect(() => {
      fetch('https://web-production-b715.up.railway.app/mentors/appointment_list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': `Bearer ${token}`
        },
      })
      .then(res => {
              console.log(res)
              if (res.status === 401) {
                  fetch("https://web-production-b715.up.railway.app/auth/login/refresh/", {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ "refresh": refresh })
                  })
                      .then(res => res.json())
                      .then(data => {
                          dispatch(login(data.access))
                      })
              } else {
                  res.json()
                      .then(data => {
                          console.log(data)
                          setData(data)
                      })
              }
          })
  }, [token])  

  return (
   <>
   <MainLayout>
    <Table columns={columns} dataSource={data} />;
   </MainLayout>
   </>
  )
}

export default AppointmentList