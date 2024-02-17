import {
  Button,
  Col,
  Divider,
  Form,
  Row,
  Select,
  Spin,
  Tooltip,
  theme,
  message,
} from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import React, { useEffect, useState, useContext } from "react";
import {
  BloodCollectionCard,
  BloodDetailCard,
  CardTitle,
  CitizenDetailsCard,
  CitizenDetailsCount,
  CitizenDetailsCountLabel,
  CountCard,
  CountTitle,
  DashboardCard,
  DashboardCardContent,
  DashboardCardDiv,
  DetailSubtitle,
  Line,
  MainCountRow,
  ReferralCountCard,
  Title,
} from "./style";
import { AlignRightOutlined, DownloadOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../../Utils/BaseURL";
import axios, { Axios } from "axios";
import FormItem from "antd/es/form/FormItem";
import { LogOut } from "../../../Auth/Logout";

import { MyContext } from "../../Admin/WardAdmin";

function WardAdminDashboard() {
  const { sideKey, passedHealthpost } = useContext(MyContext);

  const [loader, setLoader] = useState(false);
  const [MOHDashboardData, setMOHDashboardData] = useState({});
  const [healthPostNameList, setHealthPostNameList] = useState([]);
  const [selectedHealthPost, setSelectedHealthPost] = useState("");

  const wardId = sessionStorage.getItem("ward_id");
  const wardName = sessionStorage.getItem("wardName");

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };

  useEffect(() => {
    setLoader(true);
    axios
      .get(`${BASE_URL}/adminportal/api/MOHDashboardView`, {
        params: {
          healthpost_id: selectedHealthPost,
        },
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        setLoader(false);
        console.log(response);
        setMOHDashboardData(response.data);
      })
      .catch((error) => {
        setLoader(false);
        console.log(error);
      });

    axios
      .get(
        `${BASE_URL}/allauth/api/GethealthPostNameListAPI/${sessionStorage.getItem(
          "ward_id"
        )}`,
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
  }, [selectedHealthPost]);

  useEffect(() => {
    if (sideKey === 1) {
      handleWardwiseCitizenDownload();
    } else if (sideKey === 2) {
      handleHealthPostwiseCitizenDownload();
    }
  }, [sideKey, passedHealthpost]);

  const handleWardwiseCitizenDownload = () => {
    setLoader(true);
    axios
      .get(`${BASE_URL}/adminportal/api/DownloadWardtwiseUserList/${wardId}`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
        // responseType: "blob",
      })
      .then((response) => {
        setLoader(false);
        console.log("Response data is ---> "+response.headers)

        ////////////////////////////////////////////////////////
        // const contentDisposition = response.headers["content-disposition"];
        // const filenameMatch = contentDisposition.match(/filename="(.+?)"/);
        // const filename = filenameMatch ? filenameMatch[1] : null;

        // if (filename) {
        //   console.log("Filename:", filename);
        // } else {
        //   console.error("Filename not found in Content-Disposition header");
        // }

        ////////////////////////////////////////////////////////////

        // const href = URL.createObjectURL(response.data);
        // const link = document.createElement("a");
        // link.href = href;
        // link.setAttribute(
        //   "download",
        //   `${wardName} ward's Citizens Report.xlsx`
        //   // `${response}.xlsx`
        // );

        // document.body.appendChild(link);
        // link.click();

        // document.body.removeChild(link);
        // URL.revokeObjectURL(href);
      })
      .catch((err) => {
        setLoader(false);
        console.log(err.response.status);
        if (err.response.status == 404) {
          message.warning("Please Select Ward");
        } else if (err.response.status == 401) {
          LogOut();
        } else if (err.response.status == 400) {
          message.warning("Data is not available");
        } else {
          message.warning("Error" + err.response.message);
        }
      });
  };

  const handleHealthPostwiseCitizenDownload = () => {
    setLoader(true);
    console.log(
      "passed healthpost value in the content ward admin is " + passedHealthpost
    );
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
          `${selectedHealthPost} Healthpost's Citizens Report.xlsx`
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
          message.warning("Please Select Healthpost");
        } else if (err.response.status == 401) {
          LogOut();
        } else if (err.response.status == 400) {
          message.warning("Data is not available");
        } else {
          message.warning("Error" + err.response.message);
        }
      });
  };

  const handleMOHDashboardExcelDownload = () => {
    // if (selectedHealthPost === "" || selectedHealthPost === 0) {
    //   axios
    //     .get(`${BASE_URL}/adminportal/api/MOHDashboardExcelView/${wardId}`, {
    //       headers: {
    //         Authorization: `Token ${sessionStorage.getItem("Token")}`,
    //       },
    //       responseType: "blob",
    //     })
    //     .then((response) => {
    //       // setLoader(false);
    //       const href = URL.createObjectURL(response.data);
    //       const link = document.createElement("a");
    //       link.href = href;
    //       link.setAttribute(
    //         "download",
    //         `${wardName} ward's Citizens Report.xlsx`
    //       );

    //       document.body.appendChild(link);
    //       link.click();

    //       document.body.removeChild(link);
    //       URL.revokeObjectURL(href);
    //     })
    //     .catch((err) => {
    //       setLoader(false);
    //       console.log(err.response.status);
    //       if (err.response.status == 404) {
    //         message.warning("Please Select Ward");
    //       } else if (err.response.status == 401) {
    //         LogOut();
    //       } else if (err.response.status == 400) {
    //         message.warning("Data is not available");
    //       } else {
    //         message.warning("Error" + err.response.message);
    //       }
    //     });
    // } else {
    //   axios
    //     .get(`${BASE_URL}/adminportal/api/MOHDashboardExcelView`, {
    //       params: {
    //         healthpost_id: selectedHealthPost,
    //       },
    //       headers: {
    //         Authorization: `Token ${sessionStorage.getItem("Token")}`,
    //       },
    //       responseType: "blob",
    //     })
    //     .then((response) => {
    //       console.log(response);
    //       const href = URL.createObjectURL(response.data);

    //       const link = document.createElement("a");
    //       link.href = href;
    //       link.setAttribute(
    //         "download",
    //         `MOH_Dashboard_${
    //           selectedHealthPost != undefined ? selectedHealthPost : "All"
    //         }_Data.xlsx`
    //       );

    //       document.body.appendChild(link);
    //       link.click();

    //       document.body.removeChild(link);
    //       URL.revokeObjectURL(href);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       if (err.response.status == "401") {
    //         setTimeout(() => {
    //           LogOut();
    //         }, 1000);
    //       } else if (err.response.status == 400) {
    //         message.warning("Data is not available");
    //       } else {
    //         message.warning("Error" + err.response.message);
    //       }
    //     });
    // }

    axios
      .get(`${BASE_URL}/adminportal/api/MOHDashboardExcelView`, {
        params: {
          wardId: wardId,
          healthpost_id:
            selectedHealthPost !== undefined
              ? String(selectedHealthPost)
              : undefined,
        },
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        console.log("selected healthpost is " + selectedHealthPost);
        const href = URL.createObjectURL(response.data);

        const link = document.createElement("a");
        link.href = href;
        link.setAttribute(
          "download",
          `MOH_Dashboard_${
            selectedHealthPost !== undefined ? selectedHealthPost : "All"
          }_Data.xlsx`
        );

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(href);
      })
      .catch((err) => {
        console.log("selected healthpost is " + selectedHealthPost);
        console.log(err);
        if (err.response.status === 401) {
          setTimeout(() => {
            LogOut();
          }, 1000);
        } else if (err.response.status === 400) {
          message.warning("Data is not available");
        } else {
          message.warning("Error" + err.response.message);
        }
      });
  };
  return (
    <>
      <Spin spinning={loader}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            margin: "1% 2%-2% 0%",
          }}
        >
          <div style={{ width: "20%" }}>
            <Form layout="vertical">
              <Row>
                <Col span={24}>
                  <FormItem label="Health Post">
                    <select
                      style={{
                        width: "200px",
                        height: "30px",
                        borderRadius: "5px",
                      }}
                      // value={selectedHealthPost}
                      // placeholder="All"
                      // onChange={(e) => setSelectedHealthPost(e)}
                      onChange={(e) => setSelectedHealthPost(e.target.value)}
                    >
                      <option value={""} selected>
                        All
                      </option>
                      {healthPostNameList.map((data, index) => (
                        <option key={data.id} value={data.id}>
                          {data.healthPostName}
                        </option>
                      ))}
                    </select>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
          <div style={{ margin: "2% 2% 0% 0%" }}>
            <Tooltip placement="bottom" title="Excel Download">
              <Button onClick={handleMOHDashboardExcelDownload}>
                <DownloadOutlined />
              </Button>
            </Tooltip>
          </div>
        </div>
        <Row
          style={{
            padding: "2%",
            width: "100%",
            height: "100%",
            overflowY: "auto",
            maxHeight: "79vh",
          }}
        >
          <Col span={14}>
            <MainCountRow>
              <CountCard>
                <CardTitle>ANM/Co-Ordinator</CardTitle>
                <CountTitle>{MOHDashboardData.ANM_count}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>CHV/ASHA</CardTitle>
                <CountTitle>{MOHDashboardData.CHV_ASHA_count}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>MO</CardTitle>
                <CountTitle>{MOHDashboardData.MO_count}</CountTitle>
              </CountCard>
            </MainCountRow>
            <h3>Citizens Details</h3>
            <MainCountRow>
              <CountCard>
                <CardTitle>Family Enrolled</CardTitle>
                <CountTitle>{MOHDashboardData.total_family_count}</CountTitle>
              </CountCard>
              {/* <CountCard>
                <CardTitle>Today's Families Enrolled</CardTitle>
                <CountTitle>{MOHDashboardData.today_family_count}</CountTitle>
              </CountCard> */}
              <CountCard>
                <CardTitle>Citizens Enrolled</CardTitle>
                <CountTitle>{MOHDashboardData.total_count}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>CBAC Filled</CardTitle>
                <CountTitle>{MOHDashboardData.total_cbac_count}</CountTitle>
              </CountCard>
            </MainCountRow>
            <br />
            <MainCountRow>
              {/* <CountCard>
                <CardTitle> Today's Citizens Enrolled</CardTitle>
                <CountTitle>{MOHDashboardData.todays_count}</CountTitle>
              </CountCard> */}
              <CountCard>
                <CardTitle>Males Enrolled</CardTitle>
                <CountTitle> {MOHDashboardData.male}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>Females Enrolled</CardTitle>
                <CountTitle> {MOHDashboardData.female}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>Transgender</CardTitle>
                <CountTitle>{MOHDashboardData.transgender}</CountTitle>
              </CountCard>
            </MainCountRow>
            <br />
            <MainCountRow>
              <CountCard>
                <CardTitle>ABHA ID Generated</CardTitle>
                <CountTitle>{MOHDashboardData.total_AbhaCreated}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>Citizens 30 years + enrolled</CardTitle>
                <CountTitle>{MOHDashboardData.citizen_above_30}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>Citizens 60 years + enrolled </CardTitle>
                <CountTitle>{MOHDashboardData.citizen_above_60}</CountTitle>
              </CountCard>
            </MainCountRow>
            <br />
            <MainCountRow>
              <CountCard>
                <CardTitle>Vulnerable Citizens </CardTitle>
                <CountTitle>{MOHDashboardData.total_vulnerabel}</CountTitle>
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
                <CountTitle>{MOHDashboardData.total_LabTestAdded}</CountTitle>
              </MainCountRow> */}
              <Line />
              <MainCountRow>
                <DetailSubtitle> Tests Assigned</DetailSubtitle>
                <CountTitle>{MOHDashboardData.total_LabTestAdded}</CountTitle>
              </MainCountRow>
              {/* <Line /> */}
              {/* <MainCountRow>
                <DetailSubtitle> Tests Done</DetailSubtitle>
                <CountTitle>0</CountTitle>
              </MainCountRow> */}
              <Line />
              <MainCountRow>
                <DetailSubtitle>Total Reports Generated</DetailSubtitle>
                <CountTitle>{MOHDashboardData.TestReportGenerated}</CountTitle>
              </MainCountRow>
              <Line />
              <MainCountRow>
                <DetailSubtitle>Blood Collected At Home</DetailSubtitle>
                <CountTitle>{MOHDashboardData.blood_collected_home}</CountTitle>
              </MainCountRow>
              <Line />
              <MainCountRow>
                <DetailSubtitle>Blood Collected At Center</DetailSubtitle>
                <CountTitle>
                  {MOHDashboardData.blood_collected_center}
                </CountTitle>
              </MainCountRow>
              <Line />

              <MainCountRow>
                <DetailSubtitle>Blood Collection Denied By AMO</DetailSubtitle>
                <CountTitle>{MOHDashboardData.denieded_by_mo_count}</CountTitle>
              </MainCountRow>
              <Line />
              <MainCountRow>
                <DetailSubtitle>
                  Blood Collection Denied By Citizen
                </DetailSubtitle>
                <CountTitle>
                  {MOHDashboardData.denieded_by_mo_individual}
                </CountTitle>
              </MainCountRow>
            </BloodDetailCard>
          </Col>
          <Divider />
          <div>
            <h3>Referrals</h3>
            <div style={{ width: "80vw" }}>
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
                        MOHDashboardData.Referral_choice_Referral_to_Mun_Dispensary
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
                        MOHDashboardData.Referral_choice_Referral_to_HBT_polyclinic
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
                        MOHDashboardData.Referral_choice_Referral_to_Peripheral_Hospital
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
                      Referral to Medical College for management of Complication
                    </CardTitle>
                    <CountTitle>
                      {
                        MOHDashboardData.Referral_choice_Referral_to_Medical_College
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
                        MOHDashboardData.Referral_choice_Referral_to_Private_facility
                      }
                    </CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
              </Row>
            </div>
          </div>
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
                    <CardTitle> Diabetes</CardTitle>
                    <CountTitle>{MOHDashboardData.diabetes}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle>Hypertension </CardTitle>
                    <CountTitle>{MOHDashboardData.hypertension}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Oral Cancer</CardTitle>
                    <CountTitle>{MOHDashboardData.oral_Cancer}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle>Cervical Cancer </CardTitle>
                    <CountTitle>{MOHDashboardData.cervical_cancer}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>

                <Col span={4}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle>Breast Cancer </CardTitle>
                    <CountTitle>{MOHDashboardData.breast_cancer}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
              </Row>
              <div style={{ height: "10px" }}></div>
              <Row>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle>COPD </CardTitle>
                    <CountTitle>{MOHDashboardData.copd}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Asthma</CardTitle>
                    <CountTitle>{MOHDashboardData.asthama}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={5}>
                  <ReferralCountCard>
                    <CardTitle>TB</CardTitle>
                    <CountTitle>{MOHDashboardData.tb}</CountTitle>
                  </ReferralCountCard>
                </Col>

                <Col span={5}>
                  <ReferralCountCard>
                    <CardTitle> Alzheimers/Dementia</CardTitle>
                    <CountTitle>{MOHDashboardData.Alzheimers}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>

                <Col span={4}>
                  <ReferralCountCard>
                    <CardTitle>ENT Disorder </CardTitle>
                    <CountTitle>{MOHDashboardData.ent_disorder}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
              </Row>
              <div style={{ height: "10px" }}></div>
              <Row>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Eye Disorder</CardTitle>
                    <CountTitle>{MOHDashboardData.eye_disorder}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>

                <Col span={5}>
                  <ReferralCountCard>
                    <CardTitle> Other Communicable Disease</CardTitle>
                    <CountTitle>
                      {MOHDashboardData.other_communicable_dieases}
                    </CountTitle>
                  </ReferralCountCard>
                </Col>
                <Col span={5}>
                  <ReferralCountCard>
                    <CardTitle> Leprosy</CardTitle>
                    <CountTitle>
                      {MOHDashboardData.leprosy}
                    </CountTitle>
                  </ReferralCountCard>
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
              marginTop: "0%",
            }}
          >
            <p style={{ margin: "0% 1% 0.5% 0%" }}>
              Developed and Maintained By
            </p>
            <img
              src="\BhugolGISLogo.png"
              style={{ width: "10rem", height: "2rem" }}
            />
          </div>
        </Row>
      </Spin>
    </>
  );
}
export default WardAdminDashboard;
