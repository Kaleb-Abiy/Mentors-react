import React, {useEffect, useState} from 'react'
import MainLayout from '../layout/Layout'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex, Tag } from 'antd';
import {  useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/reducers/userSlice';

const { Meta } = Card;

function MentorsList() {
    const [mentors, setMentors] = useState([])
    const token = useSelector(state => state.user.access)
    const refresh = useSelector(state => state.user.refresh)

    const dispatch = useDispatch()

    const splitEmail = (email) => {
        return email.split('@')[0]
    }

    useEffect(()=> {
        fetch('https://web-production-b715.up.railway.app/mentors', {
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
            } else {
                res.json()
                .then(data=>{
                    setMentors(data)
                })
            }
        })
        .catch(err => console.log(err.code))
    }, [token])

  return (
    <MainLayout>
        <Flex wrap='wrap' gap={50}>
              {!mentors || mentors.length === 0 ? <><h1>No mentors</h1></> : mentors.map(mentor => (
            <Card
                style={{ width: 300 }}
                cover={
                    <img
                        alt="example"
                        src="https://img.freepik.com/free-photo/3d-illustration-teenager-with-funny-face-glasses_1142-50955.jpg?t=st=1706694487~exp=1706698087~hmac=dea2b6b7d5d17d435e0f0442cca0c53a96ffb7905aefc161a1746316b432f56e&w=740"
                    />
                }
                actions={[
                    <Button type="primary">
                        <Link to="/mentors-detail" state={{ment: mentors.filter(m=> m.id === mentor.id)}}>View Details</Link>
                    </Button>
                ]}
                extra={mentor.fields.map(field => 
                    <Tag color='green'>{field.name}</Tag>
                    )}
            >
                <Meta
                    title={splitEmail(mentor.user)}
                    description={mentor.hourly_rate}
                />
            </Card>
        ))}
           
       
          

           </Flex>
          
    </MainLayout>
  )
}

export default MentorsList