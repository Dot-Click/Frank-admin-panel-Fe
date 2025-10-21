import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Select, Modal, Card, Input, Button, App } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useLocation } from "react-router-dom";
import { useOrders, type orderInfo } from "../hooks/OrderInfo";
import { useUpdateOrderStatus } from "../hooks/updateOrderStatus";
import { useQueryClient } from "@tanstack/react-query";
import { PictureOutlined } from '@ant-design/icons';

// interface Item {
//   productName: string;
//   quantity: number;
//   price: number;
// }

// interface Order {
//   key: string;
//   orderId: string;
//   Retailer: string;
//   BusinessName: string;
//   phone: string;
//   address: string;
//   total: number;
//   status: "Picked up" | "In Transit" | "Delivered";
//   items: Item[];
// }

const StatusManagement: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<orderInfo | null>(null);
  const [page, setCurrentPage] = useState<number>(1)
  const [limit, setlimit] = useState<number>(10)
  const [loadingRow, setLoadingRow] = useState<string | null>(null)
  const { data: order, isLoading } = useOrders(page, limit)
  const [orders, setOrders] = useState<orderInfo[]>([]);
  const { mutate: updateOrderStatus } = useUpdateOrderStatus()
  const { message } = App.useApp()
  const queryClient = useQueryClient()
  
  useEffect(() => {
    if (order?.orders) {
      setOrders(order.orders);
    }
  }, [order]);

  const location = useLocation()
  const pathname = location.pathname.split("/").pop()?.replace(/-/g, " ")
  // const [orders, setOrders] = useState<Order[]>([
  //   {
  //     key: "1",
  //     orderId: "ORD1001",
  //     Retailer: "Ali Khan",
  //     BusinessName: "Galaxy Enterprise",
  //     phone: "0300-1234567",
  //     address: "Wholesale Market, Karachi",
  //     total: 12000,
  //     status: "Picked up",
  //     items: [
  //       { productName: "Product A", quantity: 2, price: 5000 },
  //       { productName: "Product B", quantity: 1, price: 2000 },
  //       { productName: "Product C", quantity: 3, price: 1000 },
  //     ],
  //   },
  //   {
  //     key: "2",
  //     orderId: "ORD1002",
  //     Retailer: "Ahmed Raza",
  //     BusinessName: "Star Enterprise",
  //     phone: "0311-9876543",
  //     address: "Shahra-e-Faisal, Karachi",
  //     total: 8000,
  //     status: "In Transit",
  //     items: [
  //       { productName: "Product D", quantity: 1, price: 3000 },
  //       { productName: "Product E", quantity: 2, price: 2500 },
  //     ],
  //   },
  //   {
  //     key: "3",
  //     orderId: "ORD1003",
  //     Retailer: "Raheel",
  //     BusinessName: "Moon Enterprise",
  //     phone: "0311-9876543",
  //     address: "Bolten Market, Karachi",
  //     total: 8000,
  //     status: "Delivered",
  //     items: [
  //       { productName: "Product F", quantity: 5, price: 1500 },
  //     ],
  //   },
  //   {
  //     key: "4",
  //     orderId: "ORD1004",
  //     Retailer: "Fatima",
  //     BusinessName: "Sunrise Enterprise",
  //     phone: "0333-1122334",
  //     address: "Clifton, Karachi",
  //     total: 15000,
  //     status: "Picked up",
  //     items: [
  //       { productName: "Product G", quantity: 10, price: 1000 },
  //       { productName: "Product H", quantity: 1, price: 5000 },
  //     ],
  //   },
  // ]);


  const handleStatusChange = (record: orderInfo, newStatus: orderInfo["status"]) => {
    setLoadingRow(record._id)
    updateOrderStatus({
      id: record._id,
      status: newStatus,
    },
      {
        onSuccess: () => {
          message.success(`Order updated successfully`);
          queryClient.invalidateQueries({ queryKey: ['orders'] })
        },
        onError: (err: any) => {
          const message = err?.response?.data?.message || err?.message || "Something Went Wrong"
          message.error(message);
        },
        onSettled: () => {
          setLoadingRow(null)
        }
      }
    )
  };

  const handleView = (record: orderInfo) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const columns: ColumnsType<any> = [
    { title: "Order Number", dataIndex: "orderNumber", key: "orderNumber" },
    { title: "customer Name", dataIndex: "customerName", key: "customerName" },
    { title: "customer Email", dataIndex: "customerEmail", key: "customerEmail" },
    { title: "customer Phone", dataIndex: "customerPhone", key: "customerPhone" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "default";
        if (status === "Pending") color = "orange";
        if (status === "Confirmed") color = "blue";
        if (status === "Processing") color = "purple";
        if (status === "Shipped") color = "purple";
        if (status === "Delivered") color = "green";
        if (status === "Cancelled") color = "red";
        if (status === "Refunded") color = "red";
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
            onChange={(value) => handleStatusChange(record, value)}
            loading={loadingRow === record._id}
            disabled={loadingRow === record._id}
            options={[
              { value: "Pending", label: "Pending" },
              { value: "Confirmed", label: "Confirmed" },
              { value: "Processing", label: "Processing" },
              { value: "Shipped", label: "Shipped" },
              { value: "Delivered", label: "Delivered" },
              { value: "Cancelled", label: "Cancelled" },
              { value: "Refunded", label: "Refunded" },
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
      order.customerName.toLowerCase().includes(searchText.toLowerCase()) ||
      order.orderNumber.toLowerCase().includes(searchText.toLowerCase())
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
            { value: "pending", label: "Pending" },
            { value: "Confirmed", label: "Confirmed" },
            { value: "Processing", label: "Processing" },
            { value: "Shipped", label: "Shipped" },
            { value: "Delivered", label: "Delivered" },
            { value: "Cancelled", label: "Cancelled" },
            { value: "Refunded", label: "Refunded" },
          ]}
          onChange={(value) => setFilter(value)}
          className="w-full lg:max-w-[300px]"
        />
      </div>
      <div className="overflow-x-auto mt-4">
        <Table
          columns={columns}
          loading={isLoading}
          dataSource={filteredOrders}
          pagination={{
            current: order?.pagination.currentPage,
            pageSize: limit,
            total: order?.pagination.totalOrders,
            onChange: (p, l) => {
              setCurrentPage(p);
              setlimit(l);
            },
          }}
          rowKey="_id"
          scroll={{ x: 'max-content' }}
          className="w-full"
        />
      </div>

      <Modal
        title="Order Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={1100}
      >
        {selectedOrder && (
          <div className="flex flex-col gap-4 py-4">
            <div className="grid md:grid-cols-2 gap-2">
              <p><strong>Order Number:</strong> {selectedOrder.orderNumber}</p>
              <p><strong>Customer Name:</strong> {selectedOrder.customerName}</p>
              <p><strong>Customer Email:</strong> {selectedOrder.customerEmail}</p>
              <p><strong>Customer Phone:</strong> {selectedOrder.customerPhone}</p>
              <p><strong>subtotal:</strong> {selectedOrder.subtotal}</p>
              <p><strong>shippingCost:</strong> {selectedOrder.shippingCost}</p>
              <p><strong>tax:</strong> {selectedOrder.tax}</p>
              <p><strong>totalAmount:</strong> {selectedOrder.totalAmount}</p>
              <p><strong>status:</strong> <Tag color={selectedOrder.status === "Pending" ? "orange" : selectedOrder.status === "Processing" ? "purple" : selectedOrder.status === "Confirmed" ? "blue" : selectedOrder.status === "Shipped" ? "purple" : selectedOrder.status === "Delivered" ? "green" : selectedOrder.status === "Cancelled" ? "red" : selectedOrder.status === "Refunded" ? "red" : "default"}>{selectedOrder.status}</Tag></p>
              <p><strong>paymentStatus:</strong> {selectedOrder.paymentStatus}</p>
              <p><strong>paymentMethod:</strong> {selectedOrder.paymentMethod}</p>
              <p><strong>shippingAddress:</strong>{selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}, {selectedOrder.shippingAddress.country}, {selectedOrder.shippingAddress.zipCode}</p>
            </div>
            <h3 className="text-lg font-semibold mt-2">Items:</h3>
            <Table
              dataSource={selectedOrder.items}
              scroll={{ x: 'max-content' }}
              columns={[
                { title: "Quantity", dataIndex: "quantity", key: "quantity" },
                {
                  title: "Image",
                  dataIndex: "product",
                  key: "product",
                  render: (product: { images?: string[] }) => (
                    <div className="flex flex-wrap gap-2">
                      {product?.images && product.images.length > 0 ? (
                        product.images.map((image: string, index: number) =>
                          image ? (
                            <img
                              key={index}
                              src={image}
                              alt={`product-image-${index}`}
                              className="w-10 h-10 object-cover rounded-md"
                            />
                          ) : (
                            <PictureOutlined
                              key={index}
                              style={{ fontSize: 24, color: "#bbb" }}
                            />
                          )
                        )
                      ) : (
                        <PictureOutlined style={{ fontSize: 40, color: "#bbb" }} />
                      )}
                    </div>
                  ),
                },
                { title: "wholesaleName", dataIndex: "wholesaleName", key: "wholesaleName" },
                { title: "Product Name", dataIndex: "productName", key: "productName" },
                { title: "Product Code", dataIndex: "productCode", key: "productCode" },
                { title: "unit Price", dataIndex: "unitPrice", key: "unitPrice" },
                { title: "total Price", dataIndex: "totalPrice", key: "totalPrice" },
              ]}
              pagination={false}
              rowKey="_id"
              size="small"
            />
          </div>
        )}
      </Modal>
    </Card>
  );
};

export default StatusManagement;