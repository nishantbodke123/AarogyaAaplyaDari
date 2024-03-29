import {
  Row,
  Col,
  Divider,
  Form,
  Spin,
  Button,
  Dropdown,
  message,
  Tooltip,
  Table,
} from "antd";
import React, { useEffect, useState } from "react";
import {
  BloodDetailCard,
  CardTitle,
  CountCard,
  CountTitle,
  DetailSubtitle,
  Line,
  MainCountRow,
  ReferralCountCard,
} from "./style";
import { BASE_URL } from "../../../Utils/BaseURL";
import axios from "axios";
import { LogOut } from "../../../Auth/Logout";
import { Select } from "@mui/material";
import FormItem from "antd/es/form/FormItem";
import {
  DownloadOutlined,
  ProfileOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

import { createContext, useContext } from "react";

import { MyContext } from "../../Admin/Admin";
import ReportTable from "./ReportTable";

const { Option } = Select;

function AdminDashboard() {
  const { sideKey, passedDashboard, passedHealthpost, passedDispensary, name } =
    useContext(MyContext);

  // const { sideKey, passedDashboard, passedHealthpost, passedDispensary } = props.value;

  const [loader, setLoader] = useState(false);
  const [AdminDashboardData, setAdminDashboardData] = useState({});
  const [wardList, setWardList] = useState([]);
  const [healthPostNameList, setHealthPostNameList] = useState([]);
  const [dispensaryList, setDispensaryList] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");
  const [selectedWardName, setSelectedWardName] = useState(null);
  const [selectedHealthPost, setSelectedHealthPost] = useState("");
  const [selectedDispensary, setSelectedDispensary] = useState();
  const [selectedHealthPostName, setSelectedHealthPostName] = useState(null);
  const [selectedDispensaryName, setSelectedDispensaryName] = useState(null);

  const today = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formattedDate = today.toLocaleDateString("en-IN", options);

  // const [sideKey1, setSideKey1] = useState(0);

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };
  useEffect(() => {
    // console.log("the passed side key is " + sideKey + " " + passedDashboard);
    setLoader(true);
    axios
      .get(`${BASE_URL}/adminportal/api/AdminDashboardView`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
        params: {
          ...(selectedWard !== "" && { wardId: selectedWard }),
          ...(selectedHealthPost !== "" && {
            healthpost_id: selectedHealthPost,
          }),
        },
      })
      .then((response) => {
        setLoader(false);
        // console.log(response.data);
        setAdminDashboardData(response.data);
      })
      .catch((error) => {
        // console.log(error.response.status);
        setLoader(false);
        if (error.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
    axios
      .get(`${BASE_URL}/allauth/api/GetWardListAPI`, axiosConfig)
      .then((res) => {
        // console.log(res.data);
        setWardList(res.data);
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  }, [selectedWard, selectedHealthPost]);

  useEffect(() => {
    if (sideKey === 2) {
      setLoader(true);
      handleDownloadAllCitizenList();
    } else if (sideKey === 3) {
      setLoader(true);
      handleWardwiseCitizenDownload();
    } else if (sideKey === 4) {
      setLoader(true);
      handleHealthPostwiseCitizenDownload();
    } else if (sideKey === 5) {
      setLoader(true);
      handleDownloadDispensarywise();
    }
  }, [sideKey, passedDashboard, passedHealthpost, passedDispensary]);

  const handleWardSelect = (data) => {
    const [id, wardName] = data.split("|");
    // console.log(id);
    setSelectedWard(id);
    setSelectedWardName(wardName);
    setHealthPostNameList([]);
    setSelectedHealthPost("");
    axios
      .get(
        `${BASE_URL}/allauth/api/GethealthPostNameListAPI/${id}`,
        axiosConfig
      )
      .then((res) => {
        // console.log(res.data.data);
        setHealthPostNameList(res.data.data);
      })
      .catch((err) => {
        // console.log(err);
        if (err.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });

    //for dispensary
    // const [dispensaryId] = data.split("|");
    // console.log(id);
    setSelectedWard(id);
    setSelectedWardName(wardName);
    setDispensaryList([]);
    setSelectedDispensary("");
    axios
      .get(`${BASE_URL}/allauth/api/GetDispensaryListAPI/${id}`, axiosConfig)
      .then((res) => {
        setDispensaryList(res.data);
      })
      .catch((err) => {
        // console.log(err);
        if (err.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  };

  const handleHealthpostSelect = (data) => {
    const [id, healthPostName] = data.split("|");
    setSelectedHealthPost(id);
    setSelectedHealthPostName(healthPostName);
  };

  const handleDispensarySelect = (data) => {
    const [id, dispensaryName] = data.split("|");
    setSelectedDispensary(id);
    setSelectedDispensaryName(dispensaryName);
  };

  const handleAdminDashboardExcelDownload = () => {
    setLoader(true);
    axios
      .get(`${BASE_URL}/adminportal/api/AdminDashboardExportView`, {
        params: {
          ...(selectedWard !== "" && { wardId: selectedWard }),
          ...(selectedHealthPost !== "" && {
            healthpost_id: selectedHealthPost,
          }),
        },
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        setLoader(false);
        // console.log(response);
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          selectedWardName === null
            ? `All_Ward_data_${formattedDate}.xlsx`
            : selectedHealthPostName === null
            ? `Ward_${selectedWardName}_data_${formattedDate}.xlsx`
            : `${selectedHealthPostName}_data_${formattedDate}.xlsx`
        );

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        // console.log(err);
        setLoader(false);
        if (err.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  };

  const handleWardwiseCitizenDownload = () => {
    setLoader(true);
    axios
      .get(
        // `${BASE_URL}/adminportal/api/DownloadWardtwiseUserList/${selectedWard}`,
        `${BASE_URL}/adminportal/api/DownloadWardtwiseUserList/${passedDashboard}`,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("Token")}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        setLoader(false);
        const href = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          `Ward_${name}_data_${formattedDate}.xlsx`
          // Ward_A_data_17-02-2024
        );

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        setLoader(false);
        // console.log(err.response.status);
        if (err.response.status == 404) {
          message.warning("Please Select Ward");
        } else if (err.response.status == 401) {
          LogOut();
        } else if (err.response.status == 400) {
          message.warning("No data found for selected Ward");
        } else {
          message.warning(err.data.message);
        }
      });
  };
  const handleHealthPostwiseCitizenDownload = () => {
    setLoader(true);
    axios
      .get(
        // `${BASE_URL}/adminportal/api/DownloadHealthpostwiseUserList/${selectedHealthPost}`,
        `${BASE_URL}/adminportal/api/DownloadHealthpostwiseUserList/${passedHealthpost}`,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("Token")}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        setLoader(false);
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          `${name}_data_${formattedDate}.xlsx`
          // Colaba Health Post _data_17-02-2024
        );

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        setLoader(false);
        // console.log(err.response.status);
        if (err.response.status == 404) {
          message.warning("Please Select Healthpost");
        } else if (err.response.status == 401) {
          LogOut();
        } else if (err.response.status == 400) {
          // console.log("error status is " + err.response.status);
          message.warning("No data found for selected healthpost");
        } else {
          message.warning(err.data.message);
        }
      });
  };

  ////////////////////////
  const handleDownloadAllCitizenList = () => {
    setLoader(true);
    axios
      .get(`${BASE_URL}/adminportal/api/DownloadAllWardUserList`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", `All_Ward_data_${formattedDate}.xlsx`);
        // All_Ward_data_17-02-2024.xlsx

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);

        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
        // console.log(err.response);

        if (err.response && err.response.status) {
          if (err.response.status === 404) {
            message.warning("File Not Found");
          } else if (err.response.status === 401) {
            LogOut();
          } else {
            message.warning(err.response.message);
          }
        } else {
          console.error("Unexpected error:", err);
        }
      });
  };

  ////////////////////////
  const handleDownloadDispensarywise = () => {
    setLoader(true);
    axios
      .get(
        // `${BASE_URL}/adminportal/api/DownloadDispensarywiseUserList/${selectedDispensary}`,
        `${BASE_URL}/adminportal/api/DownloadDispensarywiseUserList/${passedDispensary}`,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("Token")}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        setLoader(false);
        const href = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          `${name}_data_${formattedDate}.xlsx`
          // Colaba Dispensary_data_17-02-2024
        );

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        setLoader(false);
        // console.log(err.response);

        if (err.response && err.response.status) {
          if (err.response.status === 404) {
            message.warning("Please Select Ward's Dispensary");
          } else if (err.response.status === 401) {
            LogOut();
          } else if (err.response.status === 400) {
            // console.log("error status is " + err.response.status);
            message.warning("No data found for selected Dispensary");
          } else {
            // Handle other error scenarios
            console.error("Unexpected error:", err);
          }
        }
      });
  };
  const [reportData, setReportData] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const handleShowReport = () => {
    console.log(showReport);
    setShowReport(!showReport);
    // if (!showReport) {
    //   setLoader(true);
    //   axios
    //     .get(`${BASE_URL}/adminportal/api/AdminDashboardTabView`, axiosConfig)
    //     .then((res) => {
    //       setLoader(false);
    //       console.log(res.data.data);
    //       setReportData(res.data.data);
    //     })
    //     .catch((res) => {
    //       setLoader(false);
    //       console.log(res);
    //     });
    // }
  };

  return (
    <>
      <Spin spinning={loader}>
        <div style={{ overflowY: "auto", maxHeight: "89vh" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "55%",
              }}
            >
              <div>
                <label style={{ fontWeight: "600" }}>Ward</label>
                <select
                  style={{
                    width: "220px",
                    height: "30px",
                    margin: "2% 5% 0% 1%",
                    borderRadius: "5px",
                    value: { selectedWard },
                  }}
                  onChange={(e) => handleWardSelect(e.target.value)}
                >
                  {" "}
                  <option value="">All</option>
                  {wardList.map((data, index) => (
                    <option key={data.id} value={`${data.id}|${data.wardName}`}>
                      {data.wardName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ fontWeight: "600" }}>Health Post</label>
                <select
                  style={{
                    width: "220px",
                    height: "30px",
                    margin: "2% 5% 0% 1%",
                    borderRadius: "5px",
                  }}
                  onChange={(e) => handleHealthpostSelect(e.target.value)}
                >
                  <option value="">All</option>
                  {healthPostNameList.map((data, index) => (
                    <option
                      key={data.id}
                      value={`${data.id}|${data.healthPostName}`}
                    >
                      {data.healthPostName}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ margin: "3vh 0vw 0vh 0vw" }}>
                <Tooltip
                  placement="top"
                  title="Download Dashboard"
                  style={{ backgroundColor: "white" }}
                >
                  <Button onClick={handleAdminDashboardExcelDownload}>
                    <DownloadOutlined />
                  </Button>
                </Tooltip>
              </div>
              <div style={{ margin: "3vh 4vh 0vh 0vh" }}>
                {showReport ? (
                  <Tooltip title="Dashboard" placement="top">
                    <Button
                      onClick={handleShowReport}
                      style={{ border: "none" }}
                    >
                      <AppstoreOutlined style={{ fontSize: "25px" }} />
                    </Button>
                  </Tooltip>
                ) : (
                  <Tooltip title="Users Report" placement="top">
                    <Button
                      onClick={handleShowReport}
                      style={{ border: "none" }}
                    >
                      <ProfileOutlined style={{ fontSize: "25px" }} />
                    </Button>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
          {showReport ? (
            <>
              <ReportTable
                selectedWard={selectedWard}
                selectedHealthPost={selectedHealthPost}
              />
            </>
          ) : (
            <>
              <Row style={{ padding: "2%", width: "100%", height: "100%" }}>
                <Col span={14}>
                  <MainCountRow>
                    <CountCard>
                      <CardTitle>ANM/Co-Ordinator</CardTitle>
                      <CountTitle>{AdminDashboardData.ANM_count}</CountTitle>
                    </CountCard>
                    <CountCard>
                      <CardTitle>CHV/ASHA</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.CHV_ASHA_count}
                      </CountTitle>
                    </CountCard>
                    <CountCard>
                      <CardTitle>MO</CardTitle>
                      <CountTitle>{AdminDashboardData.MO_count}</CountTitle>
                    </CountCard>
                  </MainCountRow>
                  <h3>Citizens Details</h3>
                  <MainCountRow>
                    <CountCard>
                      <CardTitle>Families Enrolled</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.total_family_count}
                      </CountTitle>
                    </CountCard>
                    <CountCard>
                      <CardTitle>Citizens Enrolled</CardTitle>
                      <CountTitle>{AdminDashboardData.total_count}</CountTitle>
                    </CountCard>
                    <CountCard>
                      <CardTitle>CBAC Filled</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.total_cbac_count}
                      </CountTitle>
                    </CountCard>
                  </MainCountRow>
                  <br />
                  <MainCountRow>
                    <CountCard>
                      <CardTitle>Males Enrolled</CardTitle>
                      <CountTitle> {AdminDashboardData.male}</CountTitle>
                    </CountCard>
                    <CountCard>
                      <CardTitle>Females Enrolled</CardTitle>
                      <CountTitle> {AdminDashboardData.female}</CountTitle>
                    </CountCard>
                    <CountCard>
                      <CardTitle>Transgender Enrolled</CardTitle>
                      <CountTitle> {AdminDashboardData.transgender}</CountTitle>
                    </CountCard>
                  </MainCountRow>
                  <br />
                  <MainCountRow>
                    <CountCard>
                      <CardTitle>ABHA ID Generated</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.total_AbhaCreated}
                      </CountTitle>
                    </CountCard>
                    <CountCard>
                      <CardTitle>Citizens 30 years + enrolled</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.citizen_above_30}
                      </CountTitle>
                    </CountCard>
                    <CountCard>
                      <CardTitle>Citizens 60 years + enrolled</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.citizen_above_60}
                      </CountTitle>
                    </CountCard>
                  </MainCountRow>
                  <br />
                  <MainCountRow>
                    <CountCard>
                      <CardTitle>Vulnerable Citizen</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.total_vulnerabel}
                      </CountTitle>
                    </CountCard>
                  </MainCountRow>
                </Col>
                <Col span={1}></Col>
                <Col span={9} style={{ width: "100%" }}>
                  <BloodDetailCard>
                    <h3>Blood Collection Details</h3>
                    <br />

                    <Line />
                    <MainCountRow>
                      <DetailSubtitle> Tests Assigned</DetailSubtitle>
                      <CountTitle>
                        {AdminDashboardData.total_LabTestAdded}
                      </CountTitle>
                    </MainCountRow>

                    <Line />
                    <MainCountRow>
                      <DetailSubtitle>Total Reports Generated</DetailSubtitle>
                      <CountTitle>
                        {AdminDashboardData.TestReportGenerated}
                      </CountTitle>
                    </MainCountRow>
                    <Line />
                    <MainCountRow>
                      <DetailSubtitle>Blood Collected At Home</DetailSubtitle>
                      <CountTitle>
                        {AdminDashboardData.blood_collected_home}
                      </CountTitle>
                    </MainCountRow>
                    <Line />
                    <MainCountRow>
                      <DetailSubtitle>Blood Collected At Center</DetailSubtitle>
                      <CountTitle>
                        {AdminDashboardData.blood_collected_center}
                      </CountTitle>
                    </MainCountRow>
                    <Line />

                    <MainCountRow>
                      <DetailSubtitle>
                        Blood Collection Denied By AMO
                      </DetailSubtitle>
                      <CountTitle>
                        {AdminDashboardData.denieded_by_mo_count}
                      </CountTitle>
                    </MainCountRow>
                    <Line />
                    <MainCountRow>
                      <DetailSubtitle>
                        Blood Collection Denied By Citizen
                      </DetailSubtitle>
                      <CountTitle>
                        {AdminDashboardData.denieded_by_mo_individual}
                      </CountTitle>
                    </MainCountRow>
                  </BloodDetailCard>
                </Col>
                <Divider />
                <div>
                  <h3>Referrals</h3>
                  <div>
                    <Row>
                      <Col span={8}>
                        <ReferralCountCard>
                          <CardTitle>
                            {" "}
                            Referral to Mun. Dispensary / HBT for Blood Test /
                            Confirmation / Treatment
                          </CardTitle>
                          <CountTitle>
                            {
                              AdminDashboardData.Referral_choice_Referral_to_Mun_Dispensary
                            }
                          </CountTitle>
                        </ReferralCountCard>
                      </Col>
                      <Col span={8}>
                        {" "}
                        <ReferralCountCard>
                          <CardTitle>
                            {" "}
                            Referral to HBT polyclinic for physician
                            consultation
                          </CardTitle>
                          <CountTitle>
                            {
                              AdminDashboardData.Referral_choice_Referral_to_HBT_polyclinic
                            }
                          </CountTitle>
                        </ReferralCountCard>{" "}
                      </Col>
                      <Col span={8}>
                        {" "}
                        <ReferralCountCard>
                          <CardTitle>
                            {" "}
                            Referral to Peripheral Hospital / Special Hospital
                            for management of Complication
                          </CardTitle>
                          <CountTitle>
                            {
                              AdminDashboardData.Referral_choice_Referral_to_Peripheral_Hospital
                            }
                          </CountTitle>
                        </ReferralCountCard>{" "}
                      </Col>
                    </Row>
                    <div style={{ height: "10px" }}></div>
                    <Row>
                      {" "}
                      <Col span={8}>
                        <ReferralCountCard>
                          <CardTitle>
                            {" "}
                            Referral to Medical College for management of
                            Complication
                          </CardTitle>
                          <CountTitle>
                            {
                              AdminDashboardData.Referral_choice_Referral_to_Medical_College
                            }
                          </CountTitle>
                        </ReferralCountCard>
                      </Col>
                      <Col span={8}>
                        {" "}
                        <ReferralCountCard>
                          <CardTitle> Referral to Private facility</CardTitle>
                          <CountTitle>
                            {
                              AdminDashboardData.Referral_choice_Referral_to_Private_facility
                            }
                          </CountTitle>
                        </ReferralCountCard>{" "}
                      </Col>
                    </Row>
                  </div>
                </div>{" "}
                <Divider />
                <div>
                  <div>
                    <h3>Disease Suspected</h3>
                  </div>
                  <div style={{ width: "80vw" }}>
                    <Row>
                      <Col span={5}>
                        {" "}
                        <ReferralCountCard>
                          <CardTitle>Diabetes</CardTitle>
                          <CountTitle>{AdminDashboardData.diabetes}</CountTitle>
                        </ReferralCountCard>{" "}
                      </Col>
                      <Col span={5}>
                        {" "}
                        <ReferralCountCard>
                          <CardTitle>Hypertension</CardTitle>
                          <CountTitle>
                            {AdminDashboardData.hypertension}
                          </CountTitle>
                        </ReferralCountCard>{" "}
                      </Col>
                      <Col span={5}>
                        {" "}
                        <ReferralCountCard>
                          <CardTitle> Oral Cancer</CardTitle>
                          <CountTitle>
                            {AdminDashboardData.oral_Cancer}
                          </CountTitle>
                        </ReferralCountCard>{" "}
                      </Col>
                      <Col span={5}>
                        {" "}
                        <ReferralCountCard>
                          <CardTitle> Cervical Cancer</CardTitle>
                          <CountTitle>
                            {AdminDashboardData.cervical_cancer}
                          </CountTitle>
                        </ReferralCountCard>{" "}
                      </Col>
                      <Col span={4}>
                        <ReferralCountCard>
                          <CardTitle> Breast Cancer</CardTitle>
                          <CountTitle>
                            {AdminDashboardData.breast_cancer}
                          </CountTitle>
                        </ReferralCountCard>
                      </Col>
                    </Row>
                    <div style={{ height: "10px" }}></div>
                    <Row>
                      {" "}
                      <Col span={5}>
                        {" "}
                        <ReferralCountCard>
                          <CardTitle> COPD</CardTitle>
                          <CountTitle>{AdminDashboardData.copd}</CountTitle>
                        </ReferralCountCard>{" "}
                      </Col>
                      <Col span={5}>
                        {" "}
                        <ReferralCountCard>
                          <CardTitle> Asthma</CardTitle>
                          <CountTitle>{AdminDashboardData.asthama}</CountTitle>
                        </ReferralCountCard>{" "}
                      </Col>
                      <Col span={5}>
                        <ReferralCountCard>
                          <CardTitle>TB</CardTitle>
                          <CountTitle>{AdminDashboardData.tb}</CountTitle>
                        </ReferralCountCard>
                      </Col>
                      <Col span={5}>
                        {" "}
                        <ReferralCountCard>
                          <CardTitle> Alzheimer/Dementia</CardTitle>
                          <CountTitle>
                            {AdminDashboardData.Alzheimers}
                          </CountTitle>
                        </ReferralCountCard>{" "}
                      </Col>
                      <Col span={4}>
                        {" "}
                        <ReferralCountCard>
                          <CardTitle> ENT Disorder</CardTitle>
                          <CountTitle>
                            {AdminDashboardData.ent_disorder}
                          </CountTitle>
                        </ReferralCountCard>{" "}
                      </Col>
                    </Row>
                    <div style={{ height: "10px" }}></div>
                    <Row>
                      <Col span={5}>
                        {" "}
                        <ReferralCountCard>
                          <CardTitle> Eye Disorder</CardTitle>
                          <CountTitle>
                            {AdminDashboardData.eye_disorder}
                          </CountTitle>
                        </ReferralCountCard>{" "}
                      </Col>
                      <Col span={5}>
                        {" "}
                        <ReferralCountCard>
                          <CardTitle> Leprosy</CardTitle>
                          <CountTitle>{AdminDashboardData.leprosy}</CountTitle>
                        </ReferralCountCard>{" "}
                      </Col>
                      <Col span={5}>
                        {" "}
                        <ReferralCountCard>
                          <CardTitle> Other Communicable Disease</CardTitle>
                          <CountTitle>
                            {AdminDashboardData.other_communicable_dieases}
                          </CountTitle>
                        </ReferralCountCard>{" "}
                      </Col>
                    </Row>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "end",
                    width: "100%",
                    margin: "3% 0% -5% 0%",
                  }}
                >
                  <p style={{ margin: "0% 1% 0.5% 0%" }}>
                    Developed and Maintained By
                  </p>
                  <img
                    src="\BhugolGISLogo.png"
                    style={{ width: "10rem", height: "2.5rem" }}
                  />
                </div>
              </Row>
            </>
          )}
        </div>
      </Spin>
    </>
  );
}
export default AdminDashboard;
