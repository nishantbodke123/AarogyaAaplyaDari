import { Row, Col, Divider } from "antd";
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

function AdminDashboard() {
  const [AdminDashboardData, setAdminDashboardData] = useState({});
  useEffect(() => {
    axios
      .get(`${BASE_URL}/adminportal/api/AdminDashboard`)
      .then((response) => {
        console.log(response.data.data);
        setAdminDashboardData(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.status);
        if (error.status == "401") {
          setTimeout(() => {
            LogOut();
          }, 1000);
        }
      });
  }, []);
  return (
    <>
      <div style={{ overflowY: "auto", maxHeight: "89vh" }}>
        <Row style={{ padding: "2%", width: "100%", height: "100%" }}>
          <Col span={14}>
            <MainCountRow>
              <CountCard>
                <CardTitle>ANM/Co-Ordinator</CardTitle>
                <CountTitle>
                  {AdminDashboardData.TotalHealthWorkerCount}
                </CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>CHV/ASHA</CardTitle>
                <CountTitle>{AdminDashboardData.TotalChvAshaCount}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>MO</CardTitle>
                <CountTitle>{AdminDashboardData.TotalMoCount}</CountTitle>
              </CountCard>
            </MainCountRow>
            <h3>Citizens Details</h3>
            <MainCountRow>
              <CountCard>
                <CardTitle>Families Enrolled</CardTitle>
                <CountTitle>{AdminDashboardData.NoOfFamilyEnrolled}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>Citizens Enrolled</CardTitle>
                <CountTitle>
                  {AdminDashboardData.NoOfCitizenEnrolled}
                </CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>CBAC Filled</CardTitle>
                <CountTitle>{AdminDashboardData.NoOfCBACFilled}</CountTitle>
              </CountCard>
            </MainCountRow>
            <br />
            <MainCountRow>
              <CountCard>
                <CardTitle>Males Enrolled</CardTitle>
                <CountTitle> {AdminDashboardData.NoOfMaleEnrolled}</CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>Females Enrolled</CardTitle>
                <CountTitle>
                  {" "}
                  {AdminDashboardData.NoOfFemaleEnrolled}
                </CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>Transegender Enrolled</CardTitle>
                <CountTitle> 0</CountTitle>
              </CountCard>
            </MainCountRow>
            <br />
            <Row>
              <CountCard style={{ marginRight: "14px" }}>
                <CardTitle>ABHA Id Generated</CardTitle>
                <CountTitle>
                  {AdminDashboardData.NoOfAbhaIdGenerated}
                </CountTitle>
              </CountCard>
              <CountCard style={{ marginRight: "14px" }}>
                <CardTitle>Citizens of age {`>`} 30</CardTitle>
                <CountTitle>
                  {AdminDashboardData.NoOfPersonMoreThan30}
                </CountTitle>
              </CountCard>
              <CountCard>
                <CardTitle>Citizens of age {`>`} 60</CardTitle>
                <CountTitle>
                  {AdminDashboardData.NoOfPersonMoreThan60}
                </CountTitle>
              </CountCard>
            </Row>
          </Col>
          <Col span={1}></Col>
          <Col span={9} style={{ width: "100%" }}>
            <BloodDetailCard>
              <h3>Blood Collection Details</h3>
              <br />
              <MainCountRow>
                <DetailSubtitle>Total Lab Test Added</DetailSubtitle>
                <CountTitle>{AdminDashboardData.NoLabTestAdded}</CountTitle>
              </MainCountRow>
              <Line />
              <MainCountRow>
                <DetailSubtitle>Blood Collected At Home</DetailSubtitle>
                <CountTitle>
                  {AdminDashboardData.BloodCollectedAtHome}
                </CountTitle>
              </MainCountRow>
              <Line />
              <MainCountRow>
                <DetailSubtitle>Blood Collected At Center</DetailSubtitle>
                <CountTitle>
                  {AdminDashboardData.BloodCollectedAtCenter}
                </CountTitle>
              </MainCountRow>
              <Line />
              <MainCountRow>
                <DetailSubtitle>Total Reports Generated</DetailSubtitle>
                <CountTitle>
                  {AdminDashboardData.TotalReportGenerated}
                </CountTitle>
              </MainCountRow>
              <Line />
              <MainCountRow>
                <DetailSubtitle>Blood Collecttion Denied By AMO</DetailSubtitle>
                <CountTitle>
                  {AdminDashboardData.BloodCollecttionDeniedByAmo}
                </CountTitle>
              </MainCountRow>
              <Line />
              <MainCountRow>
                <DetailSubtitle>
                  Blood Collection Denied By Citizen
                </DetailSubtitle>
                <CountTitle>
                  {AdminDashboardData.BloodCollecttionDeniedByIndividual}
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
                    <CountTitle>0</CountTitle>
                  </ReferralCountCard>
                </Col>
                <Col span={8}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle>
                      {" "}
                      Referral to HBT polyclinic for physician consultation
                    </CardTitle>
                    <CountTitle>0</CountTitle>
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
                    <CountTitle>0</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
              </Row>
              <Row>
                {" "}
                <Col span={8}>
                  <ReferralCountCard>
                    <CardTitle>
                      {" "}
                      Referral to Medical College for management of Complication
                    </CardTitle>
                    <CountTitle>0</CountTitle>
                  </ReferralCountCard>
                </Col>
                <Col span={8}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Referral to Private facility</CardTitle>
                    <CountTitle>0</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
              </Row>
            </div>
          </div>{" "}
          <Divider />
          <div>
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
                    <CardTitle> Greater Than 70 years</CardTitle>
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
                      {AdminDashboardData.vulnerabel_elderly_and_alone_at_home}
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
          </div>
          <Divider />
          <div>
            <div>
              <h3>Disease</h3>
            </div>
            <div style={{ width: "80vw" }}>
              <Row>
                <Col span={5}>
                  <ReferralCountCard>
                    <CardTitle> Total TB</CardTitle>
                    <CountTitle>{AdminDashboardData.total_tb_count}</CountTitle>
                  </ReferralCountCard>
                </Col>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Total Diabetes</CardTitle>
                    <CountTitle>{AdminDashboardData.total_diabetes}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Total Eye Problem</CardTitle>
                    <CountTitle>
                      {AdminDashboardData.total_eye_problem}
                    </CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Total Ear Problem</CardTitle>
                    <CountTitle>
                      {AdminDashboardData.total_ear_problem}
                    </CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={4}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Total Leprosy</CardTitle>
                    <CountTitle>{AdminDashboardData.total_leprosy}</CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
              </Row>
              <Row>
                {" "}
                <Col span={5}>
                  <ReferralCountCard>
                    <CardTitle> Total Fits Problem</CardTitle>
                    <CountTitle>
                      {AdminDashboardData.total_fits_problem}
                    </CountTitle>
                  </ReferralCountCard>
                </Col>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Total Breast Cancer</CardTitle>
                    <CountTitle>
                      {AdminDashboardData.total_breast_cancer}
                    </CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Total Oral Cancer</CardTitle>
                    <CountTitle>
                      {AdminDashboardData.total_oral_cancer}
                    </CountTitle>
                  </ReferralCountCard>{" "}
                </Col>
                <Col span={5}>
                  {" "}
                  <ReferralCountCard>
                    <CardTitle> Total Cervival Cancer</CardTitle>
                    <CountTitle>
                      {AdminDashboardData.total_cervical_cancer}
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
    </>
  );
}
export default AdminDashboard;
