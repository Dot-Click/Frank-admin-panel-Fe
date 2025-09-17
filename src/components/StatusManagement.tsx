import React, { useState } from "react";
import { Table, Tag, Space, Select, Modal, Card, Input } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Order {
  key: string;
  orderId: string;
  customer: string;
  phone: string;
  address: string;
  total: number;
  status: "picked up" | "in transit" | "Delivered";
}

const StatusManagement: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [orders, setOrders] = useState<Order[]>([
    {
      key: "1",
      orderId: "ORD1001",
      customer: "Ali Khan",
      phone: "0300-1234567",
      address: "Wholesale Market, Karachi",
      total: 12000,
      status: "picked up",
    },
    {
      key: "2",
      orderId: "ORD1002",
      customer: "Ahmed Raza",
      phone: "0311-9876543",
      address: "Shahra-e-Faisal, Karachi",
      total: 8000,
      status: "in transit",
    },
    {
      key: "3",
      orderId: "ORD1003",
      customer: "Raheel",
      phone: "0311-9876543",
      address: "Bolten Market, Karachi",
      total: 8000,
      status: "Delivered",
    },
    {
      key: "4",
      orderId: "ORD1004",
      customer: "Fatima",
      phone: "0333-1122334",
      address: "Clifton, Karachi",
      total: 15000,
      status: "picked up",
    },
  ]);

  // const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  // const [open, setOpen] = useState<boolean>(false);

  // const HandleView = (order: Order) => {
  //   setSelectedOrder(order);
  //   setOpen(true);
  // };

  const handleStatusChange = (key: string, newStatus: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.key === key ? { ...order, status: newStatus } : order
      )
    );
    Modal.success({
      content: `Order ${key} status updated to ${newStatus}.`,
    });
  };

  const columns: ColumnsType<Order> = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Total (₦)",
      dataIndex: "total",
      key: "total",
      render: (value) => `₦ ${value.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "picked up") color = "orange";
        if (status === "in transit") color = "blue";
        if (status === "Delivered") color = "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Select
            value={record.status}
            style={{ width: 150 }}
            onChange={(value) => handleStatusChange(record.key, value)}
            options={[
              { value: "picked up", label: "Picked up" },
              { value: "in transit", label: "In Transit" },
              { value: "Delivered", label: "Delivered" },
            ]}
          />
          {/* <Button style={{ backgroundColor: "blue", color: "white" }}>
            View
          </Button> */}
        </Space>
      ),
    },
  ];

  const filteredOrders = orders.filter(order => 
    order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchText.toLowerCase()) ||
    order.address.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <Card className="rounded-lg shadow-md mb-5">
      <h2 className="text-2xl font-semibold mb-4">Order Status Management</h2>
      <Input.Search
        placeholder="Search orders by ID, customer, or address"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={(value) => setSearchText(value)}
        onChange={(e) => setSearchText(e.target.value)}
        className="mb-4"
      />
      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="key"
        scroll={{ x: 'max-content' }}
        className="w-full"
      />
    </Card>
  );
};

      export default StatusManagement;