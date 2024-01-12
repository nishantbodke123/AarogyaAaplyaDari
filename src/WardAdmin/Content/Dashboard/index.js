import { Col, Divider, Form, Row, Spin, theme } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
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
import { AlignRightOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../../Utils/BaseURL";
import axios, { Axios } from "axios";
import FormItem from "antd/es/form/FormItem";
import { LogOut } from "../../../Auth/Logout";

function WardAdminDashboard() {
  const [loader, setLoader] = useState(false);
  const [MOHDashboardData, setMOHDashboardData] = useState({});
  const [healthPostNameList, setHealthPostNameList] = useState([]);
  const [selectedHealthPost, setSelectedHealthPost] = useState();
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
  return (
    <>
      <Spin spinning={loader}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            margin: "1% 3%-2% 0%",
          }}
        >
          <div style={{ width: "20%" }}>
            <Form layout="vertical">
              <Row>
                <Col span={24}>
                  <FormItem label="Health Post">
                    <select
                      style={{
                        width: "180px",
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
                <CardTitle>Total Families Enrolled</CardTitle>
                <CountTitle>{MOHDashboardData.total_family_count}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>Today's Families Enrolled</CardTitle>
                <CountTitle>{MOHDashboardData.today_family_count}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle> Total Citizens Enrolled</CardTitle>
                <CountTitle>{MOHDashboardData.total_count}</CountTitle>
              </CountCard>
            </MainCountRow>
            <br />
            <MainCountRow>
              <CountCard>
                <CardTitle> Today's Citizens Enrolled</CardTitle>
                <CountTitle>{MOHDashboardData.todays_count}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>Males Enrolled</CardTitle>
                <CountTitle> {MOHDashboardData.male}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>Females Enrolled</CardTitle>
                <CountTitle> {MOHDashboardData.female}</CountTitle>
              </CountCard>
            </MainCountRow>
            <br />
            <MainCountRow>
              <CountCard>
                <CardTitle>Transegender</CardTitle>
                <CountTitle>{MOHDashboardData.transgender}</CountTitle>
              </CountCard>

              <CountCard>
                <CardTitle>CBAC Filled</CardTitle>
                <CountTitle>{MOHDashboardData.total_cbac_count}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>ABHA Id Generated</CardTitle>
                <CountTitle>0</CountTitle>
              </CountCard>
            </MainCountRow>
            <br />
            <MainCountRow>
              <CountCard>
                <CardTitle>Citizens 30 years + enrolled</CardTitle>
                <CountTitle>{MOHDashboardData.citizen_above_30}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>Citizens 60 years + enrolled </CardTitle>
                <CountTitle>{MOHDashboardData.citizen_above_60}</CountTitle>
              </CountCard>
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
              <MainCountRow>
                <DetailSubtitle> Tests Suggested</DetailSubtitle>
                <CountTitle>{MOHDashboardData.total_LabTestAdded}</CountTitle>
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
                <DetailSubtitle>Blood Collecttion Denied By AMO</DetailSubtitle>
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
          {/* <div>
            <div>
              <h3>Vulnerable</h3>
            </div>
            <div style={{ width: "80vw" }}>
              <Row>
                <Col span={8}>
                  <ReferralCountCard>
                    <CardTitle> Total Vulnerable</CardTitle>
                    <CountTitle>{MOHDashboardData.total_vulnerabel}</CountTitle>
                  </ReferralCountCard>
                </Col>
                <Col span={8}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Citizens of 70 years +</CardTitle>
                    <CountTitle>
                      {MOHDashboardData.vulnerabel_70_Years}
                    </CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={8}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Physical Handicapped</CardTitle>
                    <CountTitle>
                      {MOHDashboardData.vulnerabel_Physically_handicapped}
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
                        MOHDashboardData.vulnerabel_completely_paralyzed_or_on_bed
                      }
                    </CountTitle>
                  </ReferralCountCard>
                </Col>
                <Col span={8}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Elder or Alone At Home</CardTitle>
                    <CountTitle>
                      {MOHDashboardData.vulnerabel_elderly_and_alone_at_home}
                    </CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={8}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Other Reasons</CardTitle>
                    <CountTitle>
                      {MOHDashboardData.vulnerabel_any_other_reason}
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
                    <CountTitle>{MOHDashboardData.tb}</CountTitle>
                  </ReferralCountCard>
                </Col>
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
                    <CardTitle> Eye Disorder</CardTitle>
                    <CountTitle>{MOHDashboardData.eye_disorder}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Oral Cancer</CardTitle>
                    <CountTitle>{MOHDashboardData.oral_Cancer}</CountTitle>
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
                  <ReferralCountCard>
                    <CardTitle>ENT Disorder </CardTitle>
                    <CountTitle>{MOHDashboardData.ent_disorder}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={5}>
                  <ReferralCountCard>
                    <CardTitle> Alzheimers/Dementia</CardTitle>
                    <CountTitle>{MOHDashboardData.Alzheimers}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Asthama</CardTitle>
                    <CountTitle>{MOHDashboardData.asthama}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle>COPD </CardTitle>
                    <CountTitle>{MOHDashboardData.copd}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={4}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle>Hypertension </CardTitle>
                    <CountTitle>{MOHDashboardData.hypertension}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
              </Row>
              <div style={{ height: "10px" }}></div>
              <Row>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle>Cervical Cancer </CardTitle>
                    <CountTitle>{MOHDashboardData.cervical_cancer}</CountTitle>
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
    // <>
    //   <div style={{ overflowY: "auto", maxHeight: "81.5vh" }}>
    //     <Content
    //       style={{
    //         margin: "24px 16px",
    //         padding: 24,
    //         minHeight: "81.9Vh",
    //         maxHeight: "81.9Vh",
    //         background: "white",
    //       }}
    //     >
    //       {/* <DashboardCardDiv>
    //         <DashboardCard>
    //           <DashboardCardContent>
    //             <Row>
    //               <Col span={4}>
    //                 <AlignRightOutlined />
    //               </Col>
    //               <Col span={20}>
    //                 <p
    //                   style={{
    //                     margin: "0px 0px",
    //                     fontSize: "15px",
    //                     fontWeight: 500,
    //                   }}
    //                 >
    //                   ANM/Co-Ordinator
    //                 </p>
    //                 <p
    //                   style={{
    //                     margin: "15px 0px",
    //                     fontSize: "22px",
    //                     fontWeight: 700,
    //                   }}
    //                 >
    //                   {MOHDashboardData.TotalHealthWorkerCount}
    //                 </p>
    //               </Col>
    //             </Row>
    //           </DashboardCardContent>
    //         </DashboardCard>
    //         <DashboardCard>
    //           <DashboardCardContent>
    //             <Row>
    //               <Col span={4}>
    //                 <AlignRightOutlined />
    //               </Col>
    //               <Col span={20}>
    //                 <p
    //                   style={{
    //                     margin: "0px 0px",
    //                     fontSize: "15px",
    //                     fontWeight: 500,
    //                   }}
    //                 >
    //                   CHV/ASHA
    //                 </p>
    //                 <p
    //                   style={{
    //                     margin: "15px 0px",
    //                     fontSize: "22px",
    //                     fontWeight: 700,
    //                   }}
    //                 >
    //                   {MOHDashboardData.TotalChvAshaCount}
    //                 </p>
    //               </Col>
    //             </Row>
    //           </DashboardCardContent>
    //         </DashboardCard>
    //         <DashboardCard>
    //           <DashboardCardContent>
    //             <Row>
    //               <Col span={4}>
    //                 <AlignRightOutlined />
    //               </Col>
    //               <Col span={20}>
    //                 <p
    //                   style={{
    //                     margin: "0px 0px",
    //                     fontSize: "15px",
    //                     fontWeight: 500,
    //                   }}
    //                 >
    //                   MO
    //                 </p>
    //                 <p
    //                   style={{
    //                     margin: "15px 0px",
    //                     fontSize: "22px",
    //                     fontWeight: 700,
    //                   }}
    //                 >
    //                   {MOHDashboardData.TotalMoCount}
    //                 </p>
    //               </Col>
    //             </Row>
    //           </DashboardCardContent>
    //         </DashboardCard>
    //       </DashboardCardDiv> */}
    //       <div
    //         style={{
    //           height: "40vh",
    //           backgroundColor: "white",
    //         }}
    //       >
    //         <div
    //           style={{
    //             margin: "1% 0% -3% 4%",
    //           }}
    //         >
    //           <Title>Citizen Details</Title>
    //         </div>
    //         <Row>
    //           <Col span={24}>
    //             <div
    //               style={{
    //                 display: "flex",
    //                 justifyContent: "space-around",
    //               }}
    //             >
    //               <CitizenDetailsCard>
    //                 <CitizenDetailsCountLabel>
    //                   <span>
    //                     <AlignRightOutlined />
    //                   </span>{" "}
    //                   Family Enrolled
    //                 </CitizenDetailsCountLabel>
    //                 <CitizenDetailsCount>
    //                   {MOHDashboardData.NoOfFamilyEnrolled}
    //                 </CitizenDetailsCount>
    //               </CitizenDetailsCard>
    //               <CitizenDetailsCard>
    //                 <CitizenDetailsCountLabel>
    //                   <span style={{ marginRight: "2%" }}>
    //                     <AlignRightOutlined />
    //                   </span>
    //                   Citizen Enrolled
    //                 </CitizenDetailsCountLabel>
    //                 <CitizenDetailsCount>
    //                   {MOHDashboardData.NoOfCitizenEnrolled}
    //                 </CitizenDetailsCount>
    //               </CitizenDetailsCard>
    //               <CitizenDetailsCard>
    //                 <CitizenDetailsCountLabel>
    //                   <span style={{ marginRight: "2%" }}>
    //                     <AlignRightOutlined />
    //                   </span>
    //                   Male
    //                 </CitizenDetailsCountLabel>
    //                 <CitizenDetailsCount>
    //                   {MOHDashboardData.NoOfMaleEnrolled}
    //                 </CitizenDetailsCount>
    //               </CitizenDetailsCard>
    //               <CitizenDetailsCard>
    //                 <CitizenDetailsCountLabel>
    //                   <span style={{ marginRight: "2%" }}>
    //                     <AlignRightOutlined />
    //                   </span>
    //                   Female
    //                 </CitizenDetailsCountLabel>
    //                 <CitizenDetailsCount>
    //                   {MOHDashboardData.NoOfFemaleEnrolled}
    //                 </CitizenDetailsCount>
    //               </CitizenDetailsCard>
    //             </div>
    //             <div
    //               style={{ display: "flex", justifyContent: "space-around" }}
    //             >
    //               <CitizenDetailsCard>
    //                 <CitizenDetailsCountLabel>
    //                   <span style={{ marginRight: "2%" }}>
    //                     <AlignRightOutlined />
    //                   </span>
    //                   CBAC Filled
    //                 </CitizenDetailsCountLabel>
    //                 <CitizenDetailsCount>
    //                   {MOHDashboardData.NoOfCBACFilled}
    //                 </CitizenDetailsCount>
    //               </CitizenDetailsCard>
    //               <CitizenDetailsCard>
    //                 <CitizenDetailsCountLabel>
    //                   <span>
    //                     <AlignRightOutlined />
    //                   </span>{" "}
    //                   ABHA ID Generated
    //                 </CitizenDetailsCountLabel>
    //                 <CitizenDetailsCount>
    //                   {MOHDashboardData.NoOfAbhaIdGenerated}
    //                 </CitizenDetailsCount>
    //               </CitizenDetailsCard>
    //               <CitizenDetailsCard>
    //                 <CitizenDetailsCountLabel>
    //                   <span style={{ marginRight: "2%" }}>
    //                     <AlignRightOutlined />
    //                   </span>
    //                   Citizens of age > 30
    //                 </CitizenDetailsCountLabel>
    //                 <CitizenDetailsCount>
    //                   {MOHDashboardData.NoOfPersonMoreThan30}
    //                 </CitizenDetailsCount>
    //               </CitizenDetailsCard>
    //               <CitizenDetailsCard>
    //                 <CitizenDetailsCountLabel>
    //                   <span style={{ marginRight: "2%" }}>
    //                     <AlignRightOutlined />
    //                   </span>
    //                   Citizens of age > 60
    //                 </CitizenDetailsCountLabel>
    //                 <CitizenDetailsCount>
    //                   {MOHDashboardData.NoOfPersonMoreThan60}
    //                 </CitizenDetailsCount>
    //               </CitizenDetailsCard>
    //             </div>
    //           </Col>
    //           {/* <Col span={12}>
    //             <div
    //               style={{
    //                 width: "80%",
    //                 height: "90%",
    //                 margin: "5% 12%",
    //                 borderRadius: "5px",
    //                 backgroundColor: "#9BBEC8",

    //                 position: "relative",
    //               }}
    //             >
    //               <Row>
    //                 <Col span={13}>
    //                   <div
    //                     style={{
    //                       position: "absolute",
    //                       backgroundColor: "white",
    //                       borderRadius: "5px",
    //                       width: "12vw",
    //                       height: "13vh",
    //                       margin: "5% 0% 0% 3%",
    //                       top: 10,
    //                       left: 10,
    //                     }}
    //                   >
    //                     <p
    //                       style={{
    //                         fontSize: "15px",
    //                         fontWeight: "600",
    //                         margin: "12px 10px",
    //                       }}
    //                     >
    //                       <span>
    //                         <AlignRightOutlined />
    //                       </span>{" "}
    //                       Male
    //                     </p>
    //                     <p
    //                       style={{
    //                         fontSize: "26px",
    //                         fontWeight: "700",
    //                         margin: "0px 30px",
    //                       }}
    //                     >
    //                       {MOHDashboardData.NoOfMaleEnrolled}
    //                     </p>
    //                   </div>
    //                 </Col>
    //                 <Col span={11}>
    //                   <div
    //                     style={{
    //                       position: "absolute",
    //                       backgroundColor: "white",
    //                       borderRadius: "5px",
    //                       margin: "5% 0% 0% 0%",
    //                       width: "12vw",
    //                       height: "13vh",
    //                       top: 10,
    //                       left: 10,
    //                     }}
    //                   >
    //                     <p
    //                       style={{
    //                         fontSize: "15px",
    //                         fontWeight: "600",
    //                         margin: "11px 10px",
    //                       }}
    //                     >
    //                       <span>
    //                         <AlignRightOutlined />
    //                       </span>{" "}
    //                       Female
    //                     </p>
    //                     <p
    //                       style={{
    //                         fontSize: "26px",
    //                         fontWeight: "700",
    //                         margin: "0px 30px",
    //                       }}
    //                     >
    //                       {MOHDashboardData.NoOfFemaleEnrolled}
    //                     </p>
    //                   </div>
    //                 </Col>
    //               </Row>
    //               <Row>
    //                 <Col span={13}>
    //                   <div
    //                     style={{
    //                       position: "absolute",
    //                       backgroundColor: "white",
    //                       borderRadius: "5px",
    //                       width: "12vw",
    //                       height: "13vh",
    //                       margin: "50% 7% 7% 3%",
    //                       top: 10,
    //                       left: 10,
    //                     }}
    //                   >
    //                     <p
    //                       style={{
    //                         fontSize: "15px",
    //                         fontWeight: "600",
    //                         margin: "12px 10px",
    //                       }}
    //                     >
    //                       Citizens of age > 30
    //                     </p>
    //                     <p
    //                       style={{
    //                         fontSize: "26px",
    //                         fontWeight: "700",
    //                         margin: "0px 30px",
    //                       }}
    //                     >
    //                       {MOHDashboardData.NoOfPersonMoreThan30}
    //                     </p>
    //                   </div>
    //                 </Col>
    //                 <Col span={11}>
    //                   <div
    //                     style={{
    //                       position: "absolute",
    //                       backgroundColor: "white",
    //                       borderRadius: "5px",
    //                       margin: "59% 0% 0% 0%",
    //                       width: "12vw",
    //                       height: "13vh",
    //                       top: 10,
    //                       left: 10,
    //                     }}
    //                   >
    //                     <p
    //                       style={{
    //                         fontSize: "15px",
    //                         fontWeight: "600",
    //                         margin: "11px 10px",
    //                       }}
    //                     >
    //                       Citizens of age > 60
    //                     </p>
    //                     <p
    //                       style={{
    //                         fontSize: "26px",
    //                         fontWeight: "700",
    //                         margin: "0px 30px",
    //                       }}
    //                     >
    //                       {MOHDashboardData.NoOfPersonMoreThan60}
    //                     </p>
    //                   </div>
    //                 </Col>
    //               </Row>
    //             </div>
    //           </Col> */}
    //         </Row>
    //         <div
    //           style={{
    //             margin: "1% 0% 0% 4%",
    //           }}
    //         >
    //           <Title>Blood Collection Details</Title>
    //         </div>
    //         <Row>
    //           <Col span={12}>
    //             <div style={{ position: "relative" }}>
    //               <BloodCollectionCard>
    //                 <Row>
    //                   <Col
    //                     span={1}
    //                     style={{ backgroundColor: "#04364A", height: "10vh" }}
    //                   ></Col>
    //                   <Col span={11}>
    //                     <p
    //                       style={{
    //                         fontSize: "15px",
    //                         fontWeight: "600",
    //                         margin: "9% 0% 0% 9%",
    //                       }}
    //                     >
    //                       Total Lab Test Added
    //                     </p>
    //                   </Col>
    //                   <Col span={12}>
    //                     <p
    //                       style={{
    //                         fontSize: "26px",
    //                         fontWeight: "700",
    //                         margin: "5% 0% 0% 20%",
    //                       }}
    //                     >
    //                       {MOHDashboardData.NoLabTestAdded}
    //                     </p>
    //                   </Col>
    //                 </Row>
    //               </BloodCollectionCard>
    //               <div
    //                 style={{
    //                   backgroundColor: "white",
    //                   borderRadius: "5px",
    //                   position: "absolute",
    //                   top: 90,
    //                   margin: "0% 15% 0% 8%",
    //                   width: "34vw",
    //                   height: "10vh",
    //                   boxShadow: "8px 8px 6px -7px rgba(0,0,0,0.75)",
    //                 }}
    //               >
    //                 <Row>
    //                   <Col
    //                     span={1}
    //                     style={{ backgroundColor: "#04364A", height: "10vh" }}
    //                   ></Col>
    //                   <Col span={11}>
    //                     <p
    //                       style={{
    //                         fontSize: "15px",
    //                         fontWeight: "600",
    //                         margin: "9% 0% 0% 9%",
    //                       }}
    //                     >
    //                       Blood Collected At Home
    //                     </p>
    //                   </Col>
    //                   <Col span={12}>
    //                     <p
    //                       style={{
    //                         fontSize: "26px",
    //                         fontWeight: "700",
    //                         margin: "5% 0% 0% 20%",
    //                       }}
    //                     >
    //                       {MOHDashboardData.BloodCollectedAtHome}
    //                     </p>
    //                   </Col>
    //                 </Row>
    //               </div>
    //               <div
    //                 style={{
    //                   backgroundColor: "white",
    //                   borderRadius: "5px",
    //                   position: "absolute",
    //                   top: 180,
    //                   margin: "0% 15% 0% 8%",
    //                   width: "34vw",
    //                   height: "10vh",
    //                   boxShadow: "8px 8px 6px -7px rgba(0,0,0,0.75)",
    //                 }}
    //               >
    //                 <Row>
    //                   <Col
    //                     span={1}
    //                     style={{ backgroundColor: "#04364A", height: "10vh" }}
    //                   ></Col>
    //                   <Col span={11}>
    //                     <p
    //                       style={{
    //                         fontSize: "15px",
    //                         fontWeight: "600",
    //                         margin: "9% 0% 0% 9%",
    //                       }}
    //                     >
    //                       Blood Collected At Center
    //                     </p>
    //                   </Col>
    //                   <Col span={12}>
    //                     <p
    //                       style={{
    //                         fontSize: "26px",
    //                         fontWeight: "700",
    //                         margin: "5% 0% 0% 20%",
    //                       }}
    //                     >
    //                       {MOHDashboardData.BloodCollectedAtCenter}
    //                     </p>
    //                   </Col>
    //                 </Row>
    //               </div>
    //             </div>
    //           </Col>
    //           <Col span={12}>
    //             <div style={{ position: "relative" }}>
    //               <div
    //                 style={{
    //                   backgroundColor: "white",
    //                   borderRadius: "5px",
    //                   position: "absolute",
    //                   top: 0,
    //                   margin: "0% 15% 0% 8%",
    //                   width: "34vw",
    //                   height: "10vh",
    //                   boxShadow: "8px 8px 6px -7px rgba(0,0,0,0.75)",
    //                 }}
    //               >
    //                 <Row>
    //                   <Col
    //                     span={1}
    //                     style={{ backgroundColor: "#04364A", height: "10vh" }}
    //                   ></Col>
    //                   <Col span={11}>
    //                     <p
    //                       style={{
    //                         fontSize: "15px",
    //                         fontWeight: "600",
    //                         margin: "9% 0% 0% 9%",
    //                       }}
    //                     >
    //                       Total Reports Generated
    //                     </p>
    //                   </Col>
    //                   <Col span={12}>
    //                     <p
    //                       style={{
    //                         fontSize: "26px",
    //                         fontWeight: "700",
    //                         margin: "5% 0% 0% 20%",
    //                       }}
    //                     >
    //                       {MOHDashboardData.TotalReportGenerated}
    //                     </p>
    //                   </Col>
    //                 </Row>
    //               </div>
    //               <div
    //                 style={{
    //                   backgroundColor: "white",
    //                   borderRadius: "5px",
    //                   position: "absolute",
    //                   top: 90,
    //                   margin: "0% 15% 0% 8%",
    //                   width: "34vw",
    //                   height: "10vh",
    //                   boxShadow: "8px 8px 6px -7px rgba(0,0,0,0.75)",
    //                 }}
    //               >
    //                 <Row>
    //                   <Col
    //                     span={1}
    //                     style={{ backgroundColor: "#04364A", height: "10vh" }}
    //                   ></Col>
    //                   <Col span={11}>
    //                     <p
    //                       style={{
    //                         fontSize: "15px",
    //                         fontWeight: "600",
    //                         margin: "7% 0% 0% 9%",
    //                       }}
    //                     >
    //                       Blood Collecttion Denied By AMO
    //                     </p>
    //                   </Col>
    //                   <Col span={12}>
    //                     <p
    //                       style={{
    //                         fontSize: "26px",
    //                         fontWeight: "700",
    //                         margin: "5% 0% 0% 20%",
    //                       }}
    //                     >
    //                       {MOHDashboardData.BloodCollecttionDeniedByAmo}
    //                     </p>
    //                   </Col>
    //                 </Row>
    //               </div>
    //               <div
    //                 style={{
    //                   backgroundColor: "white",
    //                   borderRadius: "5px",
    //                   position: "absolute",
    //                   top: 180,
    //                   margin: "0% 15% 0% 8%",
    //                   width: "34vw",
    //                   height: "10vh",
    //                   boxShadow: "8px 8px 6px -7px rgba(0,0,0,0.75)",
    //                 }}
    //               >
    //                 <Row>
    //                   <Col
    //                     span={1}
    //                     style={{ backgroundColor: "#04364A", height: "10vh" }}
    //                   ></Col>
    //                   <Col span={11}>
    //                     <p
    //                       style={{
    //                         fontSize: "15px",
    //                         fontWeight: "600",
    //                         margin: "7% 0% 0% 9%",
    //                       }}
    //                     >
    //                       Blood Collection Denied By Citizen
    //                     </p>
    //                   </Col>
    //                   <Col span={12}>
    //                     <p
    //                       style={{
    //                         fontSize: "26px",
    //                         fontWeight: "700",
    //                         margin: "5% 0% 0% 20%",
    //                       }}
    //                     >
    //                       {
    //                         MOHDashboardData.BloodCollecttionDeniedByIndividual
    //                       }
    //                     </p>
    //                   </Col>
    //                 </Row>
    //               </div>
    //             </div>
    //           </Col>
    //         </Row>
    //       </div>
    //     </Content>
    //   </div>
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "flex-end",
    //       margin: "0% 5% 0% 0%",
    //     }}
    //   >
    //     <span>
    //       <p>Developed and maintained by </p>
    //     </span>
    //     <img
    //       src="\BhugolGISLogo.png"
    //       style={{ width: "14%", height: "10%", margin: "1% 0% 0% 2%" }}
    //     ></img>
    //   </div>
    // </>
  );
}
export default WardAdminDashboard;
