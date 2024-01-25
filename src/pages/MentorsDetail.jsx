import React, {useState} from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Tag, Modal, Button } from 'antd';
import MainLayout from '../layout/Layout'
import Book from './Book';


const handleBooking = (e) => {
    e.preventDefault()
    console.log('clicked')
}


function MentorsDetail() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

  return (
    <>
    <MainLayout>
          <Space direction="vertical" size={16}>
              <Space wrap size={16}>
                  <Avatar size={74} icon={<UserOutlined />} />
                  <h1>Name: Kaleb Abiy</h1>
              </Space>
              <Space>
                <h1>Hourly Rate: 90$</h1>
              </Space>
              <Space>
                  <h1>skills: <Tag color="green">green</Tag> <Tag color="green">green</Tag> <Tag color="green">green</Tag></h1>
              </Space>
              <Space>
                  <h1>availabilities</h1>
              </Space>

              <Space>
                  <Button onClick={showModal} type="primary">
                      Book Now
                  </Button>
              </Space>
          </Space>
    </MainLayout>
    
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Book />
      </Modal>
    </>
  )
}

export default MentorsDetail