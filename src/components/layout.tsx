import {
    HomeOutlined,
    MenuOutlined,
    ProfileOutlined,
    SettingOutlined,
    ShopOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu } from 'antd';
import DropdownMenu from './Dropdown';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) { 
                setCollapsed(true);
            } else {
                setCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed} className='min-h-screen' width={260} style={{
                    background: "linear-gradient(to bottom, #000080, #000040)", 
                    paddingTop: 20,
                    boxShadow: "2px 0 6px rgba(0, 0, 0, 0.1)"
                }}>
                    <div className='flex justify-center items-center cursor-pointer'>
                        <img src="/DARcAppLogo.png" alt="" onClick={() => navigate("/dashboard")} width={80}/>
                    </div>
                    <Menu
                        style={{ marginTop: 26, background: "transparent", borderRight: "none" }}
                        className="flex flex-col h-120"
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <HomeOutlined style={{ color: '#fff', fontSize: '16px' }} />,
                                label: 'Dashboard',
                                onClick: () => navigate("/dashboard"),
                                style: { margin: '10px 0', borderRadius: '8px', color: '#fff' }
                            },
                            {
                                key: '2',
                                icon: <ShopOutlined style={{ color: '#fff', fontSize: '16px' }} />,
                                label: 'Wholesaler Details',
                                onClick: () => navigate("/dashboard/wholesaler-details"),
                                style: { margin: '10px 0', borderRadius: '8px', color: '#fff' }
                            },
                            {
                                key: '3',
                                icon: <UserOutlined style={{ color: '#fff', fontSize: '16px' }} />,
                                label: 'Retailer Details',
                                onClick: () => navigate("/dashboard/retailer-details"),
                                style: { margin: '10px 0', borderRadius: '8px', color: '#fff' }
                            },
                            {
                                key: '4',
                                icon: <ProfileOutlined style={{ color: '#fff', fontSize: '16px' }} />,
                                label: 'Order Status Management',
                                onClick: () => navigate("/dashboard/order-status-management"),
                                style: { margin: '10px 0', borderRadius: '8px', color: '#fff' }
                            },
                            {
                                key: '5',
                                icon: <SettingOutlined style={{ color: '#fff', fontSize: '16px' }} />,
                                label: 'Settings',
                                onClick: () => navigate("/dashboard/settings"),
                                style: { margin: '10px 0', borderRadius: '8px', color: '#fff' }
                            }
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: "linear-gradient(to right, #000080, #000040)", display: "flex", justifyContent: "space-between", alignItems: "center", height: 64, boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)" }}>
                        <div className='flex items-center gap-2'>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuOutlined style={{ color: '#fff' }} /> : <MenuOutlined style={{ color: '#fff' }} />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                    color: '#fff'
                                }}
                                className="md:hidden" // Hide on medium and larger screens
                            />
                        </div>
                        <DropdownMenu />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            // background: "white",
                            // border: "1px solid #e0e0e0",
                            borderRadius: 10,
                            // boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
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