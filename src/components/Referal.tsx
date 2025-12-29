import { useState } from "react";
import { useLocation } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import { Button, Card, Input, Modal, Spin, Table, Tag } from "antd";
import { useReferal } from "../hooks/Referal";

const Referal = () => {
  const [page, setCurrentPage] = useState<number>(1)
  const [limit, setlimit] = useState<number>(10)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedRider, setSelectedRider] = useState<any>(null);
  const [searchName, setSearchName] = useState<string>("");
  const location = useLocation()
  const pathname = location.pathname.split("/").pop()?.replace(/-/g, " ")
  const { data: referalData, isLoading, isError } = useReferal();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-100">
        <Spin />
      </div>
    )
  }
  if (isError) {
    return <div>Error loading data</div>;
  }

  const handleView = (record: any) => {
    setSelectedRider(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRider(null);
  };


  const filteredActivities = referalData?.activities.filter((activity: any) => {
    const referringName = activity.referringRider?.name?.toLowerCase() || "";
    const searchLower = searchName.toLowerCase();
    return referringName.includes(searchLower);
  });

  const columns: ColumnsType<any> = [
    {
      title: "Referring Rider",
      dataIndex: ["referringRider", "name"],
      key: "referringRider",
      render: (val) => val || "N/A",
    },
    {
      title: "Referring Email",
      dataIndex: ["referringRider", "email"],
      key: "referringEmail",
      render: (val) => val || "N/A",
    },
    {
      title: "Referral Code",
      dataIndex: ["referringRider", "referralCode"],
      key: "referralCode",
      render: (val) => val || "N/A",
    },
    {
      title: "Referred Rider",
      dataIndex: ["referredRider", "name"],
      key: "referredRider",
      render: (val) => val || "N/A",
    },
    {
      title: "Referred Email",
      dataIndex: ["referredRider", "email"],
      key: "referredEmail",
      render: (val) => val || "N/A",
    },
    {
      title: "Total Deliveries",
      dataIndex: ["referredRider", "totalDeliveries"],
      key: "totalDeliveries",
      align: "center",
      render: (val) => val ?? 0,
    },
    {
      title: "Referral Date",
      dataIndex: "referralDate",
      key: "referralDate",
      render: (val) => new Date(val).toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }) || "N/A",
    },
    {
      title: "Milestone",
      dataIndex: "milestone",
      key: "milestone",
      render: (val) => val || "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (val) => (
        <Tag color={val === "pending" ? "orange" : "green"}>
          {val}
        </Tag>
      ),
    },
    {
      title: "Bonus Amount",
      dataIndex: "bonusAmount",
      key: "bonusAmount",
      align: "center",
      render: (val) => (
        val ?? 0
      ),
    },
    {
      title: "Bonus Paid",
      dataIndex: "bonusPaid",
      key: "bonusPaid",
      render: (val) => (
        <Tag color={val ? "green" : "red"}>
          {val ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Details",
      key: "details",
      render: (_, record) => (
        <Button
          onClick={() => handleView(record)}
          style={{
            background: "linear-gradient(to right, #000080, #00014a)",
            color: "white",
          }}
        >
          Details
        </Button>
      ),
    },
  ];

  return (
    <div className="p-5">
      <Card className="rounded-lg shadow-md mb-5 w-full">
        <h2 className="text-2xl font-semibold mb-4 capitalize break-words text-nowrap">{pathname}</h2>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 w-full">
          <Input.Search
            placeholder="Search By Rider Name"
            allowClear
            enterButton="Search"
            size="large"
            className="w-full lg:max-w-[500px]"
            onSearch={(value) => setSearchName(value)}
            onChange={(e) => setSearchName(e.target.value)}
            value={searchName}
          />
        </div>
        <div className="overflow-x-auto mt-4">
          <Table
            columns={columns}
            dataSource={filteredActivities || []}
            loading={isLoading}
            rowKey="id"
            pagination={{
              current: referalData?.pagination?.page || page,
              pageSize: referalData?.pagination?.limit || limit,
              total: referalData?.pagination?.total || 0,
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
              <p><strong>Referring Rider:</strong> {selectedRider.referringRider?.name || 'N/A'}</p>
              <p><strong>Referring Email:</strong> {selectedRider.referringRider?.email || 'N/A'}</p>
              <p><strong>Referred Name:</strong> {selectedRider.referredRider?.name || 'N/A'}</p>
              <p><strong>Referred Email:</strong> {selectedRider.referredRider?.email || 'N/A'}</p>
            </div>
            <hr />
            <div className="mt-2">
              <h4 className="font-semibold">Referral Details</h4>
              <p><strong>Referral Date:</strong> {new Date(selectedRider.referralDate).toLocaleString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              }) || 'N/A'}</p>
              <p><strong>Milestone:</strong> {selectedRider.milestone || 'N/A'}</p>
              <p><strong>Status:</strong> {selectedRider.status || 'N/A'}</p>
              <p><strong>Bonus Amount:</strong> {selectedRider.bonusAmount ?? 0}</p>
              <p><strong>Bonus Paid:</strong> {selectedRider.bonusPaid ? 'Yes' : 'No'}</p>
            </div>
          </div>
        )}

      </Modal>
    </div>
  );
}

export default Referal


