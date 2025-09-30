import { Layout } from 'antd';
import { useState, useEffect } from 'react';
const { Sider, Content } = Layout;
import { Outlet } from 'react-router-dom';


const AuthLayout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout style={{ minHeight: '100vh', background: '#000080' }}>
      {/* Left Side Form */}
      <Sider
        width={isMobile ? '100%' : 500}
        collapsed={isMobile}
        collapsedWidth={0}
        style={{
          background: 'white',
          padding: '40px',
        }}
      >
        <Outlet />
      </Sider>

      {!isMobile && (
        <Content
          style={{
            background: "#000080",
            borderRadius: "25px",
            backdropFilter: "blur(4px)",
            border: "2px solid rgba(255,255,255,0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            padding: "40px",
            margin: "150px 60px"
          }}
        >
          <img src="/DL-PNG.png" alt="DL" width={250} className='mb-0'/>
          <p className="text-lg max-w-md -mt-2">Welcome to DARc Logistics</p>
        </Content>
      )}


      <style>
        {`
          @media (max-width: 768px) {
            .ant-layout-content {
              display: none !important; /* gradient hide */
            }
            .ant-layout-sider {
              width: 100% !important;
              max-width: 100% !important;
              flex: 0 0 100% !important;
            }
            .ant-form {
              width: 100% !important;
              max-width: none !important; /* Override max-width for form */
            }
            .ant-form-item {
              margin-bottom: 20px;
            }
            .ant-form-item-control-input-content {
              text-align: center;
            }
            .ant-btn {
              width: 100% !important;
              max-width: none !important;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default AuthLayout;
