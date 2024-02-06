import React, {useState}  from 'react'
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Tag, Modal, Button, Form, Input, Upload } from 'antd';
import MainLayout from '../layout/Layout'
import Book from './Book';
import UpdateProfile from './UpdateProfile';
import { UploadOutlined } from '@ant-design/icons';
import './UserProfile.css'


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

    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };

    const { TextArea } = Input

    const props = {
        // action: '//jsonplaceholder.typicode.com/posts/',
        listType: 'picture',
        previewFile(file) {
            console.log('Your upload file:', file);
            // Your process logic. Here we just mock to the same file
            return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
                method: 'POST',
                body: file,
            })
                .then((res) => res.json())
                .then(({ thumbnail }) => thumbnail);
        },
    };

  return (
      <>
          <MainLayout>
            <div className="container">

              <Space direction="vertical" size={16}>
                  {/* <Space wrap size={16}>
                      <Avatar size={74} icon={<UserOutlined />} />
                      <h1>Name: Kaleb Abiy</h1>
                    </Space> */}
                  <Space>
                      <h1>Bio: No bio...</h1>
                  </Space>

                  <Space>
                      <Button onClick={showModal} type="primary">
                          Update Profile
                      </Button>
                  </Space>
              </Space>
                    </div>
          </MainLayout>

          <Modal title="Update Profile" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
             <Form>
                  <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Upload Profile Image</Button>
                  </Upload>
                  <br />
                  <TextArea showCount maxLength={100} onChange={onChange} placeholder="can resize" />
             </Form>
          </Modal>
      </>
  )
}

export default UserProfile