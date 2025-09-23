import React, { useState } from "react";
import { Table, Tag, Space, Select, Modal, Card, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useLocation } from "react-router-dom";

interface Item {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  key: string;
  orderId: string;
  Retailer: string;
  BusinessName: string;
  phone: string;
  address: string;
  total: number;
  status: "Picked up" | "In Transit" | "Delivered";
  items: Item[];
}

const StatusManagement: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const location = useLocation()
  const pathname = location.pathname.split("/").pop()?.replace(/-/g, " ")
  const [orders, setOrders] = useState<Order[]>([
    {
      key: "1",
      orderId: "ORD1001",
      Retailer: "Ali Khan",
      BusinessName: "Galaxy Enterprise",
      phone: "0300-1234567",
      address: "Wholesale Market, Karachi",
      total: 12000,
      status: "Picked up",
      items: [
        { productName: "Product A", quantity: 2, price: 5000 },
        { productName: "Product B", quantity: 1, price: 2000 },
        { productName: "Product C", quantity: 3, price: 1000 },
      ],
    },
    {
      key: "2",
      orderId: "ORD1002",
      Retailer: "Ahmed Raza",
      BusinessName: "Star Enterprise",
      phone: "0311-9876543",
      address: "Shahra-e-Faisal, Karachi",
      total: 8000,
      status: "In Transit",
      items: [
        { productName: "Product D", quantity: 1, price: 3000 },
        { productName: "Product E", quantity: 2, price: 2500 },
      ],
    },
    {
      key: "3",
      orderId: "ORD1003",
      Retailer: "Raheel",
      BusinessName: "Moon Enterprise",
      phone: "0311-9876543",
      address: "Bolten Market, Karachi",
      total: 8000,
      status: "Delivered",
      items: [
        { productName: "Product F", quantity: 5, price: 1500 },
      ],
    },
    {
      key: "4",
      orderId: "ORD1004",
      Retailer: "Fatima",
      BusinessName: "Sunrise Enterprise",
      phone: "0333-1122334",
      address: "Clifton, Karachi",
      total: 15000,
      status: "Picked up",
      items: [
        { productName: "Product G", quantity: 10, price: 1000 },
        { productName: "Product H", quantity: 1, price: 5000 },
      ],
    },
  ]);
  
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

  const handleView = (record: Order) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const columns: ColumnsType<Order> = [
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Retailer", dataIndex: "Retailer", key: "Retailer" },
    { title: "Business Name", dataIndex: "BusinessName", key: "BusinessName" },
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
        if (status === "Picked up") color = "orange";
        if (status === "In Transit") color = "blue";
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
              { value: "Picked up", label: "Picked up" },
              { value: "In Transit", label: "In Transit" },
              { value: "Delivered", label: "Delivered" },
            ]}
          />
        </Space>
      ),
    },
    {
      title: "Order Details",
      key: "orderDetails",
      render: (_, record) => (
        <>
          <Button onClick={() => handleView(record)} style={{ background: "linear-gradient(to right, #000080, #00014a)", color: "white" }}>
            Order Details
          </Button>
        </>
      ),
    }
  ];

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchText.toLowerCase()) ||
      order.BusinessName.toLowerCase().includes(searchText.toLowerCase()) ||
      order.Retailer.toLowerCase().includes(searchText.toLowerCase()) ||
      order.address.toLowerCase().includes(searchText.toLowerCase());

    const matchesFilter = filter ? order.status === filter : true;

    return matchesSearch && matchesFilter;
  }

  )

  return (
    <Card className="rounded-lg shadow-md mb-5 w-full" >
      <h2 className="text-2xl font-semibold mb-4 capitalize break-words text-nowrap">{pathname}</h2>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
        <Input.Search
          placeholder="Search orders by ID, customer, or address"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={(value) => setSearchText(value)}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full lg:max-w-[500px]"
          />
        <Select
          placeholder="Filter by status"
          size="large"
          allowClear
          options={[
            { value: "Picked up", label: "Picked up" },
            { value: "In Transit", label: "In Transit" },
            { value: "Delivered", label: "Delivered" },
          ]}
          onChange={(value) => setFilter(value)}
          className="w-full lg:max-w-[300px]"
          />
      </div>
      <div className="overflow-x-auto mt-4">
      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="key"
        scroll={{ x: 'max-content' }}
        className="w-full"
      />
      </div>
      
      <Modal
        title="Order Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        {selectedOrder && (
          <div className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-2 gap-2">
              <p ><strong>Order ID:</strong> {selectedOrder.orderId}</p>
              <p><strong>Retailer:</strong> {selectedOrder.Retailer}</p>
              <p><strong>Business Name:</strong> {selectedOrder.BusinessName}</p>
              <p><strong>Phone:</strong> {selectedOrder.phone}</p>
              <p><strong>Address:</strong> {selectedOrder.address}</p>
              <p><strong>Total:</strong> ₦ {selectedOrder.total.toLocaleString()}</p>
              <p><strong>Status:</strong> <Tag color={selectedOrder.status === "Picked up" ? "orange" : selectedOrder.status === "In Transit" ? "blue" : "green"}>{selectedOrder.status}</Tag></p>
            </div>
            <h3 className="text-lg font-semibold mt-2">Items:</h3>
            <Table
              dataSource={selectedOrder.items}
              columns={[
                { title: "Product Name", dataIndex: "productName", key: "productName" },
                { title: "Quantity", dataIndex: "quantity", key: "quantity" },
                { title: "Price (₦)", dataIndex: "price", key: "price", render: (text) => `₦ ${text.toLocaleString()}` },
              ]}
              pagination={false}
              rowKey="productName"
              size="small"
            />
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default StatusManagement;