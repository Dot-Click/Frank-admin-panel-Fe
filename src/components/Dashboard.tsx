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
          <Card className="rounded-2xl shadow-md" style={{ backgroundColor: "#000080" }}>
          <div style={{boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.5)", borderRadius: "50%", marginBottom: "10px", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center"}}>  
            <ShoppingCartOutlined className="text-3xl" style={{ color: "#ffffff" }} />
            </div>
            <h3 className="text-lg font-semibold" style={{ color: "#ffffff" }}>Total Orders</h3>
            <p className="text-2xl font-bold" style={{ color: "#ffffff" }}>120</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="rounded-2xl shadow-md" style={{ background: "linear-gradient(90deg, #FF7C3A, #FF4B2B)" }}>
          <div style={{boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.5)", borderRadius: "50%", marginBottom: "10px", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center"}}>  
            <ClockCircleOutlined className="text-3xl" style={{ color: "#ffffff" }} />
            </div>
            <h3 className="text-lg font-semibold" style={{ color: "#ffffff" }}>Pickup Orders</h3>
            <p className="text-2xl font-bold" style={{ color: "#ffffff" }}>25</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="rounded-2xl shadow-md" style={{ backgroundColor: "#000080" }}>
          <div style={{boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.5)", borderRadius: "50%", marginBottom: "10px", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center"}}>  
            <CarOutlined className="text-3xl" style={{ color: "#ffffff" }} />
            </div>
            <h3 className="text-lg font-semibold" style={{ color: "#ffffff" }}>In Transit</h3>
            <p className="text-2xl font-bold" style={{ color: "#ffffff" }}>15</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card className="rounded-2xl shadow-md" style={{ backgroundColor: "green"  }}>
            <div style={{boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.5)", borderRadius: "50%", marginBottom: "10px", width: "50px", height: "50px", display: "flex", alignItems: "center", justifyContent: "center"}}>  
              <CheckCircleOutlined className="text-3xl" style={{ color: "white" }} />
            </div>
            {/* <CheckCircleOutlined className="text-3xl mb-2" style={{ color: "white" }} /> */}
            <h3 className="text-lg font-semibold" style={{ color: "white" }}>Delivered</h3>
            <p className="text-2xl font-bold" style={{ color: "white" }}>80</p>
          </Card>
        </Col>
      </Row>

      {/* Chart + Recent Orders */}
      <Row gutter={16} className="min-h-[300px]">
        <Col xs={24}>
          <Card className="rounded-2xl shadow-md " style={{ width: "100%", height: "100%" }}>
            <h3 className="text-lg font-semibold" style={{ color: "#000080" }}>Order Distribution</h3>
            <ResponsiveContainer width="100%" height={300} >
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
