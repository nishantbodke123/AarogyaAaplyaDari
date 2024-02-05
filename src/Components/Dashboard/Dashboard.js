import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import {
  Button,
  Card,
  Col,
  Divider,
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
  CardCount,
  CardHeader,
  ColorStrip,
  Column,
  Container,
  CountIcon,
  DesktopContainer,
  FormContainer,
  FormHeader,
  FormItem,
  InnerCard,
  InnerCard1,
  InnerCard2,
  InnerCard3,
  InnerCard4,
  MobileCardColumn,
  MobileContainer,
  ModalFormItem,
  OuterCard,
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
import { LogOut } from "../../Auth/Logout";

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
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        } else {
          message.error(error.message);
        }
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
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        } else {
          message.error(error.message);
        }
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
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        } else {
          message.error(error.message);
        }
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
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        } else {
          message.error(error.message);
        }
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
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            window.location.replace("/");
          }, 1000);
        } else {
          message.error(error.message);
        }
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
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            LogOut();
          }, 1000);
        } else {
          message.error(error.message);
        }
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
        console.log(error.response.status);
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            LogOut();
          }, 1000);
        } else {
          // message.error(error.message);
        }
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
        if (error.response.status == 401) {
          message.warning("system is logged out");
          setTimeout(() => {
            LogOut();
          }, 1000);
        } else {
          message.error(error.message);
        }
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
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <Spin tip="Loading" spinning={loading}>
        <Header />
        <MobileContainer>
          <SubContainer>
            <Row>
              <MobileCardColumn>
                <Box onClick={() => handleShowToDayCitizenCountModal()}>
                  <ColorStrip />
                  <BoxContainer>
                    <Row>
                      <Col>
                        <CountIcon icon={faBars} />
                      </Col>
                      <Col>
                        <CardHeader>Today's CBAC count</CardHeader>
                      </Col>
                    </Row>
                    <CardCount>{dashboardCounts.todays_count}</CardCount>
                  </BoxContainer>
                </Box>
              </MobileCardColumn>
              <MobileCardColumn>
                <Box onClick={() => handleShowTodayFamilyCountModal()}>
                  <ColorStrip />
                  <BoxContainer>
                    <Row>
                      <Col>
                        <CountIcon icon={faBars} />
                      </Col>
                      <Col>
                        <CardHeader>No of citizen Enrolled </CardHeader>
                      </Col>
                    </Row>
                    <CardCount>{dashboardCounts.today_family_count}</CardCount>
                  </BoxContainer>
                </Box>
              </MobileCardColumn>
              <MobileCardColumn>
                <Box onClick={() => handleShowTotalCountModal()}>
                  <ColorStrip />
                  <BoxContainer>
                    <Row>
                      <Col>
                        <CountIcon icon={faBars} />
                      </Col>
                      <Col>
                        <CardHeader>Today's family Recorded</CardHeader>
                      </Col>
                    </Row>
                    <CardCount>{dashboardCounts.total_count}</CardCount>
                  </BoxContainer>
                </Box>
              </MobileCardColumn>
              <MobileCardColumn>
                <Box onClick={() => handleShowTotalFamilyCountModal()}>
                  <ColorStrip />
                  <BoxContainer>
                    <Row>
                      <Col>
                        <CountIcon icon={faBars} />
                      </Col>
                      <Col>
                        <CardHeader>No of family Enrolled</CardHeader>
                      </Col>
                    </Row>
                    <CardCount>{dashboardCounts.total_family_count}</CardCount>
                  </BoxContainer>
                </Box>
              </MobileCardColumn>
              <MobileCardColumn>
                <Box onClick={() => handleShowPartialCountModal()}>
                  <ColorStrip />
                  <BoxContainer>
                    <Row>
                      <Col>
                        <CountIcon icon={faBars} />
                      </Col>
                      <Col>
                        <CardHeader>Partial Survey </CardHeader>
                      </Col>
                    </Row>
                    <CardCount>
                      {dashboardCounts.partial_survey_count}
                    </CardCount>
                  </BoxContainer>
                </Box>
              </MobileCardColumn>
              <MobileCardColumn>
                <Box>
                  <ColorStrip />
                  <BoxContainer>
                    <Row>
                      <Col>
                        <CountIcon icon={faBars} />
                      </Col>
                      <Col>
                        <CardHeader>Number of CBAC Filled </CardHeader>
                      </Col>
                    </Row>
                    <CardCount>{dashboardCounts.total_cbac_count}</CardCount>
                  </BoxContainer>
                </Box>
              </MobileCardColumn>
              <MobileCardColumn>
                <Box>
                  <ColorStrip />
                  <BoxContainer>
                    <Row>
                      <Col></Col>
                      <Col>
                        <CardHeader>Citizens more than of 30 years </CardHeader>
                      </Col>
                    </Row>
                    <CardCount>{dashboardCounts.citizen_above_30}</CardCount>
                  </BoxContainer>
                </Box>
              </MobileCardColumn>
              <MobileCardColumn>
                <Box>
                  <ColorStrip />
                  <BoxContainer>
                    <Row>
                      <Col></Col>
                      <Col>
                        <CardHeader>Citizens more than of 60 years </CardHeader>
                      </Col>
                    </Row>
                    <CardCount>{dashboardCounts.citizen_above_60}</CardCount>
                  </BoxContainer>
                </Box>
              </MobileCardColumn>
            </Row>
          </SubContainer>
        </MobileContainer>

        <DesktopContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "#F5F5F5",
            }}
          >
            <Card
              style={{
                // margin: "2%",
                // border: "1px solid grey",
                border: "none",
                background: "transparent",
                width: "45%",
              }}
            >
              <Row>
                <div
                  style={{
                    margin: "0.8% -5% -1.5% 2%",
                    fontSize: "19px",
                    fontWeight: "600",

                    width: "100%",
                    // backgroundColor: "#C7DCA7",
                  }}
                >
                  <p style={{ margin: "0% 1% 1% 0%" }}>CITIZEN'S DETAILS</p>
                </div>
              </Row>
              <Row>
                <div
                  style={{
                    width: "30%",
                    height: "12vh",
                    margin: "2% 1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Family Enrolled"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "1px", textAlign: "left" }}>
                      <CardCount>
                        {dashboardCounts.total_family_count}
                      </CardCount>
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "30%",
                    height: "12vh",
                    margin: "2% 1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Citizen Enrolled"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "1px", textAlign: "left" }}>
                      <CardCount>
                        {dashboardCounts.today_family_count}
                      </CardCount>
                    </div>
                  </Row>
                </div>
                <div
                  style={{
                    width: "30%",
                    height: "12vh",
                    margin: "2% 1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Citizen Enrolled"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "1px", textAlign: "left" }}>
                      <CardCount>
                        {dashboardCounts.today_family_count}
                      </CardCount>
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "30%",
                    height: "12vh",
                    margin: "2% 1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="More than 60 years"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "1px", textAlign: "left" }}>
                      <CardCount>{dashboardCounts.citizen_above_60}</CardCount>
                    </div>
                  </Row>
                </div>
                {/* </SubContainer>
                <SubContainer> */}
                {/* vulnerable citizen and CBAC Filled */}

                {/* ------------------------ */}

                <div
                  style={{
                    width: "30%",
                    height: "12vh",
                    margin: "2% 1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="CBAC form filled"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>
                        {dashboardCounts.blood_collected_center}
                      </CardCount>
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "30%",
                    height: "12vh",
                    margin: "2% 1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="ABHA ID Generated"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>
                        {dashboardCounts.blood_collected_home}
                      </CardCount>
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "30%",
                    height: "12vh",
                    margin: "2% 1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="CBAC Count"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>{dashboardCounts.todays_count}</CardCount>
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "30%",
                    height: "12vh",
                    margin: "2% 1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Family Recorded"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>{dashboardCounts.total_count}</CardCount>
                    </div>
                  </Row>
                </div>

                {/* </SubContainer> */}
                {/* </Col> */}
              </Row>
            </Card>

            <Card
              style={{
                // margin: "2%",
                // border: "1px solid grey",
                border: "none",
                background: "transparent",
                width: "60%",
              }}
            >
              <Row>
                <div
                  style={{
                    // margin: "2% -5% -1% 2%",
                    fontSize: "19px",
                    fontWeight: "600",
                    // backgroundColor: "#C7DCA7",
                    width: "100%",
                  }}
                >
                  <p style={{ margin: "0.6% 0% 0.3% 1%" }}>DISEASE SUSPECTED</p>
                </div>
              </Row>

              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "24%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Diabetes"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>{dashboardCounts.diabetes}</CardCount>
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "24%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Hypertension"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>{dashboardCounts.hypertension}</CardCount>
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "24%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Oral Cancer"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>{dashboardCounts.oral_Cancer}</CardCount>
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "24%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Cervical Cancer"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>{dashboardCounts.cervical_cancer}</CardCount>
                    </div>
                  </Row>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "24%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  {" "}
                  <Row flex="auto">
                    <Card.Meta
                      title="Breast Cancer"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>{dashboardCounts.breast_cancer}</CardCount>
                    </div>
                  </Row>
                </div>
                <div
                  style={{
                    width: "24%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="COPD"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>{dashboardCounts.copd}</CardCount>
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "24%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Asthama"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>{dashboardCounts.asthama}</CardCount>
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "24%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="TB"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>{dashboardCounts.tb}</CardCount>
                    </div>
                  </Row>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "24%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Alzheimer/Dementia"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      {/* <CardCount>{dashboardCounts.tb}</CardCount> */}
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "24%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="ENT Disorder"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>{dashboardCounts.ent_disorder}</CardCount>
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "24%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Eye Disorder"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>{dashboardCounts.eye_disorder}</CardCount>
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "24%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Communicable"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>{dashboardCounts.communicable}</CardCount>
                    </div>
                  </Row>
                </div>
              </div>
            </Card>
          </div>

          <div
            style={{
              display: "flex",
              height: "500px",
              backgroundColor: "#F5F5F5",
            }}
          >
            <Card
              style={{
                // margin: "2%",
                background: "transparent",
                // border: "1px solid grey",
                border: "none",
                width: "40%",
              }}
            >
              <div>
                <p
                  style={{
                    margin: "3% 0% 0% 3%",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  BLOOD COLLECTION
                </p>
              </div>

              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "50%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Blood Collected At Home"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      {/* Uncomment the following line if you are using Card.Meta for title */}
                      {/* <Card.Meta title={dashboardCounts.blood_collected_home} /> */}
                      <CardCount>
                        {dashboardCounts.blood_collected_home}
                      </CardCount>
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "50%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Blood Collected At Center"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      {/* Uncomment the following line if you are using Card.Meta for title */}
                      {/* <Card.Meta title={dashboardCounts.blood_collected_home} /> */}
                      <CardCount>
                        {dashboardCounts.blood_collected_center}
                      </CardCount>
                    </div>
                  </Row>
                </div>
              </div>

              <div>
                <p
                  style={{
                    margin: "3% 0% 0% 3%",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  DENIED BY
                </p>
              </div>

              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "50%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="AMO's"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      {/* Uncomment the following line if you are using Card.Meta for title */}
                      {/* <Card.Meta title={dashboardCounts.blood_collected_home} /> */}
                      <CardCount>
                        {dashboardCounts.denieded_by_mo_count}
                      </CardCount>
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "50%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Citizen"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      <CardCount>
                        {dashboardCounts.denieded_by_mo_individual}
                      </CardCount>
                    </div>
                  </Row>
                </div>
              </div>

              <div>
                <p
                  style={{
                    margin: "3% 0% 0% 3%",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  BLOOD TEST
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "50%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Tests Assigned"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      {/* Uncomment the following line if you are using Card.Meta for title */}
                      {/* <Card.Meta title={dashboardCounts.blood_collected_home} /> */}
                      <CardCount>{dashboardCounts.TestsAssigned}</CardCount>
                    </div>
                  </Row>
                </div>

                <div
                  style={{
                    width: "50%",
                    height: "12vh",
                    margin: "1%",
                    padding: 0,
                    background: "white",
                    borderRadius: "8px",
                  }}
                >
                  <Row flex="auto">
                    <Card.Meta
                      title="Tests Done"
                      style={{ marginTop: "5px", marginLeft: "5px" }}
                    />
                  </Row>
                  <Row>
                    <div style={{ marginTop: "5px", textAlign: "left" }}>
                      {/* Uncomment the following line if you are using Card.Meta for title */}
                      {/* <Card.Meta title={dashboardCounts.blood_collected_home} /> */}
                      <CardCount>
                        {dashboardCounts.TestReportGenerated}
                      </CardCount>
                    </div>
                  </Row>
                </div>
              </div>
            </Card>

            <Card
              style={{
                // margin: "2%",
                // border: "1px solid grey",
                border: "none",
                background: "transparent",
                width: "60%",
              }}
            >
              <Row>
                <div
                  style={{
                    fontSize: "19px",
                    fontWeight: "600",
                    // backgroundColor: "#C7DCA7",
                    width: "100%",
                  }}
                >
                  <p style={{ margin: "0.6% 0% 0.3% 1%" }}>REFERRALS</p>
                </div>
              </Row>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Card
                  style={{
                    flex: "1",
                    height: "10vh",
                    fontWeight: "600",
                    margin: "1%",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Row align="middle">
                      <Col flex="auto">
                        <Card.Meta
                          title="Referrals to Mun. Dispensary / HBT for Blood Test/Confirmation / Treatment : "
                          style={{ whiteSpace: "break-spaces" }}
                        />
                      </Col>
                      <Col>
                        <CardCount>
                          {dashboardCounts.Referral_choice_further_management}
                        </CardCount>
                      </Col>
                    </Row>
                  </div>
                </Card>

                <Card
                  style={{
                    flex: "1",
                    height: "10vh",
                    fontWeight: "600",
                    margin: "1%",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Row align="middle">
                      <Col flex="auto">
                        <Card.Meta
                          title="Referral to HBT polyclinic for physician consultation : "
                          style={{ whiteSpace: "break-spaces" }}
                        />
                      </Col>
                      <Col>
                        <CardCount>
                          {dashboardCounts.Referral_choice_suspect_symptoms}
                        </CardCount>
                      </Col>
                    </Row>
                  </div>
                </Card>

                <Card
                  style={{
                    flex: "1",
                    height: "10vh",
                    fontWeight: "600",
                    margin: "1%",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Row align="middle">
                      <Col flex="auto">
                        <Card.Meta
                          title="Referral to peripheral hospital / Special hospital for
                management of complication : "
                          style={{ whiteSpace: "break-spaces" }}
                        />
                      </Col>
                      <Col>
                        <CardCount>
                          {dashboardCounts.Referral_choice_diagnosis}
                        </CardCount>
                      </Col>
                    </Row>
                  </div>
                </Card>

                <Card
                  style={{
                    flex: "1",
                    height: "10vh",
                    // margin: "2% 1%",
                    fontWeight: "600",
                    margin: "1%",
                    // boxShadow: "0px 4px 14px -4px rgba(0,0,0,0.75)",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <Row align="middle">
                      <Col flex="auto">
                        <Card.Meta
                          title="Referral to Private facility : "
                          style={{ whiteSpace: "break-spaces" }}
                        />
                      </Col>
                      <Col>
                        <CardCount>
                          {
                            dashboardCounts.Referral_choice_co_morbid_investigation
                          }
                        </CardCount>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </div>
            </Card>
          </div>
        </DesktopContainer>

        {/* <TableContainer>
          <TableHeading>Family Heads Details </TableHeading>
          <StyledTabs defaultActiveKey="1" centered size="large">
            <TabPane tab="All Family Details" key="1">
              <Table
                columns={Items}
                dataSource={familyHeadList}
                bordered
                scroll={{ x: 500 }}
              ></Table>
            </TabPane>
            <TabPane tab="Partially Submitted Family Details" key="2">
              <Table
                columns={Items}
                dataSource={partiallyFamilyHeadList}
                scroll={{ x: 500 }}
              ></Table>
            </TabPane>
          </StyledTabs>
        </TableContainer> */}
        <ViewModal
          footer={<></>}
          width={1200}
          open={showViewModal}
          onCancel={handleHideViewModal}
        >
          <Table
            columns={FamilyMemberItems}
            dataSource={familyMemeberDetails}
            scroll={{ x: 800, y: 800 }}
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
            scroll={{ y: 300, x: 500 }}
          ></Table>
        </ToDayCitizenCountModal>
        <ToDayFamilyCountModal
          open={showTodayFamilyCountModal}
          onCancel={handleHideTodayFamilyCountModal}
          width={800}
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
          width={800}
          footer={<></>}
        >
          <h3>Total Family Count</h3>
          <Table
            columns={TotalFamilyCountList}
            dataSource={totalFamilyCountList}
            scroll={{ y: 400 }}
          ></Table>
        </TotalFamilyCount>
        <PartialSurveyCountModal
          open={showPartialCountModal}
          width={800}
          onCancel={handleHidePartialCountModal}
          footer={<></>}
        >
          <h3>Partial Survey</h3>
          <Table
            columns={PartialCountTitleList}
            dataSource={partialCountList}
          ></Table>
        </PartialSurveyCountModal>
      </Spin>
    </div>
  );
};

export default Dashboard;
