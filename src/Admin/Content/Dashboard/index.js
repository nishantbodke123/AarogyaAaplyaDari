import { Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import {
  BloodDetailCard,
  CardTitle,
  CountCard,
  CountTitle,
  DetailSubtitle,
  Line,
  MainCountRow,
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
              <CountTitle>{AdminDashboardData.NoOfCitizenEnrolled}</CountTitle>
            </CountCard>
            <CountCard>
              <CardTitle>Males Enrolled</CardTitle>
              <CountTitle> {AdminDashboardData.NoOfMaleEnrolled}</CountTitle>
            </CountCard>
          </MainCountRow>
          <br />
          <MainCountRow>
            <CountCard>
              <CardTitle>Females Enrolled</CardTitle>
              <CountTitle> {AdminDashboardData.NoOfFemaleEnrolled}</CountTitle>
            </CountCard>
            <CountCard>
              <CardTitle>CBAC Filled</CardTitle>
              <CountTitle>{AdminDashboardData.NoOfCBACFilled}</CountTitle>
            </CountCard>
            <CountCard>
              <CardTitle>ABHA Id Generated</CardTitle>
              <CountTitle>{AdminDashboardData.NoOfAbhaIdGenerated}</CountTitle>
            </CountCard>
          </MainCountRow>
          <br />
          <Row>
            <CountCard style={{ marginRight: "14px" }}>
              <CardTitle>Citizens of age {`>`} 30</CardTitle>
              <CountTitle>{AdminDashboardData.NoOfPersonMoreThan30}</CountTitle>
            </CountCard>
            <CountCard>
              <CardTitle>Citizens of age {`>`} 60</CardTitle>
              <CountTitle>{AdminDashboardData.NoOfPersonMoreThan60}</CountTitle>
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
              <CountTitle>{AdminDashboardData.BloodCollectedAtHome}</CountTitle>
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
              <CountTitle>{AdminDashboardData.TotalReportGenerated}</CountTitle>
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
        {/* <img
          src="\BhugolGISLogo.png"
          style={{ width: "12%", height: "6%", display: "flex" }}
        /> */}
      </Row>
    </>
  );
}
export default AdminDashboard;
