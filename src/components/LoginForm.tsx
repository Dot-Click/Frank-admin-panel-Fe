import { Form, Input, Button, App } from "antd";
import { useNavigate } from "react-router-dom";
import React from "react";
import Title from "antd/es/typography/Title";
import { useLogin } from "../hooks/useLogin";

type FieldType = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const onFinish = (values: FieldType) => {
    login(values, {
      onSuccess: (data) => {
        if (data.user?.userType !== "admin") {
          message.error("Access denied! Only admins can log in here.");
          return
        } else if (values.email !== data.user?.email) {
          message.error(data.message);
          return
        }
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        message.success(data.message)
        navigate("/dashboard");
      },
      onError: (err: any) => {
        const errorMsg = err?.response?.data?.message || err?.message || "Something Went Wrong"
        message.error(errorMsg);
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error(errorInfo.errorFields[0]?.errors || "Form Validation Failed");
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <Form
        name="basic"
        style={{ width: "100%", maxWidth: 400 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Title className="m-0 mb-1 text-lg text-center">Admin Login</Title>
        <p className="mb-3 -mt-2 text-gray-600 text-sm text-center">
          Log in to access your account
        </p>

        {/* Email */}
        <Form.Item<FieldType>
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input placeholder="Email" className="!px-3 !py-2 rounded-md" />
        </Form.Item>

        {/* Password */}
        <Form.Item<FieldType>
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 8, message: "Password must be at least 8 characters long!" },
          ]}
        >
          <Input.Password
            placeholder="Password"
            className="!px-3 !py-2 rounded-md"
          />
        </Form.Item>
        <p
          onClick={() => navigate("/forgot-password")}
          className="text-sm text-blue-600 text-right -mt-5 cursor-pointer underline"
        >
          Forgot Password?
        </p>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            disabled={isPending}
            block
            style={{ background: "linear-gradient(90deg, #FF7C3A, #FF4B2B)" }}
            className="!px-3 !py-5 rounded-md !font-bold mt-3"
          >
            {isPending ? "Loading..." : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
