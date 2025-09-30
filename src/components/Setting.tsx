import { App, Button, Card, Form, Input } from "antd"
import { useLocation } from "react-router-dom"
import { useMe } from "../hooks/useMe"
import { useUpdateProfile, type AdminUpdate } from "../hooks/updateProfile";
import { useQueryClient } from "@tanstack/react-query";


type FieldType = {
    name: string;
    email: string;
    password: string;
};


export const Setting = () => {
    const { message } = App.useApp();
    const location = useLocation()
    const pathname = location.pathname.split("/").pop()?.replace(/-/g, " ")
    const { data } = useMe()
    const { mutate: update, isPending } = useUpdateProfile();
    const queryClient = useQueryClient()

    const onFinish = (values: FieldType) => {
        const payload: AdminUpdate = {
            name: values.name,
            email: values.email,
        };

        if (values.password) {
            payload.password = values.password;
        }
        update(payload, {
            onSuccess: () => {
                message.success("Update Successfully")
                queryClient.invalidateQueries({queryKey: ['Me']})
            },
            onError: (err: any) => {
                const message = err?.response?.data?.message || err?.message || "Something Went Wrong"
                message.error(message);
            }
        });
    }

    const onFinishFailed = (errorInfo: any) => {
        message.error(errorInfo.errorFields[0].errors)
    }

    return (
        <div className="p-5">
            <Card className="rounded-lg shadow-md mb-5 w-full">
                <h2 className="text-2xl font-semibold mb-4 capitalize">{pathname}</h2>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{
                        name: data?.name,
                        email: data?.email
                    }}
                >
                    <Form.Item<FieldType> label="Name" name="name"
                        rules={[{ required: true, message: "Please input your Name!" }, { type: 'string', message: 'Please enter a valid Name!' }]}
                    >
                        <Input
                            placeholder="Name"
                        />
                    </Form.Item>
                    <Form.Item<FieldType> label="Email" name="email"
                        rules={[{ required: true, message: "Please input your email!" }, { type: 'email', message: 'Please enter a valid email!' }]}
                    >
                        <Input
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item<FieldType> label="Password" name="password"
                        rules={[{ required: true, message: "Please input your password!" }, { min: 8, message: 'Password must be at least 8 characters long!' }]}
                    >
                        <Input.Password
                            placeholder="Password"
                        />
                    </Form.Item>
                    {/* <Form.Item label="Confirm Password" name="confirmPassword"
                        rules={[{ required: true, message: "Please input your confirm password!" }, { min: 8, message: 'Confirm password must be at least 8 characters long!' }]}
                    >
                        <Input.Password
                            placeholder="Confirm Password"
                        />
                    </Form.Item> */}
                    <div className="flex justify-end">
                        <Button
                            loading={isPending}
                            disabled={isPending}
                            style={{ background: "linear-gradient(to right, #000080, #00014a)", color: "white" }} type="primary" htmlType="submit">
                            Update
                        </Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}