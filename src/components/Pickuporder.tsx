import React from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface Order {
  key: string;
  orderId: string;
  customer: string;
  phone: string;
  pickupAddress: string;
  total: number;
  status: "picked up";
}

const PickupOrders: React.FC = () => {
  const Pickuporders: Order[] = [
    {
      key: "1",
      orderId: "ORD1001",
      customer: "Ali Khan",
      phone: "0300-1234567",
      pickupAddress: "Wholesale Market, Karachi",
      total: 12000,
      status: "picked up",
    },
    {
      key: "2",
      orderId: "ORD1002",
      customer: "Ahmed Raza",
      phone: "0311-9876543",
      pickupAddress: "Wholesale Market, Karachi",
      total: 8000,
      status: "picked up",
    },
    {
      key: "3",
      orderId: "ORD1003",
      customer: "Raheel",
      phone: "0311-9876543",
      pickupAddress: "Wholesale Market, Karachi",
      total: 8000,
      status: "picked up",
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
    { title: "Pickup Address", dataIndex: "pickupAddress", key: "pickupAddress" },
    {
      title: "Total (PKR)",
      dataIndex: "total",
      key: "total",
      render: (value) => `Rs. ${value.toLocaleString()}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "orange";
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

  return (
    <div style={{ padding: 20 }}>
      <h2 className="text-xl font-semibold mb-4">Pickup Orders</h2>
      {/* table responsive */}
      <Table columns={columns} dataSource={Pickuporders} rowKey="key" scroll={{ x: 'max-content' }} />
      {/* <Table columns={columns} dataSource={Pickuporders} rowKey="key" responsive /> */}

      {/* <Modal
        title="Order Details"
        open={open}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="close" onClick={() => setOpen(false)}>
            Close
          </Button>,
        ]}
        className="!w-200"
      >
        {selectedOrder && (
          <div className="flex flex-col gap-2">
            <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Pickup Address:</strong> {selectedOrder.pickupAddress}</p>
            <p><strong>Total:</strong> Rs. {selectedOrder.total.toLocaleString()}</p>
            <p><strong>Status:</strong> <Tag color="orange">{selectedOrder.status}</Tag></p>
          </div>
        )}
      </Modal> */}
    </div>
  );
};

export default PickupOrders;
