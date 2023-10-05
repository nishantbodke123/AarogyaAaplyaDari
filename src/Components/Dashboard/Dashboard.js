import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Spin,
  Table,
  Tabs,
  message,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { BASE_URL } from "../../Utils/BaseURL";
import {
  AddButton,
  Box,
  BoxContainer,
  ColorStrip,
  Column,
  Container,
  CountIcon,
  FormContainer,
  FormHeader,
  FormItem,
  ModalFormItem,
  PartialSurveyCountModal,
  StyledTabs,
  SubContainer,
  TableContainer,
  TableHeading,
  ToDayCitizenCountModal,
  ToDayFamilyCountModal,
  TotalCountModal,
  TotalFamilyCount,
  UpdateButton,
  UpdateModal,
  ViewButton,
  ViewModal,
} from "./style";
import TabPane from "antd/es/tabs/TabPane";
import { useNavigate } from "react-router-dom";
import FamilyHead from "../Registration/FamilyHead";
import TextArea from "antd/es/input/TextArea";

const Dashboard = () => {
  const [dashboardCounts, setDashboardCounts] = useState({});
  const [familyHeadList, setFamilyHeadList] = useState([]);
  const [partiallyFamilyHeadList, setPartiallyFamilyHeadList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [familyMemeberDetails, setFamilyMemberDetails] = useState([]);
  const [familyID, setFamilyID] = useState();
  const [noOfFamilyMembers, setNoOfFamilyMembers] = useState();
  const [familyMemberArrayLength, setFamilyMemberArrayLength] = useState();
  const [showToDayCitizenCountModal, setShowToDayCitizenCountModal] =
    useState(false);
  const [TodayCitizenCountList, setTodayCitizenCountList] = useState();
  const [showTodayFamilyCountModal, setShowTodayFamilyCountModal] =
    useState(false);
  const [TodayFamilyCountList, setTodayFamilyCountList] = useState();
  const [showTotalCountModal, setShowTotalCountModal] = useState(false);
  const [totolCountList, setTotalCountList] = useState();
  const [showTotalFamilyCountModal, setShowTotalFamilyCountModal] =
    useState(false);
  const [totalFamilyCountList, setTotalFamilyCountList] = useState();
  const [showPartialCountModal, setShowPartialCountModal] = useState(false);
  const [partialCountList, setPartialCountList] = useState();
  const navigate = useNavigate();

  let axiosConfig = {
    headers: {
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };

  const handleShowToDayCitizenCountModal = () => {
    axios
      .get(`${BASE_URL}/healthworker/api/GetCitizenList/Today`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setTodayCitizenCountList(response.data);
        setShowToDayCitizenCountModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleHideToDayCitizenCountModal = () => {
    setShowToDayCitizenCountModal(false);
  };
  const handleShowTodayFamilyCountModal = () => {
    axios
      .get(`${BASE_URL}/healthworker/api/GetFamilyList/Today`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setTodayFamilyCountList(response.data);
        setShowTodayFamilyCountModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleHideTodayFamilyCountModal = () => {
    setShowTodayFamilyCountModal(false);
  };

  const handleShowTotalCountModal = () => {
    axios
      .get(`${BASE_URL}/healthworker/api/GetCitizenList/All`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setTotalCountList(response.data);
        setShowTotalCountModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleHideTotalCountModal = () => {
    setShowTotalCountModal(false);
  };
  const handleShowTotalFamilyCountModal = () => {
    axios
      .get(`${BASE_URL}/healthworker/api/GetFamilyList/All`, axiosConfig)
      .then((response) => {
        console.log(response.data);
        setTotalFamilyCountList(response.data);
        setShowTotalFamilyCountModal(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleHideTotalFamilyCountModal = () => {
    setShowTotalFamilyCountModal(false);
  };

  const handleShowPartialCountModal = () => {
    setLoading(true);
    axios
      .get(
        `${BASE_URL}/healthworker/api/GetPartiallyInsertedRecord`,
        axiosConfig
      )
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setPartialCountList(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
    setShowPartialCountModal(true);
  };
  const handleHidePartialCountModal = () => {
    setShowPartialCountModal(false);
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
        console.log(response.data.length);
        setFamilyMemberArrayLength(response.data.length);
        setFamilyMemberDetails(response.data);
        setShowViewModal(true);
      })
      .catch((error) => {
        console.log(error);
        message.warning(error.status);
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
      title: "Address",
      dataIndex: "address",
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
                setFamilyID(data.id);
                setNoOfFamilyMembers(data.totalFamilyMembers);
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

  const handleFamilyMembersView = (data) => {
    console.log(data);
    navigate("/update", { state: data });
  };

  const handleNewFamilyMemberAdd = () => {
    console.log(familyID, noOfFamilyMembers);
    navigate("/addMember", { state: familyID });
  };
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
      title: "Action",
      render: (data) => {
        return (
          <ViewButton onClick={() => handleFamilyMembersView(data)}>
            View
          </ViewButton>
        );
      },
    },
  ];

  const TodayCitizenCountTitleList = [
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
  ];
  const TodayFamilyCountTitleList = [
    {
      title: "Family ID",
      dataIndex: "familyId",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const TotalCountTitleList = [
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
  ];
  const TotalFamilyCountList = [
    {
      title: "Family ID",
      dataIndex: "familyId",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const PartialCountTitleList = [
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
      title: "Mobile No",
      dataIndex: "mobileNo",
    },
  ];
  return (
    <>
      <Spin tip="Loading" spinning={loading}>
        <Header />
        <Container>
          <SubContainer>
            <Box onClick={() => handleShowToDayCitizenCountModal()}>
              <ColorStrip />
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
            <Box onClick={() => handleShowTodayFamilyCountModal()}>
              <div style={{ backgroundColor: "#ff8551", height: "20%" }}></div>
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
            <Box onClick={() => handleShowTotalCountModal()}>
              <div style={{ backgroundColor: "#ff8551", height: "20%" }}></div>
              <BoxContainer>
                <Row>
                  <Col>
                    <CountIcon icon={faBars} />
                  </Col>
                  <Col>
                    <h3>Total Citizen Count</h3>
                  </Col>
                </Row>
                {dashboardCounts.total_count}
              </BoxContainer>
            </Box>

            <Box onClick={() => handleShowTotalFamilyCountModal()}>
              <div style={{ backgroundColor: "#ff8551", height: "20%" }}></div>
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
            <Box onClick={() => handleShowPartialCountModal()}>
              <div style={{ backgroundColor: "#ff8551", height: "20%" }}></div>
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
        <ViewModal
          footer={<></>}
          width={1200}
          open={showViewModal}
          onCancel={handleHideViewModal}
        >
          <Table
            columns={FamilyMemberItems}
            dataSource={familyMemeberDetails}
          ></Table>
          {familyMemberArrayLength == noOfFamilyMembers ? (
            <></>
          ) : (
            <>
              {" "}
              <AddButton
                onClick={() => {
                  handleNewFamilyMemberAdd();
                }}
              >
                Add Member
              </AddButton>
            </>
          )}
        </ViewModal>
        <ToDayCitizenCountModal
          open={showToDayCitizenCountModal}
          onCancel={handleHideToDayCitizenCountModal}
          width={800}
          footer={<></>}
        >
          <h3>Today's Citizen Count</h3>
          <Table
            columns={TodayCitizenCountTitleList}
            dataSource={TodayCitizenCountList}
            bordered
            scroll={{ y: 300 }}
          ></Table>
        </ToDayCitizenCountModal>
        <ToDayFamilyCountModal
          open={showTodayFamilyCountModal}
          onCancel={handleHideTodayFamilyCountModal}
          footer={<></>}
        >
          <h3>Today's Family Count</h3>
          <Table
            columns={TodayFamilyCountTitleList}
            dataSource={TodayFamilyCountList}
            bordered
            scroll={{ y: 300 }}
          ></Table>
        </ToDayFamilyCountModal>
        <TotalCountModal
          open={showTotalCountModal}
          width={800}
          onCancel={handleHideTotalCountModal}
          footer={<></>}
        >
          <h3>Total Count</h3>
          <Table
            columns={TotalCountTitleList}
            dataSource={totolCountList}
            scroll={{ y: 300 }}
          ></Table>
        </TotalCountModal>
        <TotalFamilyCount
          open={showTotalFamilyCountModal}
          onCancel={handleHideTotalFamilyCountModal}
          footer={<></>}
        >
          <h3>Total Family Count</h3>
          <Table
            columns={TotalFamilyCountList}
            dataSource={totalFamilyCountList}
            scroll={{ y: 300 }}
          ></Table>
        </TotalFamilyCount>
        <PartialSurveyCountModal
          open={showPartialCountModal}
          onCancel={handleHidePartialCountModal}
          footer={<></>}
        >
          <Table
            columns={PartialCountTitleList}
            dataSource={partialCountList}
          ></Table>
        </PartialSurveyCountModal>
      </Spin>
    </>
  );
};

export default Dashboard;
