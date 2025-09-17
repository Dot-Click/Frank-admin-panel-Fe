import React, { useState } from "react";
import { Table, Tag, Input, Card } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Order {
  key: string;
  orderId: string;
  customer: string;
  phone: string;
  deliveryAddress: string;
  total: number;
  status: "Delivered";
}

const Deliverorder: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
 const Deliverorders: Order[] = [
  {
    key: "1",
    orderId: "ORD1001",
    customer: "Ali Khan",
    phone: "0300-1234567",
    deliveryAddress: "Retail Shop A, Defence, Karachi",
    total: 12000,
    status: "Delivered",
  },
  {
    key: "2",
    orderId: "ORD1002",
    customer: "Ahmed Raza",
    phone: "0311-9876543",
    deliveryAddress: "Retail Shop B, Clifton, Karachi",
    total: 8000,
    status: "Delivered",
  },
  {
    key: "3",
    orderId: "ORD1003",
    customer: "Raheel",
    phone: "0311-9876543",
    deliveryAddress: "Retail Shop C, Gulshan, Karachi",
    total: 8000,
    status: "Delivered",
  },
 ];

  // const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  // const [open, setOpen] = useState<boolean>(false);

  // const HandleView = (order: Order) => {
  //   setSelectedOrder(order);
  //   setOpen(true);
  // };

  const columns: ColumnsType<Order> = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Customer", dataIndex: "customer", key: "customer" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Delivery Address",
      dataIndex: "deliveryAddress",
      key: "deliveryAddress",
    },
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
        let color = "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (_, record) => (
    //     <Space>
    //       <Button onClick={() => HandleView(record)} style={{ backgroundColor: "blue", color: "white" }}>
    //         View
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];

  const filteredOrders = Deliverorders.filter(order =>
    order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchText.toLowerCase()) ||
    order.deliveryAddress.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="p-5">
      <Card className="rounded-lg shadow-md mb-5">
        <h2 className="text-2xl font-semibold mb-4">Deliver Orders</h2>
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
    </div>
  );
};

export default Deliverorder;