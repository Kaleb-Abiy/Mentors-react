import React, {useEffect, useState} from 'react'
import MainLayout from '../layout/Layout'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex } from 'antd';
import {  useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/reducers/userSlice';

const { Meta } = Card;

function MentorsList() {
    const [mentors, setMentors] = useState([])
    const token = useSelector(state => state.user.access)
    const refresh = useSelector(state => state.user.refresh)

    const dispatch = useDispatch()

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
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                }
                actions={[
                    <Button type="primary">
                        View Details
                    </Button>
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title="Card title"
                    description="This is the description"
                />
            </Card>
        ))}
           
       
          

           </Flex>
          
    </MainLayout>
  )
}

export default MentorsList