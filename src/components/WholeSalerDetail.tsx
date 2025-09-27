import React from "react";
import { Table, Input, Card, Select, Button, Modal, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useBusinessInfo, type BusinessInfo } from "../hooks/BusinessInfo";

// interface Order {
//   wholesalerPhone: string;
//   pickupAddress: string;
//   wholesalerName: string;
//   wholesalerBusinessName: string;
//   BankAccountName: string;
//   BankAccountNo: string;
//   BankName: string;
//   Plaza: string;
//   Address: string;
//   orderValue: number | string;
//   wholesalerShare: number | string;
//   ourCommission: number | string;
// }

const PickupOrders: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<BusinessInfo | null>(null);
  const [page, setCurrentPage] = useState<number>(1)
  const [limit, setlimit] = useState<number>(10)
  const location = useLocation()
  const pathname = location.pathname.split("/").pop()?.replace(/-/g, " ")
  const { data, isLoading } = useBusinessInfo(page, limit, "wholesale")
  // const Pickuporders: Order[] = [
  //   {
  //     wholesalerPhone: "0300-1234567",
  //     pickupAddress: "Wholesale Market, Karachi",
  //     wholesalerName: "Khan Wholesalers",
  //     wholesalerBusinessName: "Khan & Sons Enterprises",
  //     BankAccountName: "Khan Wholesalers",
  //     BankAccountNo: "AT611904300234573201",
  //     BankName: "Erste Bank der oesterreichischen Sparkassen AG",
  //     Plaza: "ABC",
  //     Address: "Street 123",
  //     orderValue: "₦ 10000",
  //     wholesalerShare: "₦ 7000",
  //     ourCommission: "₦ 3000",
  //   },
  //   {
  //     wholesalerPhone: "0311-9876543",
  //     pickupAddress: "Wholesale Market, Karachi",
  //     wholesalerName: "Raza Distributors",
  //     wholesalerBusinessName: "Raza & Co.",
  //     BankAccountName: "Raza Distributors",
  //     BankAccountNo: "AT611904300234573201",
  //     BankName: "Erste Bank der oesterreichischen Sparkassen AG",
  //     Plaza: "ABC",
  //     Address: "Street 123",
  //     orderValue: "₦ 15000",
  //     wholesalerShare: "₦ 10000",
  //     ourCommission: "₦ 5000",
  //   },
  //   {
  //     wholesalerPhone: "0311-9876543",
  //     pickupAddress: "Wholesale Market, Karachi",
  //     wholesalerName: "Raheel Traders",
  //     wholesalerBusinessName: "Raheel & Bros.",
  //     BankAccountName: "Raheel Traders",
  //     BankAccountNo: "AT611904300234573201",
  //     BankName: "Erste Bank der oesterreichischen Sparkassen AG",
  //     Plaza: "ABC",
  //     Address: "Street 123",
  //     orderValue: "₦ 20000",
  //     wholesalerShare: "₦ 14000",
  //     ourCommission: "₦ 6000",
  //   },
  // ];
  const handleView = (record: any) => {
    setSelectedOrder(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };
  const columns: ColumnsType<any> = [
    { title: "WholeSaler Name", dataIndex: "name", key: "name", render: (val) => val || "N/A" },
    { title: "Email", dataIndex: "email", key: "email", render: (val) => val || "N/A" },
    { title: "Phone", dataIndex: "phone", key: "phone", render: (val) => val || "N/A" },
    { title: "User Type", dataIndex: "userType", key: "userType", render: (val) => val || "N/A" },
    { title: "Business Name", dataIndex: "businessName", key: "businessName", render: (val) => val || "N/A" },
    { title: "Shop Number", dataIndex: "shopNumber", key: "shopNumber", render: (val) => val || "N/A" },
    { title: "Plaza", dataIndex: "plazaName", key: "plazaName", render: (val) => val || "N/A" },
    { title: "Address", dataIndex: "address", key: "address", render: (val) => val || "N/A" },
    { title: "Bank Name", dataIndex: "bankName", key: "bankName", render: (val) => val || "N/A" },
    { title: "Bank Account No", dataIndex: "bankAccount", key: "bankAccount", render: (val) => val || "N/A" },
    {
      title: "Verified", dataIndex: "isVerified", key: "isVerified", render: (v) => {
        let color = "default";
        if (v === true) color = "green";
        if (v === false) color = "red";
        return <Tag color={color}>{v ? "Yes" : "No"}</Tag>
      }
    },
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

  const filteredOrders = data?.users.filter(order => {
    const matchesSearch =
      order.address.toLowerCase().includes(searchText.toLowerCase().trim()) ||
      order.name.toLowerCase().includes(searchText.toLowerCase().trim()) ||
      order.businessName.toLowerCase().includes(searchText.toLowerCase().trim())

    const matchesFilter = filter ? order.businessName === filter : true;

    return matchesSearch && matchesFilter;
  }
  );

  return (
    <div className="p-4 sm:p-6">
      <Card className="rounded-lg shadow-md mb-5 w-full">
        <h2 className="text-2xl font-semibold mb-4 capitalize break-words text-nowrap">
          {pathname}
        </h2>

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
          <Input.Search
            placeholder="Search by businessName, name, or address"
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
            options={
              data?.users.map((val) => ({
                value: val.name,
                label: val.name
              }))
            }
            onChange={(value) => setFilter(value)}
            className="w-full lg:max-w-[300px]"
          />
        </div>

        <div className="overflow-x-auto mt-4">
          <Table
            columns={columns}
            dataSource={filteredOrders}
            loading={isLoading}
            rowKey="_id"
            pagination={{
              current: data?.pagination.currentPage,
              pageSize: limit,
              total: data?.pagination.totalUsers,
              onChange: (p, l) => {
                setCurrentPage(p);
                setlimit(l);
              },
            }}
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
                <p ><strong>WholeSaler Name:</strong> {selectedOrder.name ? selectedOrder.name : 'N/A'}</p>
                <p ><strong>Email:</strong> {selectedOrder.email ? selectedOrder.email : 'N/A'}</p>
                <p><strong>Phone:</strong> {selectedOrder.phone ? selectedOrder.phone : 'N/A'}</p>
                <p><strong>UserType:</strong> {selectedOrder.userType ? selectedOrder.userType : 'N/A'}</p>
                <p><strong>Business Name:</strong> {selectedOrder.businessName ? selectedOrder.businessName : 'N/A'}</p>
                <p><strong>Shop Number:</strong> {selectedOrder.shopNumber ? selectedOrder.shopNumber : 'N/A'}</p>
                <p><strong>Plaza:</strong> {selectedOrder.plazaName ? selectedOrder.plazaName : 'N/A'}</p>
                <p><strong>Address:</strong> {selectedOrder.address ? selectedOrder.address : 'N/A'}</p>
                <p><strong>Bank Name:</strong> {selectedOrder.bankName ? selectedOrder.bankName : 'N/A'}</p>
                <p><strong>Bank Account No:</strong> {selectedOrder.bankAccount ? selectedOrder.bankAccount : 'N/A'}</p>
                <p><strong>Verified:</strong> <Tag color={selectedOrder.isVerified === true ? "green" : "red"}>{selectedOrder.isVerified ? "Yes" : "No"}</Tag></p>
                {/* <p><strong>Order Value:</strong> {selectedOrder.orderValue}</p>
                <p><strong>WholeSaler Share:</strong> {selectedOrder.wholesalerShare}</p>
                <p><strong>Our Commission:</strong> {selectedOrder.ourCommission}</p> */}
              </div>
            </div>
          )}
        </Modal>
      </Card>
    </div>

  );
};

export default PickupOrders;
