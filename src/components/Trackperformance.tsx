import { useState } from "react";
import { useRiderPerformance } from "../hooks/Riderperformance";
import { useLocation } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { Button, Card, Input, Modal, Spin, Table, Tag } from "antd";

const Trackperformance = () => {
  const [page, setCurrentPage] = useState<number>(1)
  const [limit, setlimit] = useState<number>(10)
  const [localId, setLocalId] = useState<string>("")
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedRider, setSelectedRider] = useState<any>(null);
  const location = useLocation()
  const pathname = location.pathname.split("/").pop()?.replace(/-/g, " ")
  const { data, isLoading, isError } = useRiderPerformance(localId);
  if (isLoading) {
    return(
      <div className="flex justify-center items-center h-100">
        <Spin />
      </div>
    ) 
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  const noData = Boolean(localId) && (!data || (Array.isArray(data.records) && data.records.length === 0));

  const handleView = (record: any) => {
    setSelectedRider(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRider(null);
  };

  const columns: ColumnsType<any> = [
    { title: "order Number", dataIndex: "orderNumber", key: "orderNumber", render: (val) => val || "N/A" },
    { title: "delivery OrderId", dataIndex: "deliveryOrderId", key: "deliveryOrderId", render: (val) => val || "N/A" },
    {
      title: "delivery Location", dataIndex: "deliveryLocation", key: "deliveryLocation", render: (val) => (val
        ? val.split(",").map((part: string, i: number) => <div key={i}>{part.trim()}</div>)
        : "N/A"
      )
    },
    {
      title: "Pickup Location", dataIndex: "pickupLocation", key: "pickupLocation", render: (val) => (val
        ? val.split(",").map((part: string, i: number) => <div key={i}>{part.trim()}</div>)
        : "N/A"
      )
    },
    {
      title: "current OrderStatus", dataIndex: "status", key: "currentOrderStatus", render: (val) => (
        <Tag color={val === 'accepted' ? "green" : val === 'rejected' ? 'red' : 'default'}>{val || 'N/A'}</Tag>
      ),
    },
    {
      title: "Payment", dataIndex: "orderValue", key: "payment", render: (val) => (val ?? "N/A")
    },
    {
      title: "Priority", dataIndex: "priority", key: "priority", render: (val) => (val || "N/A")
    },
    {
      title: "Details", dataIndex: "Details", key: "Details",
      render: (_, record) => (
        <Button onClick={() => handleView(record)} style={{ background: "linear-gradient(to right, #000080, #00014a)", color: "white" }}>
          Details
        </Button>
      )
    },
  ];


  return (
    <div className="p-5">
      <Card className="rounded-lg shadow-md mb-5 w-full">
        <h2 className="text-2xl font-semibold mb-4 capitalize break-words text-nowrap">{pathname}</h2>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
          <Input.Search
            placeholder="Search Rider Performance by Id"
            allowClear
            enterButton="Search"
            size="large"
            className="w-full lg:max-w-[500px]"
            defaultValue={localId}
            onSearch={(value) => setLocalId(value)}
          />
        </div>
        <div className="overflow-x-auto mt-4">
          {noData ? (
            <div className="py-8 text-center text-gray-500">No data available for this rider.</div>
          ) : (
            <Table
              columns={columns}
              dataSource={data?.records || []}
              loading={isLoading}
              rowKey="_id"
              pagination={{
                current: data?.pagination?.page || page,
                pageSize: data?.pagination?.limit || limit,
                total: data?.pagination?.total || 0,
                onChange: (p, l) => {
                  setCurrentPage(p);
                  setlimit(l);
                },
              }}
              scroll={{ x: 'max-content' }}
              className="w-full"
            />
          )}
        </div>
      </Card>
      <Modal
        title="Rider Details"
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
        {selectedRider && (
          <div className="flex flex-col gap-2 py-4">
            <div className="grid md:grid-cols-2 gap-2">
              <p><strong>Rider Name:</strong> {data?.rider?.name || 'N/A'}</p>
              <p><strong>Rider Email:</strong> {data?.rider?.email || 'N/A'}</p>
              <p><strong>Phone:</strong> {data?.rider?.phone || 'N/A'}</p>
              <p><strong>City:</strong> {data?.rider?.city || 'N/A'}</p>
            </div>
            <hr />
            <div className="mt-2">
              <h4 className="font-semibold">Order Details</h4>
              <p><strong>Order Number:</strong> {selectedRider.orderNumber || 'N/A'}</p>
              <p><strong>Delivery OrderId:</strong> {selectedRider.deliveryOrderId || 'N/A'}</p>
              <p><strong>Order Value:</strong> {selectedRider.orderValue ?? 'N/A'}</p>
              <p><strong>Status:</strong> {selectedRider.status || 'N/A'}</p>
            </div>
          </div>
        )}

      </Modal>
    </div>
  );
}

export default Trackperformance


