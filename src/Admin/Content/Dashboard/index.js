import { Row, Col, Divider, Form, Spin, Button, Dropdown, message, } from "antd";
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
import { Select, Tooltip } from "@mui/material";
import FormItem from "antd/es/form/FormItem";
import {
  AlignRightOutlined,
  DownloadOutlined,
  MenuOutlined,
} from "@ant-design/icons";


const { Option } = Select;

function AdminDashboard() {
  const [loader, setLoader] = useState(false);
  const [AdminDashboardData, setAdminDashboardData] = useState({});
  const [wardList, setWardList] = useState([]);
  const [healthPostNameList, setHealthPostNameList] = useState([]);
  const [dispensaryList, setDispensaryList] = useState([]);
  const [selectedWard, setSelectedWard] = useState();
  const [selectedWardName, setSelectedWardName] = useState();
  const [selectedHealthPost, setSelectedHealthPost] = useState();
  const [selectedDispensary, setSelectedDispensary] = useState();
  const [selectedHealthPostName, setSelectedHealthPostName] = useState();
  const [selectedDispensaryName, setSelectedDispensaryName] = useState();

  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };
  useEffect(() => {
    console.log(selectedWard);
    console.log(selectedHealthPost);
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
        console.log(error);
        if (error.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  }, [selectedWard, selectedHealthPost]);

  const handleWardSelect = (data) => {
    const [id, wardName] = data.split("|");
    console.log(id);
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
        console.log(res.data.data);
        setHealthPostNameList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });

    //for dispensary
    // const [dispensaryId] = data.split("|");
    console.log(id);
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
        console.log(err);
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
        console.log(response);
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute("download", `Admin_Dashboard_Data.xlsx`);

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        console.log(err);
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
        `${BASE_URL}/adminportal/api/DownloadWardtwiseUserList/${selectedWard}`,
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
          `${selectedWardName} ward's Citizens Report`
        );

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err.response.status);
        if (err.response.status == 404) {
          message.warning("Please Select Ward");
        } else if (err.response.status == 401) {
          LogOut();
        } else {
          message.warning(err.response.message);
        }
      });
  };
  const handleHealthPostwiseCitizenDownload = () => {
    axios
      .get(
        `${BASE_URL}/adminportal/api/DownloadHealthpostwiseUserList/${selectedHealthPost}`,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("Token")}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          `${selectedHealthPost} Healthpost's Citizens Report`
        );

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status == 404) {
          message.warning("Please Select Healthpost");
        } else if (err.response.status == 401) {
          LogOut();
        } else {
          message.warning(err.response.message);
        }
      });
  };

  ////////////////////////
  const handleDownloadAllCitizenList = () => {
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
        link.setAttribute("download", `All Ward Citizen List`);

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        console.log(err.response);

        if (err.response && err.response.status) {
          if (err.response.status === 404) {
            message.warning("File Not Found");
          } else if (err.response.status === 401) {
            LogOut();
          } else {
            message.warning(err.response.message);
          }
        } else {
          // Handle other error scenarios
          console.error("Unexpected error:", err);
        }
      });
  };

  ////////////////////////
  const handleDownloadDispensarywise = () => {
    axios
      .get(
        `${BASE_URL}/adminportal/api/DownloadDispensarywiseUserList/${selectedDispensary}`,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("Token")}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const href = URL.createObjectURL(response.data);
        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          `${selectedDispensaryName} ward's Dispensary Report`
        );

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        console.log(err.response);

        if (err.response && err.response.status) {
          if (err.response.status === 404) {
            message.warning("Please Select Ward's Dispensary");
          } else if (err.response.status === 401) {
            LogOut();
          } else {
            message.warning(err.response.message);
          }
        } else {
          // Handle other error scenarios
          console.error("Unexpected error:", err);
        }
      });
  };

  const items = [
    {
      key: "1",
      label: (
        <p onClick={handleAdminDashboardExcelDownload}>Download Dashboard</p>
      ),
    },
    {
      key: "4",
      label: <p onClick={handleDownloadAllCitizenList}>Download all Citizen</p>,
    },
    {
      key: "2",
      label: (
        <p onClick={handleWardwiseCitizenDownload}>
          Download Citizens Ward wise
        </p>
      ),
    },
    {
      key: "3",
      label: (
        <p onClick={handleHealthPostwiseCitizenDownload}>
          Download Citizens Healthpost wise
        </p>
      ),
    },

    {
      key: "5",
      label: (
        <p onClick={handleDownloadDispensarywise}>
          Download Citizen Dispensarywise
        </p>
      ),
    },
    // {
    //   key: "4",
    //   label: <p>Download Citizens Dispensary wise</p>,
    // },
  ];
  return (
    <>
      <Spin spinning={loader}>
        <div style={{ overflowY: "auto", maxHeight: "89vh" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              margin: "1% 3% -3% 0%",
            }}
          >
            <div style={{ width: "40%",}}>
              <Form layout="vertical" style={{width:"100%", marginLeft:"60px" }}>
                <Row style={{width:"100%",}}>
                  <Col span={7} style={{marginRight:"80px"}}>
                    <FormItem label="Ward">
                      <select
                        style={{
                          width: "200px",
                          height:"30px",
                          borderRadius: "5px",
                          // marginRight:"30px",
                          value: { selectedWard },
                        }}
                        onChange={(e) => handleWardSelect(e.target.value)}
                      >
                        {" "}
                        <option value="">All</option>
                        {wardList.map((data, index) => (
                          <option
                            key={data.id}
                            value={`${data.id}|${data.wardName}`}
                          >
                            {data.wardName}
                          </option>
                        ))}
                      </select>
                    </FormItem>
                  </Col>

                  <Col span={12}>
                    <FormItem label="Health Post">
                      <select
                        style={{
                          width: "200px",
                          height:"30px",
                          borderRadius: "5px",
                        }}
                        onChange={(e) => handleHealthpostSelect(e.target.value)}
                      >
                        <option value={undefined}>All</option>
                        {healthPostNameList.map((data, index) => (
                          <option
                            key={data.id}
                            value={`${data.id}|${data.healthPostName}`}
                          >
                            {data.healthPostName}
                          </option>
                        ))}
                      </select>
                    </FormItem>
                  </Col>

                  {/* <Col span={12}>
                    <FormItem label="Dispensary">
                      <select
                        style={{
                          width: "130px",
                          borderRadius: "5px",
                        }}
                      
                        onChange={(e) => handleDispensarySelect(e.target.value)}
                      >
                        <option value={undefined}>All</option>
                        {dispensaryList.map((data, index) => (
                          
                          <option
                            key={data.id}
                            value={`${data.id}|${data.dispensaryName}`}
                          >
                            {data.dispensaryName}
                          </option>
                        ))}
                      </select>
                    </FormItem>
                  </Col> */}

                  {/* <Col span={2}>
                    <div style={{ marginTop: "4vh" }}>
          
                      <Dropdown
                        menu={{
                          items,
                        }}
                        placement="bottomLeft"
                      >
                        <Button>
                          <MenuOutlined />
                        </Button>
                      </Dropdown>
                    </div>
                  </Col> */}
                </Row>
              </Form>
            </div>
          </div>
          <Row style={{ padding: "2%", width: "100%", height: "100%" }}>
            <Col span={14}>
              <MainCountRow>
                <CountCard>
                  <CardTitle>ANM/Co-Ordinator</CardTitle>
                  <CountTitle>{AdminDashboardData.ANM_count}</CountTitle>
                </CountCard>
                <CountCard>
                  <CardTitle>CHV/ASHA</CardTitle>
                  <CountTitle>{AdminDashboardData.CHV_ASHA_count}</CountTitle>
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
                  <CountTitle>{AdminDashboardData.total_cbac_count}</CountTitle>
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
                  <CountTitle>0</CountTitle>
                </CountCard>
                <CountCard>
                  <CardTitle>Citizens 30 years + enrolled</CardTitle>
                  <CountTitle>{AdminDashboardData.citizen_above_30}</CountTitle>
                </CountCard>
                <CountCard>
                  <CardTitle>Citizens 60 years + enrolled</CardTitle>
                  <CountTitle>{AdminDashboardData.citizen_above_60}</CountTitle>
                </CountCard>
              </MainCountRow>
              <br />
              <MainCountRow>
                <CountCard>
                  <CardTitle>Vulnerable Citizen</CardTitle>
                  <CountTitle>{AdminDashboardData.total_vulnerabel}</CountTitle>
                </CountCard>
              </MainCountRow>
            </Col>
            <Col span={1}></Col>
            <Col span={9} style={{ width: "100%" }}>
              <BloodDetailCard>
                <h3>Blood Collection Details</h3>
                <br />
                {/* <MainCountRow>
                  <DetailSubtitle> Tests Suggested</DetailSubtitle>
                  <CountTitle>0</CountTitle>
                </MainCountRow> */}
                <Line />
                <MainCountRow>
                  <DetailSubtitle> Tests Assigned</DetailSubtitle>
                  <CountTitle>0</CountTitle>
                </MainCountRow>
                <Line />
                <MainCountRow>
                  <DetailSubtitle> Tests Done</DetailSubtitle>
                  <CountTitle>0</CountTitle>
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
                        Referral to HBT polyclinic for physician consultation
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
                        Referral to Peripheral Hospital / Special Hospital for
                        management of Complication
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
            {/* <div>
              <div>
                <h3>Vulnerable</h3>
              </div>
              <div style={{ width: "80vw" }}>
                <Row>
                  <Col span={8}>
                    <ReferralCountCard>
                      <CardTitle> Total Vulnerable</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.total_vulnerabel}
                      </CountTitle>
                    </ReferralCountCard>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Citizen of 70 years +</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.vulnerabel_70_Years}
                      </CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                  <Col span={8}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Physical Handicapped</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.vulnerabel_Physically_handicapped}
                      </CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                </Row>
                <div style={{ height: "10px" }}></div>
                <Row>
                  {" "}
                  <Col span={8}>
                    <ReferralCountCard>
                      <CardTitle> Completely Paralyzed or On Bed</CardTitle>
                      <CountTitle>
                        {
                          AdminDashboardData.vulnerabel_completely_paralyzed_or_on_bed
                        }
                      </CountTitle>
                    </ReferralCountCard>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Elder or Alone At Home</CardTitle>
                      <CountTitle>
                        {
                          AdminDashboardData.vulnerabel_elderly_and_alone_at_home
                        }
                      </CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                  <Col span={8}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Other Reasons</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.vulnerabel_any_other_reason}
                      </CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                </Row>
              </div>
            </div> */}
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
                      <CountTitle>{AdminDashboardData.hypertension}</CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                  <Col span={5}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Oral Cancer</CardTitle>
                      <CountTitle>{AdminDashboardData.oral_Cancer}</CountTitle>
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
                      <CountTitle>{AdminDashboardData.Alzheimers}</CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                  <Col span={4}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> ENT Disorder</CardTitle>
                      <CountTitle>{AdminDashboardData.ent_disorder}</CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                </Row>
                <div style={{ height: "10px" }}></div>
                <Row>
                  <Col span={5}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Eye Disorder</CardTitle>
                      <CountTitle>{AdminDashboardData.eye_disorder}</CountTitle>
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
        </div>
      </Spin>
    </>
  );
}
export default AdminDashboard;
