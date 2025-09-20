import React from "react";
import { Table, Input, Card, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useLocation } from "react-router-dom";

interface Order {
  wholesalerPhone: string;
  pickupAddress: string;
  wholesalerName: string;
  wholesalerBusinessName: string;
  wholesalerBankDetails: string;
  orderValue: number;
  wholesalerShare: number;
  ourCommission: number;
}

const PickupOrders: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const location = useLocation()
  const pathname = location.pathname.split("/").pop()?.replace(/-/g, " ")
  const Pickuporders: Order[] = [
    {
      wholesalerPhone: "0300-1234567",
      pickupAddress: "Wholesale Market, Karachi",
      wholesalerName: "Khan Wholesalers",
      wholesalerBusinessName: "Khan & Sons Enterprises",
      wholesalerBankDetails: "Bank A/C: 123456789, Bank Name: ABC Bank",
      orderValue: 10000,
      wholesalerShare: 7000,
      ourCommission: 3000,
    },
    {
      wholesalerPhone: "0311-9876543",
      pickupAddress: "Wholesale Market, Karachi",
      wholesalerName: "Raza Distributors",
      wholesalerBusinessName: "Raza & Co.",
      wholesalerBankDetails: "Bank A/C: 987654321, Bank Name: XYZ Bank",
      orderValue: 15000,
      wholesalerShare: 10000,
      ourCommission: 5000,
    },
    {
      wholesalerPhone: "0311-9876543",
      pickupAddress: "Wholesale Market, Karachi",
      wholesalerName: "Raheel Traders",
      wholesalerBusinessName: "Raheel & Bros.",
      wholesalerBankDetails: "Bank A/C: 456789123, Bank Name: PQR Bank",
      orderValue: 20000,
      wholesalerShare: 14000,
      ourCommission: 6000,
    },
  ];


  const columns: ColumnsType<Order> = [
    { title: "Wholesaler Name", dataIndex: "wholesalerName", key: "wholesalerName" },
    { title: "Wholesaler Business Name", dataIndex: "wholesalerBusinessName", key: "wholesalerBusinessName" },
    { title: "Wholesaler Phone", dataIndex: "wholesalerPhone", key: "wholesalerPhone" },
    { title: "Wholesaler Bank Details", dataIndex: "wholesalerBankDetails", key: "wholesalerBankDetails" },
    { title: "Order Value", dataIndex: "orderValue", key: "orderValue" },
    { title: "Wholesaler Share", dataIndex: "wholesalerShare", key: "wholesalerShare" },
    { title: "Our Commission", dataIndex: "ourCommission", key: "ourCommission" },
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
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 capitalize break-words">
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
      </Card>
    </div>

  );
};

export default PickupOrders;
