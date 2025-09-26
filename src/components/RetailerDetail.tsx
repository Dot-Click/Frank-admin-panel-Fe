import React, { useState } from "react";
import { Table, Input, Card, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useLocation } from "react-router-dom";
import { useBusinessInfo } from "../hooks/BusinessInfo";

// interface Order {
//   Address: string;
//   retailerName: string;
//   retailerPhone: string;
//   EmailAddress: string
// }

const Deliverorder: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [page, setCurrentPage] = useState<number>(1)
  const [limit, setlimit] = useState<number>(10)
  const location = useLocation()
  const pathname = location.pathname.split("/").pop()?.replace(/-/g, " ")
  const { data, isLoading } = useBusinessInfo(page, limit, "retail")

  // const Deliverorders: Order[] = [
  //   {
  //     Address: "Retail Shop A, Defence, Karachi",
  //     retailerName: "Retailer A",
  //     retailerPhone: "0345-1122334",
  //     EmailAddress: "Abc@gmail.com"
  //   },
  //   {
  //     Address: "Retail Shop B, Clifton, Karachi",
  //     retailerName: "Retailer B",
  //     retailerPhone: "0333-5566778",
  //     EmailAddress: "Abc@gmail.com"
  //   },
  //   {
  //     Address: "Retail Shop C, Gulshan, Karachi",
  //     retailerName: "Retailer C",
  //     retailerPhone: "0321-9988776",
  //     EmailAddress: "Abc@gmail.com"
  //   },
  // ];

  const columns: ColumnsType<any> = [
    { title: "Retailer Name", dataIndex: "name", key: "name" },
    { title: "Retailer Phone", dataIndex: "phone", key: "phone" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Email Address", dataIndex: "email", key: "email" },
  ];

  const filteredOrders = data?.users.filter(order => {
    const matchesSearch =
      order.name.toLowerCase().includes(searchText.toLowerCase().trim()) ||
      order.email.toLowerCase().includes(searchText.toLowerCase().trim());
      const matchesFilter = filter ? order.name === filter : true;
      return matchesSearch && matchesFilter;
  }
  );

  return (
    <div className="p-5">
      <Card className="rounded-lg shadow-md mb-5 w-full">
        <h2 className="text-2xl font-semibold mb-4 capitalize break-words text-nowrap">{pathname}</h2>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
          <Input.Search
            placeholder="Search by Retailer Name, Email Address"
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
            scroll={{ x: 'max-content' }}
            className="w-full"
          />
        </div>
      </Card>
    </div>
  );
};

export default Deliverorder;