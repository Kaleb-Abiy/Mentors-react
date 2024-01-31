import React, {useState, useEffect} from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Tag, Modal, Button, Table } from 'antd';
import MainLayout from '../layout/Layout'
import Book from './Book';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/reducers/userSlice';


const handleBooking = (e) => {
    e.preventDefault()
    console.log('clicked')
}


function MentorsDetail() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mentor, setMentor] = useState({})
    const [availability, setAvailability] = useState([{}])
    const [bookee, setBookee] = useState()
    const token = useSelector(state => state.user.access)
    const refresh = useSelector(state => state.user.refresh)

    const dispatch = useDispatch()

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);                                                
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const location = useLocation()

    let {ment} = location.state


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
                  <h1>Name: {mentor.user?.split('@')[0]}</h1>
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
        <Book />
      </Modal>
    </>
  )
}

export default MentorsDetail