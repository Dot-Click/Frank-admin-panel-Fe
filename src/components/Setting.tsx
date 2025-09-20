import { Button, Card, Form, Input } from "antd"
import { useLocation } from "react-router-dom"




export const Setting = () => {
    const location = useLocation()
    const pathname = location.pathname.split("/").pop()?.replace(/-/g, " ")
    // const { message } = App.useApp();
    // const HandleUpdate = () => {
    // message.success("Updated Successfully")
    // console.log("Updated Successfully");
    // }
    return (
        <div className="p-5">
            <Card className="rounded-lg shadow-md mb-5 w-full">
                <h2 className="text-2xl font-semibold mb-4 capitalize">{pathname}</h2>
                <Form layout="vertical">
                    <Form.Item label="Name" name="Name"
                    rules={[{ required: true, message: "Please input your Name!" }, { type: 'string', message: 'Please enter a valid Name!' }]}
                    >
                        <Input
                            placeholder="Name"
                            defaultValue={"Admin"}
                        />
                    </Form.Item>
                    <Form.Item label="Email" name="email"
                    rules={[{ required: true, message: "Please input your email!" }, { type: 'email', message: 'Please enter a valid email!' }]}
                    >
                        <Input
                            placeholder="Email"
                            defaultValue={"admin@gmail.com"}
                        />
                    </Form.Item>
                    <Form.Item label="Password" name="password"
                    rules={[{ required: true, message: "Please input your password!" }, { min: 8, message: 'Password must be at least 8 characters long!' }]}
                    >
                        <Input.Password
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item label="Confirm Password" name="confirmPassword"
                    rules={[{ required: true, message: "Please input your confirm password!" }, { min: 8, message: 'Confirm password must be at least 8 characters long!' }]}
                    >
                        <Input.Password
                            placeholder="Confirm Password"
                        />
                    </Form.Item>
                    <div className="flex justify-end">
                    <Button style={{ background: "linear-gradient(to right, #000080, #00014a)", color: "white" }} type="primary" htmlType="submit">
                        Update
                    </Button>
                    </div>
                </Form>
            </Card>
        </div>
    )
}