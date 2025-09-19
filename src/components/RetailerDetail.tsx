import React, { useState } from "react";
import { Table, Input, Card, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useLocation } from "react-router-dom";

interface Order {
  phone: string;
  Address: string;
  retailerName: string;
  retailerPhone: string;
  retailerShopName: string;
  retailerBankDetails: string;
}

const Deliverorder: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const location = useLocation()
  const pathname = location.pathname.split("/").pop()?.replace(/-/g, " ")
  const Deliverorders: Order[] = [
    {
      phone: "0300-1234567",
      Address: "Retail Shop A, Defence, Karachi",
      retailerName: "Retailer A",
      retailerPhone: "0345-1122334",
      retailerShopName: "ABC General Store",
      retailerBankDetails: "Bank A/C: 123456789, Bank Name: ABC Bank",
    },
    {
      phone: "0311-9876543",
      Address: "Retail Shop B, Clifton, Karachi",
      retailerName: "Retailer B",
      retailerPhone: "0333-5566778",
      retailerShopName: "XYZ General Store",
      retailerBankDetails: "Bank A/C: 987654321, Bank Name: XYZ Bank",
    },
    {
      phone: "0311-9876543",
      Address: "Retail Shop C, Gulshan, Karachi",
      retailerName: "Retailer C",
      retailerPhone: "0321-9988776",
      retailerShopName: "PQR General Store",
      retailerBankDetails: "Bank A/C: 456789123, Bank Name: PQR Bank",
    },
  ];

  const columns: ColumnsType<Order> = [
    { title: "Retailer Name", dataIndex: "retailerName", key: "retailerName" },
    { title: "Retailer Shop Name", dataIndex: "retailerShopName", key: "retailerShopName" },
    { title: "Retailer Phone", dataIndex: "retailerPhone", key: "retailerPhone" },
    { title: "Address", dataIndex: "Address", key: "Address" },
    { title: "Retailer Bank Details", dataIndex: "retailerBankDetails", key: "retailerBankDetails" },
  ];

  const filteredOrders = Deliverorders.filter(order => {
    const matchesSearch =
      order.Address.toLowerCase().includes(searchText.toLowerCase()) ||
      order.retailerName.toLowerCase().includes(searchText.toLowerCase()) ||
      order.retailerPhone.toLowerCase().includes(searchText.toLowerCase()) ||
      order.retailerShopName.toLowerCase().includes(searchText.toLowerCase())

    const matchesFilter = filter ? order.retailerShopName === filter : true;

    return matchesSearch && matchesFilter;
  }
  );

  return (
    <div className="p-5">
      <Card className="rounded-lg shadow-md mb-5">
        <h2 className="text-2xl font-semibold mb-4 capitalize">{pathname}</h2>
        <div className="flex flex-col md:flex-row md:justify-between gap-4">
          <Input.Search
            placeholder="Search orders by Retailer Name, Retailer Shop Name, Retailer Phone, or Address"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: "100%", maxWidth: 500, marginTop: "4px" }}
            className="mb-4"
            />
          <Select
            placeholder="Filter by Shop Name"
            size="large"
            allowClear
            options={[
              { value: "ABC General Store", label: "ABC General Store" },
              { value: "XYZ General Store", label: "XYZ General Store" },
              { value: "PQR General Store", label: "PQR General Store" },
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

export default Deliverorder;