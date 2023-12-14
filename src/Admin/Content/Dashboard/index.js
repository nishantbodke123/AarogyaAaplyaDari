import { Col, Row, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { DashboardCard, DashboardCardDiv } from "./style";
import { AlignRightOutlined } from "@ant-design/icons";
import { BASE_URL } from "../../../Utils/BaseURL";
import axios, { Axios } from "axios";

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
        console.log(error);
      });
  }, []);
  return (
    <>
      <div style={{ overflowY: "auto", maxHeight: "80vh" }}>
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
                      ANM/Co-Ordinator
                    </p>
                    <p
                      style={{
                        margin: "15px 0px",
                        fontSize: "22px",
                        fontWeight: 700,
                      }}
                    >
                      {AdminDashboardData.TotalHealthWorkerCount}
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
                      CHV/ASHA
                    </p>
                    <p
                      style={{
                        margin: "15px 0px",
                        fontSize: "22px",
                        fontWeight: 700,
                      }}
                    >
                      {AdminDashboardData.TotalChvAshaCount}
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
                      MO
                    </p>
                    <p
                      style={{
                        margin: "15px 0px",
                        fontSize: "22px",
                        fontWeight: 700,
                      }}
                    >
                      {AdminDashboardData.TotalMoCount}
                    </p>
                  </Col>
                </Row>
              </div>
            </DashboardCard>
          </DashboardCardDiv>
          <div
            style={{
              height: "95vh",
              backgroundColor: "white",
            }}
          >
             <div style={{marginBottom:"-4%" ,marginTop:"5%" ,marginLeft:"40px"}}>
              <p style={{fontSize:"18px" ,fontFamily:"revert" ,fontWeight:"600"}}>Citizen Details</p>
            </div>
            <Row>
              <Col span={12}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <div
                    style={{
                      height: "15vh",
                      width: "15vw",
                      borderRadius: "5px",
                      backgroundColor: "white",
                      margin: "5vh 0vw 0vh 1vw",
                      boxShadow: "11px 10px 5px -7px rgba(0,0,0,0.75)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        margin: "15px 10px",
                      }}
                    >
                      <span>
                        <AlignRightOutlined />
                      </span>{" "}
                      Family Enrolled
                    </p>
                    <p
                      style={{
                        fontSize: "26px",
                        fontWeight: "700",
                        margin: "0px 30px",
                      }}
                    >
                      {AdminDashboardData.NoOfFamilyEnrolled}
                    </p>
                  </div>
                  <div
                    style={{
                      height: "15vh",
                      width: "15vw",
                      borderRadius: "5px",
                      backgroundColor: "white",
                      margin: "5vh 0vw 0vh 0vw",
                      boxShadow: "11px 10px 5px -7px rgba(0,0,0,0.75)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        margin: "15px 10px",
                      }}
                    >
                      <span>
                        <AlignRightOutlined />
                      </span>
                      Citizen Enrolled
                    </p>
                    <p
                      style={{
                        fontSize: "26px",
                        fontWeight: "700",
                        margin: "0px 30px",
                      }}
                    >
                      {AdminDashboardData.NoOfCitizenEnrolled}
                    </p>
                  </div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <div
                    style={{
                      height: "15vh",
                      width: "15vw",
                      borderRadius: "5px",
                      backgroundColor: "white",
                      margin: "5vh 0vw 0vh 1vw",
                      boxShadow: "11px 10px 5px -7px rgba(0,0,0,0.75)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        margin: "15px 10px",
                      }}
                    >
                      <span>
                        <AlignRightOutlined />
                      </span>
                      CBAC Filled
                    </p>
                    <p
                      style={{
                        fontSize: "26px",
                        fontWeight: "700",
                        margin: "0px 30px",
                      }}
                    >
                      {AdminDashboardData.NoOfCBACFilled}
                    </p>
                  </div>
                  <div
                    style={{
                      height: "15vh",
                      width: "15vw",
                      borderRadius: "5px",
                      backgroundColor: "white",
                      margin: "5vh 0vw 0vh 0vw",
                      boxShadow: "11px 10px 5px -7px rgba(0,0,0,0.75)",
                    }}
                  >
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        margin: "15px 10px",
                      }}
                    >
                      <span>
                        <AlignRightOutlined />
                      </span>{" "}
                      ABHA ID Generated
                    </p>
                    <p
                      style={{
                        fontSize: "26px",
                        fontWeight: "700",
                        margin: "0px 30px",
                      }}
                    >
                      {AdminDashboardData.NoOfAbhaIdGenerated}
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div
                  style={{
                    width: "80%",
                    height: "90%",
                    margin: "5% 12%",
                    borderRadius: "5px",
                    backgroundColor: "#9BBEC8",

                    position: "relative",
                  }}
                >
                  <Row>
                    <Col span={13}>
                      <div
                        style={{
                          position: "absolute",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          width: "12vw",
                          height: "13vh",
                          margin: "5% 0% 0% 7%",
                          top: 10,
                          left: 10,
                        }}
                      >
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "600",
                            margin: "12px 10px",
                          }}
                        >
                          <span>
                            <AlignRightOutlined />
                          </span>{" "}
                          Male
                        </p>
                        <p
                          style={{
                            fontSize: "26px",
                            fontWeight: "700",
                            margin: "0px 30px",
                          }}
                        >
                          {AdminDashboardData.NoOfMaleEnrolled}
                        </p>
                      </div>
                    </Col>
                    <Col span={11}>
                      <div
                        style={{
                          position: "absolute",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          margin: "5% 0% 0% 0%",
                          width: "12vw",
                          height: "13vh",
                          top: 10,
                          left: 10,
                        }}
                      >
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "600",
                            margin: "11px 10px",
                          }}
                        >
                          <span>
                            <AlignRightOutlined />
                          </span>{" "}
                          Female
                        </p>
                        <p
                          style={{
                            fontSize: "26px",
                            fontWeight: "700",
                            margin: "0px 30px",
                          }}
                        >
                          {AdminDashboardData.NoOfFemaleEnrolled}
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={13}>
                      <div
                        style={{
                          position: "absolute",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          width: "12vw",
                          height: "13vh",
                          margin: "50% 7% 7% 7%",
                          top: 10,
                          left: 10,
                        }}
                      >
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "600",
                            margin: "12px 10px",
                          }}
                        >
                          Citizens of age > 30
                        </p>
                        <p
                          style={{
                            fontSize: "26px",
                            fontWeight: "700",
                            margin: "0px 30px",
                          }}
                        >
                          {AdminDashboardData.NoOfPersonMoreThan30}
                        </p>
                      </div>
                    </Col>
                    <Col span={11}>
                      <div
                        style={{
                          position: "absolute",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          margin: "59% 0% 0% 0%",
                          width: "12vw",
                          height: "13vh",
                          top: 10,
                          left: 10,
                        }}
                      >
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "600",
                            margin: "11px 10px",
                          }}
                        >
                          Citizens of age > 60
                        </p>
                        <p
                          style={{
                            fontSize: "26px",
                            fontWeight: "700",
                            margin: "0px 30px",
                          }}
                        >
                          {AdminDashboardData.NoOfPersonMoreThan60}
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <div style={{marginBottom:"-4%" ,marginTop:"5%" ,marginLeft:"40px"}}>
              <p style={{fontSize:"18px" ,fontFamily:"revert" ,fontWeight:"600"}}>Blood Collection Details</p>
            </div>
            <Row>
              <Col span={12}>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      position: "absolute",
                      top: 45,
                      margin: "0% 15% 0% 7%",
                      width: "34vw",
                      height: "10vh",
                      boxShadow: "8px 8px 6px -7px rgba(0,0,0,0.75)",
                    }}
                  >
                    <Row>
                      <Col
                        span={1}
                        style={{ backgroundColor: "#04364A", height: "10vh" }}
                      ></Col>
                      <Col span={11}>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "600",
                            margin: "20px 20px",
                          }}
                        >
                          Total Lab Test Added
                        </p>
                      </Col>
                      <Col span={12}>
                        <p
                          style={{
                            fontSize: "26px",
                            fontWeight: "700",
                            margin: "10px 50px",
                          }}
                        >
                          {AdminDashboardData.NoLabTestAdded}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      position: "absolute",
                      top: 130,
                      margin: "0% 15% 0% 7%",
                      width: "34vw",
                      height: "10vh",
                      boxShadow: "8px 8px 6px -7px rgba(0,0,0,0.75)",
                    }}
                  >
                    <Row>
                      <Col
                        span={1}
                        style={{ backgroundColor: "#04364A", height: "10vh" }}
                      ></Col>
                      <Col span={11}>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "600",
                            margin: "20px 20px",
                          }}
                        >
                          Blood Collected At Home
                        </p>
                      </Col>
                      <Col span={12}>
                        <p
                          style={{
                            fontSize: "26px",
                            fontWeight: "700",
                            margin: "10px 50px",
                          }}
                        >
                          {AdminDashboardData.BloodCollectedAtHome}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      position: "absolute",
                      top: 220,
                      margin: "0% 15% 0% 7%",
                      width: "34vw",
                      height: "10vh",
                      boxShadow: "8px 8px 6px -7px rgba(0,0,0,0.75)",
                    }}
                  >
                    <Row>
                      <Col
                        span={1}
                        style={{ backgroundColor: "#04364A", height: "10vh" }}
                      ></Col>
                      <Col span={11}>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "600",
                            margin: "20px 15px",
                          }}
                        >
                          Blood Collected At Center
                        </p>
                      </Col>
                      <Col span={12}>
                        <p
                          style={{
                            fontSize: "26px",
                            fontWeight: "700",
                            margin: "10px 50px",
                          }}
                        >
                          {AdminDashboardData.BloodCollectedAtCenter}
                        </p>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ position: "relative" }}>
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      position: "absolute",
                      top: 45,
                      margin: "0% 15% 0% 6%",
                      width: "34vw",
                      height: "10vh",
                      boxShadow: "8px 8px 6px -7px rgba(0,0,0,0.75)",
                    }}
                  >
                    <Row>
                      <Col
                        span={1}
                        style={{ backgroundColor: "#04364A", height: "10vh" }}
                      ></Col>
                      <Col span={11}>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "600",
                            margin: "20px 20px",
                          }}
                        >
                          Total Reports Generated
                        </p>
                      </Col>
                      <Col span={12}>
                        <p
                          style={{
                            fontSize: "26px",
                            fontWeight: "700",
                            margin: "10px 50px",
                          }}
                        >
                          {AdminDashboardData.TotalReportGenerated}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      position: "absolute",
                      top: 130,
                      margin: "0% 15% 0% 6%",
                      width: "34vw",
                      height: "10vh",
                      boxShadow: "8px 8px 6px -7px rgba(0,0,0,0.75)",
                    }}
                  >
                    <Row>
                      <Col
                        span={1}
                        style={{ backgroundColor: "#04364A", height: "10vh" }}
                      ></Col>
                      <Col span={11}>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "600",
                            margin: "15px 10px",
                          }}
                        >
                          Blood Collecttion Denied By AMO
                        </p>
                      </Col>
                      <Col span={12}>
                        <p
                          style={{
                            fontSize: "26px",
                            fontWeight: "700",
                            margin: "10px 50px",
                          }}
                        >
                          {AdminDashboardData.BloodCollecttionDeniedByAmo}
                        </p>
                      </Col>
                    </Row>
                  </div>
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "5px",
                      position: "absolute",
                      top: 220,
                      margin: "0% 15% 0% 6%",
                      width: "34vw",
                      height: "10vh",
                      boxShadow: "8px 8px 6px -7px rgba(0,0,0,0.75)",
                    }}
                  >
                    <Row>
                      <Col
                        span={1}
                        style={{ backgroundColor: "#04364A", height: "10vh" }}
                      ></Col>
                      <Col span={11}>
                        <p
                          style={{
                            fontSize: "15px",
                            fontWeight: "600",
                            margin: "15px 10px",
                          }}
                        >
                          Blood Collection Denied By Citizen
                        </p>
                      </Col>
                      <Col span={12}>
                        <p
                          style={{
                            fontSize: "26px",
                            fontWeight: "700",
                            margin: "10px 50px",
                          }}
                        >
                          {
                            AdminDashboardData.BloodCollecttionDeniedByIndividual
                          }
                        </p>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Content>
      </div>
    </>
  );
}
export default AdminDashboard;
