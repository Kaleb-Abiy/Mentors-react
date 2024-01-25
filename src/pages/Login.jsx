import React from 'react';
import { Button, Checkbox, Form, Input, Flex, Card, Radio } from 'antd';


const cardStyle = {
    width: 1350,
    height: 600
};
const imgStyle = {
    display: 'block',
    width: 600,
};



const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

function Login() {
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
                          name="Email"
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