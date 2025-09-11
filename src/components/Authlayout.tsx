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
    <Layout style={{ minHeight: '100vh' }}>
      {/* Left Side Form */}
      <Sider
        width={400}
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
          className='flex justify-center items-center h-150'
        >

          <div className="w-full">
            <Title className="m-0 mb-1 text-lg text-center">Admin Login</Title>
            <p className="mb-3 -mt-4 text-gray-600 text-sm text-center">Log in to access your account</p>
            <Form.Item<FieldType>
              name="Email"
              rules={[{ required: true, message: "Please input your username!" }]}
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
              rules={[{ required: true, message: "Please input your password!" }]}
              className="sm:w-120"
            >
              <Input.Password
                placeholder="Password"
                className="!px-3 !py-2 rounded-md"
                defaultValue={"123456789"}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ width: 320, background: "rgb(3, 7, 248)" }}
                className="!px-3 !py-5 rounded-md !font-bold"
                onClick={() => navigate("/dashboard")}
              >
                Login
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Sider>

      <Content
        style={{
          background: "linear-gradient(135deg,rgb(0, 4, 255), #ff9248)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          padding: "20px",
          marginTop: "-45px"
        }}
      >
        <ShoppingCartOutlined className="text-[150px] mt-4 !text-white" />
        <h1 className="text-3xl font-bold mt-6">Order Management System</h1>
        <p className="text-lg mt-2 max-w-md">
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
            .ant-layout {
              justify-content: center;
              align-items: center;
            }
            .ant-layout {
              width: 100% !important;
              min-height: 100vh !important;
            }
          }
        `}
      </style>
    </Layout>
  );
};

export default AppLayout;
