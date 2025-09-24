import React from "react";
import { Table, Input, Card, Select, Button, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useLocation } from "react-router-dom";

interface Order {
  wholesalerPhone: string;
  pickupAddress: string;
  wholesalerName: string;
  wholesalerBusinessName: string;
  BankAccountName: string;
  BankAccountNo: string;
  BankName: string;
  Plaza: string;
  Address: string;
  orderValue: number | string;
  wholesalerShare: number | string;
  ourCommission: number | string;
}

const PickupOrders: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const location = useLocation()
  const pathname = location.pathname.split("/").pop()?.replace(/-/g, " ")
  const Pickuporders: Order[] = [
    {
      wholesalerPhone: "0300-1234567",
      pickupAddress: "Wholesale Market, Karachi",
      wholesalerName: "Khan Wholesalers",
      wholesalerBusinessName: "Khan & Sons Enterprises",
      BankAccountName: "Khan Wholesalers",
      BankAccountNo: "AT611904300234573201",   
      BankName: "Erste Bank der oesterreichischen Sparkassen AG",
      Plaza: "ABC",
      Address: "Street 123",
      orderValue: "₦ 10000",
      wholesalerShare: "₦ 7000",
      ourCommission: "₦ 3000",
    },
    {
      wholesalerPhone: "0311-9876543",
      pickupAddress: "Wholesale Market, Karachi",
      wholesalerName: "Raza Distributors",
      wholesalerBusinessName: "Raza & Co.",
      BankAccountName: "Raza Distributors",
      BankAccountNo: "AT611904300234573201",   
      BankName: "Erste Bank der oesterreichischen Sparkassen AG",
      Plaza: "ABC",
      Address: "Street 123",
      orderValue: "₦ 15000",
      wholesalerShare: "₦ 10000",
      ourCommission: "₦ 5000",
    },
    {
      wholesalerPhone: "0311-9876543",
      pickupAddress: "Wholesale Market, Karachi",
      wholesalerName: "Raheel Traders",
      wholesalerBusinessName: "Raheel & Bros.",
      BankAccountName: "Raheel Traders",
      BankAccountNo: "AT611904300234573201",   
      BankName: "Erste Bank der oesterreichischen Sparkassen AG",
      Plaza: "ABC",
      Address: "Street 123",
      orderValue: "₦ 20000",
      wholesalerShare: "₦ 14000",
      ourCommission: "₦ 6000",
    },
  ];

  const handleView = (record: Order) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };
  const columns: ColumnsType<Order> = [
    { title: "Wholesaler Name", dataIndex: "wholesalerName", key: "wholesalerName" },
    { title: "Wholesaler Business Name", dataIndex: "wholesalerBusinessName", key: "wholesalerBusinessName" },
    { title: "Wholesaler Phone", dataIndex: "wholesalerPhone", key: "wholesalerPhone" },
    { title: "Bank Account Name", dataIndex: "BankAccountName", key: "BankAccountName" },
    { title: "Bank Account No", dataIndex: "BankAccountNo", key: "BankAccountNo" },
    { title: "Bank Name", dataIndex: "BankName", key: "BankName" },
    { title: "Plaza", dataIndex: "Plaza", key: "Plaza" },
    { title: "Address", dataIndex: "Address", key: "Address" },
    { title: "Order Value", dataIndex: "orderValue", key: "orderValue" },
    { title: "Wholesaler Share", dataIndex: "wholesalerShare", key: "wholesalerShare" },
    { title: "Our Commission", dataIndex: "ourCommission", key: "ourCommission" },
    {
      title: "Details",
      dataIndex: "Details",
      key: "Details",
      render: (_, record) => (
        <>
          <Button onClick={() => handleView(record)} style={{ background: "linear-gradient(to right, #000080, #00014a)", color: "white" }}>
            Details
          </Button>
        </>
      ),

    },
  ];

  const filteredOrders = Pickuporders.filter(order => {
    const matchesSearch =
      order.pickupAddress.toLowerCase().includes(searchText.toLowerCase()) ||
      order.wholesalerName.toLowerCase().includes(searchText.toLowerCase()) ||
      order.wholesalerBusinessName.toLowerCase().includes(searchText.toLowerCase())

    const matchesFilter = filter ? order.wholesalerBusinessName === filter : true;

    return matchesSearch && matchesFilter;
  }
  );

  return (
    <div className="p-4 sm:p-6">
      <Card className="rounded-lg shadow-md mb-5 w-full">
        <h2 className="text-2xl font-semibold mb-4 capitalize break-words text-nowrap">
          {pathname}
        </h2>

        {/* Search & Filter Controls */}
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
            placeholder="Filter by Wholesaler Business Name"
            size="large"
            allowClear
            options={[
              { value: "Raheel & Bros.", label: "Raheel & Bros." },
              { value: "Raza & Co.", label: "Raza & Co." },
              { value: "Khan & Sons Enterprises", label: "Khan & Sons Enterprises" },
            ]}
            onChange={(value) => setFilter(value)}
            className="w-full lg:max-w-[300px]"
          />
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto mt-4">
          <Table
            columns={columns}
            dataSource={filteredOrders}
            rowKey="key"
            scroll={{ x: "max-content" }}
            className="w-full"
          />
        </div>
        <Modal
          title="WholeSaler Details"
          open={isModalVisible}
          onCancel={handleCancel}
          width={950}
          style={{ maxWidth: "95%" }}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Close
            </Button>,
          ]}
        >
          {selectedOrder && (
            <div className="flex flex-col gap-2 py-4">
              <div className="grid md:grid-cols-2 gap-2">
                <p ><strong>WholeSaler Name:</strong> {selectedOrder.wholesalerName}</p>
                <p><strong>Wholesaler Business Name:</strong> {selectedOrder.wholesalerBusinessName}</p>
                <p><strong>Wholesaler Phone:</strong> {selectedOrder.wholesalerPhone}</p>
                <p><strong>Bank Account Name:</strong> {selectedOrder.BankAccountName}</p>
                <p><strong>Bank Account No:</strong> {selectedOrder.BankAccountNo}</p>
                <p><strong>Bank Name:</strong> {selectedOrder.BankName}</p>
                <p><strong>Plaza:</strong> {selectedOrder.Plaza}</p>
                <p><strong>Address:</strong> {selectedOrder.Address}</p>
                <p><strong>Order Value:</strong> {selectedOrder.orderValue}</p>
                <p><strong>WholeSaler Share:</strong> {selectedOrder.wholesalerShare}</p>
                <p><strong>Our Commission:</strong> {selectedOrder.ourCommission}</p>
              </div>
            </div>
          )}
        </Modal>
      </Card>
    </div>

  );
};

export default PickupOrders;
