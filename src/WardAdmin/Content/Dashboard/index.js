import { Col, Row, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import { DashboardCard, DashboardCardDiv } from "./style";
import { AlignRightOutlined } from "@ant-design/icons";
import axios from "axios";
import { BASE_URL } from "../../../Utils/BaseURL";

function WardAdminDashboard() {
  useEffect(() => {
    axios
      .get(`${BASE_URL}/adminportal/api/AdminDashboard`)
      .then((response) => {
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
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
                    Health Worker
                  </p>
                  <p
                    style={{
                      margin: "15px 0px",
                      fontSize: "22px",
                      fontWeight: 700,
                    }}
                  >
                    175
                  </p>
                </Col>
              </Row>
            </div>
          </DashboardCard>
          {/* <DashboardCard>
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
                    MO
                  </p>
                  <p
                    style={{
                      margin: "15px 0px",
                      fontSize: "22px",
                      fontWeight: 700,
                    }}
                  >
                    70
                  </p>
                </Col>
              </Row>
            </div>
          </DashboardCard> */}
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
                    ANM
                  </p>
                  <p
                    style={{
                      margin: "15px 0px",
                      fontSize: "22px",
                      fontWeight: 700,
                    }}
                  >
                    150
                  </p>
                </Col>
              </Row>
            </div>
          </DashboardCard>
        </DashboardCardDiv>
      </Content>
    </>
  );
}
export default WardAdminDashboard;
