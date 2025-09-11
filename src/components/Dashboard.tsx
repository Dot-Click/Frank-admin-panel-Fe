import React from "react";
import { Card, Row, Col } from "antd";
import {
  ShoppingCartOutlined,
  CarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data for chart
const chartData = [
  { name: "Pickup", value: 25 },
  { name: "In Transit", value: 15 },
  { name: "Delivered", value: 80 },
];

// Chart colors
const COLORS = ["#FF9800", "#2196F3", "#4CAF50"];

// const recentOrders = [
//   { key: "1", orderId: "ORD1001", customer: "Ali Khan", status: "Delivered" },
//   { key: "2", orderId: "ORD1002", customer: "Ahmed Raza", status: "In Transit" },
//   { key: "3", orderId: "ORD1003", customer: "Raheel", status: "Pickup" },
//   { key: "4", orderId: "ORD1004", customer: "Hassan", status: "Delivered" },
// ];

const Dashboard: React.FC = () => {
  // const columns = [
  //   { title: "Order ID", dataIndex: "orderId", key: "orderId" },
  //   { title: "Customer", dataIndex: "customer", key: "customer" },
  //   { title: "Status", dataIndex: "status", key: "status" },
  // ];

  return (
    <div >
      <Row gutter={16} className="mb-4 flex sm:gap-0 gap-4">
        <Col xs={24} sm={12} md={6}>
          <Card className="rounded-2xl shadow-md">
            <ShoppingCartOutlined className="text-3xl !text-blue-600 mb-2" />
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <p className="text-2xl font-bold">120</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="rounded-2xl shadow-md">
            <ClockCircleOutlined className="text-3xl !text-orange-500 mb-2" />
            <h3 className="text-lg font-semibold">Pickup Orders</h3>
            <p className="text-2xl font-bold">25</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="rounded-2xl shadow-md">
            <CarOutlined className="text-3xl !text-indigo-500 mb-2" />
            <h3 className="text-lg font-semibold">In Transit</h3>
            <p className="text-2xl font-bold">15</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="rounded-2xl shadow-md">
            <CheckCircleOutlined className="text-3xl !text-green-600 mb-2" />
            <h3 className="text-lg font-semibold">Delivered</h3>
            <p className="text-2xl font-bold">80</p>
          </Card>
        </Col>
      </Row>

      {/* Chart + Recent Orders */}
      <Row gutter={16}>
        <Col xs={24} md={12}  >
          <Card className="rounded-2xl shadow-md sm:w-255">
            <h3 className="text-lg font-semibold">Order Distribution</h3>
            <ResponsiveContainer width="100%" height={240} className="sm:h-150">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {chartData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* <Col xs={24} md={12}>
          <Card className="rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
            <Table
              columns={columns}
              dataSource={recentOrders}
              pagination={false}
              size="small"
            />
          </Card>
        </Col> */}
      </Row>
    </div>
  );
};

export default Dashboard;
