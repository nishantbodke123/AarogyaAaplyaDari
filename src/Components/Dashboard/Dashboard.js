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
    <>
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
              margin: "2% 2% 2% 2%",
              boxShadow: "  0px 4px 14px -4px rgba(0,0,0,0.75)",
              borderRadius: "10px",
            }}
          >
            <Row>
              <div
                style={{
                  margin: "0.8% -5% -1.5% 4%",
                  fontSize: "19px",
                  fontWeight: "600",

                  width: "90%",
                  // backgroundColor: "#C7DCA7",
                }}
              >
                <p style={{ margin: "0% 1% 0% 0%" }}>CITIZEN'S DETAILS</p>
              </div>
            </Row>
            <Row>
              <Col span={24}>
                <SubContainer>
                  <Box>
                    <ColorStrip />
                    <BoxContainer>
                      <Row>
                        <Col>
                          <CountIcon icon={faBars} />
                        </Col>
                        <Col>
                          <CardHeader>Today's CBAC Count</CardHeader>
                        </Col>
                      </Row>
                      <CardCount>{dashboardCounts.todays_count}</CardCount>
                    </BoxContainer>
                  </Box>
                  <Box>
                    <ColorStrip />
                    <BoxContainer>
                      <Row>
                        <Col>
                          <CountIcon icon={faBars} />
                        </Col>
                        <Col>
                          <CardHeader>No of Citizen Enrolled</CardHeader>
                        </Col>
                      </Row>
                      <CardCount>
                        {dashboardCounts.today_family_count}
                      </CardCount>
                    </BoxContainer>
                  </Box>
                  <Box>
                    <ColorStrip />
                    <BoxContainer>
                      <Row>
                        <Col>
                          <CountIcon icon={faBars} />
                        </Col>
                        <Col>
                          <CardHeader>Today's Family Recorded</CardHeader>
                        </Col>
                      </Row>
                      <CardCount>{dashboardCounts.total_count}</CardCount>
                    </BoxContainer>
                  </Box>
                  <Box>
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
                      <CardCount>
                        {dashboardCounts.total_family_count}
                      </CardCount>
                    </BoxContainer>
                  </Box>
                </SubContainer>
                <SubContainer>
                  <Box>
                    <ColorStrip />
                    <BoxContainer>
                      <Row>
                        <Col>
                          <CountIcon icon={faBars} />
                        </Col>
                        <Col>
                          <CardHeader>
                            Citizens more than of 30 years{" "}
                          </CardHeader>
                        </Col>
                      </Row>
                      <CardCount>{dashboardCounts.citizen_above_30}</CardCount>
                    </BoxContainer>
                  </Box>
                  <Box>
                    <ColorStrip />
                    <BoxContainer>
                      <Row>
                        <Col>
                          <CountIcon icon={faBars} />
                        </Col>
                        <Col>
                          <CardHeader>
                            Citizens more than of 60 years{" "}
                          </CardHeader>
                        </Col>
                      </Row>
                      <CardCount>{dashboardCounts.citizen_above_60}</CardCount>
                    </BoxContainer>
                  </Box>
                  <Box>
                    <ColorStrip />
                    <BoxContainer>
                      <Row>
                        <Col>
                          <CountIcon icon={faBars} />
                        </Col>
                        <Col>
                          <CardHeader>No of ABHA ID Generated </CardHeader>
                        </Col>
                      </Row>
                      <CardCount>
                        {dashboardCounts.blood_collected_home}
                      </CardCount>
                    </BoxContainer>
                  </Box>
                  <Box>
                    <ColorStrip />
                    <BoxContainer>
                      <Row>
                        <Col>
                          <CountIcon icon={faBars} />
                        </Col>
                        <Col>
                          <CardHeader>No of CBAC form filled</CardHeader>
                        </Col>
                      </Row>
                      <CardCount>
                        {dashboardCounts.blood_collected_center}
                      </CardCount>
                    </BoxContainer>
                  </Box>

                  {/* <Box>
                  <ColorStrip />
                  <BoxContainer>
                    <Row>
                      <Col>
                        <CountIcon icon={faBars} />
                      </Col>
                      <Col>
                        <CardHeader>Denied</CardHeader>
                      </Col>
                    </Row>
                    <CardCount>{dashboardCounts.total_count}</CardCount>
                  </BoxContainer>
                </Box> */}
                </SubContainer>
              </Col>

              {/* <Col span={9}>
              <OuterCard>
                <InnerCard1>
                  <Row>
                    <Col>
                      <CountIcon icon={faBars} />
                    </Col>
                    <Col>
                      <CardHeader>Citizens more than of 30 years </CardHeader>
                    </Col>
                  </Row>
                  <CardCount>{dashboardCounts.citizen_above_30}</CardCount>
                </InnerCard1>
                <InnerCard2>
                  {" "}
                  <Row>
                    <Col>
                      <CountIcon icon={faBars} />
                    </Col>
                    <Col>
                      <CardHeader>Citizens more than of 60 years </CardHeader>
                    </Col>
                  </Row>
                  <CardCount>{dashboardCounts.citizen_above_60}</CardCount>
                </InnerCard2>
                <InnerCard3>
                  {" "}
                  <Row>
                    <Col>
                      <CountIcon icon={faBars} />
                    </Col>
                    <Col>
                      <CardHeader>Blood Collected At Home </CardHeader>
                    </Col>
                  </Row>
                  <CardCount>{dashboardCounts.blood_collected_home}</CardCount>
                </InnerCard3>
                <InnerCard4>
                  {" "}
                  <Row>
                    <Col>
                      <CountIcon icon={faBars} />
                    </Col>
                    <Col>
                      <CardHeader>Blood Collected At Center </CardHeader>
                    </Col>
                  </Row>
                  <CardCount>{dashboardCounts.blood_collected_center}</CardCount>
                </InnerCard4>
              </OuterCard>
            </Col> */}
            </Row>
          </div>
          <div style={{ display: "flex" }}>
            <div
              style={{
                margin: "0% 0% 0% 2%",
                width: "50%",
                height: "47vh",
                boxShadow: "  0px 4px 14px -4px rgba(0,0,0,0.75)",
                borderRadius: "15px",
              }}
            >
              <Row>
                <div
                  style={{
                    margin: "2% -5% -1% 5%",
                    fontSize: "19px",
                    fontWeight: "600",
                    // backgroundColor: "#C7DCA7",
                    width: "90%",
                  }}
                >
                  <p style={{ margin: "0.6% 0% 0.3% 1%" }}>ALL DISEASES</p>
                </div>
              </Row>

              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "22%",
                    height: "10vh",
                    margin: "2% 5%",
                    boxShadow: "  0px 4px 14px -4px rgba(0,0,0,0.75)",
                  }}
                >
                  {" "}
                  <Row>
                    <p style={{ margin: "5% 0% 10% 5%" }}>Diabetes</p>
                  </Row>
                  <CardCount>
                    {dashboardCounts.blood_collected_center}
                  </CardCount>
                </div>
                <div
                  style={{
                    width: "22%",
                    height: "10vh",
                    margin: "2% 5%",
                    boxShadow: "  0px 4px 14px -4px rgba(0,0,0,0.75)",
                  }}
                >
                  {" "}
                  <Row>
                    <p style={{ margin: "5% 0% 10% 5%" }}>Hypertension</p>
                  </Row>
                  <CardCount>
                    {dashboardCounts.blood_collected_center}
                  </CardCount>
                </div>
                <div
                  style={{
                    width: "22%",
                    height: "10vh",
                    margin: "2% 5%",
                    boxShadow: "  0px 4px 14px -4px rgba(0,0,0,0.75)",
                  }}
                >
                  {" "}
                  <Row>
                    <p style={{ margin: "5% 0% 10% 5%" }}>Oral Cancer</p>
                  </Row>
                  <CardCount>
                    {dashboardCounts.blood_collected_center}
                  </CardCount>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "22%",
                    height: "10vh",
                    margin: "1% 5%",
                    boxShadow: "  0px 4px 14px -4px rgba(0,0,0,0.75)",
                  }}
                >
                  {" "}
                  <Row>
                    <p style={{ margin: "5% 0% 10% 5%" }}>Cervical Cancer</p>
                  </Row>
                  <CardCount>
                    {dashboardCounts.blood_collected_center}
                  </CardCount>
                </div>
                <div
                  style={{
                    width: "22%",
                    height: "10vh",
                    margin: "1% 5%",
                    boxShadow: "  0px 4px 14px -4px rgba(0,0,0,0.75)",
                  }}
                >
                  {" "}
                  <Row>
                    <p style={{ margin: "5% 0% 10% 5%" }}>Breast Cancer</p>
                  </Row>
                  <CardCount>
                    {dashboardCounts.blood_collected_center}
                  </CardCount>
                </div>
                <div
                  style={{
                    width: "22%",
                    height: "10vh",
                    margin: "1% 5%",
                    boxShadow: "  0px 4px 14px -4px rgba(0,0,0,0.75)",
                  }}
                >
                  {" "}
                  <Row>
                    <p style={{ margin: "5% 0% 10% 5%" }}>COPD</p>
                  </Row>
                  <CardCount>
                    {dashboardCounts.blood_collected_center}
                  </CardCount>
                </div>
              </div>
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "22%",
                    height: "10vh",
                    margin: "1% 5%",
                    boxShadow: "  0px 4px 14px -4px rgba(0,0,0,0.75)",
                  }}
                >
                  {" "}
                  <Row>
                    <p style={{ margin: "5% 0% 10% 5%" }}>Communicable</p>
                  </Row>
                  <CardCount>
                    {dashboardCounts.blood_collected_center}
                  </CardCount>
                </div>
                <div
                  style={{
                    width: "22%",
                    height: "10vh",
                    margin: "1% 5%",
                    boxShadow: "  0px 4px 14px -4px rgba(0,0,0,0.75)",
                  }}
                >
                  {" "}
                  <Row>
                    <p style={{ margin: "5% 0% 10% 5%" }}>Asthama</p>
                  </Row>
                  <CardCount>
                    {dashboardCounts.blood_collected_center}
                  </CardCount>
                </div>
                <div
                  style={{
                    width: "22%",
                    height: "10vh",
                    margin: "1% 5%",
                    boxShadow: "  0px 4px 14px -4px rgba(0,0,0,0.75)",
                  }}
                >
                  {" "}
                  <Row>
                    <p style={{ margin: "5% 0% 10% 5%" }}>TB</p>
                  </Row>
                  <CardCount>
                    {dashboardCounts.blood_collected_center}
                  </CardCount>
                </div>
              </div>
            </div>
            <div
              style={{ width: "50%", height: "47vh" }}
            >
              <div>
                <p
                  style={{
                    margin: "3% 0% 0% 3%",
                    fontSize: "19px",
                    fontWeight: "600",
                  }}
                >
                  BLOOD COLLECTION
                </p>
              </div>
            </div>
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
    </>
  );
};

export default Dashboard;
