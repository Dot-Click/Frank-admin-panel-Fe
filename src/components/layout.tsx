import {
    CarOutlined,
    HomeOutlined,
    MenuOutlined,
    ProfileOutlined,
    SettingOutlined,
    ShopOutlined,
    UserOutlined,
    DollarOutlined,
    MoneyCollectOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Drawer } from "antd";
import DropdownMenu from "./Dropdown";
import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const menuItems = [
        {
            key: "1",
            icon: <HomeOutlined style={{ color: "#fff", fontSize: "16px" }} />,
            label: "Dashboard",
            onClick: () => navigate("/dashboard"),
        },
        {
            key: "2",
            icon: <ShopOutlined style={{ color: "#fff", fontSize: "16px" }} />,
            label: "Wholesaler Details",
            onClick: () => navigate("/dashboard/wholesaler-details"),
        },
        {
            key: "3",
            icon: <UserOutlined style={{ color: "#fff", fontSize: "16px" }} />,
            label: "Retailer Details",
            onClick: () => navigate("/dashboard/retailer-details"),
        },
        {
            key: "4",
            icon: <ProfileOutlined style={{ color: "#fff", fontSize: "16px" }} />,
            label: "Order Status Management",
            onClick: () => navigate("/dashboard/order-status"),
        },
        {
            key: "5",
            icon: <CarOutlined style={{ color: "#fff", fontSize: "16px" }}/>,
            label: "Rider Details",
            onClick: () => navigate("/dashboard/rider-detail"),
        },
        {
            key: "6",
            icon: <DollarOutlined style={{ color: "#fff", fontSize: "16px" }} />,
            label: "Commission History",
            onClick: () => navigate("/dashboard/commission-history"),
        },
        {
            key: "8",
            icon: <MoneyCollectOutlined style={{ color: "#fff", fontSize: "16px" }} />,
            label: "Payout",
            onClick: () => navigate("/dashboard/payout"),
        },
        {
            key: "7",
            icon: <SettingOutlined style={{ color: "#fff", fontSize: "16px" }} />,
            label: "Settings",
            onClick: () => navigate("/dashboard/settings"),
        },
    ];

    return (
        <Layout >
            {/* Desktop Sidebar */}
            {!isMobile && (
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    width={260}
                    style={{
                        background: "linear-gradient(to bottom, #000080, #000040)",
                        paddingTop: 20,
                        boxShadow: "2px 0 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <div className="flex justify-center items-center cursor-pointer">
                        <img
                            src="/DL-PNG.png"
                            alt=""
                            onClick={() => navigate("/dashboard")}
                            width={150}
                        />
                    </div>

                    <Menu
                        style={{ marginTop: 26, background: "transparent", borderRight: "none" }}
                        theme="dark"
                        mode="inline"
                        items={menuItems}
                    />
                </Sider>
            )}

            {/* Mobile Drawer */}
            {isMobile && (
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={() => setCollapsed(false)}
                    open={!collapsed}
                    style={{ background: "linear-gradient(to bottom, #000080, #000040)" }}
                >

                    <div className="flex justify-between items-center cursor-pointer">
                        <img
                            src="/DL-PNG.png"
                            alt=""
                            onClick={() => navigate("/dashboard")}
                            width={150}
                        />
                         <Button
                        type="text"
                        icon={<MenuOutlined style={{ color: "#fff" }} />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                            color: "#fff",
                        }}
                    />
                    </div>

                    <Menu
                        style={{ marginTop: 26, background: "transparent", borderRight: "none"}}
                        theme="dark"
                        items={menuItems}
                        onClick={() => setCollapsed(true)}
                    />
                </Drawer>
            )}

            <Layout
                style={{
                    transition: "all 0.3s",
                }}
            >
                <Header
                    style={{
                        padding: 0,
                        background: "linear-gradient(to right, #000080, #000040)",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: 64,
                        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Button
                        type="text"
                        icon={<MenuOutlined style={{ color: "#fff" }} />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                            color: "#fff",
                        }}
                    />
                    <DropdownMenu />
                </Header>

                <Content
                    style={{
                        padding: 24,
                        minHeight: "calc(100vh - 64px)",
                        transition: "all 0.3s",
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default DashboardLayout;
