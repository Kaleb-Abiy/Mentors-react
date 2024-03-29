import React, {useEffect, useState} from 'react'
import MainLayout from '../layout/Layout'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex, Tag } from 'antd';
import {  useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/reducers/userSlice';
import './MentorsList.css'

const { Meta } = Card;

function MentorsList() {
    const [mentors, setMentors] = useState([])
    const token = useSelector(state => state.user.access)
    const refresh = useSelector(state => state.user.refresh)

    const dispatch = useDispatch()

    // const splitEmail = (email) => {
    //     return email.split('@')[0]
    // }

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
        <div className="list">

       
              {!mentors || mentors.length === 0 ? <><h1>No mentors</h1></> : mentors.map(mentor => (
            <Card
            className='card'
                // style={{ maxWidth: 300 }}
                cover={
                    <img
                        alt="example"
                        src="./3d-illustration-teenager-with-funny-face-glasses.jpg"
                    />
                }
                actions={[
                    <Button type="primary">
                        <Link to="/mentors-detail" state={{ment: mentors.filter(m=> m.id === mentor.id), mentor_id: mentor.user.id}}>View Details</Link>
                    </Button>
                ]}
              
                extra={mentor.fields.map(field => 

                   <div className='skill_tags'> <Tag color='green'>{field.name}</Tag></div>
                    )}
            >
                <Meta
                    title={mentor.user.email.split('@')[0]}
                    description={`${mentor.hourly_rate}$`}
                />
            </Card>
        ))}
           
       
          </div>

          
    </MainLayout>
    
  )
}

export default MentorsList