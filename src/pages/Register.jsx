import React, {useState, useEffect} from 'react';
import { Button, Checkbox, Form, Input, Flex, Card, Radio, Alert, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/reducers/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css'



const cardStyle = {
    width: '100%',
    height: '100vh'
};
const imgStyle = {
    display: 'block',
    width: '50%',
    height: '100vh',
};




function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userType, setUserType] = useState('')
    const [message, setMessage] = useState('')


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
            .then(res => {
                if(res.status === 400) {
                    res.json()
                    .then(data => {
                        setMessage('something went wrong, please try again')
                    })
                }
                else {
                    res.json()
                    .then(data => {
                        localStorage.setItem('access_token', data.access)
                        localStorage.setItem('refresh_token', data.refresh)
                        dispatch(register(data.access))
                    })
                    .catch(err => {
                        console.log(err)
                    }) 
                }
            })
            

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setMessage(errorInfo.errorFields[0].errors[0])
    };

  return (
    <>
    <Space
              direction="vertical"
              style={{
                  width: '100%',
              }}
    >
        {message && <Alert message={message} type="error" showIcon closable/>}
    </Space>
          <Card
              hoverable
              style={cardStyle}
              bodyStyle={{
                  padding: 0,
                  overflow: 'hidden',
              }}
          >

          <Flex justify="space-between" wrap='flexWrap'>
              <img
                  alt="avatar"
                  src="../public/consulting-advisory-assistance-suggestion-guidance-concept_53876-133712.jpg"
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
                          minWidth: '100vh',
                          maxWidth: '100vh',
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
                              Register
                          </Button>
                      </Form.Item>
                          <div className="login-text">
                              Already have an account? <Link to="/login">Login</Link>
                          </div>
                  </Form>
                     
           </Flex>           
          </Flex>
             
          </Card> 
          </> 
          
  )
}

export default Register