import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/userSlice';

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate, Navigate } from 'react-router-dom';


const { Header, Sider, Content } = Layout;


const MainLayout = ({children}) => {
    console.log(children)
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const handleMentorsClick = ({item, key, keyPath, domEvent })=> {
        console.log(item, key, keyPath, domEvent )
    }
    
    return (
        <>
        <Layout >
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '/mentors',
                            icon: <UserOutlined />,
                            label: (
                                <Link to="/mentors">Mentors</Link>
                            ),
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: (
                                <Link to="/appointments">Appointments</Link>),
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: (
                                <Link to="/user-profile">Profile</Link>
                            ),
                            
                        },
                    ]}
                   
                />
                    <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center' }}>
                        <Button type="primary" danger onClick={() => dispatch(logout())}>
                            Logout
                        </Button>
                    </div>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 435,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
        </>
    );
};
export default MainLayout;