import { Form, Input, Button, App } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useForgotPasswordFrom } from '../hooks/forgotPassword';

const { Title } = Typography;

type FieldType = {
  email: string;
};

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const { message } = App.useApp()
  const { mutate: forgotPassword, isPending } = useForgotPasswordFrom()
  const onFinish = (values: FieldType) => {
    forgotPassword(values, {
      onSuccess: () => {
        message.success(`Reset Link Sent to ${values.email}`)
        navigate("/");
      },
      onError: (err: any) => {
        const message = err?.response?.data?.message || err?.message || "Something Went Wrong"
        message.error(message);
      }
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo.errorFields[0]?.errors || "Form Validation Failed");
  };

  return (
    <Form
      name="forgot_password"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 28 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className='flex justify-center items-center h-158'
    >
      <Form.Item wrapperCol={{ span: 28 }}>
        <Title className="m-0 mb-1 text-lg text-center">Forgot Password</Title>
        <p className="mb-3 -mt-4 text-gray-600 text-sm text-center">Enter your email to reset your password</p>

        <Form.Item<FieldType>
          style={{ padding: '0 20px' }}
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: 'email', message: 'Please enter a valid email!' }
          ]}
          className="sm:w-120"
        >
          <Input
            placeholder="Email"
            className="!px-3 !py-2 rounded-md"
          />
        </Form.Item>

        <Form.Item
          style={{ padding: '0 20px' }}
        >
          <Button
            loading={isPending}
            disabled={isPending}
            type="primary"
            htmlType="submit"
            block
            style={{ background: "linear-gradient(90deg, #FF7C3A, #FF4B2B)" }}
            className="!px-3 !py-5 rounded-md !font-bold"
          >
            Reset Password
          </Button>
        </Form.Item>

        <p onClick={() => navigate("/")} className="text-sm text-blue-600 text-center mt-4 cursor-pointer underline">Back to Login</p>

      </Form.Item>
    </Form>
  );
};

export default ForgotPasswordForm;
