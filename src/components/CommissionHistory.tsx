import { useState } from "react";
import { Table, Tag, Card, Space, Input, Select, DatePicker, Row, Col, Statistic } from "antd";
import dayjs from "dayjs";
import { useCommissionHistory } from "../hooks/useCommissionHistory";
import type { ColumnsType } from "antd/es/table";
import { useLocation } from "react-router-dom";
import { useCommissionStats } from "../hooks/useCommissionStats";



const CommissionHistory = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchText, setSearchText] = useState<string>("");
    const [filter, setFilter] = useState<string | undefined>(undefined);
    const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);
    const location = useLocation();
    const pathname = location.pathname.split("/").pop()?.replace(/-/g, " ");
    const { data, isLoading } = useCommissionHistory(page, limit);

    const startDate = dateRange ? dateRange[0].toISOString() : undefined;
    const endDate = dateRange ? dateRange[1].toISOString() : undefined;
    const { data: statsData, isLoading: statsLoading } = useCommissionStats(startDate, endDate);

    const columns: ColumnsType<any> = [
        { title: "Rider ID", dataIndex: ["rider", "id"], key: "rider_id", render: (val) => val || "N/A" },
        { title: "Rider Name", dataIndex: ["rider", "name"], key: "rider_name", render: (val) => val || "N/A" },
        { title: "Rider Email", dataIndex: ["rider", "email"], key: "rider_email", render: (val) => val || "N/A" },
        { title: "Previous Commission", align: "center", dataIndex: ["previousCommission"], key: "previous_commission", render: (val) => ( <span className="text-nowrap text-black font-bold">{val ? `${val} %` : 0}</span>)},
        { title: "New Commission", align: "center", dataIndex: ["newCommission"], key: "new_commission", render: (val) => ( <span className="text-nowrap text-black font-bold">{val ? `${val} %` : 0}</span>)},
        { title: "Change Type", dataIndex: ["changeType"], key: "change_type", render: (val) => (<Tag color={val === "increase" ? "green" : val === "decrease" ? "red" : "blue"}>{val}</Tag>)},
        { title: "Reason", dataIndex: ["reason"], key: "reason", render: (val) => val || "N/A" },
        { title: "Effective Date", dataIndex: ["effectiveDate"], key: "effective_date", render: (val) => val ? dayjs(val).format("DD/MM/YYYY") : "N/A" },
        { title: "Status", dataIndex: ["status"], key: "status", render: (val) => val ? <Tag color="green">{val}</Tag> : <Tag>{val}</Tag> },
    ];

    const filteredOrders = data?.commissionHistory.filter((rider: any) => {
        const matchesSearch = rider.rider.name?.toLowerCase().includes(searchText.toLowerCase().trim())
        const matchesFilter = filter ? rider.status === filter : true;
        return matchesSearch && matchesFilter;
    });

    return (
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
            <Card>
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
                            { value: "active", label: "Active" },
                            { value: "reverted", label: "Reverted" },
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
                            current: data?.pagination.currentPage,
                            pageSize: data?.pagination.itemsPerPage,
                            total: data?.pagination.totalItems,
                            onChange: (p, l) => {
                                setPage(p);
                                setLimit(l);
                            },
                        }}
                        scroll={{ x: "max-content" }}
                        className="w-full"
                    />
                </div>
            </Card>
            <Card>
                <div className="flex lg:flex-row flex-col justify-between items-center mt-4">
                <h2 className="text-2xl font-semibold capitalize break-words text-nowrap">
                    Commission Statistics
                </h2>
                    <DatePicker.RangePicker
                        onChange={(v) => {
                            setDateRange(v as [dayjs.Dayjs, dayjs.Dayjs] | null);
                        }}
                        value={dateRange}
                        className="w-full lg:max-w-[500px] mt-4 lg:mt-0"
                        allowEmpty={[true, true]}
                    />
                </div>
                <div className="text-start text-lg font-semibold mt-6">
                    <Row gutter={[16, 16]}>
                        <Col xs={12} md={6}>
                            <Statistic title="Total Changes" value={statsData?.statistics.totalChanges || 0} loading={statsLoading} />
                        </Col>
                        <Col xs={12} md={6}>
                            <Statistic title="Increases" value={statsData?.statistics.totalIncreases || 0} loading={statsLoading} />
                        </Col>
                        <Col xs={12} md={6}>
                            <Statistic title="Decreases" value={statsData?.statistics.totalDecreases || 0} loading={statsLoading} />
                        </Col>
                        <Col xs={12} md={6}>
                            <Statistic title="Avg Change %" value={statsData?.statistics.averageChangeAmount || 0} precision={2} loading={statsLoading} />
                        </Col>
                    </Row>
                </div>

            </Card>
        </Space>
    );
}

export default CommissionHistory;