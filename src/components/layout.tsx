import {
    CarOutlined,
    HomeOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ProfileOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import DropdownMenu from './Dropdown';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <div>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} className='min-h-120' width={250} style={{
                    background: "white",
                }}>
                    <div className="demo-logo-vertical" />
                    <div className='flex justify-center items-center cursor-pointer'>
                        <ShoppingCartOutlined className='text-[60px] mt-4' onClick={() => navigate("/dashboard")} />
                    </div>
                    <Menu
                        style={{ marginTop: 26 }}
                        className="flex flex-col h-120"
                        theme="light"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <HomeOutlined />,
                                label: 'Dashboard',
                                onClick: () => navigate("/dashboard")
                            },
                            {
                                key: '2',
                                icon: <ShoppingCartOutlined />,
                                label: 'Pickup Orders',
                                onClick: () => navigate("/dashboard/pickup-orders")
                            },
                            {
                                key: '3',
                                icon: <CarOutlined />,
                                label: 'Deliver Orders',
                                onClick: () => navigate("/dashboard/deliver-orders")
                            },
                            {
                                key: '4',
                                icon: <ProfileOutlined />,
                                label: 'Order Status Management',
                                onClick: () => navigate("/dashboard/status-management")
                            },
                        ]}
                    />
                    <Button
                        type="primary"
                        danger
                        icon={<LogoutOutlined />}
                        block
                        className={`mt-4 mx-1 ${collapsed ? "w-12 h-12 flex items-center justify-center p-0" : "sm:!w-60"}`}
                        onClick={() => navigate("/")}
                    >
                        {!collapsed && "Logout"}
                    </Button>
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer, display: "flex", justifyContent: "space-between" }}>
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
                        <DropdownMenu />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </div>
    )
}

export default DashboardLayout