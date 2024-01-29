import React, {useEffect} from 'react';
import { Button, Checkbox, Form, Input, Flex, Card, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';


const cardStyle = {
    width: 1350,
    height: 600
};
const imgStyle = {
    display: 'block',
    width: 600,
};


function Login() {
    const access_token = useSelector(state => state.user.access)

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
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('access_token', data.access)
                localStorage.setItem('refresh_token', data.refresh)
                dispatch(login(data.access))
            })
            .catch(err => console.log(err))
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

  return (
      <Card
          hoverable
          style={cardStyle}
          bodyStyle={{
              padding: 0,
              overflow: 'hidden',
          }}
      >

          <Flex justify="space-between">
              <img
                  alt="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  style={imgStyle}
              />

              <Flex
                  vertical
                  align="flex-end"
                  justify="space-between"
                  style={{
                      padding: 32,
                  }}
              >

                  <Form
                      name="basic"
                      labelCol={{
                          span: 8,
                      }}
                      wrapperCol={{
                          span: 16,
                      }}
                      style={{
                          minWidth: 700
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
                              Submit
                          </Button>
                      </Form.Item>
                  </Form>
              </Flex>
          </Flex>
      </Card>  
  )
}

export default Login