import { Layout, Table } from "antd";
import React from "react";
const { Header, Content, Footer, Sider } = Layout;
const PhleboContent = (props) => {
  console.log(props.citizendetailsData);
  const columns = [
    {
      title: "Member ID",
      dataIndex: "memberId",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNo",
    },
    {
      title: "Aadhar Card No",
      dataIndex: "aadharCard",
    },
    {
      title: "Aabha ID",
      dataIndex: "abhaId",
    },
    {
      title: "Lab Test Status",
      dataIndex: "isLabTestAdded",
      render: (data) => {
        return data ? "Yes" : "No";
      },
    },
    {
      title: "Blood Sample Collected",
      dataIndex: "isSampleCollected",
      render: (data) => {
        return data ? "Yes" : "No";
      },
    },
    {
      title: "Lab Test Report Generated",
      dataIndex: "isLabTestReportGenerated",
      render: (data) => {
        return data ? "Yes" : "No";
      },
    },
  ];
  return (
    <>
      <Content
        style={{
          margin: "24px 16px 0",
        }}
      >
        <div
          style={{
            padding: "50px 20px",
            minHeight: 455,
            background: "#E5E5E5",
          }}
        >
          <Table
            columns={columns}
            dataSource={props.citizendetailsData}
            scroll={{ y: 210 }}
          ></Table>
        </div>
      </Content>
    </>
  );
};
export default PhleboContent;
