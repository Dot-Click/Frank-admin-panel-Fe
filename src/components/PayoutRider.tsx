import { useState } from "react";
import { Card, Form, Input, InputNumber, Button, Select, Space, App as AntdApp } from "antd";
import { usePayoutRider } from "../hooks/usePayoutRider";

const PayoutRider = () => {
    const [form] = Form.useForm();
    const { mutateAsync, isPending } = usePayoutRider();
    const [method, setMethod] = useState<"bank_transfer" | "cash">("bank_transfer");
    const { message } = AntdApp.useApp();

    const onFinish = async (values: any) => {
        try {
            const res = await mutateAsync({
                riderId: values.riderId,
                amount: Number(values.amount),
                paymentMethod: values.paymentMethod,
                bankDetails: {
                    accountNumber: values.accountNumber,
                    bankName: values.bankName,
                    accountName: values.accountName,
                    bankCode: values.bankCode,
                },
                reference: values.reference,
            });
            message.success(res?.data?.message || res?.message || "Payout processed successfully");
            form.resetFields();
        } catch (e: any) {
            message.error(
                e?.response?.data?.data?.message ||
                e?.response?.data?.message ||
                e?.message ||
                "Failed to process payout"
            );
            console.log(e);
        }
    };

    return (
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Card>
                <h2 className="text-2xl font-semibold mb-4">Admin Payout to Rider</h2>

                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    initialValues={{ paymentMethod: "bank_transfer" }}
                >
                    <Form.Item label="Rider ID" name="riderId" rules={[{ required: true, message: "Please enter Rider ID" }]}>
                        <Input placeholder="Rider ID" />
                    </Form.Item>

                    <Form.Item label="Amount (₦)" name="amount" rules={[{ required: true, message: "Please enter amount" }]}>
                        <InputNumber min={1} step={100} className="w-full" placeholder="e.g. 5000" />
                    </Form.Item>

                    <Form.Item label="Payment Method" name="paymentMethod">
                        <Select
                            options={[
                                { label: "Bank Transfer", value: "bank_transfer" },
                                { label: "Cash", value: "cash" },
                            ]}
                            onChange={(v) => setMethod(v)}
                        />
                    </Form.Item>

                    {method === "bank_transfer" && (
                        <>
                            <Form.Item label="Account Name" name="accountName">
                                <Input placeholder="Optional: overrides rider bank details" />
                            </Form.Item>
                            <Form.Item label="Account Number" name="accountNumber">
                                <Input placeholder="Optional" />
                            </Form.Item>
                            <Form.Item label="Bank Name" name="bankName">
                                <Input placeholder="Optional" />
                            </Form.Item>
                            <Form.Item label="Bank Code" name="bankCode">
                                <Input placeholder="Optional" />
                            </Form.Item>
                        </>
                    )}

                    <Form.Item label="Reference" name="reference">
                        <Input placeholder="Optional reference" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            loading={isPending}
                            disabled={isPending}
                            style={{ background: "linear-gradient(to right, #000080, #00014a)", color: "white" }} type="primary" htmlType="submit">
                            Process Payout
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Space>
    );
}

export default PayoutRider;