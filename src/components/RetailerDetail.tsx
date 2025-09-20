import React, { useState } from "react";
import { Table, Input, Card, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useLocation } from "react-router-dom";

interface Order {
  Address: string;
  retailerName: string;
  retailerPhone: string;
  EmailAddress: string
}

const Deliverorder: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const location = useLocation()
  const pathname = location.pathname.split("/").pop()?.replace(/-/g, " ")
  const Deliverorders: Order[] = [
    {
      Address: "Retail Shop A, Defence, Karachi",
      retailerName: "Retailer A",
      retailerPhone: "0345-1122334",
      EmailAddress: "Abc@gmail.com"
    },
    {
      Address: "Retail Shop B, Clifton, Karachi",
      retailerName: "Retailer B",
      retailerPhone: "0333-5566778",
      EmailAddress: "Abc@gmail.com"
    },
    {
      Address: "Retail Shop C, Gulshan, Karachi",
      retailerName: "Retailer C",
      retailerPhone: "0321-9988776",
      EmailAddress: "Abc@gmail.com"
    },
  ];

  const columns: ColumnsType<Order> = [
    { title: "Retailer Name", dataIndex: "retailerName", key: "retailerName" },
    { title: "Retailer Phone", dataIndex: "retailerPhone", key: "retailerPhone" },
    { title: "Address", dataIndex: "Address", key: "Address" },
    { title: "Email Address", dataIndex: "EmailAddress", key: "EmailAddress" },
  ];

  const filteredOrders = Deliverorders.filter(order => {
    const matchesSearch =
      order.Address.toLowerCase().includes(searchText.toLowerCase()) ||
      order.retailerName.toLowerCase().includes(searchText.toLowerCase()) ||
      order.EmailAddress.toLowerCase().includes(searchText.toLowerCase()) ||
      order.retailerPhone.toLowerCase().includes(searchText.toLowerCase())
    const matchesFilter = filter ? order.retailerName === filter : true;

    return matchesSearch && matchesFilter;
  }
  );

  return (
    <div className="p-5">
      <Card className="rounded-lg shadow-md mb-5 w-full">
        <h2 className="text-2xl font-semibold mb-4 capitalize break-words text-nowrap">{pathname}</h2>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
          <Input.Search
            placeholder="Search orders by Retailer Name, Retailer Shop Name, Retailer Phone, or Address"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full lg:max-w-[500px]"
          />
          <Select
            placeholder="Filter by Retailer Name"
            size="large"
            allowClear
            options={[
              { value: "Retailer A", label: "Retailer A" },
              { value: "Retailer B", label: "Retailer B" },
              { value: "Retailer C", label: "Retailer C" },
            ]}
            onChange={(value) => setFilter(value)}
            className="w-full lg:max-w-[500px]"
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
      </Card>
    </div>
  );
};

export default Deliverorder;