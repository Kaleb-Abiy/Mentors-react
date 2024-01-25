import React from 'react'
import MainLayout from '../layout/Layout'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex } from 'antd';

const { Meta } = Card;

function MentorsList() {
  return (
    <MainLayout>
        <Flex wrap='wrap' gap={50}>

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
                        Book Now
                    </Button>
                ]}
          >
              <Meta
                  avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                  title="Card title"
                  description="This is the description"
                  />
          </Card>
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
                          Book Now
                      </Button>
                  ]}
              >
                  <Meta
                      avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                      title="Card title"
                      description="This is the description"
                  />
              </Card>

           </Flex>
          
    </MainLayout>
  )
}

export default MentorsList