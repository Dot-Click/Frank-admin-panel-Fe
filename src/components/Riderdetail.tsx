import { App, Button, Card, Flex, Input, Modal, Select, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useRiders } from "../hooks/RiderInfo";
import { api } from "../config/axiso.config";
import { useQueryClient } from "@tanstack/react-query";
import { useRidercommisionhistoryhook } from "../hooks/Ridercommisionhistoryhook";

const Riderdetail: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isCommisionModalVisible, setIsCommisionModalVisible] = useState<boolean>(false);
  const [page, setCurrentPage] = useState<number>(1);
  const [limit, setlimit] = useState<number>(10);
  const [loadingRow, setLoadingRow] = useState<string | null>(null);
  const [applicationLoadingRow, setApplicationLoadingRow] = useState<string | null>(null);
  const [commissionLoading, setCommissionLoading] = useState<boolean>(false);
  const [commissionValue, setCommissionValue] = useState<string>("");
  const [selectedRider, setSelectedRider] = useState<any>(null);
  const [selectedRiderCommission, setSelectedRiderCommission] = useState<any>(null);
  const [isCommissionHistoryVisible, setIsCommissionHistoryVisible] = useState<boolean>(false);
  const { message } = App.useApp();
  const location = useLocation();
  const pathname = location.pathname.split("/").pop()?.replace(/-/g, " ");
  const queryClient = useQueryClient();
  const { data, isLoading } = useRiders(page, limit);
  const { data: commissionHistoryResponse, isLoading: commissionHistoryLoading} = useRidercommisionhistoryhook(selectedRiderCommission?._id);
  const commissionHistory = commissionHistoryResponse?.commissionHistory || [];
  const handleView = (record: any) => {
    setSelectedRider(record);
    setIsModalVisible(true);
  };

  const handleViewCommissionHistory = (record: any) => {
    setSelectedRiderCommission(record);
    setIsCommissionHistoryVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRider(null);
  };

  const handleCancelCommission = () => {
    setIsCommisionModalVisible(false);
  };

  const handleStatusChange = async (record: any) => {
    setLoadingRow(record._id);
    try {
      const response = await api.put(`/api/admin/riders/${record._id}/active`, {
        isActive: !record.isActive,
      });
      if (response.data.success) {
        message.success(response.data.data.message);
        queryClient.invalidateQueries({ queryKey: ["riderinfo"] });
      } else {
        message.error(response.data.message);
      }
    } catch (err: any) {
      message.error(err.response?.data?.message || "Failed to update rider status");
    } finally {
      setLoadingRow(null);
    }
  };

  const handleApplicationStatusChange = async (record: any, action: "approve" | "reject") => {
    setApplicationLoadingRow(record._id);
    try {
      let body: any = { action };
      if (action === "reject") {
        const reason = prompt("Enter rejection reason:");
        if (!reason) {
          message.warning("Rejection reason is required");
          setApplicationLoadingRow(null);
          return;
        }
        body.reason = reason;
        body.notes = "Rejected by Admin";
      }

      const response = await api.post(`/api/admin/riders/${record._id}/approve`, body);
      if (response.data.success) {
        message.success(response.data.data.message);
        queryClient.invalidateQueries({ queryKey: ["riderinfo"] });
      } else {
        message.error(response.data.message);
      }
    } catch (err: any) {
      message.error(err.response?.data?.message || "Failed to update rider status");
    } finally {
      setApplicationLoadingRow(null);
    }
  };

  const handleViewCommission = (record: any) => {
    setSelectedRider(record);
    setIsCommisionModalVisible(true);
    setCommissionValue(
      record?.adminSettings?.commissionPercentage?.toString() || ""
    );
  };

  const HandleUpdateCommission = async () => {
    if (!commissionValue) {
      message.warning("Please enter commission value");
      return;
    }

    if (!selectedRider?._id) {
      message.error("No rider selected");
      return;
    }

    setCommissionLoading(true);

    try {
      const response = await api.put(`/api/admin/riders/${selectedRider._id}/commission`, {
        commissionPercentage: parseFloat(commissionValue),
        reason: "Commission updated by admin",
      });
      if (response.data.success) {
        message.success(response.data.data.message || "Commission updated successfully");
        queryClient.invalidateQueries({ queryKey: ["riderinfo"] });
        setIsCommisionModalVisible(false);
      } else {
        message.error(response.data.message);
      }
      console.log(response);
    } catch (err: any) {
      message.error(err.response?.data?.message || "Failed to update commission");
      console.log(err.response?.data?.message);
    } finally {
      setCommissionLoading(false);
    }
  };

  const columns: ColumnsType<any> = [
    { title: "name", dataIndex: ["personalInfo", "name"], key: "name", render: (val) => val || "N/A" },
    { title: "Email", dataIndex: ["personalInfo", "email"], key: "email", render: (val) => val || "N/A" },
    { title: "Phone", dataIndex: ["personalInfo", "phoneNumber"], key: "phoneNumber", render: (val) => val || "N/A" },
    {
      title: "Application Status", dataIndex: "applicationStatus", key: "applicationStatus",
      render: (status) => {
        let color = "default";
        if (status === "pending") color = "orange";
        if (status === "under_review") color = "blue";
        if (status === "approved") color = "green";
        if (status === "rejected") color = "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Is Active", dataIndex: "isActive", key: "isActive",
      render: (val) => (
        <Tag color={val ? "green" : "red"}>{val ? "Activated" : "Deactivated"}</Tag>
      ),
    },
    {
      title: "address", dataIndex: ["personalInfo", "address"], key: "address", render: (val) => (
        val
          ? val.split(",").map((part: string, i: number) => <div key={i}>{part.trim()}</div>)
          : "N/A"
      )
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            style={{
              backgroundColor: record.isActive ? "red" : "green",
              color: "white",
            }}
            loading={loadingRow === record._id}
            onClick={() => handleStatusChange(record)}
          >
            {record.isActive ? "Deactivate" : "Activate"}
          </Button>

          <Select
            value={record.applicationStatus}
            style={{ width: 100 }}
            loading={applicationLoadingRow === record._id}
            onChange={(value) => handleApplicationStatusChange(record, value)}
            options={[
              { value: "approve", label: "Approved" },
              { value: "reject", label: "Rejected" },
            ]}
          />
        </Space>
      ),
    },
    {
      title: "Commission (%)",
      key: "commission",
      dataIndex: ["adminSettings", "commissionPercentage"],
      align: "center",
      render: (val) => (
        <Tag color="blue">
          {val !== undefined ? `${val}%` : "N/A"}
        </Tag>
      ),
    },
    {
      title: "Commission",
      dataIndex: "Commission",
      key: "Commission",
      render: (_, record) => (
        <Button
          onClick={() => handleViewCommission(record)}
          style={{
            background: "linear-gradient(to right, #000080, #00014a)",
            color: "white",
          }}
        >
          Update
        </Button>
      ),
    },
    {
      title: "Rider Detail", dataIndex: "Details", key: "Details",
      render: (_, record) => (
        <Button onClick={() => handleView(record)} style={{ background: "linear-gradient(to right, #000080, #00014a)", color: "white" }}>
          Details
        </Button>
      )
    },
    {
      title: "Commission List", dataIndex: "Details", key: "Details",
      render: (_, record) => (
        <Button
          onClick={() => handleViewCommissionHistory(record)}
          style={{
            background: "linear-gradient(to right, #000080, #00014a)",
            color: "white",
          }}
        >
          Details
        </Button>
      )
    },
  ];

  const filteredOrders = data?.riders.filter(rider => {
    const matchesSearch = rider.personalInfo.name?.toLowerCase().includes(searchText.toLowerCase().trim())
    const matchesFilter = filter ? rider.applicationStatus === filter : true;
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
            placeholder="Search by name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={(value) => setSearchText(value)}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full lg:max-w-[500px]"
          />

          <Select
            placeholder="Filter by Status"
            size="large"
            allowClear
            options={[
              { value: "pending", label: "Pending" },
              { value: "under_review", label: "Under Review" },
              { value: "approved", label: "Approved" },
              { value: "rejected", label: "Rejected" },
            ]}
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
              current: data?.pagination.page,
              pageSize: limit,
              total: data?.pagination.total,
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
                <p ><strong>Name:</strong> {selectedRider.personalInfo?.name ? selectedRider.personalInfo.name : 'N/A'}</p>
                <p ><strong>Email:</strong> {selectedRider.personalInfo?.email ? selectedRider.personalInfo.email : 'N/A'}</p>
                <p><strong>Phone:</strong> {selectedRider.personalInfo?.phoneNumber ? selectedRider.personalInfo.phoneNumber : 'N/A'}</p>
                <p><strong>Address:</strong> {selectedRider.personalInfo?.phoneNumber ? selectedRider.personalInfo.address : 'N/A'}</p>
                <p><strong>City:</strong> {selectedRider.personalInfo?.phoneNumber ? selectedRider.personalInfo.city : 'N/A'}</p>
                <p><strong>Application Status:</strong> <Tag color={selectedRider.applicationStatus === "pending" ? "orange" : selectedRider.applicationStatus === "under_review" ? "blue" : selectedRider.applicationStatus === "approved" ? "green" : selectedRider.applicationStatus === "rejected" ? "purple" : ''}>{selectedRider.applicationStatus}</Tag></p>
                <p><strong>Is Active:</strong> <Tag color={selectedRider.isActive === true ? "green" : "red"}>{selectedRider.isActive ? "Activated" : "Deactivated"}</Tag></p>
                <p><strong>Bank Account Name:</strong> {selectedRider.bankDetails?.accountName ? selectedRider.bankDetails.accountName : 'N/A'}</p>
                <p><strong>Bank Account Number:</strong> {selectedRider.bankDetails?.accountNumber ? selectedRider.bankDetails.accountNumber : 'N/A'}</p>
                <p><strong>Bank Name:</strong> {selectedRider.bankDetails?.bankName ? selectedRider.bankDetails.bankName : 'N/A'}</p>
                <p><strong>bank Code:</strong> {selectedRider.bankDetails?.bankCode ? selectedRider.bankDetails.bankCode : 'N/A'}</p>
                <p><strong>Total Earnings:</strong> {selectedRider.wallet?.totalEarnings}</p>
                <p><strong>Current Balance:</strong> {selectedRider.wallet?.balance}</p>
                <p><strong>Pending Withdrawals:</strong> {selectedRider.wallet?.pendingWithdrawals}</p>
                <p><strong>Rating:</strong> {selectedRider.performance?.rating}</p>
                <p><strong>Total Deliveries:</strong> {selectedRider.performance?.totalDeliveries}</p>
                <p><strong>On-Time Deliveries:</strong> {selectedRider.performance?.onTimeDeliveries}</p>
                <p><strong>Cancelled Deliveries:</strong> {selectedRider.performance?.cancelledDeliveries}</p>
                <p><strong>Average Delivery Time:</strong> {selectedRider.performance?.averageDeliveryTime}</p>
                <p><strong>Total Working Hours:</strong> {selectedRider.preferences?.workingHours?.start} - {selectedRider.preferences?.workingHours?.end}</p>
                <p><strong>Commission Percentage:</strong> {selectedRider.adminSettings?.commissionPercentage}%</p>
              </div>
            </div>
          )}

        </Modal>

        <Modal
          title="Update Commission"
          open={isCommisionModalVisible}
          centered
          onCancel={handleCancelCommission}
          width={500}
          style={{ maxWidth: "95%" }}
          footer={[
            <Button key="back" onClick={handleCancelCommission}>
              Close
            </Button>,
            <Button
              key="update"
              type="primary"
              loading={commissionLoading}
              onClick={HandleUpdateCommission}
            >
              Update
            </Button>,
          ]}
        >
          <Flex wrap gap="small" className="site-button-ghost-wrapper">
            <Input
              required
              placeholder="Enter new commission (e.g. 10%)"
              type="number"
              value={commissionValue}
              onChange={(e) => setCommissionValue(e.target.value)}
              style={{ width: "100%" }}
            />
          </Flex>
        </Modal>

        <Modal
          title={`Commission History - ${commissionHistoryResponse?.rider?.name || ""}`}
          open={isCommissionHistoryVisible}
          onCancel={() => {
            setIsCommissionHistoryVisible(false);
            setSelectedRiderCommission(null);
          }}
          width={900}
          footer={[
            <Button
              key="close"
              onClick={() => setIsCommissionHistoryVisible(false)}
            >
              Close
            </Button>,
          ]}
        >
          <Table
            rowKey="id"
            loading={commissionHistoryLoading}
            dataSource={commissionHistory}
            pagination={false}
            columns={[
              {
                title: "Previous (%)",
                dataIndex: "previousCommission",
                align: "center",
                render: (val) => `${val}%`,
              },
              {
                title: "New (%)",
                dataIndex: "newCommission",
                align: "center",
                render: (val) => (
                  <Tag color="blue">{val}%</Tag>
                ),
              },
              {
                title: "Change",
                align: "center",
                render: (_, record: { changeType: string; changeAmount: number }) => (
                  <Tag
                    color={
                      record.changeType === "increase"
                        ? "green"
                        : record.changeType === "decrease"
                          ? "red"
                          : "default"
                    }
                  >
                    {record.changeType} ({record.changeAmount}%)
                  </Tag>
                ),
              },
              {
                title: "Status",
                dataIndex: "status",
                align: "center",
                render: (val) => (
                  <Tag color={val === "active" ? "green" : "red"}>
                    {val}
                  </Tag>
                ),
              },
              {
                title: "Updated By",
                dataIndex: ["admin", "name"],
                render: (val) => val || "System",
              },
              {
                title: "Effective Date",
                dataIndex: "effectiveDate",
                render: (val) =>
                  new Date(val).toLocaleString(),
              },
            ]}
          />
        </Modal>

      </Card>
    </div>

  );
};

export default Riderdetail;
