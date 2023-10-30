import React, { useState } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Menu,
  Modal,
  Row,
  Table,
  theme,
} from "antd";
import { SearchBoxDiv, SearchButton, SearchInput, ViewButton } from "./style";
import SideBar from "./SideBar";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseURL";
import { GetPhleboFamilyMembersDetailsInstance } from "../../Utils/APIs";
import { COMMON_ROUTES } from "../../Utils/Routes";
const { Header, Content, Footer, Sider } = Layout;

const CitizenDetails = () => {
  const [citizenDetailsSearch, setCitizenDetailsSearch] = useState();
  const [citizenDetailsData, setCitizenDetailsData] = useState([]);
  const [showCBACModal, setShowCBACModal] = useState(false);

  const handleCitizenSearch = () => {
    console.log("Citizen Searched");
    const axiosConfig = {
      headers: {
        Authorization: `Token ${sessionStorage.getItem("Token")} `,
      },
      params: {
        search: citizenDetailsSearch,
      },
    };
    axios
      .get(`${BASE_URL}/phlebo/api/GetCitizenBasicDetailsAPI`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setCitizenDetailsData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
    <Layout>
      <SideBar />
      <Layout>
        <Header
          style={{
            padding: 0,
            margin: "20px 20px ",
            height: "100px",
            background: "#E5E5E5",
          }}
        >
          <SearchBoxDiv>
            <Form layout="vertical">
              <Form.Item label="Citizen ID">
                <SearchInput
                  type="text"
                  onChange={(e) => setCitizenDetailsSearch(e.target.value)}
                ></SearchInput>
                <SearchButton
                  htmlType="Submit"
                  onClick={() => handleCitizenSearch()}
                >
                  Search
                </SearchButton>
              </Form.Item>
            </Form>
          </SearchBoxDiv>
        </Header>
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
              dataSource={citizenDetailsData}
              scroll={{ y: 210 }}
            ></Table>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default CitizenDetails;
