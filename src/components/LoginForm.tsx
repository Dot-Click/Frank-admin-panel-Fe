import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import Title from 'antd/es/typography/Title';

type FieldType = {
  Email?: string;
  password?: string;
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ xs: { span: 16 }, sm: { span: 8 }, md: { span: 8 } }} 
      wrapperCol={{ xs: { span: 16 }, sm: { span: 16 }, md: { span: 16 } }} 
      style={{ width: '100%', maxWidth: 600 }} 
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="flex justify-center items-center min-h-screen px-4"
    >
      <Form.Item wrapperCol={{ span: 28 }}>
        <Title className="m-0 mb-1 text-lg text-center">Admin Login</Title>
        <p className="mb-3 -mt-4 text-gray-600 text-sm text-center">Log in to access your account</p>

        <Form.Item<FieldType>
          style={{ padding: '0 20px' }}
          name="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
          className="sm:w-120 w-70"
        >
          <Input
            placeholder="Email"
            className="!px-3 !py-2 rounded-md"
            defaultValue={"admin@gmail.com"}
          />
        </Form.Item>

        <Form.Item<FieldType>
          style={{ padding: '0 20px' }}
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: 'Password must be at least 8 characters long!' }
          ]}
          className="sm:w-120 w-70"
        >
          <Input.Password
            placeholder="Password"
            className="!px-3 !py-2 rounded-md"
            defaultValue={"admin123!@#"}
          />

          <p onClick={() => navigate("/forgot-password")} className="text-sm text-blue-600 text-right mt-2 cursor-pointer underline">Forgot Password?</p>

        </Form.Item>
        <Form.Item
          style={{ padding: '0 20px' }}
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
  );
};

export default LoginForm;
