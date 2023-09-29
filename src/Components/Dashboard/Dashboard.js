import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Button, Card, Col, Row, Spin, Table, Tabs, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseURL";
import {
  Box,
  BoxContainer,
  Container,
  CountIcon,
  StyledTabs,
  SubContainer,
  TableContainer,
  TableHeading,
  ViewButton,
  ViewModal,
} from "./style";
import TabPane from "antd/es/tabs/TabPane";
import { useNavigate } from "react-router-dom";
import FamilyHead from "../Registration/FamilyHead";

const Dashboard = () => {
  const [dashboardCounts, setDashboardCounts] = useState({});
  const [familyHeadList, setFamilyHeadList] = useState([]);
  const [partiallyFamilyHeadList, setPartiallyFamilyHeadList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [familyMemeberDetails, setFamilyMemberDetails] = useState([]);
  const navigate = useNavigate();
  let axiosConfig = {
    headers: {
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };
  useEffect(() => {
    setLoading(true);

    console.log(axiosConfig);
    axios
      .get(`${BASE_URL}/healthworker/api/GetSurveyorDashboard`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setDashboardCounts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message);
        setLoading(false);
      });
    axios
      .get(`${BASE_URL}/healthworker/api/GetFamilyHeadList`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setFamilyHeadList(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    axios
      .get(
        `${BASE_URL}/healthworker/api/GetPartiallyInsertedRecord`,
        axiosConfig
      )
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setPartiallyFamilyHeadList(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleViewModal = (id) => {
    console.log(id);
    const formData = new FormData();
    formData.append("search", id);
    let axiosConfig = {
      headers: {
        Authorization: `Token ${sessionStorage.getItem("Token")}`,
      },
      params: {
        search: id,
      },
    };

    axios
      .get(`${BASE_URL}/healthworker/api/GetFamilyMembersDetails`, axiosConfig)
      .then((response) => {
        console.log(response);
        setFamilyMemberDetails(response.data);
        message.success(response.status)
        setShowViewModal(true);
      })
      .catch((error) => {
        console.log(error);
        message.warning(error.status)
      });
  };
  const handleHideViewModal = () => {
    setShowViewModal(false);
  };
  // familyHeadList
  const Items = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Family ID",
      dataIndex: "familyId",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNo",
    },
    {
      title:"Address",
      dataIndex:"address"
    },
    {
      title: "Total Family Members",
      dataIndex: "totalFamilyMembers",
    },
    {
      title: "Action",
      render: (data) => {
        return (
          <>
            <ViewButton
              onClick={() => {
                handleViewModal(data.familyId);
              }}
            >
              View
            </ViewButton>
          </>
        );
      },
    },
  ];

  const handleFamilyMembersView=(data)=>{
     console.log(data);
  }
  const FamilyMemberItems = [
    {
      title: "ID",
      dataIndex: "id",
    },
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
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNo",
    },
    {
      title: "Aadhar No",
      dataIndex: "aadharCard",
    },
    {
      title: "Abha ID",
      dataIndex: "abhaId",
    },
    {
      title:"Action",
      render:(data)=>{
        return(<ViewButton onClick={()=>handleFamilyMembersView(data)}>View</ViewButton>)
      }
    }
  ];
  return (
    <>
      <Spin tip="Loading" spinning={loading}>
        <Header />
        <Container>
          <SubContainer>
            <Box>
              <BoxContainer>
                <Row>
                  <Col>
                    <CountIcon icon={faBars} />
                  </Col>
                  <Col>
                    <h3>Today's Citizen Count</h3>
                  </Col>
                </Row>
                {dashboardCounts.todays_count}
              </BoxContainer>
            </Box>
            <Box>
              <BoxContainer>
                <Row>
                  <Col>
                    <CountIcon icon={faBars} />
                  </Col>
                  <Col>
                    <h3>Today's Family Count </h3>
                  </Col>
                </Row>
                {dashboardCounts.today_family_count}
              </BoxContainer>
            </Box>
            <Box>
              <BoxContainer>
                <Row>
                  <Col>
                    <CountIcon icon={faBars} />
                  </Col>
                  <Col>
                    <h3>Total Count</h3>
                  </Col>
                </Row>
                {dashboardCounts.total_count}
              </BoxContainer>
            </Box>

            <Box>
              <BoxContainer>
                <Row>
                  <Col>
                    <CountIcon icon={faBars} />
                  </Col>
                  <Col>
                    <h3>Total Family Count</h3>
                  </Col>
                </Row>
                {dashboardCounts.total_family_count}
              </BoxContainer>
            </Box>
            <Box>
              <BoxContainer>
                <Row>
                  <Col>
                    <CountIcon icon={faBars} />
                  </Col>
                  <Col>
                    <h3>Partial Survey </h3>
                  </Col>
                </Row>
                {dashboardCounts.partial_survey_count}
              </BoxContainer>
            </Box>
          </SubContainer>
        </Container>
        <TableContainer>
          <TableHeading>Family Heads Details </TableHeading>
          <StyledTabs defaultActiveKey="1" centered size="large">
            <TabPane tab="All Family Details" key="1">
              <Table
                columns={Items}
                dataSource={familyHeadList}
                bordered
              ></Table>
            </TabPane>
            <TabPane tab="Partially Submitted Family Details" key="2">
              <Table
                columns={Items}
                dataSource={partiallyFamilyHeadList}
              ></Table>
            </TabPane>
          </StyledTabs>
        </TableContainer>
        <ViewModal footer={<><Button>Submit</Button></>} width={1200} open={showViewModal} onCancel={handleHideViewModal}>
          <Table
            columns={FamilyMemberItems}
            dataSource={familyMemeberDetails}
          ></Table>
        </ViewModal>
      </Spin>
    </>
  );
};

export default Dashboard;
