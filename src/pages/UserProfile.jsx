import React, {useState}  from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Tag, Modal, Button } from 'antd';
import MainLayout from '../layout/Layout'
import Book from './Book';
import UpdateProfile from './UpdateProfile';

function UserProfile() {
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
                      <h1>Bio: Some bio...</h1>
                  </Space>

                  <Space>
                      <Button onClick={showModal} type="primary">
                          Update Profile
                      </Button>
                  </Space>
              </Space>
          </MainLayout>

          <Modal title="Update Profile" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <UpdateProfile />
          </Modal>
      </>
  )
}

export default UserProfile