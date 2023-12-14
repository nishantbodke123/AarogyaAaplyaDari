import { Col, Row, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { DashboardCard, DashboardCardDiv } from "./style";
import { AlignRightOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../../Utils/BaseURL";

function WardAdminDashboard() {

  const [MOHDashboardData, setMOHDashboardData] = useState({});
  useEffect(() => {
    axios
      .get(`${BASE_URL}/adminportal/api/MOHDashboardView`,{headers:{
        Authorization:`Token ${sessionStorage.getItem("Token")}`
      }})
      .then((response) => {
        console.log(response.data);
        // setAdminDashboardData(response.data.data);
        setMOHDashboardData(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <div style={{ overflowY: "auto", maxHeight: "100vh" }}>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "81.9Vh",
            maxHeight: "81.9Vh",
            background: "white",
          }}
        >
          <DashboardCardDiv>
            <DashboardCard>
              <div style={{ margin: "20px 20px" }}>
                <Row>
                  <Col span={4}>
                    <AlignRightOutlined />
                  </Col>
                  <Col span={20}>
                    <p
                      style={{
                        margin: "0px 0px",
                        fontSize: "15px",
                        fontWeight: 500,
                      }}
                    >
                      Total Count
                    </p>
                    <p
                      style={{
                        margin: "15px 0px",
                        fontSize: "22px",
                        fontWeight: 700,
                      }}
                    >
                      {MOHDashboardData.total_count}
                    </p>
                  </Col>
                </Row>
              </div>
            </DashboardCard>
            <DashboardCard>
              <div style={{ margin: "20px 20px" }}>
                <Row>
                  <Col span={4}>
                    <AlignRightOutlined />
                  </Col>
                  <Col span={20}>
                    <p
                      style={{
                        margin: "0px 0px",
                        fontSize: "15px",
                        fontWeight: 500,
                      }}
                    >
                     Today's Count
                    </p>
                    <p
                      style={{
                        margin: "15px 0px",
                        fontSize: "22px",
                        fontWeight: 700,
                      }}
                    >
                      {MOHDashboardData.todays_count}
                    </p>
                  </Col>
                </Row>
              </div>
            </DashboardCard>
            <DashboardCard>
              <div style={{ margin: "20px 20px" }}>
                <Row>
                  <Col span={4}>
                    <AlignRightOutlined />
                  </Col>
                  <Col span={20}>
                    <p
                      style={{
                        margin: "0px 0px",
                        fontSize: "15px",
                        fontWeight: 500,
                      }}
                    >
                     Partial Survey Count
                    </p>
                    <p
                      style={{
                        margin: "15px 0px",
                        fontSize: "22px",
                        fontWeight: 700,
                      }}
                    >
                      {MOHDashboardData.partial_survey_count}
                    </p>
                  </Col>
                </Row>
              </div>
            </DashboardCard>
          </DashboardCardDiv>

        </Content>
      </div>
    </>
  );
}
export default WardAdminDashboard;
