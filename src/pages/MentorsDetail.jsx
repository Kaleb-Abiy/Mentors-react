import React, {useState, useEffect} from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Tag, Modal, Button } from 'antd';
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

    console.log(token)

    useEffect(()=> {
        fetch(`https://web-production-b715.up.railway.app/mentors/${ment[0].id}`,{
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
                  if dates is less than today show message that says the mentor doesnt updated his avaibilities
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