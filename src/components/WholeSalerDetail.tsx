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
    },
    {
      wholesalerPhone: "0311-9876543",
      pickupAddress: "Wholesale Market, Karachi",
      wholesalerName: "Raza Distributors",
      wholesalerBusinessName: "Raza & Co.",
      wholesalerBankDetails: "Bank A/C: 987654321, Bank Name: XYZ Bank",
    },
    {
      wholesalerPhone: "0311-9876543",
      pickupAddress: "Wholesale Market, Karachi",
      wholesalerName: "Raheel Traders",
      wholesalerBusinessName: "Raheel & Bros.",
      wholesalerBankDetails: "Bank A/C: 456789123, Bank Name: PQR Bank",
    },
  ];


  const columns: ColumnsType<Order> = [
    { title: "Wholesaler Name", dataIndex: "wholesalerName", key: "wholesalerName" },
    { title: "Wholesaler Business Name", dataIndex: "wholesalerBusinessName", key: "wholesalerBusinessName" },
    { title: "Wholesaler Phone", dataIndex: "wholesalerPhone", key: "wholesalerPhone" },
    { title: "Wholesaler Bank Details", dataIndex: "wholesalerBankDetails", key: "wholesalerBankDetails" },
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
    <div className="p-5">
      <Card className="rounded-lg shadow-md mb-5">
        <h2 className="text-2xl font-semibold mb-4 capitalize">{pathname}</h2>
        <div className="flex flex-wrap justify-between gap-4">
        <Input.Search
          placeholder="Search orders by ID, customer, or address"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={(value) => setSearchText(value)}
          onChange={(e) => setSearchText(e.target.value)}
          className="mb-4"
          style={{ width: "100%", maxWidth: 500, marginTop: "4px" }}
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
          className="mb-4"
          style={{ width: "100%", maxWidth: 300, marginTop: "4px", marginBottom: "4px" }}
          />
        </div>
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

export default PickupOrders;
