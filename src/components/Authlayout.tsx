import { Layout, Form, Input, Button } from 'antd';
const { Sider, Content } = Layout;
import { Typography } from 'antd';
const { Title } = Typography;
import {
  ShoppingCartOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  Email?: string;
  password?: string;
};

const AppLayout = () => {
  const navigate = useNavigate()
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Layout style={{ minHeight: '100vh', background: '#000080' }}>
      {/* Left Side Form */}
      <Sider
        width={500}
        style={{
          background: 'white',
          padding: '40px',
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className='flex justify-center items-center h-158'
        >

          <Form.Item wrapperCol={{ span: 28 }}>
            <Title className="m-0 mb-1 text-lg text-center">Admin Login</Title>
            <p className="mb-3 -mt-4 text-gray-600 text-sm text-center">Log in to access your account</p>
            <Form.Item<FieldType>
              name="Email"
              
              rules={[
                { required: true, message: "Please input your email!" },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
              className="sm:w-120"
            >
              <Input
                placeholder="Email"
                className="!px-3 !py-2 rounded-md"
                defaultValue={"admin@gmail.com"}
              />
            </Form.Item>

            <Form.Item<FieldType>
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 8, message: 'Password must be at least 8 characters long!' }
              ]}
              className="sm:w-120"
            >
              <Input.Password
                placeholder="Password"
                className="!px-3 !py-2 rounded-md"
                defaultValue={"123456789"}
              />
            </Form.Item>

            <Form.Item
            >
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ background: "linear-gradient(90deg, #FF7C3A, #FF4B2B)" }}
                className="!px-3 !py-5 rounded-md !font-bold"
                onClick={() => navigate("/dashboard")}
              >
                Login
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </Sider>

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
        <ShoppingCartOutlined className="text-[150px]" style={{ color: '#ffffff' }} />
        <h1 className="text-3xl font-bold">Order Management System</h1>
        <p className="text-lg max-w-md">
          Manage pickup and delivery orders, track statuses, and keep everything
          organized in one place.
        </p>
      </Content>


      {/* Responsive Styling */}
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

export default AppLayout;
