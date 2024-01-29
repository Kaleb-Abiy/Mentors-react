import React, {useState, useEffect} from 'react';
import { Button, Checkbox, Form, Input, Flex, Card, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/reducers/userSlice';
import { useNavigate } from 'react-router-dom';


const cardStyle = {
    width: 1350,
    height: 600
};
const imgStyle = {
    display: 'block',
    width: 600,
};




function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userType, setUserType] = useState('')


    const { access } = useSelector(state => state.user)

    const navigate = useNavigate()

    useEffect(() => {
        if (access) {
            navigate('/mentors')
        }
    }, [access])


    const dispatch = useDispatch()

    

    const onFinish = (values) => {
        fetch('https://web-production-b715.up.railway.app/auth/register', {
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
                dispatch(register(data.access))
            })
            .catch(err => {
                console.log(err)
            }) 

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
                          <Input onChange={e => setEmail(e.target.value)} />
                      </Form.Item>

                      <Form.Item
                          label="Password"
                          name="password1"
                          rules={[
                              {
                                  required: true,
                                  message: 'Please input your password!',
                              },
                          ]}
                      >
                          <Input.Password onChange={e => setPassword(e.target.value)} />
                      </Form.Item>

                      <Form.Item
                          label="Confirm Password"
                          name="password2"
                          rules={[
                              {
                                  required: true,
                                  message: 'Please input your password again!',
                              },
                          ]}
                      >
                          <Input.Password onChange={e => setConfirmPassword(e.target.value)}/>
                      </Form.Item>


                      <Form.Item
                          name="role"
                          wrapperCol={{
                              offset: 8,
                              span: 16,
                          }}
                      >
                          <Radio.Group name="radiogroup" onChange={e => setUserType(e.target.value)}>
                              <Radio value="mentor">Mentor</Radio>
                              <Radio value="user">User</Radio>
                          </Radio.Group>
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

export default Register