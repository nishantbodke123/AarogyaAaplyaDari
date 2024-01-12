import { Row, Col, Divider, Form, Spin } from "antd";
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

function AdminDashboard() {
  const [loader, setLoader] = useState(false);
  const [AdminDashboardData, setAdminDashboardData] = useState({});
  const [wardList, setWardList] = useState([]);
  const [healthPostNameList, setHealthPostNameList] = useState([]);
  const [selectedWard, setSelectedWard] = useState();
  const [selectedHealthPost, setSelectedHealthPost] = useState();
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${sessionStorage.getItem("Token")}`,
    },
  };
  useEffect(() => {
    console.log(selectedWard);
    setLoader(true);
    axios
      .get(`${BASE_URL}/adminportal/api/AdminDashboardView`, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("Token")}`,
        },
        params: {
          wardId: selectedWard,
          ...(selectedHealthPost !== "" && {
            healthpost_id: selectedHealthPost,
          }),
        },
      })
      .then((response) => {
        setLoader(false);
        console.log(response.data);
        setAdminDashboardData(response.data);
      })
      .catch((error) => {
        console.log(error.response.status);
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
        console.log(res.data);
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
  const handleWardSelect = (id) => {
    setSelectedWard(id);
    setHealthPostNameList([]);
    setSelectedHealthPost();
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
  };
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
            <div style={{ width: "20%" }}>
              <Form layout="vertical">
                <Row>
                  <Col span={12}>
                    <FormItem label="Ward">
                      <select
                        style={{
                          width: "70px",
                          borderRadius: "5px",
                          value: { selectedWard },
                        }}
                        onChange={(e) => handleWardSelect(e.target.value)}
                      >
                        {" "}
                        <option>All</option>
                        {wardList.map((data, index) => (
                          <>
                            <option key={data.id} value={data.id}>
                              {data.wardName}
                            </option>
                          </>
                        ))}
                      </select>
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem label="Health Post">
                      <select
                        style={{
                          width: "130px",
                          borderRadius: "5px",
                        }}
                        value={selectedHealthPost}
                        onChange={(e) => setSelectedHealthPost(e.target.value)}
                      >
                        <option>All</option>
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
                  <CountTitle>
                    {AdminDashboardData.total_count}
                  </CountTitle>
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
                  <CountTitle>
                    {" "}
                    {AdminDashboardData.male}
                  </CountTitle>
                </CountCard>
                <CountCard>
                  <CardTitle>Females Enrolled</CardTitle>
                  <CountTitle>
                    {" "}
                    {AdminDashboardData.female}
                  </CountTitle>
                </CountCard>
                <CountCard>
                  <CardTitle>Transegender Enrolled</CardTitle>
                  <CountTitle> {AdminDashboardData.transgender}</CountTitle>
                </CountCard>
              </MainCountRow>
              <br />
              <MainCountRow>
                <CountCard>
                  <CardTitle>ABHA Id Generated</CardTitle>
                  <CountTitle>
                   0
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
                <MainCountRow>
                  <DetailSubtitle> Tests Suggested</DetailSubtitle>
                  <CountTitle>0</CountTitle>
                </MainCountRow>
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
                    Blood Collecttion Denied By AMO
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
                      <CountTitle>{AdminDashboardData.Referral_choice_Referral_to_Mun_Dispensary}</CountTitle>
                    </ReferralCountCard>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle>
                        {" "}
                        Referral to HBT polyclinic for physician consultation
                      </CardTitle>
                      <CountTitle>{AdminDashboardData.Referral_choice_Referral_to_HBT_polyclinic}</CountTitle>
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
                      <CountTitle>{AdminDashboardData.Referral_choice_Referral_to_Peripheral_Hospital}</CountTitle>
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
                      <CountTitle>{AdminDashboardData.Referral_choice_Referral_to_Medical_College}</CountTitle>
                    </ReferralCountCard>
                  </Col>
                  <Col span={8}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Referral to Private facility</CardTitle>
                      <CountTitle>{AdminDashboardData.Referral_choice_Referral_to_Private_facility}</CountTitle>
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
                <h3>Disease</h3>
              </div>
              <div style={{ width: "80vw" }}>
                <Row>
                  <Col span={5}>
                    <ReferralCountCard>
                      <CardTitle>TB</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.tb}
                      </CountTitle>
                    </ReferralCountCard>
                  </Col>
                  <Col span={5}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle>Diabetes</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.diabetes}
                      </CountTitle>
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
                  <Col span={4}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Cervical Cancer</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.cervical_cancer}
                      </CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                </Row>
                <div style={{ height: "10px" }}></div>
                <Row>
                  {" "}
                  <Col span={5}>
                    <ReferralCountCard>
                      <CardTitle> Breast Cancer</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.breast_cancer}
                      </CountTitle>
                    </ReferralCountCard>
                  </Col>
                  <Col span={5}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> COPD</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.copd}
                      </CountTitle>
                    </ReferralCountCard>{" "}
                  </Col>
                  <Col span={5}>
                    {" "}
                    <ReferralCountCard>
                      <CardTitle> Asthama</CardTitle>
                      <CountTitle>
                        {AdminDashboardData.asthama}
                      </CountTitle>
                    </ReferralCountCard>{" "}
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
