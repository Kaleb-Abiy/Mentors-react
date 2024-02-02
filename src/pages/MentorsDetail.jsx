import React, {useState, useEffect} from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Tag, Modal, Button, Table, Form, DatePicker, Spin } from 'antd';
import MainLayout from '../layout/Layout'
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/reducers/userSlice';
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








function MentorsDetail() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mentor, setMentor] = useState({})
    const [availability, setAvailability] = useState([{}])
    const [appointmentDate, setAppointmentDate] = useState()
    const [startTime, setStartTime] = useState()
    const [bookee, setBookee] = useState()
    const [paymentLoading, setPaymentLoading] = useState(false)
    const token = useSelector(state => state.user.access)
    const refresh = useSelector(state => state.user.refresh)

    const dispatch = useDispatch()


    const handleChange = (date, string) => {
        const dateAndTime = string.split(' ')
        const selectedDate = dateAndTime[0]
        const selectedTime = dateAndTime[1]
        setAppointmentDate(selectedDate)
        setStartTime(selectedTime)
    }

    const handleBooking = (e) => {
        fetch('https://web-production-b715.up.railway.app/mentors/book/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'AUTHORIZATION': `Bearer ${token}`
            },
            body: JSON.stringify({
                "bookee": mentor_id,
                "appointment_time": {
                    "date": "2024-02-01",
                    "start": "10:03:09",
                    "end": "10:03:11"
                },
            })
        })
        .then(res => {
            console.log(res)
            if (res.status === 401){
                fetch("https://web-production-b715.up.railway.app/auth/login/refresh/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({"refresh": refresh})
                })
                .then(res=> res.json())
                .then(data => {
                    dispatch(login(data.access))
                })
            } else {
                res.json()
                .then(data=>{
                    console.log(data)
                    window.open(data.data.checkout_url, '_blank', 'noreferrer')
                    setPaymentLoading(false)
                    setIsModalOpen(false)
                })
            }
        })
    }

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setPaymentLoading(true)
        handleBooking()
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const location = useLocation()

    let {ment, mentor_id} = location.state

    console.log(ment)
    console.log(mentor_id)


    const availability_columns = [
        {
            title: 'Date',
            dataIndex: 'date',
        },
        {
            title: 'start_time',
            dataIndex: 'start_time',
        },
        {
            title: 'end_time',
            dataIndex: 'end_time',
        },
    ];


    const fecthMentor = () => {fetch(`https://web-production-b715.up.railway.app/mentors/${ment[0].id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'AUTHORIZATION': `Bearer ${token}`
        },
    })
        .then(res => {
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
                    .catch(err => console.log(err))
            } else {
                res.json()
                    .then(data => {
                        setMentor(data)
                    })
                    .catch(err => console.log(err))
            }
        })
        .catch(err => console.log(err))
    }
    const fectchAvailabilities = () => {
        fetch(`https://web-production-b715.up.railway.app/mentors/show_availability/${ment[0].id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'AUTHORIZATION': `Bearer ${token}`
            },
        })
        .then(res => {
            if (res.status === 401){
                fetch("https://web-production-b715.up.railway.app/auth/login/refresh/", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({"refresh": refresh})
                })
                .then(res=> res.json())
                .then(data => {
                    dispatch(login(data.access))
                })
                .catch(err => console.log(err))
            } else {
                res.json()
                .then(data=>{
                    console.log(data)
                    setAvailability(data)
                })
                .catch(err => console.log(err))
            }
        })
    }


    useEffect(()=> {
       fecthMentor()
       fectchAvailabilities()
    }, [token])


  return (
    <>
    <MainLayout>
          <Space direction="vertical" size={16}>
              <Space wrap size={16}>
                  <Avatar size={74} icon={<UserOutlined />} />
                  <h1>Name: {mentor.user?.email.split('@')[0]}</h1>
              </Space>
              <Space>
                <h1>Hourly Rate: {mentor.hourly_rate}$</h1>
              </Space>
              <Space>
                  <h1>skills</h1>: {mentor.fields?.map(field => <Tag color="green">{field.name}</Tag>)}
              </Space>
              <Space>
                  <h1>availabilities</h1>
                  <Table columns={availability_columns} dataSource={availability.availability} />
              </Space>

              <Space>
                  <Button onClick={showModal} type="primary">
                      Book Now
                  </Button>
              </Space>
          </Space>
    </MainLayout>
    
    <Modal title="Select Date and Time for appointment" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form>
                  <Space>
                   {paymentLoading ? <Spin /> : 
                   
                      <DatePicker
                      format="YYYY-MM-DD HH:mm:ss"
                      disabledDate={disabledDate}
                      disabledTime={disabledDateTime}
                      showTime={{
                          defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
                          }}
                          onChange={handleChange}
                          />
                 }
                  </Space>
        </Form>
      </Modal>
    </>
  )
}

export default MentorsDetail