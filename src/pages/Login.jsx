import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Flex, Card, Radio, Alert, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/reducers/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'



const cardStyle = {
    width: '100%',
    height: '100vh'
};
const imgStyle = {
    display: 'block',
    width: '50%',
    height: '100vh',
};


function Login() {
    const access_token = useSelector(state => state.user.access)
    const [message, setMessage] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        console.log(access_token)
        if (access_token) {
            navigate('/mentors')
        }
        
    }, [access_token])

    const dispatch = useDispatch()

    const onFinish = (values) => {
        console.log('Success:', values);
        fetch('https://web-production-b715.up.railway.app/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values)
        })
            .then(res => {
                if (!res.ok) {
                    res.json()
                        .then(data => {
                            setMessage(data.detail)
                        })
                } else {
                    res.json()
                    .then(data => {
                        localStorage.setItem('access_token', data.access)
                        localStorage.setItem('refresh_token', data.refresh)
                        dispatch(login(data.access))
                    })
                    .catch(err => console.log(err))
                }
            })
           
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

  return (
<>
       <Space
              direction="vertical"
              style={{
                  width: '100%',
              }}
    >
        {message && <Alert message={`${message} verify your email to activate`} type="error" showIcon closable/>}
    </Space>
      <Card
      className='card'
          hoverable
        //   style={cardStyle}
          bodyStyle={{
              padding: 0,
              overflow: 'hidden',
              width: '80%',
              margin: 'auto'
          }}
      >
              <h1 className='reg_text'>Login Here</h1>
                  <Form
                      name="basic"
                      labelCol={{
                          span: 8,
                      }}
                      wrapperCol={{
                          span: 16,
                      }}
                      style={{
                    
                          paddingRight: 82
                      }}
                      initialValues={{
                          remember: true,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete="off"
                  >
                      <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                              {
                                  required: true,
                                  type: 'email',
                                  message: 'Please input your Email!',
                              },
                          ]}
                      >
                          <Input />
                      </Form.Item>

                      <Form.Item
                          label="Password"
                          name="password"
                          rules={[
                              {
                                  required: true,
                                  message: 'Please input your password!',
                              },
                          ]}
                      >
                          <Input.Password />
                      </Form.Item>


                      <Form.Item
                          wrapperCol={{
                              offset: 8,
                              span: 16,
                          }}
                      >
                          <Button type="primary" htmlType="submit">
                              Login
                          </Button>
                      </Form.Item>
                          
                  </Form>
              <div className="register-text">
                  Dont't have an account? <Link to="/register">Register Here</Link>
              </div>
      </Card>  
      </>
  )
}

export default Login